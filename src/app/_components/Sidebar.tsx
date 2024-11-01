"use client";
import * as React from "react";
import Box from "@mui/material/Box";
import AppBar from "@mui/material/AppBar";
import ChevronRightIcon from "@mui/icons-material/ChevronRight";
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
import Link from "next/link";

const drawerWidth = 240;

interface Props {
  window?: () => Window;
}

export default function Sidebar(props: Props) {
  const { window } = props;
  const [mobileOpen, setMobileOpen] = React.useState(false);

  const handleDrawerToggle = () => {
    setMobileOpen((prev) => !prev);
  };

  const data = [
    {
      name: "Find Pokemon",
      icon: <ChevronRightIcon />,
      link: "/pokemon",
    },
    {
      name: "Find Multiple",
      icon: <ChevronRightIcon />,
      link: "/findmany",
    },
    {
      name: "Find By Type",
      icon: <ChevronRightIcon />,
      link: "/findbytype",
    },
  ];

  const drawer = (
    <div>
      <List>
        {data.map((text) => (
          <Link href={text.link} key={text.name}>
            <ListItem key={text.name} disablePadding>
              <ListItemButton>
                <ListItemIcon sx={{ minWidth: 0, mr: 1 }}>
                  {text.icon}
                </ListItemIcon>
                <ListItemText primary={text.name} />
              </ListItemButton>
            </ListItem>
          </Link>
        ))}
      </List>
    </div>
  );

  return (
    <Box sx={{ display: "flex", backgroundColor: "red" }}>
      <AppBar
        position="fixed"
        color="error"
        sx={{
          width: "100%", // Full width for AppBar
          height: "auto",
        }}
      >
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2 }}
          >
            <MenuIcon />
          </IconButton>
          <Typography variant="h6" noWrap component="div">
            PokeDex
          </Typography>
        </Toolbar>
      </AppBar>
      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{
          keepMounted: true, // Better open performance on mobile.
        }}
        sx={{
          "& .MuiDrawer-paper": {
            width: drawerWidth,
            backgroundColor: "white", // Optional: Set background color for drawer
          },
        }}
      >
        {drawer}
      </Drawer>
    </Box>
  );
}
