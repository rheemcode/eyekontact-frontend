import logo from '../../icons/eyekontact-icon.png';
import NavBar from "../../Components/NavBar";

const Header = () => {
    const menus =
        [
            { url: "home", title: "HOME", subLink: [] },
            {
                url: "", title: "PLATFORMS", subLink:
                    [
                        { url: "products/digital-billboard", title: "BILLBOARD" },
                        { url: "checkout", title: "GANTRIES" },
                        { url: "products/drape", title: "WALL DRAPES" },
                        { url: "products/branding", title: "BRANDING" },
                        { url: "products/unipole", title: "UNIPOLE" },
                        { url: "checkout", title: "ROOFTOPS" },
                        { url: "checkout", title: "BACKLIT" },
                        { url: "checkout", title: "PORTRAIT" },
                        { url: "checkout", title: "WALL PANELS" },
                        { url: "checkout", title: "EYE CATCHERS" },
                        { url: "checkout", title: "LAMPPOSTS" },
                        { url: "checkout", title: "SINGLE FACE" },
                        { url: "checkout", title: "DOUBLE FACE (Static & Digital)" },
                        { url: "checkout", title: "BUS BRANDING" },
                        { url: "checkout", title: "TRANSIT (Static & Digital)" },
                        { url: "products/branding", title: "BUS SHELTERS" },
                        { url: "checkout", title: "WALL MURAL" },
                        { url: "checkout", title: "HOUSE BRANDING" },

                    ]
            },
            { url: "services", title: "OUR SERVICES", subLink: [] },
            { url: "about", title: "ABOUT US", subLink: [] },
            { url: "blog", title: "BLOG", subLink: [] },
            { url: "contact", title: "CONTACT US", subLink: [] },
        ]
    return (
        <header>
            <NavBar icon={logo} links={menus} />
        </header>
    )
}


export default Header;