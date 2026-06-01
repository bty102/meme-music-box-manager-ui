import {
    Alert,
    Box,
    Button,
    CircularProgress,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon
    from "@mui/icons-material/Add";

import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    createAreaApi,
} from "../services/areaApi";

function AreaCreatePage() {

    const navigate =
        useNavigate();

    const [loading,
        setLoading] =
        useState(false);

    const [error,
        setError] =
        useState(null);

    const [formData,
        setFormData] =
        useState({
            areaName: "",
            description: "",
        });

    const [formErrors,
        setFormErrors] =
        useState({});

    const handleChange =
        (event) => {

            const {
                name,
                value,
            } = event.target;

            setFormData(
                prev => ({
                    ...prev,
                    [name]:
                        value,
                })
            );

            setFormErrors(
                prev => ({
                    ...prev,
                    [name]:
                        "",
                })
            );
        };

    const validateForm =
        () => {

            const errors =
                {};

            const areaName =
                formData.areaName
                    ?.trim();

            const description =
                formData.description
                    ?.trim();

            if (
                !areaName
            ) {

                errors.areaName =
                    "Tên khu vực không được để trống";

            } else if (
                areaName.length < 1 ||
                areaName.length > 100
            ) {

                errors.areaName =
                    "Tên khu vực phải từ 1 đến 100 ký tự";
            }

            if (
                description.length >
                255
            ) {

                errors.description =
                    "Mô tả tối đa 255 ký tự";
            }

            setFormErrors(
                errors
            );

            return (
                Object.keys(
                    errors
                ).length === 0
            );
        };

    const handleSubmit =
        async (
            event
        ) => {

            event.preventDefault();

            if (
                !validateForm()
            ) {
                return;
            }

            try {

                setLoading(
                    true
                );

                setError(
                    null
                );

                const area =
                    await createAreaApi({
                        areaName:
                            formData.areaName.trim(),

                        description:
                            formData.description.trim(),
                    });

                alert(
                    `Tạo khu vực ${area.areaName} thành công`
                );

                navigate(
                    `/areas/detail/${area.id}`
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
                        800,
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
                    spacing={1}
                    alignItems="center"
                    mb={3}
                    sx={{alignItems: "center", mb: 3}}
                >
                    <AddIcon />

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{fontWeight: 700}}
                    >
                        Tạo mới khu vực
                    </Typography>
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

                <Box
                    component="form"
                    onSubmit={
                        handleSubmit
                    }
                >
                    <Stack
                        spacing={3}
                    >
                        <TextField
                            label="Tên khu vực"
                            name="areaName"
                            value={
                                formData.areaName
                            }
                            onChange={
                                handleChange
                            }
                            error={
                                !!formErrors.areaName
                            }
                            helperText={
                                formErrors.areaName
                            }
                            fullWidth
                        />

                        <TextField
                            label="Mô tả"
                            name="description"
                            value={
                                formData.description
                            }
                            onChange={
                                handleChange
                            }
                            error={
                                !!formErrors.description
                            }
                            helperText={
                                formErrors.description
                            }
                            multiline
                            rows={4}
                            fullWidth
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={
                                loading
                            }
                            sx={{
                                py: 1.5,
                                textTransform:
                                    "none",
                                fontWeight:
                                    700,
                            }}
                        >
                            {loading
                                ? (
                                    <CircularProgress
                                        size={
                                            24
                                        }
                                        color="inherit"
                                    />
                                )
                                : "Tạo khu vực"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

export default AreaCreatePage;