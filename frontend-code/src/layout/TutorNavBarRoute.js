import React from "react";
import { Outlet } from "react-router-dom";
import { Box } from "@mui/material";
import NavBar from "../components/NavBar/NavBar";
import MobileTopBar from "../components/TopBar/MobileTopBar";
import DTLeftDrawer from "../components/Dashboard/Tutor/DTSideBar/DTLeftDrawer";

const TutorNavBarRoute = ({ isProtected }) => {
  return isProtected ? (
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
        <DTLeftDrawer />
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
        <NavBar showNavBar={false} />
        <MobileTopBar />
      </div>
      <Box mt="70px">
        <Outlet />
      </Box>
    </>
  );
};

export default TutorNavBarRoute;
