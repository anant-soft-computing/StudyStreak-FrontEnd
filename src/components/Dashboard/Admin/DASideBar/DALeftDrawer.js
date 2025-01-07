import React, { useState } from "react";
import { Link, useLocation } from "react-router-dom";
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
import {
  Award,
  Bell,
  BookCopy,
  BookOpenCheck,
  CassetteTape,
  Dices,
  EthernetPort,
  GraduationCap,
  LayoutPanelLeft,
  LogOut,
  Package,
  Presentation,
  Proportions,
  Scroll,
  Settings,
  Tags,
  TicketsPlane,
  User,
  Users,
  WalletCards,
} from "lucide-react";

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

const menuList = [
  {
    name: "Dashboard",
    icon: <LayoutPanelLeft />,
    link: "/admin-dashboard",
  },
  {
    name: "Users",
    icon: <Users />,
    link: "/admin-users",
  },
  {
    name: "Student",
    icon: <User />,
    link: "/admin-student",
  },
  {
    name: "Live Class Report",
    icon: <TicketsPlane />,
    link: "/admin-live-class-report",
  },
  {
    name: "Package",
    icon: <Package />,
    link: "/admin-package",
  },
  {
    name: "Course",
    icon: <BookCopy />,
    link: "/admin-course",
  },
  {
    name: "Exam",
    icon: <BookOpenCheck />,
    link: "/admin-exam",
  },
  {
    name: "Live Class",
    icon: <CassetteTape />,
    link: "/admin-liveClass",
  },
  {
    name: "Batch",
    icon: <GraduationCap />,
    link: "/admin-batch",
  },
  {
    name: "Flash Card",
    icon: <WalletCards />,
    link: "/admin-flashCard",
  },
  {
    name: "Paper Test",
    icon: <Scroll />,
    link: "/admin-paperTest",
  },
  {
    name: "Badges",
    icon: <Award />,
    link: "/admin-badges",
  },
  {
    name: "Gamification",
    icon: <Dices />,
    link: "/admin-gamification",
  },
  {
    name: "Notice",
    icon: <Bell />,
    link: "/admin-notice",
  },
  {
    name: "Resources",
    icon: <Proportions />,
    link: "/admin-resources",
  },
  {
    name: "Lesson",
    icon: <Presentation />,
    link: "/admin-lesson",
  },
  {
    name: "Coupon",
    icon: <Tags />,
    link: "/admin-coupon",
  },
  {
    name: "Testimonial",
    icon: <EthernetPort />,
    link: "/admin-testimonial",
  },
  {
    name: "Settings",
    icon: <Settings />,
    link: "/admin-profile",
  },
  {
    name: "Logout",
    icon: <LogOut />,
    link: "/login",
  },
];

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

export default DALeftDrawer;
