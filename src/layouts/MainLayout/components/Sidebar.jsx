import {
  Box,
  Divider,
  Drawer,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Toolbar,
  Typography,
} from "@mui/material";

import DashboardIcon from "@mui/icons-material/Dashboard";

import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";

import ReceiptIcon from "@mui/icons-material/Receipt";

import PeopleIcon from "@mui/icons-material/People";
import { useNavigate } from "react-router-dom";
import GridViewIcon from "@mui/icons-material/GridView";
import Inventory2Icon from "@mui/icons-material/Inventory2";
import LocalOfferIcon from "@mui/icons-material/LocalOffer";
import { useSelector } from "react-redux";
import QueryStatsIcon from "@mui/icons-material/QueryStats";

const drawerWidth = 260;

function Sidebar() {
  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const isAdmin = user?.role === "ADMIN";

  return (
    <Drawer
      variant="permanent"
      sx={{
        width: drawerWidth,
        flexShrink: 0,

        "& .MuiDrawer-paper": {
          width: drawerWidth,
          boxSizing: "border-box",
        },
      }}
    >
      <Toolbar />

      <Box sx={{ p: 2 }}>
        <Typography variant="subtitle2" color="text.secondary">
          MENU
        </Typography>
      </Box>

      <Divider />

      <List>
        {/* <ListItemButton>

                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Dashboard"
                    />

                </ListItemButton> */}

        <ListItemButton onClick={() => navigate("/rooms")}>
          <ListItemIcon>
            <MeetingRoomIcon />
          </ListItemIcon>

          <ListItemText primary="Rooms" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/invoices")}>
          <ListItemIcon>
            <ReceiptIcon />
          </ListItemIcon>

          <ListItemText primary="Invoices" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/areas")}>
          <ListItemIcon>
            <GridViewIcon />
          </ListItemIcon>

          <ListItemText primary="Areas" />
        </ListItemButton>

        <ListItemButton onClick={() => navigate("/products")}>
          <ListItemIcon>
            <Inventory2Icon />
          </ListItemIcon>

          <ListItemText primary="Products" />
        </ListItemButton>

        {isAdmin && (
          <ListItemButton onClick={() => navigate("/pointDiscounts")}>
            <ListItemIcon>
              <LocalOfferIcon />
            </ListItemIcon>

            <ListItemText primary="Point Discounts" />
          </ListItemButton>
        )}

        {isAdmin && (
          <ListItemButton onClick={() => navigate("/statistics")}>
            <ListItemIcon>
              <QueryStatsIcon />
            </ListItemIcon>

            <ListItemText primary="Statistics" />
          </ListItemButton>
        )}

        {/* <ListItemButton>

                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Members"
                    />

                </ListItemButton> */}
      </List>
    </Drawer>
  );
}

export default Sidebar;
