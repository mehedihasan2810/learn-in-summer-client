import * as React from "react";
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
import { Link, Outlet } from "react-router-dom";
import HomeIcon from "@mui/icons-material/Home";
import UpcomingIcon from "@mui/icons-material/Upcoming";
import SchoolIcon from "@mui/icons-material/School";
import { useQuery } from "@tanstack/react-query";
import useAxiosSecure from "../hooks/useAxiosSecure";
import { useAuthContext } from "../hooks/useAuthContext";

const drawerWidth = 240;

// interface Props {
//   /**
//    * Injected by the documentation to work in an iframe.
//    * You won't need it on your project.
//    */
//   window?: () => Window;
// }

export default function DashboardLayout(props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  // const [axiosSecure] = useAxiosSecure();
  // const { currentUser, isAuthLoading, toggleSignInSignUpModal } =
  //   useAuthContext();

  // const { data } = useQuery({
  //   queryKey: ["user", currentUser?.email],
  //   enabled: !isAuthLoading,
  //   queryFn: async () => {
  //     const res = await axiosSecure.get(`/getUser?email=${currentUser?.email}`);
  //     return res.data;
  //   },
  // });

  // console.log(data);

  const { user_data } = useAuthContext();
  console.log(user_data);
  let user;

  if (!user_data) {
    user = "student";
  } else {
    user = user_data?.role;
  }

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
    ];
  }
  if (user === "admin") {
    navItem = [
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
      text: "Popular Classes",
      path: "#",
      icon: <LibraryAddCheckIcon />,
    },
    {
      text: "All Classes",
      path: "#",
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
          {user_data?.name}
          <p style={{ fontSize: "14px" }}>{user_data?.email}</p>
          <p style={{ fontSize: "12px" }}>{user_data?.role}</p>
        </Typography>
      </Toolbar>
      <Divider />
      <List>
        {navItem?.map((item, index) => (
          <Link key={index} to={`/dashboard/${item.path}`}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
                <ListItemText primary={item.text} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
      <Divider />
      <List>
        {publicNavItems.map((item, index) => (
          <Link key={index} to={item.path}>
            <ListItem disablePadding>
              <ListItemButton>
                <ListItemIcon>{item.icon}</ListItemIcon>
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
    <Box sx={{ display: "flex" }}>
      <CssBaseline />
      <AppBar
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
          <Typography variant="h6" noWrap component="div">
            Responsive drawer
          </Typography>
        </Toolbar>
      </AppBar>
      <Box
        component="nav"
        sx={{ width: { sm: drawerWidth }, flexShrink: { sm: 0 } }}
        aria-label="mailbox folders"
      >
        {/* The implementation can be swapped with js to avoid SEO duplication of links. */}
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
  );
}
