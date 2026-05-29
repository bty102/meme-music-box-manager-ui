import {
    AppBar,
    Avatar,
    Box,
    Button,
    Toolbar,
    Typography
} from "@mui/material";

import LogoutIcon
from "@mui/icons-material/Logout";

import {
    useDispatch,
    useSelector
} from "react-redux";

import { logout }
from "../../../features/auth/store/authThunk";
import { useNavigate } from "react-router-dom";

function Header() {

    const dispatch = useDispatch();

    const user = useSelector(
        state => state.auth.user
    );

    const navigate = useNavigate();

    const isEmployee =
        user?.role === "EMPLOYEE";

    const displayName = isEmployee
        ? user?.employeeProfile?.fullName
        : user?.email;

    const avatarUrl = isEmployee
        ? user?.employeeProfile?.imageUrl
        : null;

    const handleLogout = async () => {
        await dispatch(logout());

        navigate("/login");
    };

    // console.log("User in Header:", user);
    // console.log("Display Name:", displayName);
    // console.log("Avatar URL:", avatarUrl);

    return (

        <AppBar
            position="fixed"
            sx={{
                zIndex: (theme) =>
                    theme.zIndex.drawer + 1
            }}
        >

            <Toolbar>

                <Typography
                    variant="h6"
                    sx={{
                        flexGrow: 1,
                        fontWeight: 700
                    }}
                >
                    🎤 MeMe Music Box
                </Typography>

                <Box
                    sx={{
                        display: "flex",
                        alignItems: "center",
                        gap: 2
                    }}
                >

                    <Avatar src={avatarUrl} onClick={() => navigate("/me")} sx={{ cursor: "pointer" }}>
                        {
                            displayName
                                ?.charAt(0)
                                ?.toUpperCase()
                        }
                    </Avatar>

                    <Box>

                        <Typography
                            variant="body1"
                            fontWeight="bold"
                        >
                            {displayName}
                        </Typography>

                        <Typography
                            variant="caption"
                        >
                            {user?.role}
                        </Typography>

                    </Box>

                    <Button
                        color="inherit"
                        startIcon={<LogoutIcon />}
                        onClick={handleLogout}
                    >
                        Logout
                    </Button>

                </Box>

            </Toolbar>

        </AppBar>
    );
}

export default Header;