import { Config } from "svgo";

export const SVGOConfig: Config = {
    multipass: true,
    floatPrecision: 4,
    plugins: [
        "convertStyleToAttrs",
        "cleanupIds",
        "removeRasterImages",
        "removeDimensions",
        "removeStyleElement",
        "removeScriptElement",
        "removeOffCanvasPaths",
        {
            name: 'preset-default',
        },
    ],
};

export default SVGOConfig;