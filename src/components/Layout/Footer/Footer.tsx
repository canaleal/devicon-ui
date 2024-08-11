import ContactLogos from "../../Elements/Widgets/Logo/ContactLogos";
import Logo from "../../Elements/Widgets/Logo/Logo";
import './styles/footer.css';

const Footer = () => {
    const footerLinks = [
        {
            title: "Product",
            links: [
                { name: "Read Me", url: "https://github.com/devicons/devicon/?tab=readme-ov-file#readme" },
                { name: "Github License", url: "https://github.com/devicons/devicon/?tab=MIT-1-ov-file#readme" },
                { name: "Releases", url: "https://github.com/devicons/devicon/releases" },
            ],
        },
        {
            title: "Community",
            links: [
                { name: "Discord", url: "https://discord.com/invite/hScy8KWACQ" },
            ],
        },
    ];

    return (
        <footer className='footer'>
            <div className="footer-content">
                <div className='footer-grid'>
                    <div className="footer-logo-section">
                        <Logo />
                    </div>
                    {footerLinks.map((section, index) => (
                        <div key={index} className="footer-links">
                            <p>{section.title}</p>
                            {section.links.map((link, linkIndex) => (
                                <a
                                    key={linkIndex}
                                    href={link.url}
                                    target="_blank"
                                    rel="noreferrer"
                                >
                                    {link.name}
                                </a>
                            ))}
                        </div>
                    ))}
                </div>

                <div className="footer-bottom">
                    <p>© 2024 Devicon. All rights reserved.</p>
                    <ContactLogos />
                </div>
            </div>
        </footer>
    );
};

export default Footer;
