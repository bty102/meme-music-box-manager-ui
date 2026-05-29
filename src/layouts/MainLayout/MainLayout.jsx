import {
    Box,
    Toolbar
} from "@mui/material";

import Header
from "./components/Header";

import Sidebar
from "./components/Sidebar";

function MainLayout({ children }) {

    return (

        <Box sx={{ display: "flex" }}>

            <Header />

            <Sidebar />

            <Box
                component="main"
                sx={{
                    flexGrow: 1,
                    p: 3,
                    bgcolor: "#f5f5f5",
                    minHeight: "100vh"
                }}
            >

                <Toolbar />

                {children}

            </Box>

        </Box>
    );
}

export default MainLayout;