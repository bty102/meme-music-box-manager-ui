import { useState } from "react";

import {
    Box,
    Button,
    Card,
    CardContent,
    Container,
    TextField,
    Typography,
    Alert,
    CircularProgress
} from "@mui/material";

import {
    useDispatch,
    useSelector
} from "react-redux";

import {
    login,
    fetchMyInfo
} from "../store/authThunk";

import { useNavigate }
from "react-router-dom";

function LoginPage() {

    const dispatch = useDispatch();

    const navigate = useNavigate();

    const {
        loading,
        error
    } = useSelector(
        state => state.auth
    );

    const [email, setEmail] =
        useState("");

    const [password, setPassword] =
        useState("");

    const handleSubmit = async (e) => {

        e.preventDefault();

        const resultAction =
            await dispatch(
                login({
                    email,
                    password
                })
            );

        if (
            login.fulfilled.match(resultAction)
        ) {

            await dispatch(fetchMyInfo());

            navigate("/rooms");
            // alert("Login successful! You can now access the dashboard.");
        }
    };

    return (

        <Container
            maxWidth="sm"
            sx={{
                height: "100vh",
                display: "flex",
                alignItems: "center"
            }}
        >

            <Card
                sx={{
                    width: "100%",
                    borderRadius: 3,
                    boxShadow: 3
                }}
            >

                <CardContent
                    sx={{
                        p: 4
                    }}
                >

                    <Typography
                        variant="h4"
                        textAlign="center"
                        mb={4}
                        fontWeight="bold"
                        sx={{textAlign: "center", mb: 4, fontWeight: "bold"}}
                    >
                        Login
                    </Typography>

                    {
                        error && (
                            <Alert
                                severity="error"
                                sx={{ mb: 2 }}
                            >
                                {error}
                            </Alert>
                        )
                    }

                    <Box
                        component="form"
                        onSubmit={handleSubmit}
                    >

                        <TextField
                            fullWidth
                            label="Email"
                            type="email"
                            margin="normal"
                            value={email}
                            onChange={(e) =>
                                setEmail(
                                    e.target.value
                                )
                            }
                        />

                        <TextField
                            fullWidth
                            label="Password"
                            type="password"
                            margin="normal"
                            value={password}
                            onChange={(e) =>
                                setPassword(
                                    e.target.value
                                )
                            }
                        />

                        <Button
                            fullWidth
                            type="submit"
                            variant="contained"
                            size="large"
                            sx={{
                                mt: 3,
                                py: 1.5
                            }}
                            disabled={loading}
                        >

                            {
                                loading
                                    ? (
                                        <CircularProgress
                                            size={24}
                                            color="inherit"
                                        />
                                    )
                                    : "Login"
                            }

                        </Button>

                    </Box>

                </CardContent>

            </Card>

        </Container>
    );
}

export default LoginPage;