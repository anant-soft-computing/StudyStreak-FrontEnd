import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";
import NavBar from "../components/NavBar/NavBar";
import MobileTopBar from "../components/TopBar/MobileTopBar";
import Footer from "../components/Footer/Footer";
import { Box } from "@mui/material";

export default function AdminNavBarRoute() {
  return (
    <>
      <div className='fixing-navbar-at-top-side'>
        <TopBar />
        <NavBar showNavBar={false} />
        <MobileTopBar />
      </div>
      <Box mt='70px'>
        <Outlet />
        <Footer />
      </Box>
    </>
  );
}
