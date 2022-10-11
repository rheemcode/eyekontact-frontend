import React, { useEffect } from "react"
import { Routes, Route, Outlet } from "react-router-dom";
import Header from "./Pages/Components/Header";
import "./App.css"
import Footer from "./Pages/Components/Footer";
import { getPageAsync } from "./features/cms/cmsSlice";
import { useAppDispatch } from "./hooks";
import "@fancyapps/ui/dist/fancybox.css"
import { Toaster } from "react-hot-toast"

const App: React.FC = () => {
    const dispatch = useAppDispatch();

    useEffect(() => {
        (async () => await dispatch(getPageAsync()))()
    })

    useEffect(() => {
        window.scrollTo(0, 0)
    }, [])
    return (
        <div className="app">
            <Header />
            <Outlet />
            <Footer />
        </div>
    );
}

export default App;
