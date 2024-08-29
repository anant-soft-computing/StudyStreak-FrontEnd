import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useCheckAuth } from "../../../../hooks/useCheckAuth";
import dashBoard from "../../../../img/icon/dashboard.svg";
import profile from "../../../../img/icon/profile.svg";
import myCourse from "../../../../img/icon/myCourse.svg";
import paperTest from "../../../../img/icon/paperTest.svg";
import assignment from "../../../../img/icon/assignment.svg";
import practiceTest from "../../../../img/icon/practiceTest.svg";
import fullLengthTest from "../../../../img/icon/notebook.svg";
import liveClass from "../../../../img/icon/liveClass.svg";
import flashcard from "../../../../img/icon/flashCard.svg";
import resources from "../../../../img/icon/support.svg";
import settings from "../../../../img/icon/settings.svg";
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
import TopBar from "../../../TopBar/TopBar";
import NoticeBoard from "../Dashboard/NoticeBoard/NoticeBoard";

const drawerWidth = 280;

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
    width: `calc(${theme.spacing(8)} + 1px)`,
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

const DSLeftDrawer = () => {
  const location = useLocation().pathname;
  const { logoutUser } = useCheckAuth();

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState({
    practice_test_count: 0,
    full_length_test_count: 0,
  });
  const [givenPTCount, setGivenPTCount] = useState(0);
  const [givenFLTCount, setGivenFLTCount] = useState(0);
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
      link: "/studentDashboard",
    },
    {
      name: "My Profile",
      icon: <img src={profile} alt="Profile" />,
      link: "/studentProfile",
    },
    {
      name: "My Course",
      icon: <img src={myCourse} alt="My Course" />,
      link: "/studentMyCourse",
    },
    {
      name: "Paper Test",
      icon: <img src={paperTest} alt="Paper Test" />,
      link: "/paperTest",
    },
    {
      name: "Mini Test",
      icon: <img src={assignment} alt="Mini Test" />,
      link: "/mockTest",
    },
    {
      name: "Practice Test",
      icon: <img src={practiceTest} alt="Practice Test" />,
      link: "/practiceTest",
      state: { count: count?.practice_test_count },
    },
    {
      name: "Full Length Test",
      icon: <img src={fullLengthTest} alt="Full Length Test" />,
      link: "/fullLengthTest",
      state: { count: count?.full_length_test_count },
    },
    {
      name: "Live Classes",
      icon: <img src={liveClass} alt="Live Classes" />,
      link: "/studentLiveClasses",
    },
    {
      name: "Flash Card",
      icon: <img src={flashcard} alt="Flash Card" />,
      link: "/flashCard",
    },
    {
      name: "Resources",
      icon: <img src={resources} alt="Resources" height={20} width={20} />,
      link: "/resources",
    },
    {
      name: "Settings",
      icon: <img src={settings} alt="Settings" />,
      link: "/studentSettings",
    },
    {
      name: "Logout",
      icon: <img src={logOut} alt="Logout" />,
      link: "/login",
    },
  ];

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          `/student-stats/`,
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          setGivenPTCount(response?.data?.student_pt?.length);
          setGivenFLTCount(response?.data?.student_flt?.length);
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/get-student-course/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          const enrollCourses = response?.data?.map((item) => item.course_id);
          localStorage.setItem("courses", JSON.stringify(enrollCourses));
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error:", error);
      }
    })();
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/userwisepackagewithcourseid/",
          {
            headers: {
              Accept: "application/json",
              "Content-Type": "application/json",
              Authorization: `Bearer ${
                JSON.parse(localStorage.getItem("loginInfo"))?.accessToken
              }`,
            },
            method: "GET",
          },
          8000
        );
        if (response.status === 200) {
          const { data } = response;
          const studentPackage = data?.student_packages?.[0];
          const packageDetails = studentPackage?.package;

          const batchIds = data?.student_packages.map((item) => item.batch_id);

          setCount({
            practice_test_count:
              packageDetails?.practice_test_count === -1
                ? packageDetails?.practice_test_count
                : packageDetails?.practice_test_count - givenPTCount,
            full_length_test_count:
              packageDetails?.full_length_test_count === -1
                ? packageDetails?.full_length_test_count
                : packageDetails?.full_length_test_count - givenFLTCount,
          });
          localStorage.setItem("StudentID", studentPackage?.student_id);
          localStorage.setItem("BatchIds", JSON.stringify(batchIds));
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, [givenFLTCount, givenPTCount, open]);

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <div className="fixing-navbar-at-top-side">
          <TopBar />
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
        <Box sx={{ overflow: "auto", mt: 14 }}>
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
                        {item.name === "Practice Test" ? (
                          count.practice_test_count === -1 ? (
                            <span className="dashboard__label">All</span>
                          ) : givenPTCount >=
                            count?.practice_test_count + givenPTCount ? (
                            <i className="icofont-ui-press text-danger" />
                          ) : (
                            <span className="dashboard__label">
                              {count.practice_test_count}
                            </span>
                          )
                        ) : item.name === "Full Length Test" ? (
                          count?.full_length_test_count === -1 ? (
                            <span className="dashboard__label">All</span>
                          ) : givenFLTCount >=
                            count?.full_length_test_count + givenFLTCount ? (
                            <i className="icofont-ui-press text-danger" />
                          ) : (
                            <span className="dashboard__label">
                              {count?.full_length_test_count}
                            </span>
                          )
                        ) : (
                          <span className="dashboard__label">
                            {
                              count[
                                item.name.replace(/ /g, "_").toLowerCase() +
                                  "_count"
                              ]
                            }
                          </span>
                        )}
                      </>
                    )}
                  </ListItemButton>
                </Link>
              </ListItem>
            ))}
          </List>
        </Box>
        {open && <NoticeBoard />}
      </Drawer>
    </Box>
  );
};

export default DSLeftDrawer;
