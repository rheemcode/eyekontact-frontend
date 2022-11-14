import logo from '../../icons/eyekontact-icon.png';
import NavBar from "../../Components/NavBar";

const Header = () => {
    const menus =
        [
            { url: "home", title: "HOME", subLink: [] },
            {
                url: "", title: "OUR PLATFORM", subLink:
                    [
                        { url: "products/iconic-structure", title: "ICONIC STRUCTURE" },
                        { url: "products/billboards", title: "BILLBOARDS" },
                        { url: "products/lamp-poles", title: "LAMP POLES" },
                        { url: "products/branding", title: "BRANDING" },
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