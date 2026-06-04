import {
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Stack,
    TextField,
} from "@mui/material";

import {
    useEffect,
    useState,
} from "react";

function EmployeeProfileUpdateDialog({
    open,
    employeeProfile,
    loading,
    onClose,
    onSubmit,
}) {

    const [form, setForm] =
        useState({
            fullName: "",
            phoneNumber: "",
            nationalId: "",
            isMale: true,
            dateOfBirth: "",
            address: "",
        });

    const [errors, setErrors] =
        useState({});

    useEffect(() => {

        if (
            employeeProfile
        ) {

            setForm({
                fullName:
                    employeeProfile.fullName || "",

                phoneNumber:
                    employeeProfile.phoneNumber || "",

                nationalId:
                    employeeProfile.nationalId || "",

                isMale:
                    employeeProfile.isMale,

                dateOfBirth:
                    employeeProfile.dateOfBirth || "",

                address:
                    employeeProfile.address || "",
            });
        }

    }, [employeeProfile]);

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
                form.isMale === null ||
                form.isMale === undefined
            ) {
                newErrors.isMale =
                    "Vui lòng chọn giới tính";
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
        () => {

            if (
                !validate()
            ) {
                return;
            }

            onSubmit(form);
        };

    return (

        <Dialog
            open={open}
            maxWidth="md"
            fullWidth
            onClose={onClose}
        >

            <DialogTitle>
                Cập nhật hồ sơ nhân viên
            </DialogTitle>

            <DialogContent>

                <Stack
                    spacing={2}
                    sx={{ mt: 1 }}
                >

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
                        value={form.phoneNumber}
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
                        value={form.nationalId}
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
                            value={form.isMale}
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
                        value={form.address}
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

                </Stack>

            </DialogContent>

            <DialogActions>

                <Button
                    onClick={onClose}
                >
                    Hủy
                </Button>

                <Button
                    variant="contained"
                    disabled={loading}
                    onClick={
                        handleSubmit
                    }
                >
                    Cập nhật
                </Button>

            </DialogActions>

        </Dialog>
    );
}

export default EmployeeProfileUpdateDialog;