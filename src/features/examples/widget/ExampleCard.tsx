

import { IDeviconExample } from '../types/exampleTypes'

interface ExampleCardProps {
    deviconExample: IDeviconExample
}

const ExampleCard = ({ deviconExample }: ExampleCardProps) => {
    return (
        <div className='border dark:border-zinc-600 dark:text-white  bg-white dark:bg-zinc-900 rounded-lg w-full p-8'>
            <p className='text-subtitle'>{deviconExample.name}</p>

            <p>{deviconExample.tags.join(", ")}</p>

            <div className='flex flex-row gap-4 mt-4'>
                {
                    deviconExample.icons.map((icon) => (
                        <img key={icon.name} width={30} height={'auto'} src={icon.src} alt={icon.name} title={icon.name} />
                    ))
                }

            </div>
        </div>
    )
}

export default ExampleCard