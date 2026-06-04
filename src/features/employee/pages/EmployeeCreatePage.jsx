import {
    Alert,
    Box,
    Button,
    FormControl,
    InputLabel,
    MenuItem,
    Paper,
    Select,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import SaveIcon
from "@mui/icons-material/Save";

import {
    useState,
} from "react";

import {
    useNavigate,
} from "react-router-dom";

import {
    createEmployeeApi,
} from "../services/employeeApi";

function EmployeeCreatePage() {

    const navigate =
        useNavigate();

    const [loading,
        setLoading] =
        useState(false);

    const [error,
        setError] =
        useState(null);

    const [form,
        setForm] =
        useState({
            fullName: "",
            phoneNumber: "",
            nationalId: "",
            isMale: true,

            dateOfBirth:
                new Date()
                    .toISOString()
                    .split("T")[0],

            address: "",

            email: "",
            password: "",
        });

    const [errors,
        setErrors] =
        useState({});

    const validate =
        () => {

            const newErrors = {};

            if (
                !form.fullName.trim()
            ) {
                newErrors.fullName =
                    "Họ tên không được để trống";
            }
            else if (
                form.fullName.length > 100
            ) {
                newErrors.fullName =
                    "Tối đa 100 ký tự";
            }

            if (
                !form.phoneNumber.trim()
            ) {
                newErrors.phoneNumber =
                    "Số điện thoại không được để trống";
            }
            else if (
                form.phoneNumber.length > 20
            ) {
                newErrors.phoneNumber =
                    "Tối đa 20 ký tự";
            }

            if (
                !form.nationalId.trim()
            ) {
                newErrors.nationalId =
                    "CCCD không được để trống";
            }
            else if (
                form.nationalId.length > 12
            ) {
                newErrors.nationalId =
                    "Tối đa 12 ký tự";
            }

            if (
                !form.dateOfBirth
            ) {
                newErrors.dateOfBirth =
                    "Ngày sinh không được để trống";
            }

            if (
                form.address &&
                form.address.length > 255
            ) {
                newErrors.address =
                    "Tối đa 255 ký tự";
            }

            if (
                !form.email.trim()
            ) {
                newErrors.email =
                    "Email không được để trống";
            }

            if (
                !form.password.trim()
            ) {
                newErrors.password =
                    "Mật khẩu không được để trống";
            }
            else if (
                form.password.length < 6
            ) {
                newErrors.password =
                    "Mật khẩu tối thiểu 6 ký tự";
            }

            setErrors(
                newErrors
            );

            return (
                Object.keys(
                    newErrors
                ).length === 0
            );
        };

    const handleSubmit =
        async () => {

            if (
                !validate()
            ) {
                return;
            }

            if (
                !window.confirm(
                    "Bạn có chắc chắn muốn tạo nhân viên?"
                )
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

                await createEmployeeApi(
                    form
                );

                alert(
                    "Tạo nhân viên thành công"
                );

                navigate(
                    "/employees"
                );

            } catch (error) {

                setError(
                    error.response
                        ?.data
                        ?.message ||
                    "Tạo nhân viên thất bại"
                );

            } finally {

                setLoading(
                    false
                );
            }
        };

    return (

        <Box sx={{ p: 3 }}>

            <Paper
                elevation={3}
                sx={{
                    maxWidth: 900,
                    mx: "auto",
                    p: 4,
                    borderRadius: 4,
                }}
            >

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                        mb: 4,
                    }}
                >
                    Thêm nhân viên
                </Typography>

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

                <Stack spacing={3}>

                    <TextField
                        label="Họ và tên"
                        value={form.fullName}
                        onChange={e =>
                            setForm({
                                ...form,
                                fullName:
                                    e.target.value,
                            })
                        }
                        error={
                            !!errors.fullName
                        }
                        helperText={
                            errors.fullName
                        }
                        fullWidth
                    />

                    <TextField
                        label="Số điện thoại"
                        value={
                            form.phoneNumber
                        }
                        onChange={e =>
                            setForm({
                                ...form,
                                phoneNumber:
                                    e.target.value,
                            })
                        }
                        error={
                            !!errors.phoneNumber
                        }
                        helperText={
                            errors.phoneNumber
                        }
                        fullWidth
                    />

                    <TextField
                        label="CCCD"
                        value={
                            form.nationalId
                        }
                        onChange={e =>
                            setForm({
                                ...form,
                                nationalId:
                                    e.target.value,
                            })
                        }
                        error={
                            !!errors.nationalId
                        }
                        helperText={
                            errors.nationalId
                        }
                        fullWidth
                    />

                    <FormControl
                        fullWidth
                    >

                        <InputLabel>
                            Giới tính
                        </InputLabel>

                        <Select
                            label="Giới tính"
                            value={
                                form.isMale
                            }
                            onChange={e =>
                                setForm({
                                    ...form,
                                    isMale:
                                        e.target.value,
                                })
                            }
                        >

                            <MenuItem value={true}>
                                Nam
                            </MenuItem>

                            <MenuItem value={false}>
                                Nữ
                            </MenuItem>

                        </Select>

                    </FormControl>

                    <TextField
                        label="Ngày sinh"
                        type="date"
                        value={
                            form.dateOfBirth
                        }
                        onChange={e =>
                            setForm({
                                ...form,
                                dateOfBirth:
                                    e.target.value,
                            })
                        }
                        error={
                            !!errors.dateOfBirth
                        }
                        helperText={
                            errors.dateOfBirth
                        }
                        InputLabelProps={{
                            shrink: true,
                        }}
                        fullWidth
                    />

                    <TextField
                        label="Địa chỉ"
                        multiline
                        rows={3}
                        value={
                            form.address
                        }
                        onChange={e =>
                            setForm({
                                ...form,
                                address:
                                    e.target.value,
                            })
                        }
                        error={
                            !!errors.address
                        }
                        helperText={
                            errors.address
                        }
                        fullWidth
                    />

                    <TextField
                        label="Email"
                        value={
                            form.email
                        }
                        onChange={e =>
                            setForm({
                                ...form,
                                email:
                                    e.target.value,
                            })
                        }
                        error={
                            !!errors.email
                        }
                        helperText={
                            errors.email
                        }
                        fullWidth
                    />

                    <TextField
                        label="Mật khẩu"
                        type="password"
                        value={
                            form.password
                        }
                        onChange={e =>
                            setForm({
                                ...form,
                                password:
                                    e.target.value,
                            })
                        }
                        error={
                            !!errors.password
                        }
                        helperText={
                            errors.password
                        }
                        fullWidth
                    />

                    <Button
                        variant="contained"
                        size="large"
                        startIcon={
                            <SaveIcon />
                        }
                        disabled={
                            loading
                        }
                        onClick={
                            handleSubmit
                        }
                        sx={{
                            height: 52,
                            fontWeight: 700,
                        }}
                    >
                        {
                            loading
                                ? "Đang tạo..."
                                : "Tạo nhân viên"
                        }
                    </Button>

                </Stack>

            </Paper>

        </Box>
    );
}

export default EmployeeCreatePage;