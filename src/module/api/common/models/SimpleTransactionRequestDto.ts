/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */

import type { SimpleSignInRequestDto } from './SimpleSignInRequestDto';
import type { TransactionDto } from './TransactionDto';

export type SimpleTransactionRequestDto = {
    id: number;
    transactionToken: string;
    status: 'pending' | 'signed' | 'expired' | 'declined';
    transaction: TransactionDto;
    createdAt: string;
    expiresAt: string;
    signInRequest: SimpleSignInRequestDto;
};

