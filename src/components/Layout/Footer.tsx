
interface FooterItem {
    name: string;
    url: string;
}

export const Footer = () => {

    const TOOLS: FooterItem[] = [
        {
            name: "SVG to JSX",
            url: "https://react-svgr.com/playground/"
        },
        {
            name: "SVG Resizer",
            url: "https://www.iloveimg.com/resize-image/resize-svg"
        },
        {
            name: "SVG Viewer",
            url: "https://www.svgviewer.dev/"
        },
        {
            name: "SVGOMG",
            url: "https://jakearchibald.github.io/svgomg/"
        }
    ]

    const PROJECT_LINKS: FooterItem[] = [
        {
            name: "GitHub",
            url: "https://github.com/devicons/devicon/",
        },
        {
            name: "Devicon.dev",
            url: "https://devicon.dev/",
        }
    ]

    const FOOTER_ELEMENT_STYLE = "hover:text-green-600 dark:text-smoke dark:hover:text-green-600  text-sm mb-2 w-fit"
    return (
        <section className='flex flex-row gap-16 px-16 2xl:px-32 py-16 bg-zinc-1000 text-white'>

            <div className='flex-1'>
                <p className="mb-4  text-5xl font-bold changing-gradient-text">Devicon</p>
                <p className="mt-4 text-sm w-4/5">All product names, logos, and brands are property of their respective owners. All company, product and service names used in this website are for identification purposes only.</p>

                <div className="flex flex-row gap-2 mt-8">
                    <div className="w-4 h-4 bg-green-600" />
                    <div className="w-4 h-4 bg-purple-500" />
                    <div className="w-4 h-4 bg-green-500" />
                    <div className="w-4 h-4 bg-yellow-500" />
                    <div className="w-4 h-4 bg-red-500" />
                </div>

            </div>

            <div className='flex-1 flex flex-col'>
                <p className="text-lg font-bold  mb-4">Tools</p>
                {
                    TOOLS.map((tool) => (
                        <a key={tool.name} href={tool.url} target="_blank" className={FOOTER_ELEMENT_STYLE}>{tool.name}</a>
                    ))
                }
            </div>

            <div className='flex-1 flex flex-col'>
                <p className="text-lg font-bold mb-4">Links</p>
                {
                    PROJECT_LINKS.map((link) => (
                        <a key={link.name} href={link.url} target="_blank" className={FOOTER_ELEMENT_STYLE}>{link.name}</a>
                    ))
                }
            </div>

        </section>
    )
}
