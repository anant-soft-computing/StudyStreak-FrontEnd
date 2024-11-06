import { Outlet } from "react-router-dom";
import TopBar from "../components/TopBar/TopBar";
import NavBar from "../components/NavBar/NavBar";
import MobileTopBar from "../components/TopBar/MobileTopBar";
import { Box } from "@mui/material";
import DALeftDrawer from "../components/Dashboard/Admin/DASideBar/DALeftDrawer";

// CSS individual files to be loaded in all the Layout files
import "../css/style.css";

const AdminNavBarRoute = ({ isProtected }) => {
  return (
    <>
      {isProtected ? (
        <Box
          sx={(theme) => ({
            [theme.breakpoints.up(991)]: {
              display: "flex",
            },
          })}
        >
          <Box
            sx={(theme) => ({
              [theme.breakpoints.down(991)]: {
                display: "none",
              },
            })}
          >
            <DALeftDrawer />
          </Box>
          <Box
            className="fixing-navbar-at-top-side"
            sx={(theme) => ({
              [theme.breakpoints.up(991)]: {
                display: "none",
              },
            })}
          >
            <MobileTopBar />
          </Box>
          <Box width="100%">
            <Outlet />
          </Box>
        </Box>
      ) : (
        <>
          <div className="fixing-navbar-at-top-side">
            <TopBar />
            <NavBar showNavBar={false} />
            <MobileTopBar />
          </div>
          <Box mt="70px">
            <Outlet />
          </Box>
        </>
      )}
    </>
  );
};

export default AdminNavBarRoute;
