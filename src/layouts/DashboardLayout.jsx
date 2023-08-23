import { useState } from "react";
import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import CssBaseline from "@mui/material/CssBaseline";
import Divider from "@mui/material/Divider";
import Drawer from "@mui/material/Drawer";
import IconButton from "@mui/material/IconButton";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";
import MenuIcon from "@mui/icons-material/Menu";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import CheckBoxIcon from "@mui/icons-material/CheckBox";
import PaymentIcon from "@mui/icons-material/Payment";
import ManageAccountsIcon from "@mui/icons-material/ManageAccounts";
import ClassIcon from "@mui/icons-material/Class";
import AddIcon from "@mui/icons-material/Add";
import LibraryAddCheckIcon from "@mui/icons-material/LibraryAddCheck";
import { Link, NavLink, Outlet } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import SchoolIcon from "@mui/icons-material/School";
import { useAuthContext } from "../hooks/useAuthContext";
import { useTitlePerPage } from "../hooks/useTitlePerPage";
import { FaStackOverflow } from "react-icons/fa";

import "./DashboardLayout.css";
import { TextField } from "@mui/material";
const drawerWidth = 240;

export default function DashboardLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  useTitlePerPage("Dashboard");

  const { user_data } = useAuthContext();
  let user = user_data?.role;

  let navItem;

  if (user === "student") {
    navItem = [
      {
        text: "My Selected Classes",
        path: "selected-classes",
        icon: <CheckBoxIcon />,
      },
      {
        text: "My Enrolled Classes",
        path: "enrolled-classes",
        icon: <PaymentIcon />,
      },
      {
        text: "Payment Details",
        path: "payment-details",
        icon: <PaymentIcon />,
      },
    ];
  }
  if (user === "admin") {
    navItem = [
      {
        text: "Statistics",
        path: "statistics",
        icon: <FaStackOverflow size={24} />,
      },
      {
        text: "Manage Classes",
        path: "manage-classes",
        icon: <ClassIcon />,
      },
      {
        text: "Manage Users",
        path: "manage-users",
        icon: <ManageAccountsIcon />,
      },
    ];
  }
  if (user === "instructor") {
    navItem = [
      {
        text: "Add A Class",
        path: "add-class",
        icon: <AddIcon />,
      },
      {
        text: "My Classes",
        path: "my-classes",
        icon: <LibraryAddCheckIcon />,
      },
    ];
  }

  const publicNavItems = [
    {
      text: "Home",
      path: "/",
      icon: <HomeIcon />,
    },
    {
      text: "All Classes",
      path: "/all-classes",
      icon: <LibraryAddCheckIcon />,
    },
    {
      text: "Instructors",
      path: "/instructors",
      icon: <SchoolIcon />,
    },
    {
      text: "Blog",
      path: "#",
      icon: <UpcomingIcon />,
    },
  ];

  const drawer = (
    <div>
      <Toolbar>
        <Typography variant="h6" noWrap component="div">
          <Link to="/">LearnInSummer</Link>
        </Typography>
      </Toolbar>

      <List sx={{ marginBlockStart: "1rem" }}>
        <ListItem disablePadding></ListItem>
        {navItem?.map((item, index) => (
          <NavLink
            className={({ isActive, isPending }) =>
              isPending ? "d-pending" : isActive ? "d-active" : ""
            }
            key={index}
            to={`/dashboard/${item.path}`}
          >
            <ListItem disablePadding>
              <ListItemButton className="dashboard-link">
                <ListItemIcon className="dashboard-link-icon">
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </NavLink>
        ))}
      </List>
      <Divider sx={{ width: "90%", marginInline: "auto" }} />

      <List>
        {publicNavItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <ListItem disablePadding>
              <ListItemButton className="dashboard-link">
                <ListItemIcon className="dashboard-link-icon">
                  {item.icon}
                </ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  const container =
    window !== undefined ? () => window().document.body : undefined;

  return (
    <>
      {/* todo */}
      {/* <UserProfile /> */}
      {/* ------------------ */}

      <Box sx={{ display: "flex" }}>
        <CssBaseline />
        <AppBar
          className="dashboard-bar"
          position="fixed"
          sx={{
            width: { sm: `calc(100% - ${drawerWidth}px)` },
            ml: { sm: `${drawerWidth}px` },
            p: 0,
          }}
        >
          <Toolbar>
            <IconButton
              color="inherit"
              aria-label="open drawer"
              edge="start"
              onClick={handleDrawerToggle}
              sx={{ mr: 2, display: { sm: "none" } }}
            >
              <MenuIcon />
            </IconButton>
            <Typography
              style={{ width: "100%" }}
              variant="h6"
              noWrap
              component="div"
            >
              <div
                style={{
                  paddingBlock: "0.8rem",
                  display: "flex",
                  justifyContent: "space-between",
                }}
              >
                <TextField
                  sx={{ width: "300px" }}
                  id="standard-search"
                  label="Search"
                  type="search"
                  variant="standard"
                />

                {/* todo------------------------------------------------- */}
                <img
                  style={{
                    width: "60px",
                    height: "60px",
                    objectFit: "cover",
                    borderRadius: "50%",
                    marginInlineStart: "1rem",
                  }}
                  src={`${user_data?.photoUrl}`}
                  alt="author image"
                />

                {/* todo -------------------------------------- */}
              </div>
            </Typography>
          </Toolbar>
        </AppBar>
        <Box
          component="nav"
          sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
          aria-label="mailbox folders"
        >
          <Drawer
            container={container}
            variant="temporary"
            open={mobileOpen}
            onClose={handleDrawerToggle}
            ModalProps={{
              keepMounted: true, // Better open performance on mobile.
            }}
            sx={{
              display: { xs: "block", sm: "none" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
          >
            {drawer}
          </Drawer>
          <Drawer
            variant="permanent"
            className="desktop-drawer"
            sx={{
              display: { xs: "none", sm: "block" },
              "& .MuiDrawer-paper": {
                boxSizing: "border-box",
                width: drawerWidth,
              },
            }}
            open
          >
            {drawer}
          </Drawer>
        </Box>
        <Box
          className="dashboard-content"
          component="main"
          sx={{
            flexGrow: 1,
            p: 3,
            width: { sm: `calc(100% - ${drawerWidth}px)` },
          }}
        >
          <Toolbar />

          <Outlet />
        </Box>
      </Box>
    </>
  );
}
