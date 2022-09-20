import Svg, { Path, Defs, LinearGradient, Stop, SvgProps } from "react-native-svg";
import { LinearBgLogoProps } from "./LinearBgLogo.types";

const LinearBgLogo = ({ startColor, endColor, ...rest }: LinearBgLogoProps) => (
    <Svg width={84} height={28} fill="none" accessibilityRole="image" testID="LinearBgLogo" {...rest}>
        <Path
            fillRule="evenodd"
            clipRule="evenodd"
            d="m15.306 11.177 4.273-6.306a2.172 2.172 0 0 1 1.855-1.032 2.187 2.187 0 0 1 1.548.63 2.164 2.164 0 0 1 .642 1.535v15.99a2.155 2.155 0 0 1-.637 1.53 2.176 2.176 0 0 1-1.54.635h-.454a2.187 2.187 0 0 1-1.664-.768L6.616 8.262a.17.17 0 0 0-.3.109v11.344a.167.167 0 0 0 .194.168.169.169 0 0 0 .087-.041l4.205-3.613a.455.455 0 0 1 .77.275.45.45 0 0 1-.089.319L7.21 23.129a2.173 2.173 0 0 1-1.854 1.032 2.183 2.183 0 0 1-1.54-.634 2.16 2.16 0 0 1-.638-1.531V6.004c0-.574.23-1.125.638-1.531a2.183 2.183 0 0 1 1.54-.634h.442a2.187 2.187 0 0 1 1.662.781l12.714 15.129a.17.17 0 0 0 .3-.108V8.285a.167.167 0 0 0-.282-.127l-4.205 3.613a.455.455 0 0 1-.77-.275.45.45 0 0 1 .09-.319Zm43.494 8.92h-1.734a.17.17 0 0 1-.16-.226l4.596-11.805a.258.258 0 0 1 .25-.163h2.172a.26.26 0 0 1 .238.163l4.582 11.805a.17.17 0 0 1-.16.226H66.85a.173.173 0 0 1-.16-.109l-3.704-9.71a.17.17 0 0 0-.16-.11.17.17 0 0 0-.16.11l-3.703 9.71a.17.17 0 0 1-.163.109ZM42.048 8.073v11.854a.171.171 0 0 1-.17.17h-1.24a1.707 1.707 0 0 1-1.43-.775l-5.626-8.648.193 4.32v4.933a.171.171 0 0 1-.17.17h-1.64a.173.173 0 0 1-.17-.17V8.073a.171.171 0 0 1 .17-.17h1.233a1.715 1.715 0 0 1 1.43.772l5.626 8.635-.175-4.304V8.073a.17.17 0 0 1 .17-.17h1.64a.173.173 0 0 1 .159.17Zm35.291 7.372 3.446 4.378a.169.169 0 0 1-.125.274h-1.244a1.714 1.714 0 0 1-1.362-.664l-2.99-3.882h-1.89v4.392a.171.171 0 0 1-.171.17h-1.64a.17.17 0 0 1-.17-.17v-5.87a.254.254 0 0 1 .255-.256h4.606c1.628 0 2.382-.849 2.382-2.032s-.772-2.003-2.382-2.003h-3.226a1.642 1.642 0 0 1-1.51-1.004 1.619 1.619 0 0 1-.125-.622.252.252 0 0 1 .255-.253h4.806c2.663 0 4.168 1.567 4.168 3.868 0 2.003-1.137 3.308-3.083 3.674ZM53.617 7.903h-7.605a.228.228 0 0 0-.227.226c0 .439.175.86.487 1.17.312.31.735.485 1.177.485h6.168a.169.169 0 0 0 .158-.104.167.167 0 0 0 .012-.065V8.073a.169.169 0 0 0-.17-.17Zm0 10.313h-5.676a.173.173 0 0 1-.17-.17V14.99a.17.17 0 0 1 .17-.17h5.247a.17.17 0 0 0 .17-.169v-1.553a.169.169 0 0 0-.17-.17h-7.15a.257.257 0 0 0-.253.255v6.653a.252.252 0 0 0 .254.253h7.578a.17.17 0 0 0 .17-.17v-1.542a.166.166 0 0 0-.17-.16Z"
            fill="url(#near_logo_svg__paint_linear)"
        />
        <Defs>
            <LinearGradient id="near_logo_svg__paint_linear" x1={3.178} y1={14} x2={80.821} y2={14} gradientUnits="userSpaceOnUse">
                <Stop stopColor={startColor} />
                <Stop offset={1} stopColor={endColor} />
            </LinearGradient>
        </Defs>
    </Svg>
);

export default LinearBgLogo;
