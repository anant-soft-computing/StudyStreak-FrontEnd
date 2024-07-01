import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useCheckAuth } from "../../../../hooks/useCheckAuth";
import dashBoard from "../../../../img/icon/dashboard.svg";
import profile from "../../../../img/icon/profile.svg";
import myCourse from "../../../../img/icon/myCourse.svg";
import assignment from "../../../../img/icon/assignment.svg";
import practiceTest from "../../../../img/icon/practiceTest.svg";
import fullLengthTest from "../../../../img/icon/notebook.svg";
import liveClass from "../../../../img/icon/liveClass.svg";
import flashcard from "../../../../img/icon/flashCard.svg";
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

const drawerWidth = 250;

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

  const [open, setOpen] = useState(true);
  const [solvingClassBook, setSolvingClassBook] = useState([]);
  const [studentId, setStudentId] = useState();
  const [count, setCount] = useState({});

  const menuList = [
    {
      name: "Dashboard",
      icon: <img src={dashBoard} alt="Dashboard" />,
      link: "/studentDashboard/",
      state: { solvingClassBook: solvingClassBook[0] },
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
      name: "Mini Test",
      icon: <img src={assignment} alt="Mini Test" />,
      link: "/mockTest",
      state: { count: count },
    },
    {
      name: "Practice Test",
      icon: <img src={practiceTest} alt="Practice Test" />,
      link: "/practiceTest",
      state: { count: count },
    },
    {
      name: "Full Length Test",
      icon: <img src={fullLengthTest} alt="Full Length Test" />,
      link: "/fullLengthTest",
      state: { count: count },
    },
    {
      name: "Live Classes",
      icon: <img src={liveClass} alt="Live Classes" />,
      link: "/studentLiveClasses",
      state: {
        studentId: studentId,
        solvingClassBook: solvingClassBook[0],
        count: count,
      },
    },
    {
      name: "Flash Card",
      icon: <img src={flashcard} alt="Flash Card" />,
      link: "/flashCard",
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
          const studentMT = studentPackage?.student_mock;
          const studentPT = studentPackage?.student_pt;
          const studentFLT = studentPackage?.student_flt;

          const batchIds = data?.student_packages.map((item) => item.batch_id);
          const courses = data.student_packages?.map(({ course }) => course);

          setCount({
            practice_test_count:
              packageDetails?.practice_test_count - studentPT || "",
            mini_test_count:
              packageDetails?.practice_test_count - studentMT || "",
            full_length_test_count:
              packageDetails?.full_length_test_count - studentFLT || "",
          });
          localStorage.setItem("StudentID", studentPackage?.student_id);
          localStorage.setItem("BatchIds", JSON.stringify(batchIds));
          localStorage.setItem("courses", JSON.stringify(courses));
          setStudentId(studentPackage?.student_id);
          setSolvingClassBook(
            data.student_packages?.map(
              ({ Live_class_enroll }) => Live_class_enroll
            )
          );
        } else {
          console.log("error");
        }
      } catch (error) {
        console.log("error", error);
      }
    })();
  }, []);

  const logout = (event) => {
    event.preventDefault();
    logoutUser();
  };

  return (
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar position="fixed">
        <div className="fixing-navbar-at-top-side">
          <TopBar />
          <NavBar handleDrawerToggle={() => setOpen(!open)} showNavBar={true} />
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
                        {item.name === "Practice Test" ||
                        item.name === "Mini Test" ||
                        item.name === "Full Length Test" ? (
                          <span className="dashboard__label">
                            {
                              count[
                                item.name.replace(/ /g, "_").toLowerCase() +
                                  "_count"
                              ]
                            }
                          </span>
                        ) : (
                          ""
                        )}
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
  );
};

export default DSLeftDrawer;
