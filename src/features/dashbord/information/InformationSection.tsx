import InfiniteScroll, { IScrollItem } from "../../../components/Elements/Widgets/InfiniteScroll/InfiniteScroll"


const icons: IScrollItem[] = [
    { name: 'react', link: 'colored devicon-react-original' },
    { name: 'angular', link: 'colored devicon-angularjs-plain' },
    { name: 'vue', link: 'colored devicon-vuejs-plain' },
    { name: 'svelte', link: 'colored devicon-svelte-plain' },
    { name: 'node', link: 'colored devicon-nodejs-plain' },
    { name: 'express', link: 'colored devicon-express-original' },
    { name: 'nest', link: 'colored devicon-nestjs-plain' },
    { name: 'gatsby', link: 'colored devicon-gatsby-plain' },
    { name: 'html', link: 'colored devicon-html5-plain' },
    { name: 'css', link: 'colored devicon-css3-plain' },
    { name: 'js', link: 'colored devicon-javascript-plain' },
    { name: 'ts', link: 'colored devicon-typescript-plain' },
    { name: 'python', link: 'colored devicon-python-plain' },
    { name: 'java', link: 'colored devicon-java-plain' },
    { name: 'ruby', link: 'colored devicon-ruby-plain' },
    { name: 'php', link: 'colored devicon-php-plain' },
    { name: 'go', link: 'colored devicon-go-plain' },
    { name: 'csharp', link: 'colored devicon-csharp-plain' },
    { name: 'swift', link: 'colored devicon-swift-plain' },
    { name: 'flutter', link: 'colored devicon-flutter-plain' },
    { name: 'dart', link: 'colored devicon-dart-plain' },
    { name: 'rust', link: 'colored devicon-rust-plain' },
    { name: 'elixir', link: 'colored devicon-elixir-plain' },
    { name: 'haskell', link: 'colored devicon-haskell-plain' },
    { name: 'scala', link: 'colored devicon-scala-plain' },
    { name: 'kotlin', link: 'colored devicon-kotlin-plain' },
    { name: 'docker', link: 'colored devicon-docker-plain' },
    { name: 'kubernetes', link: 'colored devicon-kubernetes-plain' },
]

const InformationSection = () => {
    return (
        <section className="relative bg-dark-900 overflow-hidden">
            <div className="absolute inset-x-0 top-0 overflow-hidden sm:pl-[50%]">
                <img
                    alt=""
                    loading="lazy"
                    width="1748"
                    height="1982"
                    decoding="async"
                    className="ml-[calc(0/16*1rem)] mt-[calc(-92/16*1rem)] w-[calc(874/16*1rem)] max-w-none [mask:radial-gradient(26.5625rem_24.375rem_at_30%_calc(92/16*1rem),rgba(255,255,255,0.5),transparent)] sm:ml-[calc(-340/16*1rem)] md:ml-[calc(-400/16*1rem)] lg:ml-[calc(-500/16*1rem)] xl:ml-[calc(-564/16*1rem)]"
                    style={{ color: 'transparent' }}
                    src="https://clerk.com/_next/static/media/circuit-bento@2xq95.f5921e69.webp"
                />
            </div>

            <div className="pointer-events-none absolute inset-x-0 top-[calc(-673/16*1rem)] z-10 overflow-hidden mix-blend-overlay">
                <picture>
                    <source srcSet="https://clerk.com/_next/static/media/glow-bento@q30r.63c1a605.avif" type="image/avif" />
                    <source srcSet="/_next/static/media/glow-bento@tiny.1b8af9d0.png" type="image/png" />
                    <img
                        alt=""
                        loading="lazy"
                        width="2640"
                        height="2640"
                        decoding="async"
                        data-nimg="1"
                        className="ml-[calc(50%-(981/16*1rem))] w-[calc(2640/16*1rem)] max-w-none"
                        style={{ color: 'transparent' }}
                        src="https://clerk.com/_next/static/media/glow-bento@q30r.63c1a605.avif"
                    />
                </picture>
            </div>
            <div className="flex flex-col gap-6 mx-auto w-full py-32 px-6 sm:max-w-[40rem] md:max-w-[48rem] md:px-8 lg:max-w-[64rem] xl:max-w-[90rem]">
                <div className='flex flex-col gap-4 justify-center items-center text-center mb-12'>
                    <h1 className="text-3xl font-semibold text-white">Developer Icons, simplified</h1>
                    <p className="text-gray-400 max-w-2xl items-center ">Devicon is a comprehensive collection of icons representing development languages and tools. Each icon is available in multiple formats, including font and SVG, and offers various styles such as original, plain, line, colored, and non-colored versions, with or without wordmarks.</p>
                </div>
                <InfiniteScroll items={icons} rows={1} itemType="icon" />
            </div>
        </section>
    )
}

export default InformationSection