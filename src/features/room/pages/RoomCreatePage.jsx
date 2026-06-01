import {
    Alert,
    Box,
    Button,
    CircularProgress,
    MenuItem,
    Paper,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import AddHomeIcon
    from "@mui/icons-material/AddHome";

import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    createRoomApi,
} from "../services/roomApi";

import {
    getAreasApi,
} from "../../area/services/areaApi";

function RoomCreatePage() {

    const navigate =
        useNavigate();

    const [areas,
        setAreas] =
        useState([]);

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
            roomNumber: "",
            capacity: "",
            hourlyRate: "",
            areaId: "",
        });

    const [formErrors,
        setFormErrors] =
        useState({});

useEffect(() => {

    const fetchAreas =
        async () => {

            try {

                const response =
                    await getAreasApi(
                        true
                    );

                setAreas(
                    response.result
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

    fetchAreas();

}, []);

    const handleChange =
        (event) => {

            const {
                name,
                value,
            } = event.target;

            setFormData(
                (
                    prev
                ) => ({
                    ...prev,
                    [name]:
                        value,
                })
            );

            setFormErrors(
                (
                    prev
                ) => ({
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

            if (
                !formData.roomNumber
            ) {

                errors.roomNumber =
                    "Số phòng không được để trống";

            } else if (
                Number(
                    formData.roomNumber
                ) < 1
            ) {

                errors.roomNumber =
                    "Số phòng phải lớn hơn hoặc bằng 1";
            }

            if (
                !formData.capacity
            ) {

                errors.capacity =
                    "Sức chứa không được để trống";

            } else if (
                Number(
                    formData.capacity
                ) < 1
            ) {

                errors.capacity =
                    "Sức chứa phải lớn hơn hoặc bằng 1";
            }

            if (
                formData.hourlyRate ===
                ""
            ) {

                errors.hourlyRate =
                    "Giá giờ không được để trống";

            } else if (
                Number(
                    formData.hourlyRate
                ) < 0
            ) {

                errors.hourlyRate =
                    "Giá giờ không được âm";
            }

            if (
                !formData.areaId
            ) {

                errors.areaId =
                    "Vui lòng chọn khu vực";
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

                const room =
                    await createRoomApi(
                        {
                            roomNumber:
                                Number(
                                    formData.roomNumber
                                ),

                            capacity:
                                Number(
                                    formData.capacity
                                ),

                            hourlyRate:
                                Number(
                                    formData.hourlyRate
                                ),

                            areaId:
                                Number(
                                    formData.areaId
                                ),
                        }
                    );

                alert(
                    `Tạo phòng ${room.roomNumber} thành công`
                );

                navigate(
                    `/rooms/detail/${room.id}`
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
                >
                    <AddHomeIcon />

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Tạo mới phòng
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
                            label="Số phòng"
                            name="roomNumber"
                            value={
                                formData.roomNumber
                            }
                            onChange={
                                handleChange
                            }
                            error={
                                !!formErrors.roomNumber
                            }
                            helperText={
                                formErrors.roomNumber
                            }
                            fullWidth
                        />

                        <TextField
                            label="Sức chứa"
                            name="capacity"
                            value={
                                formData.capacity
                            }
                            onChange={
                                handleChange
                            }
                            error={
                                !!formErrors.capacity
                            }
                            helperText={
                                formErrors.capacity
                            }
                            fullWidth
                        />

                        <TextField
                            label="Giá giờ"
                            name="hourlyRate"
                            value={
                                formData.hourlyRate
                            }
                            onChange={
                                handleChange
                            }
                            error={
                                !!formErrors.hourlyRate
                            }
                            helperText={
                                formErrors.hourlyRate
                            }
                            fullWidth
                        />

                        <TextField
                            select
                            label="Khu vực"
                            name="areaId"
                            value={
                                formData.areaId
                            }
                            onChange={
                                handleChange
                            }
                            error={
                                !!formErrors.areaId
                            }
                            helperText={
                                formErrors.areaId
                            }
                            fullWidth
                        >
                            {areas.map(
                                (
                                    area
                                ) => (
                                    <MenuItem
                                        key={
                                            area.id
                                        }
                                        value={
                                            area.id
                                        }
                                    >
                                        {
                                            area.areaName
                                        }
                                    </MenuItem>
                                )
                            )}
                        </TextField>

                        <Button
                            type="submit"
                            variant="contained"
                            size="large"
                            disabled={
                                submitting
                            }
                            sx={{
                                textTransform:
                                    "none",
                                py: 1.5,
                                fontWeight: 700,
                            }}
                        >
                            {submitting
                                ? "Đang tạo..."
                                : "Tạo phòng"}
                        </Button>
                    </Stack>
                </Box>
            </Paper>
        </Box>
    );
}

export default RoomCreatePage;