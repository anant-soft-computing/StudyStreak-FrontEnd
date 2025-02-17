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
import {
  BookCheck,
  BookCopy,
  BookHeadphones,
  CassetteTape,
  ClipboardMinus,
  LayoutPanelLeft,
  LogOut,
  Mic,
  NotepadTextDashed,
  PcCase,
  Pencil,
  Proportions,
  Ribbon,
  Scroll,
  Settings,
  SquarePen,
  UserPen,
  Videotape,
  WalletCards,
} from "lucide-react";

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
  const category = JSON.parse(localStorage.getItem("course"))?.course_category;
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
            icon: <LayoutPanelLeft />,
            link: "/studentDashboard",
          },
          {
            name: "My Profile",
            icon: <UserPen />,
            link: "/studentProfile",
          },
          {
            name: "My Course",
            icon: <BookCopy />,
            link: "/studentMyCourse",
          },
          {
            name: "Paper Test",
            icon: <Scroll />,
            link: "/paperTest",
            state: { packageCount: count?.count },
          },
          {
            name: "Mini Test",
            icon: <BookCheck />,
            link: "/mockTest",
            state: { count: count?.count },
          },
          {
            name: "Practice Test",
            icon: <Pencil />,
            link: "/practiceTest",
            state: {
              count: count?.practice_test_count,
              packageCount: count?.count,
            },
          },
          {
            name: "Full Length Test",
            icon: <PcCase />,
            link: "/fullLengthTest",
            state: {
              count: count?.full_length_test_count,
              packageCount: count?.count,
            },
          },
          {
            name: "Diagnostic Test",
            icon: <NotepadTextDashed />,
            link: "/diagnosticTest",
            state: {
              packageCount: count?.count,
            },
          },
          {
            name: "Live Classes",
            icon: <CassetteTape />,
            link: "/studentLiveClasses",
            state: { packageCount: count?.count },
          },
          {
            name: "Recorded Classes",
            icon: <Videotape />,
            link: "/recordedClasses",
            state: { packageCount: count?.count },
          },
          {
            name: "Flash Card",
            icon: <WalletCards />,
            link: "/flashCard",
            state: { packageCount: count?.count },
          },
          {
            name: "Resources",
            icon: <Proportions />,
            link: "/resources",
            state: { packageCount: count?.count },
          },
          {
            name: "Reports",
            icon: <ClipboardMinus />,
            link: "/reports",
          },
          {
            name: "Settings",
            icon: <Settings />,
            link: "/studentSettings",
          },
          {
            name: "Logout",
            icon: <LogOut />,
            link: "/login",
          },
        ]
      : category === "PTE"
      ? [
          {
            name: "Dashboard",
            icon: <LayoutPanelLeft />,
            link: "/studentDashboard",
          },
          {
            name: "My Profile",
            icon: <UserPen />,
            link: "/studentProfile",
          },
          {
            name: "My Course",
            icon: <BookCopy />,
            link: "/studentMyCourse",
          },
          {
            name: "Free Mock Test",
            icon: <Ribbon />,
            link: "/PTE/FreeMockTest",
          },
          {
            name: "PTE Speaking",
            icon: <Mic />,
            link: "/PTE/Speaking",
          },
          {
            name: "PTE Writing",
            icon: <SquarePen />,
            link: "/PTE/Writing",
          },
          {
            name: "PTE Reading",
            icon: <PcCase />,
            link: "/PTE/Reading",
          },
          {
            name: "PTE Listening",
            icon: <BookHeadphones />,
            link: "/PTE/Listening",
          },
          {
            name: "Live Classes",
            icon: <CassetteTape />,
            link: "/studentLiveClasses",
          },
          {
            name: "Resources",
            icon: <Proportions />,
            link: "/resources",
          },
          {
            name: "Flash Card",
            icon: <WalletCards />,
            link: "/flashCard",
          },
          {
            name: "Reports",
            icon: <ClipboardMinus />,
            link: "/reports",
          },
          {
            name: "Settings",
            icon: <Settings />,
            link: "/studentSettings",
          },
          {
            name: "Logout",
            icon: <LogOut />,
            link: "/login",
          },
        ]
      : [
          {
            name: "Dashboard",
            icon: <LayoutPanelLeft />,
            link: "/studentDashboard",
          },
          {
            name: "My Profile",
            icon: <UserPen />,
            link: "/studentProfile",
          },
          {
            name: "My Course",
            icon: <BookCopy />,
            link: "/studentMyCourse",
          },
          {
            name: "Paper Test",
            icon: <Scroll />,
            link: "/paperTest",
            state: { packageCount: count?.count },
          },
          {
            name: "Mini Test",
            icon: <BookCheck />,
            link: "/mockTest",
            state: { count: count?.count },
          },
          {
            name: "Practice Test",
            icon: <Pencil />,
            link: "/practiceTest",
            state: {
              count: count?.practice_test_count,
              packageCount: count?.count,
            },
          },
          {
            name: "Diagnostic Test",
            icon: <NotepadTextDashed />,
            link: "/diagnosticTest",
            state: {
              packageCount: count?.count,
            },
          },
          {
            name: "Live Classes",
            icon: <CassetteTape />,
            link: "/studentLiveClasses",
          },
          {
            name: "Recorded Classes",
            icon: <ClipboardMinus />,
            link: "/recordedClasses",
          },
          {
            name: "Flash Card",
            icon: <WalletCards />,
            link: "/flashCard",
          },
          {
            name: "Resources",
            icon: <Proportions />,
            link: "/resources",
          },
          {
            name: "Reports",
            icon: <ClipboardMinus />,
            link: "/reports",
          },
          {
            name: "Settings",
            icon: <Settings />,
            link: "/studentSettings",
          },
          {
            name: "Logout",
            icon: <LogOut />,
            link: "/login",
          },
        ];

  useEffect(() => {
    (async () => {
      try {
        const response = await ajaxCall(
          "/student/course-enrollment/details/",
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
          const batchIds = data?.batch_ids?.map((item) => item);
          const courseIds = data?.course_ids?.map((item) => item);

          const givenPTCount = data?.student_details?.student_pt;
          const givenFLTCount = data?.student_details?.student_flt;

          setGivenPTCount(givenPTCount);
          setGivenFLTCount(givenFLTCount);

          const totalPracticeTests = data?.package_details?.reduce(
            (sum, pkg) => sum + pkg.practice_test_count,
            0
          );

          const totalFullLengthTests = data?.package_details?.reduce(
            (sum, pkg) => sum + pkg.full_length_test_count,
            0
          );

          setCount({
            count: data?.course_count,
            all_pt_count: totalPracticeTests,
            practice_test_count: totalPracticeTests - givenPTCount,
            all_flt_count: totalFullLengthTests,
            full_length_test_count: totalFullLengthTests - givenFLTCount,
          });

          localStorage.setItem("StudentID", data?.student_details?.student_id);
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

  const getLabel = (itemName, count, givenCount) => {
    const countKey = itemName.replace(/ /g, "_").toLowerCase() + "_count";

    if (itemName === "Practice Test") {
      if (count?.all_pt_count === -1)
        return <span className="dashboard__label bg-success">All</span>;
      if (givenCount === count?.practice_test_count + givenCount)
        return <span className="dashboard__label bg-danger">N/A</span>;
      return (
        <span className="dashboard__label">{count?.practice_test_count}</span>
      );
    }

    if (itemName === "Full Length Test") {
      if (count?.all_flt_count === -1)
        return <span className="dashboard__label bg-success">All</span>;
      if (givenCount === count?.full_length_test_count + givenCount)
        return <span className="dashboard__label bg-danger">N/A</span>;
      return (
        <span className="dashboard__label">
          {count?.full_length_test_count}
        </span>
      );
    }

    return <span className="dashboard__label">{count?.[countKey]}</span>;
  };

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
                      style={{ height: 20, width: 20, color: "black" }}
                    >
                      {item.icon}
                    </ListItemIcon>
                    {open && (
                      <>
                        <ListItemText
                          className="side-navbar-rexr-color-common admin__menu__title"
                          primary={item.name}
                        />
                        {getLabel(
                          item.name,
                          count,
                          item.name === "Practice Test"
                            ? givenPTCount
                            : givenFLTCount
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
