interface FooterLink {
  name: string
  url: string
}

export interface FooterSection {
  title: string
  links: FooterLink[]
}

export const FOOTER_LINKS: FooterSection[] = [
  {
    title: 'Product',
    links: [
      { name: 'Read Me', url: 'https://github.com/devicons/devicon/?tab=readme-ov-file#readme' },
      { name: 'Github License', url: 'https://github.com/devicons/devicon/?tab=MIT-1-ov-file#readme' },
      { name: 'Releases', url: 'https://github.com/devicons/devicon/releases' }
    ]
  },
  {
    title: 'Community',
    links: [{ name: 'Discord', url: 'https://discord.com/invite/hScy8KWACQ' }]
  }
]
