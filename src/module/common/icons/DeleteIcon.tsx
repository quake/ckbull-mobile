import { SvgIcon, SvgIconProps } from "react-native-components";
import { Path } from "react-native-svg";

export function DeleteIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "DeleteIcon" }}
        >
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M20 3H4V22H20V3ZM4 1C2.89543 1 2 1.89543 2 3V22C2 23.1046 2.89543 24 4 24H20C21.1046 24 22 23.1046 22 22V3C22 1.89543 21.1046 1 20 1H4Z"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M0 2C0 1.44772 0.447715 1 1 1H23C23.5523 1 24 1.44772 24 2C24 2.55228 23.5523 3 23 3H1C0.447715 3 0 2.55228 0 2Z"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M9 5C9.55228 5 10 5.44772 10 6L10 19C10 19.5523 9.55228 20 9 20C8.44771 20 8 19.5523 8 19L8 6C8 5.44772 8.44772 5 9 5Z"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M15 5C15.5523 5 16 5.44772 16 6L16 19C16 19.5523 15.5523 20 15 20C14.4477 20 14 19.5523 14 19L14 6C14 5.44772 14.4477 5 15 5Z"
            />
            <Path
                fillRule="evenodd"
                clipRule="evenodd"
                d="M8 1.5C8 0.671573 8.67157 0 9.5 0H14.5C15.3284 0 16 0.671573 16 1.5C16 2.32843 15.3284 3 14.5 3H9.5C8.67157 3 8 2.32843 8 1.5Z"
            />
        </SvgIcon>
    );
}