import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import GridViewIcon
    from "@mui/icons-material/GridView";

import EditIcon
    from "@mui/icons-material/Edit";

import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    useSelector,
} from "react-redux";

import {
    getAreaInfoApi,
} from "../services/areaApi";

function AreaDetailPage() {

    const { areaId } =
        useParams();

    const navigate =
        useNavigate();

    const user =
        useSelector(
            state =>
                state.auth.user
        );

    const isAdmin =
        user?.role ===
        "ADMIN";

    const [area,
        setArea] =
        useState(null);

    const [loading,
        setLoading] =
        useState(true);

    const [error,
        setError] =
        useState(null);

    useEffect(() => {

        const fetchArea =
            async () => {

                try {

                    setLoading(
                        true
                    );

                    setError(
                        null
                    );

                    const response =
                        await getAreaInfoApi(
                            areaId
                        );

                    setArea(
                        response
                    );

                } catch (error) {

                    setError(
                        error.response
                            ?.data
                            ?.message
                    );

                } finally {

                    setLoading(
                        false
                    );
                }
            };

        fetchArea();

    }, [areaId]);

    if (loading) {

        return (
            <Box
                sx={{
                    display:
                        "flex",
                    justifyContent:
                        "center",
                    alignItems:
                        "center",
                    minHeight:
                        "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    return (
        <Box
            sx={{
                p: 3,
                minHeight:
                    "100vh",
                bgcolor:
                    "#f5f7fb",
            }}
        >
            <Paper
                elevation={0}
                sx={{
                    maxWidth:
                        900,
                    mx: "auto",
                    p: 4,
                    borderRadius:
                        4,
                    border:
                        "1px solid #e2e8f0",
                }}
            >
                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={3}
                    sx={{justifyContent: "space-between", alignItems: "center", mb: 3}}
                >
                    <Stack
                        direction="row"
                        spacing={1}
                        alignItems="center"
                        sx={{alignItems: "center"}}
                    >
                        <GridViewIcon />

                        <Typography
                            variant="h5"
                            fontWeight={700}
                            sx={{fontWeight: 700}}
                        >
                            Chi tiết khu vực
                        </Typography>
                    </Stack>

                    {isAdmin && (
                        <Button
                            variant="contained"
                            startIcon={
                                <EditIcon />
                            }
                            onClick={() =>
                                navigate(
                                    `/areas/update/${area.id}`
                                )
                            }
                            sx={{
                                textTransform:
                                    "none",
                            }}
                        >
                            Cập nhật
                        </Button>
                    )}
                </Stack>

                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 3,
                        }}
                    >
                        {error}
                    </Alert>
                )}

                {area && (
                    <Stack
                        spacing={3}
                    >
                        <Box>
                            <Typography
                                color="text.secondary"
                                mb={1}
                                sx={{mb: 1}}
                            >
                                ID khu vực
                            </Typography>

                            <Typography
                                fontWeight={700}
                                sx={{fontWeight: 700}}
                            >
                                {area.id}
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                color="text.secondary"
                                mb={1}
                                sx={{mb: 1}}
                            >
                                Tên khu vực
                            </Typography>

                            <Typography
                                fontWeight={700}
                                fontSize={20}
                                sx={{fontWeight: 700, fontSize: 20}}
                            >
                                {
                                    area.areaName
                                }
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                color="text.secondary"
                                mb={1}
                                sx={{mb: 1}}
                            >
                                Mô tả
                            </Typography>

                            <Typography>
                                {
                                    area.description
                                }
                            </Typography>
                        </Box>

                        <Box>
                            <Typography
                                color="text.secondary"
                                mb={1}
                                sx={{mb: 1}}
                            >
                                Trạng thái
                            </Typography>

                            <Chip
                                label={
                                    area.isActive
                                        ? "Đang hoạt động"
                                        : "Ngưng hoạt động"
                                }
                                color={
                                    area.isActive
                                        ? "success"
                                        : "error"
                                }
                            />
                        </Box>
                    </Stack>
                )}
            </Paper>
        </Box>
    );
}

export default AreaDetailPage;