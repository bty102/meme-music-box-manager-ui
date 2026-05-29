import {
    Box,
    Divider,
    Drawer,
    List,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    Toolbar,
    Typography
} from "@mui/material";

import DashboardIcon
from "@mui/icons-material/Dashboard";

import MeetingRoomIcon
from "@mui/icons-material/MeetingRoom";

import ReceiptIcon
from "@mui/icons-material/Receipt";

import PeopleIcon
from "@mui/icons-material/People";

const drawerWidth = 260;

function Sidebar() {

    return (

        <Drawer
            variant="permanent"
            sx={{
                width: drawerWidth,
                flexShrink: 0,

                "& .MuiDrawer-paper": {
                    width: drawerWidth,
                    boxSizing: "border-box"
                }
            }}
        >

            <Toolbar />

            <Box sx={{ p: 2 }}>

                <Typography
                    variant="subtitle2"
                    color="text.secondary"
                >
                    MENU
                </Typography>

            </Box>

            <Divider />

            <List>

                <ListItemButton>

                    <ListItemIcon>
                        <DashboardIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Dashboard"
                    />

                </ListItemButton>

                <ListItemButton>

                    <ListItemIcon>
                        <MeetingRoomIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Rooms"
                    />

                </ListItemButton>

                <ListItemButton>

                    <ListItemIcon>
                        <ReceiptIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Invoices"
                    />

                </ListItemButton>

                <ListItemButton>

                    <ListItemIcon>
                        <PeopleIcon />
                    </ListItemIcon>

                    <ListItemText
                        primary="Members"
                    />

                </ListItemButton>

            </List>

        </Drawer>
    );
}

export default Sidebar;