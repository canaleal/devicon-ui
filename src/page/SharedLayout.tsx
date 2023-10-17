import { Outlet } from "react-router-dom"
import { Footer } from "../components/Layout/Footer"
import DarkLightToggle from "../components/Elements/DarkModeToggle"
import ScrollButton from "../components/Elements/ScrollButton"

const SharedLayout = () => {
    return (
        <>
            <DarkLightToggle />
            <ScrollButton />
            <Outlet />
            <Footer />
        </>
    )
}

export default SharedLayout