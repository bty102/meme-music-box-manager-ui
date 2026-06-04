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

function EmployeeAccountUpdateDialog({
    open,
    employee,
    loading,
    onClose,
    onSubmit,
}) {

    const [form, setForm] =
        useState({
            email: "",
            password: "",
            isActive: true,
        });

    const [errors, setErrors] =
        useState({});

    useEffect(() => {

        if (
            employee
        ) {

            setForm({
                email:
                    employee.email || "",

                password: "",

                isActive:
                    employee.isActive,
            });
        }

    }, [employee]);

    const validate =
        () => {

            const newErrors = {};

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

            if (
                form.isActive === null ||
                form.isActive === undefined
            ) {
                newErrors.isActive =
                    "Vui lòng chọn trạng thái";
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
            maxWidth="sm"
            fullWidth
            onClose={onClose}
        >

            <DialogTitle>
                Cập nhật tài khoản nhân viên
            </DialogTitle>

            <DialogContent>

                <Stack
                    spacing={2}
                    sx={{ mt: 1 }}
                >

                    <TextField
                        label="Email"
                        value={form.email}
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
                        label="Mật khẩu mới"
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

                    <FormControl
                        fullWidth
                    >

                        <InputLabel>
                            Trạng thái
                        </InputLabel>

                        <Select
                            label="Trạng thái"
                            value={
                                form.isActive
                            }
                            onChange={e =>
                                setForm({
                                    ...form,
                                    isActive:
                                        e.target.value,
                                })
                            }
                        >

                            <MenuItem value={true}>
                                Hoạt động
                            </MenuItem>

                            <MenuItem value={false}>
                                Ngưng hoạt động
                            </MenuItem>

                        </Select>

                    </FormControl>

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

export default EmployeeAccountUpdateDialog;