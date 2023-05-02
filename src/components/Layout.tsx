import React from "react"
import Navbar from "./Navbar"
import Modals from "./Modals"

const Layout = ({ children }: { children: JSX.Element } ) => {
    return (
        <div className="h-screen w-screen flex bg-blue-200 bg-opacity-20">
            <Navbar />
            <div>
                {children}
            </div>
            <Modals />
        </div>
    )
}

export default Layout;