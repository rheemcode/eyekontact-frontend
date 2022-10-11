import logo from '../../icons/eyekontact-icon.png';
import NavBar from "../../Components/NavBar";

const Header = () => {
    const menus =
        [
            { url: "home", title: "HOME", subLink: [] },
            { url: "services", title: "SERVICES", subLink: [] },
            { url: "about", title: "ABOUT", subLink: [] },
            { url: "blog", title: "BLOG", subLink: [] },
            { url: "contact", title: "CONTACT", subLink: [] },
        ]
    return (
        <header>
            <NavBar icon={logo} links={menus} />
        </header>
    )
}


export default Header;