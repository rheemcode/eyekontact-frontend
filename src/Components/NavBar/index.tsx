import { Popover } from '@headlessui/react';
import { MenuIcon, ChevronDownIcon, UserIcon } from '@heroicons/react/outline'
import React, { HTMLAttributes, useEffect, useRef, useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { logoutUser } from '../../features/user/userSlice';
import { selectUserState, useAppDispatch, useAppSelector } from '../../hooks';
import AppLogo from '../AppLogo'
import "./style.css"

declare interface NavLinkDropdownProps {
    id: string;
    links: NavLinkProps[]
}

const NavLinkDropdown: React.FC<NavLinkDropdownProps> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);
    //TODO: code repetition
    const toggleDropdown = (e: React.MouseEvent<HTMLAnchorElement, MouseEvent>) => {
        ref.current.classList.remove("show");
        const navBarSm = document.querySelector(".nav-sm");
        if (navBarSm) {
            navBarSm.classList.remove("show");
        }
    }
    return (
        <div ref={ref} className='navlink-dropdown bg-white shadow absolute left-0 top-12'>
            <div className="rounded-lg">
                <div className="flex flex-col">
                    {
                        props.links.map((navlink, index) =>
                            <Link key={index} onClick={toggleDropdown} className="link pl-4 py-3 border-gray-light border-b text-black text-sm font-medium link" to={"/" + navlink.url.toLowerCase()}>{navlink.title}</Link>
                        )
                    }
                </div>
            </div>
        </div>
    );
};

declare interface NavLinkProps {
    url: string;
    title: string;
    mobile?: boolean;
    className?: string;
    subLink?: NavLinkProps[]
}

const NavLink: React.FC<NavLinkProps> = (props) => {
    let navigate = useNavigate();
    const ref: React.MutableRefObject<HTMLDivElement> = useRef(HTMLDivElement.prototype);
    const linkRef: React.MutableRefObject<HTMLAnchorElement> = useRef(HTMLAnchorElement.prototype);

    const toggleDropdown = (e: React.MouseEvent<HTMLElement, MouseEvent>) => {
        if (e.target != linkRef.current) {
            navigate(props.title.toLowerCase())
        }

        const elemRef = ref.current;
        const dropdownElem = elemRef.getElementsByClassName("navlink-dropdown")[0];

        if (dropdownElem) {
            e.preventDefault();
            dropdownElem.classList.toggle("show");
            return;
        }

        if (props.mobile) {
            const burger = document.querySelector(".hamburger-menu");
            const navBarSm = document.querySelector(".nav-sm");
            if (navBarSm) {
                navBarSm.classList.toggle("show");
            }

            if (burger) {
                burger.classList.remove("active");
            }
        }

    }

    return (
        <div className="navlink px-3 lg:p-1 relative" ref={ref}>
            <div onClick={props.mobile ? toggleDropdown : undefined}>
                <div className="flex">
                    <div className="navlink-container">
                        <Link ref={linkRef} onClick={props.mobile ? undefined : toggleDropdown} className="link text-white text-sm font-medium" to={"/" + props.url.toLowerCase()}>{props.title}</Link>
                    </div>
                    <div className="flex ml-2 text-white" style={{ width: "10px" }}>
                        {props.subLink?.length ?
                            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor" ><path strokeWidth="5" d="M19 9l-7 7-7-7" ></path></svg> : ""}
                    </div>
                </div>
            </div>
            {props.subLink?.length ? <NavLinkDropdown id={`${props.title}-dropdown`} links={props.subLink} /> : ""}
        </div>
    )
}

declare interface NavBarNavProps {
    links: NavLinkProps[];
    mobile: boolean;
}

const NavBarNav: React.FC<NavBarNavProps> = (props) => {
    const userState = useAppSelector(selectUserState);
    const dispatch = useAppDispatch();
    let navigate = useNavigate();


    const toggleNavbar = (e: React.MouseEvent<HTMLButtonElement, MouseEvent>) => {
        e.preventDefault();
        const nav = document.querySelector(".nav-sm");
        if (nav)
            nav.classList.toggle("show");
    }

    return (
        <div className="navbar-nav md:items-center main-menu flex z-20">
            {
                props.links.map((navlink, index) => <NavLink mobile={props.mobile} {...navlink} key={index} />)

            }
            {
                !userState.isLogin && props.mobile && <NavLink mobile={true} url="login" title="SIGN IN" className='text-red' />

            }
            {
                !userState.isLogin && props.mobile && <NavLink mobile={true} url="register" title="SIGN UP" className='text-red' />

            }
            {
                userState.isLogin && props.mobile && <div className='flex px-3 py-2'>
                    <UserIcon width={24} className="text-white" />
                    <span className="text-sm ml-4 font-bold text-red">  {userState.userData.firstname?.toUpperCase() + " " + userState.userData.lastname?.toUpperCase()}</span>
                </div>
            }
            {
                userState.isLogin && props.mobile && <div className='py-1 px-3 mt-3'>
                    <button className="w-full py-3 rounded bg-red text-white font-medium" onClick={(e) => { navigate("/", { replace: true }); dispatch(logoutUser()); toggleNavbar(e) }}>
                        Logout
                    </button>
                </div>
            }

        </div>
    )
}

interface NavBarProps {
    icon: string;
    links: NavLinkProps[];
}

const HamBurgerMenu: React.FC<HTMLAttributes<HTMLDivElement>> = (props) => {
    const ref = useRef(HTMLDivElement.prototype);

    const toggleHamburger = (event: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        ref.current.classList.toggle("active");
        if (props.onClick)
            props.onClick(event);
    }

    return (
        <div ref={ref} className={`hamburger-menu`} onClick={toggleHamburger}>
            <div className="line-1"></div>
            <div className="line-2"></div>
            <div className="line-3"></div>
        </div>
    );
}

const Profile = () => {

    const userState = useAppSelector(selectUserState);
    const dispatch = useAppDispatch();
    const [userLoginState, setUserLoginState] = useState({ isLogin: false });


    return (
        <Popover className="relative">
            <Popover.Button className="flex items-center">
                <UserIcon width={24} className="text-white" />
                <ChevronDownIcon className={`text-white ml-2 h-5 w-5 text-orange-300 group-hover:text-opacity-80 transition ease-in-out duration-150`} />
            </Popover.Button>

            <Popover.Panel className="absolute w-52 transform -translate-x-3/4 left-1/2 z-10 px-4 mt-3">
                <div className="overflow-hidden rounded-lg shadow-lg ring-1 ring-black ring-opacity-5">
                    <div className="relative flex flex-col bg-white p-3 ">
                        {userState.isLogin &&
                            <>
                                <div className='py-1'>
                                    <h3 className='text-xs font-bold text-red uppercase'>
                                        {userState.userData.firstname?.toUpperCase() + " " + userState.userData.lastname?.toUpperCase()}
                                    </h3>
                                </div>
                                <div className='py-1'>
                                    {userState.userData.role?.toLowerCase() != "user" ?
                                        <Link to="/dashboard/profile">
                                            <h3 className='text-xs font-bold hover:text-red uppercase'>
                                                Dashboard
                                            </h3>
                                        </Link>
                                        :
                                        <Link to="/profile">
                                            <h3 className='text-xs font-bold hover:text-red uppercase'>
                                                Profile
                                            </h3>
                                        </Link>
                                    }
                                </div>
                                <div className='py-1'>
                                    <button className="w-full py-1 rounded bg-red text-white font-medium" onClick={() => dispatch(logoutUser())}>
                                        Logout
                                    </button>
                                </div>
                            </>
                        }

                        {!userState.isLogin &&
                            <>
                                <Link to="/login" className='text-xs font-bold'>
                                    <div className="py-1">
                                        <span className='hover:text-red'>SIGN IN</span>
                                    </div>
                                </Link>

                                <Link to="/register" className='text-xs font-bold'>
                                    <div className="py-1">
                                        <span className='hover:text-red'>SIGN UP</span>
                                    </div>
                                </Link>
                            </>
                        }
                    </div>
                </div>
            </Popover.Panel>
        </Popover >
    )
}

const NavBar: React.FC<NavBarProps> = (props) => {
    const ref = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;
    const navbarMobileRef = useRef<HTMLDivElement>() as React.MutableRefObject<HTMLDivElement>;

    useEffect(() => {
        document.addEventListener("wheel", (event: WheelEvent) => {
            if (!ref.current) return;
            if (event.view)
                event.view?.scrollY > 2
                    ? ref.current.classList.add("navbar-custom") :
                    ref.current.classList.remove("navbar-custom");
        })
    }, []);

    const toggleNavbar = (e: React.MouseEvent<HTMLDivElement, MouseEvent>) => {
        e.preventDefault();
        if (navbarMobileRef.current)
            navbarMobileRef.current.classList.toggle("show");
    }

    return (
        <div ref={ref} className="w-screen mx-auto px-4 sm:px-6 navbar-container fixed z-20">
            <div className="navbar px-2 lg:px-4">
                <div className="flex justify-between items-center py-6">
                    <Link to="/">
                        <AppLogo icon={props.icon} />
                    </Link>
                    <div className="-mr-2 -my-2 md:hidden" onClick={toggleNavbar}>
                        <span className="sr-only">Open menu</span>
                        <HamBurgerMenu className="h-6 w-6 stroke-yellow" aria-hidden="true" />
                    </div>
                    <div className="hidden md:flex">
                        <NavBarNav mobile={false} links={props.links} />
                        <div className="user-profile">
                            <Profile />
                        </div>
                    </div>

                    <div ref={navbarMobileRef} className="nav-sm hidden shadow">
                        <NavBarNav mobile={true} links={props.links} />
                    </div>

                </div>
            </div>
        </div>
    )
}

export default NavBar