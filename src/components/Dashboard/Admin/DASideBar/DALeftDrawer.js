import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { useCheckAuth } from "../../../../hooks/useCheckAuth";
import dashBoard from "../../../../img/icon/dashboard.svg";
import student from "../../../../img/icon/profile.svg";
import packageIcon from "../../../../img/icon/package.svg";
import course from "../../../../img/icon/course.svg";
import exam from "../../../../img/icon/assignment.svg";
import liveClass from "../../../../img/icon/liveClass.svg";
import batch from "../../../../img/icon/batch.svg";
import badges from "../../../../img/icon/badges.svg";
import gamification from "../../../../img/icon/gamification.svg";
import flashCard from "../../../../img/icon/flashCard.svg";
import paperTest from "../../../../img/icon/practiceTest.svg";
import resourceLink from "../../../../img/icon/support.svg";
import testimonial from "../../../../img/icon/notebook.svg";
import coupon from "../../../../img/icon/coupon.svg";
import settings from "../../../../img/icon/settings.svg";
import notice from "../../../../img/icon/notice.svg";
import lesson from "../../../../img/icon/lesson.svg";
import logOut from "../../../../img/icon/logout.svg";
import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import List from "@mui/material/List";
import CssBaseline from "@mui/material/CssBaseline";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import NavBar from "../../../NavBar/NavBar";

const drawerWidth = 300;

const openedMixin = (theme) => ({
  width: drawerWidth,
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.enteringScreen,
  }),
  overflowX: "hidden",
});

const closedMixin = (theme) => ({
  transition: theme.transitions.create("width", {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  overflowX: "hidden",
  width: `calc(${theme.spacing(7)} + 1px)`,
  [theme.breakpoints.up("sm")]: {
    width: `calc(${theme.spacing(8)} + 20px)`,
  },
});

const AppBar = styled(MuiAppBar, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  zIndex: theme.zIndex.drawer + 1,
  transition: theme.transitions.create(["width", "margin"], {
    easing: theme.transitions.easing.sharp,
    duration: theme.transitions.duration.leavingScreen,
  }),
  ...(open && {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  }),
}));

const Drawer = styled(MuiDrawer, {
  shouldForwardProp: (prop) => prop !== "open",
})(({ theme, open }) => ({
  width: drawerWidth,
  flexShrink: 0,
  whiteSpace: "nowrap",
  boxSizing: "border-box",
  ...(open && {
    ...openedMixin(theme),
    "& .MuiDrawer-paper": openedMixin(theme),
  }),
  ...(!open && {
    ...closedMixin(theme),
    "& .MuiDrawer-paper": closedMixin(theme),
  }),
}));

const DALeftDrawer = () => {
  const location = useLocation().pathname;
  const { logoutUser } = useCheckAuth();
  const [open, setOpen] = useState(true);
  const [, setHovered] = useState(false);

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  const handleMouseEnter = () => {
    setHovered(true);
    if (!open) setOpen(true);
  };

  const handleMouseLeave = () => {
    setHovered(false);
    if (open) setOpen(false);
  };

  const menuList = [
    {
      name: "Dashboard",
      icon: <img src={dashBoard} alt="Dashboard" />,
      link: "/admin-dashboard",
    },
    {
      name: "Student",
      icon: <img src={student} alt="Student" />,
      link: "/admin-student",
    },
    {
      name: "Package",
      icon: <img src={packageIcon} alt="Package" />,
      link: "/admin-package",
    },
    {
      name: "Course",
      icon: <img src={course} alt="Course" />,
      link: "/admin-course",
    },
    {
      name: "Exam",
      icon: <img src={exam} alt="Exam" />,
      link: "/admin-exam",
    },
    {
      name: "Live Class",
      icon: <img src={liveClass} alt="Live Class" />,
      link: "/admin-liveClass",
    },
    {
      name: "Batch",
      icon: <img src={batch} alt="Batch" />,
      link: "/admin-batch",
    },
    {
      name: "Flash Card",
      icon: <img src={flashCard} alt="Flash Card" />,
      link: "/admin-flashCard",
    },
    {
      name: "Paper Test",
      icon: <img src={paperTest} alt="Paper Test" />,
      link: "/admin-paperTest",
    },
    {
      name: "Badges",
      icon: <img src={badges} alt="Badges" />,
      link: "/admin-badges",
    },
    {
      name: "Gamification",
      icon: <img src={gamification} alt="Gamification" />,
      link: "/admin-gamification",
    },
    {
      name: "Notice",
      icon: <img src={notice} alt="Notice" />,
      link: "/admin-notice",
    },
    {
      name: "Resources",
      icon: <img src={resourceLink} alt="Resources" height={20} width={20} />,
      link: "/admin-resources",
    },
    {
      name: "Lesson",
      icon: <img src={lesson} alt="Lesson" height={20} width={20} />,
      link: "/admin-lesson",
    },
    {
      name: "Coupon",
      icon: <img src={coupon} alt="Coupon" />,
      link: "/admin-coupon",
    },
    {
      name: "Testimonial",
      icon: <img src={testimonial} alt="Testimonial" />,
      link: "/admin-testimonial",
    },
    {
      name: "Settings",
      icon: <img src={settings} alt="Settings" />,
      link: "/admin-profile",
    },
    {
      name: "Logout",
      icon: <img src={logOut} alt="Logout" />,
      link: "/login",
    },
  ];

  return (
    <>
      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar position="fixed">
          <div className="fixing-navbar-at-top-side">
            <NavBar
              showNavBar={true}
              handleMouseEnter={handleMouseEnter}
              handleMouseLeave={handleMouseLeave}
            />
          </div>
        </AppBar>
        <Drawer
          variant="permanent"
          open={open}
          PaperProps={{
            sx: {
              backgroundColor: "#ebf2f5",
            },
          }}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <Box sx={{ mt: 10 }}>
            <List>
              {menuList.map((item, index) => (
                <ListItem
                  key={`${item.name}-${index}`}
                  disablePadding
                  sx={{
                    display: "block",
                    borderBottom: "1px solid",
                    borderColor: "#d3d3d3",
                  }}
                >
                  <Link
                    className={
                      location === item.link
                        ? "active admin__menu"
                        : "admin__menu"
                    }
                    to={item.link}
                    onClick={item.name === "Logout" ? logout : () => {}}
                    state={item?.state}
                    style={{
                      textDecoration: "none",
                      color: location === item.link ? "#01579b" : "#000",
                    }}
                  >
                    <ListItemButton
                      sx={{
                        minHeight: 50,
                        justifyContent: open ? "initial" : "center",
                        px: 4,
                      }}
                    >
                      <ListItemIcon
                        className="admin__menu__icon"
                        sx={{
                          minWidth: 0,
                          display: "flex",
                          mr: open ? 3 : "auto",
                          justifyContent: "center",
                          alignItems: "center",
                        }}
                      >
                        {item.icon}
                      </ListItemIcon>
                      {open && (
                        <>
                          <ListItemText
                            className="side-navbar-rexr-color-common admin__menu__title"
                            primary={item.name}
                          />
                        </>
                      )}
                    </ListItemButton>
                  </Link>
                </ListItem>
              ))}
            </List>
          </Box>
        </Drawer>
      </Box>
    </>
  );
};

export default DALeftDrawer;
