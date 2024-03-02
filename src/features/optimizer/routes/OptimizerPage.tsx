import { useState } from "react";
import { optimize } from 'svgo';
import SVGOConfig from "../optimizer/config/config";
import { Tooltip } from "../../../components/Elements/Tooltip";
import { copyToClipboard } from "../../../helpers/copyToClipboard";
import { isValidSVG } from "../optimizer/helpers/svgValidator";


export const OptimizerPage = () => {

    const [inputSVG, setInputSVG] = useState<string | null>(null);
    const [outputSVG, setOutputSVG] = useState<string | null>(null);

    const optimizeSVG = () => {
        const input = inputSVG;
        if (!input) {
            return;
        }

        const isSVG = isValidSVG(inputSVG);
        if (!isSVG) {
            return;
        }

        try {
            const output = optimize(input, SVGOConfig);
            setOutputSVG(output.data);
        } catch (error) {
            console.error(error);
        }
    }


    return (
        <>


            <section className="bg-smoke dark:bg-zinc-900 flex flex-col xl:flex-row px-16 2xl:px-32 py-16 gap-6 w-full">

                <div className="relative flex flex-col w-full gap-4">
                    <p className="text-lg font-bold">Input SVG</p>
                    <textarea className="border rounded-lg h-[36rem] max-h-[36rem] resize-none w-full p-4" value={inputSVG ?? ""} onChange={(e) => setInputSVG(e.target.value)} />
                    <Tooltip content='Optimize SVG' position='bottom' flashMessage="Optimizing">
                        <button className=" bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-md" onClick={() => optimizeSVG()}>Optimize SVG</button>
                    </Tooltip>
                </div>

                <div className="flex flex-col gap-4 text-center justify-center w-fit">
                    <i className="fa-solid fa-arrow-right text-3xl text-indigo-600"></i>
                </div>


                <div className="flex flex-col w-full gap-4">

                    <p className="text-lg font-bold">Output SVG</p>
                    <textarea disabled className="border rounded-lg h-[36rem] max-h-[36rem] resize-none w-full p-4" value={outputSVG ?? ""} />

                    {outputSVG &&
                        <Tooltip content='Copy Code' position='bottom' flashMessage="Copied!">
                            <button className=" bg-indigo-600 hover:bg-indigo-800 text-white font-bold py-2 px-4 rounded-md" onClick={() => copyToClipboard(outputSVG ?? "")}>Copy Code</button>
                        </Tooltip>
                    }
                </div>



            </section>

        </>
    )
}

export default OptimizerPage;