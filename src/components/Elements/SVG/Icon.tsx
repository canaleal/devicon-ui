
import Icons from "./Icons.svg";

interface SVGIconProps {
    name: string;
    color?: string;
    size?: number;
}

const SVGIcon = ({ name, color = "#000", size = 12.5 }: SVGIconProps) => {
    return (
        <svg className={`icon icon-${name}`} fill={color} width={size} height={size}>
            <use xlinkHref={`${Icons}#icon-${name}`} />
        </svg>
    );
};

export default SVGIcon;