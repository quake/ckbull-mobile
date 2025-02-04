import { Cell, DepType } from "@ckb-lumos/lumos";
import { TransactionSkeleton, TransactionSkeletonType } from "@ckb-lumos/helpers";
import { common } from "@ckb-lumos/common-scripts";
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
import * as NrcSdk from "@rather-labs/nrc-721-sdk";
import { Logger } from "../../utils/logger";
import { ConnectionService, Environments } from "../connection.service";
import { FeeRate, ScriptType, TransactionService } from "../transaction.service";
import { NftScript, NftSdk } from "./nft.types";

export interface Nft {
    tokenId: string;
    tokenUri: string;
    nftName: string;
    nftSymbol?: string;
    data?: any;
    nftExtraData?: string;
    issued?: number;
    total?: number;
    script: NftScript;
    rawData: string;
}

export interface MNft {
    name: string;
    description: string;
    renderer: string;
    version: number;
    configure: number;
    issued: number;
    total: number;
}

export const sleep = (ms: number) => new Promise((resolve) => setTimeout(resolve, ms));

export enum NftTypes {
    nrc721 = "nrc721",
    mNft = "mNft",
}

export interface NftConfigType {
    txHash: string;
    index: string;
    depType: DepType;
    codeHash?: string;
    classCodeHash?: string;
}

const nftConfig: { [key in Environments]: { [key in NftTypes]: NftConfigType } } = {
    [Environments.Mainnet]: {
        [NftTypes.nrc721]: {
            txHash: "0xb85f64679b43e6742ff2b874621d1d75c9680961c94de8187364474d637eddab",
            index: "0x0",
            depType: "code",
        },
        [NftTypes.mNft]: {
            txHash: "0x5dce8acab1750d4790059f22284870216db086cb32ba118ee5e08b97dc21d471",
            index: "0x2",
            depType: "code",
            codeHash: "0x2b24f0d644ccbdd77bbf86b27c8cca02efa0ad051e447c212636d9ee7acaaec9",
            classCodeHash: "0xd51e6eaf48124c601f41abe173f1da550b4cbca9c6a166781906a287abbb3d9a",
        },
    },
    [Environments.Testnet]: {
        [NftTypes.nrc721]: {
            txHash: "0xb22f046e3bc62ca3741e732cff136f5bb34038eb0437f21dded1556a8cc87cec",
            index: "0x0",
            depType: "code",
        },
        [NftTypes.mNft]: {
            txHash: "0xf11ccb6079c1a4b3d86abe2c574c5db8d2fd3505fdc1d5970b69b31864a4bd1c",
            index: "0x2",
            depType: "code",
            codeHash: "0xb1837b5ad01a88558731953062d1f5cb547adf89ece01e8934a9f0aeed2d959f",
            classCodeHash: "0x095b8c0b4e51a45f953acd1fcd1e39489f2675b4bc94e7af27bb38958790e3fc",
        },
    },
};

export class NftService {
    private readonly connection: ConnectionService;
    private transactionService?: TransactionService;
    private readonly logger = new Logger(NftService.name);
    private nftSdk: NftSdk = null!;
    private initializing = false;
    private readonly nftCellSize = BigInt(142 * 10 ** 8);

    constructor(connectionService: ConnectionService) {
        this.connection = connectionService;
    }

    private static mNftFormat(dataHex: string): MNft {
        const data = dataHex.slice(2);
        const version = parseInt(data.slice(0, 1), 16);
        const total = parseInt(data.slice(1, 10), 16);
        const issued = parseInt(data.slice(10, 18), 16);
        const configure = parseInt(data.slice(18, 20), 16);
        const nameSize = parseInt(data.slice(20, 24), 16);
        const nameEnd = 24 + nameSize * 2;
        const name = decodeURIComponent(data.slice(24, nameEnd).replace(/[0-9a-f]{2}/g, "%$&"));
        const descriptionSizeEnd = nameEnd + 4;
        const descriptionSize = parseInt(data.slice(nameEnd, descriptionSizeEnd), 16);
        const descriptionEnd = descriptionSizeEnd + descriptionSize * 2;
        const description = decodeURIComponent(data.slice(descriptionSizeEnd, descriptionEnd).replace(/[0-9a-f]{2}/g, "%$&"));
        const rendererSizeEnd = descriptionEnd + 4;
        const rendererSize = parseInt(data.slice(descriptionEnd, rendererSizeEnd), 16);
        const rendererEnd = rendererSizeEnd + rendererSize * 2;
        const renderer = decodeURIComponent(data.slice(rendererSizeEnd, rendererEnd).replace(/[0-9a-f]{2}/g, "%$&"));

        return {
            name: name,
            description: description,
            renderer: renderer,
            version: version,
            configure: configure,
            issued: issued,
            total: total,
        };
    }

    private getMNftConfig(): NftConfigType {
        return nftConfig[this.connection.getEnvironment()].mNft;
    }

    private getNrc721Config(): NftConfigType {
        return nftConfig[this.connection.getEnvironment()].nrc721;
    }

    private addCellDepFromNftConfig(txSkeleton: TransactionSkeletonType, nftCfg: NftConfigType): TransactionSkeletonType {
        return txSkeleton.update("cellDeps", (cellDeps) => {
            return cellDeps.push({
                out_point: {
                    tx_hash: nftCfg.txHash,
                    index: nftCfg.index,
                },
                dep_type: nftCfg.depType,
            });
        });
    }

    setTransactionService(transactionService: TransactionService) {
        this.transactionService = transactionService;
    }

    async initialize() {
        if (!this.nftSdk && !this.initializing) {
            this.initializing = true;
            this.nftSdk = await NrcSdk.initialize({
                nodeUrl: this.connection.getCKBUrl(),
                indexerUrl: this.connection.getIndexerUrl(),
            });
        } else if (!this.nftSdk) {
            while (!this.nftSdk) {
                await sleep(100);
            }
        }
    }

    async isScriptNftScript(scriptType: ScriptType): Promise<boolean> {
        await this.initialize();

        let isNftCell: boolean;
        try {
            isNftCell = await this.nftSdk!.nftCell.isCellNRC721(scriptType);
        } catch (error) {
            isNftCell = false;
        }

        if (!isNftCell) {
            const mNftCfg = this.getMNftConfig();
            isNftCell = scriptType.codeHash === mNftCfg.codeHash;
        }

        return isNftCell;
    }

    private cellToNftScript(cell: Cell): NftScript | null {
        if (!cell.cell_output.type) {
            return null;
        }

        return {
            codeHash: cell.cell_output.type.code_hash,
            args: cell.cell_output.type.args,
            hashType: cell.cell_output.type.hash_type,
        };
    }

    private async getNftFromCell(cell: Cell): Promise<Nft | null> {
        const cellTypeScript = this.cellToNftScript(cell);
        if (!cellTypeScript) {
            return null;
        }

        let isNftCell: boolean;
        try {
            isNftCell = await this.nftSdk!.nftCell.isCellNRC721(cellTypeScript!);
        } catch (error) {
            isNftCell = false;
        }

        if (isNftCell) {
            const nft = await this.nftSdk!.nftCell.read(cellTypeScript);

            return {
                tokenId: nft.tokenId,
                tokenUri: nft.tokenUri,
                data: JSON.parse(nft.data),
                nftName: nft.factoryData.name,
                nftSymbol: nft.factoryData.symbol,
                nftExtraData: nft.factoryData.extraData,
                script: cellTypeScript,
                rawData: cell.data,
            };
        }

        const mNftCfg = this.getMNftConfig();
        if (cellTypeScript.codeHash === mNftCfg.codeHash) {
            const cellProvider = this.connection.getCellProvider({
                type: {
                    code_hash: mNftCfg.classCodeHash!,
                    args: cellTypeScript.args.slice(0, -8),
                    hash_type: "type",
                },
            });

            const cells: Cell[] = [];
            const cellCollector = cellProvider.collector({});
            for await (const cell of cellCollector.collect()) {
                cells.push(cell);
            }

            if (cells.length === 1) {
                const mNft = NftService.mNftFormat(cells[0].data);

                return {
                    nftName: mNft.name,
                    tokenId: parseInt(cellTypeScript.args.slice(-8), 16).toString(),
                    tokenUri: mNft.renderer,
                    issued: mNft.issued,
                    total: mNft.total,
                    data: {
                        description: mNft.description,
                        version: mNft.version,
                        configure: mNft.configure,
                        type: "m-NFT",
                    },
                    script: cellTypeScript,
                    rawData: cell.data,
                };
            }
        }

        return null;
    }

    async transferFromCells(
        cells: Cell[],
        fromAddresses: string[],
        to: string,
        nft: Nft,
        privateKeys: string[],
        feeRate: FeeRate = FeeRate.NORMAL,
    ): Promise<string> {
        if (!this.transactionService) {
            throw new Error("No transaction service");
        }
        let txSkeleton = TransactionSkeleton({ cellProvider: this.connection.getCellProvider() });

        // Inject token capacity
        txSkeleton = this.transactionService.addSecp256CellDep(txSkeleton);
        if (nft.script.codeHash === this.getMNftConfig().codeHash) {
            // Add mnft code deps
            txSkeleton = this.addCellDepFromNftConfig(txSkeleton, this.getMNftConfig());
        } else {
            // Add nrc-721 code deps
            txSkeleton = this.addCellDepFromNftConfig(txSkeleton, this.getNrc721Config());
        }
        txSkeleton = this.transactionService.injectNftCapacity(txSkeleton, nft, cells, to);

        // Pay fee
        txSkeleton = await common.payFeeByFeeRate(txSkeleton, fromAddresses, feeRate, undefined, this.connection.getConfigAsObject());

        // Get signing private keys
        const signingPrivKeys = this.transactionService.extractPrivateKeys(txSkeleton, fromAddresses, privateKeys);

        return this.transactionService.signTransaction(txSkeleton, signingPrivKeys);
    }

    async getBalance(address: string): Promise<Nft[]> {
        await this.initialize();

        const collector = this.connection.getIndexer().collector({
            lock: this.connection.getLockFromAddress(address),
        });

        const nfts: Nft[] = [];
        for await (const cell of collector.collect()) {
            const nft = await this.getNftFromCell(cell);
            if (nft) {
                nfts.push(nft);
            }
        }

        return nfts;
    }

    async getBalanceFromCells(cells: Cell[]): Promise<Nft[]> {
        await this.initialize();

        const nfts: Nft[] = [];
        for await (const cell of cells) {
            const nft = await this.getNftFromCell(cell);
            if (nft) {
                nfts.push(nft);
            }
        }

        return nfts;
    }
}
