import {
    Alert,
    Box,
    Button,
    CircularProgress,
    FormControlLabel,
    Paper,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

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
    getAreaInfoApi,
    updateAreaApi,
} from "../services/areaApi";

function AreaUpdatePage() {

    const { areaId } =
        useParams();

    const navigate =
        useNavigate();

    const [loading,
        setLoading] =
        useState(true);

    const [submitting,
        setSubmitting] =
        useState(false);

    const [error,
        setError] =
        useState(null);

    const [formData,
        setFormData] =
        useState({
            areaName: "",
            description: "",
            isActive: true,
        });

    const [formErrors,
        setFormErrors] =
        useState({});

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

                    const area =
                        await getAreaInfoApi(
                            areaId
                        );

                    setFormData({
                        areaName:
                            area.areaName,

                        description:
                            area.description ||
                            "",

                        isActive:
                            area.isActive,
                    });

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

    const handleSwitchChange =
        (event) => {

            setFormData(
                prev => ({
                    ...prev,
                    isActive:
                        event.target.checked,
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

                setSubmitting(
                    true
                );

                const area =
                    await updateAreaApi(
                        areaId,
                        {
                            areaName:
                                formData.areaName.trim(),

                            description:
                                formData.description.trim(),

                            isActive:
                                formData.isActive,
                        }
                    );

                alert(
                    `Cập nhật khu vực ${area.areaName} thành công`
                );

                navigate(
                    `/areas/detail/${area.id}`
                );

            } catch (error) {

                alert(
                    error.response
                        ?.data
                        ?.message
                );

            } finally {

                setSubmitting(
                    false
                );
            }
        };

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
                    <EditIcon />

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{fontWeight: 700}}
                    >
                        Cập nhật khu vực
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

                        <FormControlLabel
                            control={
                                <Switch
                                    checked={
                                        formData.isActive
                                    }
                                    onChange={
                                        handleSwitchChange
                                    }
                                />
                            }
                            label="Đang hoạt động"
                        />

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={
                                submitting
                            }
                            sx={{
                                py: 1.5,
                                textTransform:
                                    "none",
                                fontWeight:
                                    700,
                            }}
                        >
                            {submitting
                                ? (
                                    <CircularProgress
                                        size={
                                            24
                                        }
                                        color="inherit"
                                    />
                                )
                                : "Cập nhật khu vực"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

export default AreaUpdatePage;