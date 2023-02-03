import { SvgIcon, SvgIconProps } from "@peersyst/react-native-components";
import { Path } from "react-native-svg";

export function CopyIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "CopyIcon" }}
        >
            <Path d="M18.5 2L9.5 2C8.4 2 7.5 2.9 7.5 4L7.5 16C7.5 17.1 8.4 18 9.5 18L18.5 18C19.6 18 20.5 17.1 20.5 16L20.5 4C20.5 2.9 19.6 2 18.5 2ZM18.5 16H9.5L9.5 4L18.5 4V16ZM3.5 15L3.5 13H5.5V15H3.5ZM3.5 9.5H5.5V11.5H3.5L3.5 9.5ZM10.5 20H12.5V22H10.5V20ZM3.5 18.5L3.5 16.5H5.5V18.5H3.5ZM5.5 22C4.4 22 3.5 21.1 3.5 20H5.5L5.5 22ZM9 22H7L7 20H9V22ZM14 22V20H16C16 21.1 15.1 22 14 22ZM5.5 6L5.5 8H3.5C3.5 6.9 4.4 6 5.5 6Z" />
        </SvgIcon>
    );
}
