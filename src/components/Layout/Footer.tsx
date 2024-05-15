interface FooterItem {
  name: string;
  url: string;
}

export const Footer = () => {
  const PROJECT_LINKS: FooterItem[] = [
    {
      name: 'GitHub',
      url: 'https://github.com/devicons/devicon/',
    },
    {
      name: 'Devicon.dev',
      url: 'https://devicon.dev/',
    },
  ];

  return (
    <section className="flex flex-col md:flex-row gap-16 px-8 md:px-16 2xl:px-32 py-16 bg-dark-900 text-white border-t border-dark-500">
      <div className="flex-1 flex flex-col gap-4">
        <div className="flex flex-row gap-2 text-3xl text-white">
          <p className="font-thin">DEVICON</p>
          <p className="font-bold">UI</p>
        </div>
        <p className="text-sm w-3/5">
          All product names, logos, and brands are property of their respective
          owners. All company, product and service names used in this website
          are for identification purposes only.
        </p>
        <div className="flex flex-row gap-2">
          <div className="w-4 h-4 bg-primary-600" />
          <div className="w-4 h-4 bg-purple-500" />
          <div className="w-4 h-4 bg-teal-600" />
          <div className="w-4 h-4 bg-yellow-500" />
          <div className="w-4 h-4 bg-red-500" />
        </div>
      </div>

      <div className="flex-1 flex flex-col gap-4">
        <p className="text-lg font-extrabold">Links</p>
        {PROJECT_LINKS.map((link) => (
          <a
            key={link.name}
            href={link.url}
            target="_blank"
            className="hover:text-primary-600 text-sm w-fit"
          >
            {link.name}
          </a>
        ))}
      </div>
    </section>
  );
};
