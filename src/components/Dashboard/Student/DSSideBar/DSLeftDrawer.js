import React, { useEffect, useState } from "react";
import { Link, useLocation } from "react-router-dom";
import ajaxCall from "../../../../helpers/ajaxCall";
import { useCheckAuth } from "../../../../hooks/useCheckAuth";
import {
  Box,
  List,
  styled,
  ListItem,
  CssBaseline,
  ListItemIcon,
  ListItemText,
  ListItemButton,
} from "@mui/material";
import MuiDrawer from "@mui/material/Drawer";
import MuiAppBar from "@mui/material/AppBar";
import NavBar from "../../../NavBar/NavBar";
import NoticeBoard from "../Dashboard/NoticeBoard/NoticeBoard";

import dashBoard from "../../../../img/icon/dashboard.svg";
import profile from "../../../../img/icon/profile.svg";
import myCourse from "../../../../img/icon/myCourse.svg";
import paperTest from "../../../../img/icon/paperTest.svg";
import assignment from "../../../../img/icon/assignment.svg";
import practiceTest from "../../../../img/icon/practiceTest.svg";
import fullLengthTest from "../../../../img/icon/notebook.svg";
import diagnosticTest from "../../../../img/icon/diagnosticTest.svg";
import liveClass from "../../../../img/icon/liveClass.svg";
import recordedClass from "../../../../img/icon/webinar.svg";
import flashcard from "../../../../img/icon/flashCard.svg";
import resources from "../../../../img/icon/support.svg";
import report from "../../../../img/icon/coupon.svg";
import settings from "../../../../img/icon/settings.svg";
import logOut from "../../../../img/icon/logout.svg";

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
  const category = localStorage.getItem("category");
  const { logoutUser } = useCheckAuth();

  const [open, setOpen] = useState(false);
  const [count, setCount] = useState({
    count: 0,
    all_pt_count: 0,
    practice_test_count: 0,
    all_flt_count: 0,
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

  const menuList =
    category === "IELTS" || count?.count === 0
      ? [
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
            state: { packageCount: count?.count },
          },
          {
            name: "Mini Test",
            icon: <img src={assignment} alt="Mini Test" />,
            link: "/mockTest",
            state: { count: count?.count },
          },
          {
            name: "Practice Test",
            icon: <img src={practiceTest} alt="Practice Test" />,
            link: "/practiceTest",
            state: {
              count: count?.practice_test_count,
              packageCount: count?.count,
            },
          },
          {
            name: "Full Length Test",
            icon: <img src={fullLengthTest} alt="Full Length Test" />,
            link: "/fullLengthTest",
            state: {
              count: count?.full_length_test_count,
              packageCount: count?.count,
            },
          },
          {
            name: "Diagnostic Test",
            icon: <img src={diagnosticTest} alt="Diagnostic Test" />,
            link: "/diagnosticTest",
            state: {
              packageCount: count?.count,
            },
          },
          {
            name: "Live Classes",
            icon: <img src={liveClass} alt="Live Classes" />,
            link: "/studentLiveClasses",
            state: { packageCount: count?.count },
          },
          {
            name: "Recorded Classes",
            icon: (
              <img
                src={recordedClass}
                alt="Recorded Classes"
                height={18}
                width={18}
              />
            ),
            link: "/recordedClasses",
            state: { packageCount: count?.count },
          },
          {
            name: "Flash Card",
            icon: <img src={flashcard} alt="Flash Card" />,
            link: "/flashCard",
            state: { packageCount: count?.count },
          },
          {
            name: "Resources",
            icon: (
              <img src={resources} alt="Resources" height={20} width={20} />
            ),
            link: "/resources",
            state: { packageCount: count?.count },
          },
          {
            name: "Reports",
            icon: <img src={report} alt="Reports" />,
            link: "/reports",
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
        ]
      : [
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
            state: { packageCount: count?.count },
          },
          {
            name: "Mini Test",
            icon: <img src={assignment} alt="Mini Test" />,
            link: "/mockTest",
            state: { count: count?.count },
          },
          {
            name: "Practice Test",
            icon: <img src={practiceTest} alt="Practice Test" />,
            link: "/practiceTest",
            state: {
              count: count?.practice_test_count,
              packageCount: count?.count,
            },
          },
          {
            name: "Diagnostic Test",
            icon: <img src={diagnosticTest} alt="Diagnostic Test" />,
            link: "/diagnosticTest",
            state: {
              packageCount: count?.count,
            },
          },
          {
            name: "Live Classes",
            icon: <img src={liveClass} alt="Live Classes" />,
            link: "/studentLiveClasses",
          },
          {
            name: "Recorded Classes",
            icon: (
              <img
                src={recordedClass}
                alt="Recorded Classes"
                height={18}
                width={18}
              />
            ),
            link: "/recordedClasses",
          },
          {
            name: "Flash Card",
            icon: <img src={flashcard} alt="Flash Card" />,
            link: "/flashCard",
          },
          {
            name: "Resources",
            icon: (
              <img src={resources} alt="Resources" height={20} width={20} />
            ),
            link: "/resources",
          },
          {
            name: "Reports",
            icon: <img src={report} alt="Reports" />,
            link: "/reports",
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
          const batchIds = data?.batch?.map((item) => item);
          const courseIds = data?.course?.map((item) => item);

          const givenPTCount = data?.student[0]?.student_pt;
          const givenFLTCount = data?.student[0]?.student_flt;

          setGivenPTCount(givenPTCount);
          setGivenFLTCount(givenFLTCount);

          const totalPracticeTests = data?.package.reduce(
            (sum, pkg) => sum + pkg.practice_test_count,
            0
          );

          const totalFullLengthTests = data?.package.reduce(
            (sum, pkg) => sum + pkg.full_length_test_count,
            0
          );

          setCount({
            count: data?.count,
            all_pt_count: totalPracticeTests,
            practice_test_count: totalPracticeTests - givenPTCount,
            all_flt_count: totalFullLengthTests,
            full_length_test_count: totalFullLengthTests - givenFLTCount,
          });

          localStorage.setItem("StudentID", data?.student[0]?.student_id);
          localStorage.setItem("BatchIds", JSON.stringify(batchIds));
          localStorage.setItem("courses", JSON.stringify(courseIds));
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
        <Box sx={{ overflow: "auto", mt: 8 }}>
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
                          count?.all_pt_count === -1 ? (
                            <span className="dashboard__label bg-success">
                              All
                            </span>
                          ) : givenPTCount ===
                            count?.practice_test_count + givenPTCount ? (
                            <span className="dashboard__label bg-danger">
                              N/A
                            </span>
                          ) : (
                            <span className="dashboard__label">
                              {count?.practice_test_count}
                            </span>
                          )
                        ) : item.name === "Full Length Test" ? (
                          count?.all_flt_count === -1 ? (
                            <span className="dashboard__label bg-success">
                              All
                            </span>
                          ) : givenFLTCount ===
                            count?.full_length_test_count + givenFLTCount ? (
                            <span className="dashboard__label bg-danger">
                              N/A
                            </span>
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
