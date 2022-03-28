import { SvgIcon, SvgIconProps } from "react-native-components";
import { Path } from "react-native-svg";

export function ErrorIcon(props: Omit<SvgIconProps, "children">): JSX.Element {
    return (
        <SvgIcon
            // @ts-ignore
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            {...props}
            {...{ testID: "ErrorIcon" }}
        >
            <Path d="M12 14C11.7348 14 11.4804 13.8946 11.2929 13.7071C11.1054 13.5196 11 13.2652 11 13V7C11 6.73478 11.1054 6.48043 11.2929 6.29289C11.4804 6.10536 11.7348 6 12 6C12.2652 6 12.5196 6.10536 12.7071 6.29289C12.8946 6.48043 13 6.73478 13 7V13C13 13.2652 12.8946 13.5196 12.7071 13.7071C12.5196 13.8946 12.2652 14 12 14V14Z" />
            <Path d="M11.9991 15.5C11.8021 15.5 11.607 15.5388 11.425 15.6142C11.2431 15.6896 11.0777 15.8001 10.9384 15.9393C10.7991 16.0786 10.6886 16.244 10.6133 16.426C10.5379 16.608 10.4991 16.803 10.4991 17C10.4991 17.197 10.5379 17.392 10.6133 17.574C10.6886 17.756 10.7991 17.9214 10.9384 18.0607C11.0777 18.1999 11.2431 18.3104 11.425 18.3858C11.607 18.4612 11.8021 18.5 11.9991 18.5C12.3964 18.5 12.7774 18.3422 13.0583 18.0612C13.3392 17.7803 13.4971 17.3993 13.4971 17.002C13.4971 16.6047 13.3392 16.2237 13.0583 15.9428C12.7774 15.6618 12.3964 15.504 11.9991 15.504V15.5Z" />
            <Path d="M24 12C24 13.5759 23.6896 15.1363 23.0866 16.5922C22.4835 18.0481 21.5996 19.371 20.4853 20.4853C19.371 21.5996 18.0481 22.4835 16.5922 23.0866C15.1363 23.6896 13.5759 24 12 24C10.4241 24 8.86371 23.6896 7.4078 23.0866C5.95189 22.4835 4.62902 21.5996 3.51472 20.4853C2.40042 19.371 1.5165 18.0481 0.913446 16.5922C0.31039 15.1363 -2.34822e-08 13.5759 0 12C4.74244e-08 8.8174 1.26428 5.76516 3.51472 3.51472C5.76516 1.26428 8.8174 0 12 0C15.1826 0 18.2348 1.26428 20.4853 3.51472C22.7357 5.76516 24 8.8174 24 12V12ZM12 22C14.6522 22 17.1957 20.9464 19.0711 19.0711C20.9464 17.1957 22 14.6522 22 12C22 9.34784 20.9464 6.8043 19.0711 4.92893C17.1957 3.05357 14.6522 2 12 2C9.34784 2 6.8043 3.05357 4.92893 4.92893C3.05357 6.8043 2 9.34784 2 12C2 14.6522 3.05357 17.1957 4.92893 19.0711C6.8043 20.9464 9.34784 22 12 22V22Z" />
        </SvgIcon>
    );
}
