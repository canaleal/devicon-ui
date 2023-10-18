import { Outlet } from "react-router-dom"
import { Footer } from "../components/Layout/Footer"
import DarkLightToggle from "../components/Layout/DarkModeToggle"
import ScrollButton from "../components/Elements/ScrollButton/ScrollButton"

const SharedLayout = () => {
    return (
        <>
            <DarkLightToggle />
            <ScrollButton position={'topRight'} />
            <Outlet />
            <Footer />
        </>
    )
}

export default SharedLayout