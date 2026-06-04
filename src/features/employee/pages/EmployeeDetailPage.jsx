import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import EditIcon
from "@mui/icons-material/Edit";

import ManageAccountsIcon
from "@mui/icons-material/ManageAccounts";

import PersonIcon
from "@mui/icons-material/Person";

import BadgeIcon
from "@mui/icons-material/Badge";

import EmailIcon
from "@mui/icons-material/Email";

import PhoneIcon
from "@mui/icons-material/Phone";

import HomeIcon
from "@mui/icons-material/Home";

import CalendarMonthIcon
from "@mui/icons-material/CalendarMonth";

import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import {
    getEmployeeDetailApi,
    updateEmployeeAccountApi,
    updateEmployeeProfileApi,
} from "../services/employeeApi";

import EmployeeProfileUpdateDialog
from "../components/EmployeeProfileUpdateDialog";

import EmployeeAccountUpdateDialog
from "../components/EmployeeAccountUpdateDialog";

import {
    formatDateTime,
} from "../../../util/formatDateTime";

const DEFAULT_AVATAR =
    "https://ui-avatars.com/api/?background=random&size=300&name=Employee";

function EmployeeDetailPage() {

    const { employeeId } =
        useParams();

    const [
        employee,
        setEmployee,
    ] = useState(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState(null);

    const [
        updating,
        setUpdating,
    ] = useState(false);

    const [
        profileDialogOpen,
        setProfileDialogOpen,
    ] = useState(false);

    const [
        accountDialogOpen,
        setAccountDialogOpen,
    ] = useState(false);

    useEffect(() => {

        fetchEmployee();

    }, [employeeId]);

    const fetchEmployee =
        async () => {

            try {

                setLoading(true);

                const result =
                    await getEmployeeDetailApi(
                        employeeId
                    );

                setEmployee(
                    result
                );

            } catch (error) {

                setError(
                    error.response
                        ?.data
                        ?.message ||
                    "Không thể tải thông tin nhân viên"
                );

            } finally {

                setLoading(false);
            }
        };

    const handleUpdateProfile =
        async (formData) => {

            if (
                !window.confirm(
                    "Bạn có chắc chắn muốn cập nhật hồ sơ nhân viên?"
                )
            ) {
                return;
            }

            try {

                setUpdating(true);

                await updateEmployeeProfileApi(
                    employee.employeeProfile.id,
                    formData
                );

                await fetchEmployee();

                setProfileDialogOpen(
                    false
                );

                alert(
                    "Cập nhật hồ sơ thành công"
                );

            } catch (error) {

                alert(
                    error.response
                        ?.data
                        ?.message
                );

            } finally {

                setUpdating(false);
            }
        };

    const handleUpdateAccount =
        async (formData) => {

            if (
                !window.confirm(
                    "Bạn có chắc chắn muốn cập nhật tài khoản nhân viên?"
                )
            ) {
                return;
            }

            try {

                setUpdating(true);

                await updateEmployeeAccountApi(
                    employee.id,
                    formData
                );

                await fetchEmployee();

                setAccountDialogOpen(
                    false
                );

                alert(
                    "Cập nhật tài khoản thành công"
                );

            } catch (error) {

                alert(
                    error.response
                        ?.data
                        ?.message
                );

            } finally {

                setUpdating(false);
            }
        };

    if (loading) {

        return (
            <Box
                sx={{
                    display: "flex",
                    justifyContent: "center",
                    py: 10,
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    if (error) {

        return (
            <Alert severity="error">
                {error}
            </Alert>
        );
    }

    return (

        <Box sx={{ p: 3 }}>

            <Paper
                elevation={3}
                sx={{
                    p: 4,
                    borderRadius: 4,
                }}
            >

                <Stack
                    sx={{
                        alignItems: "center",
                        mb: 4,
                    }}
                >

                    <Avatar
                        src={
                            employee.employeeProfile.imageUrl ||
                            DEFAULT_AVATAR
                        }
                        sx={{
                            width: 180,
                            height: 180,
                            mb: 2,
                        }}
                    />

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            textAlign: "center",
                        }}
                    >
                        {
                            employee.employeeProfile.fullName
                        }
                    </Typography>

                    <Typography
                        color="text.secondary"
                    >
                        {
                            employee.employeeProfile.employeeCode
                        }
                    </Typography>

                    <Chip
                        sx={{
                            mt: 2,
                        }}
                        color={
                            employee.isActive
                                ? "success"
                                : "error"
                        }
                        label={
                            employee.isActive
                                ? "Đang hoạt động"
                                : "Ngưng hoạt động"
                        }
                    />

                </Stack>

                <Divider sx={{ mb: 3 }} />

                <Stack spacing={3}>

                    <Card>

                        <CardContent>

                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 2,
                                    fontWeight: 700,
                                }}
                            >
                                Hồ sơ nhân viên
                            </Typography>

                            <Stack spacing={1.5}>

                                <Typography>
                                    <PersonIcon
                                        sx={{
                                            mr: 1,
                                            verticalAlign:
                                                "middle",
                                        }}
                                    />
                                    {
                                        employee.employeeProfile.fullName
                                    }
                                </Typography>

                                <Typography>
                                    <PhoneIcon
                                        sx={{
                                            mr: 1,
                                            verticalAlign:
                                                "middle",
                                        }}
                                    />
                                    {
                                        employee.employeeProfile.phoneNumber
                                    }
                                </Typography>

                                <Typography>
                                    <BadgeIcon
                                        sx={{
                                            mr: 1,
                                            verticalAlign:
                                                "middle",
                                        }}
                                    />
                                    {
                                        employee.employeeProfile.nationalId
                                    }
                                </Typography>

                                <Typography>
                                    <CalendarMonthIcon
                                        sx={{
                                            mr: 1,
                                            verticalAlign:
                                                "middle",
                                        }}
                                    />
                                    {
                                        employee.employeeProfile.dateOfBirth
                                    }
                                </Typography>

                                <Typography>
                                    <HomeIcon
                                        sx={{
                                            mr: 1,
                                            verticalAlign:
                                                "middle",
                                        }}
                                    />
                                    {
                                        employee.employeeProfile.address
                                    }
                                </Typography>

                                <Typography>
                                    Giới tính:
                                    {" "}
                                    {
                                        employee.employeeProfile.isMale
                                            ? "Nam"
                                            : "Nữ"
                                    }
                                </Typography>

                            </Stack>

                        </CardContent>

                    </Card>

                    <Card>

                        <CardContent>

                            <Typography
                                variant="h6"
                                sx={{
                                    mb: 2,
                                    fontWeight: 700,
                                }}
                            >
                                Tài khoản
                            </Typography>

                            <Stack spacing={1.5}>

                                <Typography>
                                    <EmailIcon
                                        sx={{
                                            mr: 1,
                                            verticalAlign:
                                                "middle",
                                        }}
                                    />
                                    {
                                        employee.email
                                    }
                                </Typography>

                                <Typography>
                                    Role:
                                    {" "}
                                    {
                                        employee.role
                                    }
                                </Typography>

                                <Typography>
                                    Ngày tạo:
                                    {" "}
                                    {
                                        formatDateTime(
                                            employee.createdAt
                                        )
                                    }
                                </Typography>

                            </Stack>

                        </CardContent>

                    </Card>

                </Stack>

                <Stack
                    direction="row"
                    spacing={2}
                    sx={{
                        mt: 4,
                    }}
                >

                    <Button
                        variant="contained"
                        startIcon={
                            <EditIcon />
                        }
                        onClick={() =>
                            setProfileDialogOpen(
                                true
                            )
                        }
                    >
                        Cập nhật hồ sơ
                    </Button>

                    <Button
                        variant="outlined"
                        startIcon={
                            <ManageAccountsIcon />
                        }
                        onClick={() =>
                            setAccountDialogOpen(
                                true
                            )
                        }
                    >
                        Cập nhật tài khoản
                    </Button>

                </Stack>

            </Paper>

            <EmployeeProfileUpdateDialog
                open={
                    profileDialogOpen
                }
                employeeProfile={
                    employee?.employeeProfile
                }
                loading={
                    updating
                }
                onClose={() =>
                    setProfileDialogOpen(
                        false
                    )
                }
                onSubmit={
                    handleUpdateProfile
                }
            />

            <EmployeeAccountUpdateDialog
                open={
                    accountDialogOpen
                }
                employee={
                    employee
                }
                loading={
                    updating
                }
                onClose={() =>
                    setAccountDialogOpen(
                        false
                    )
                }
                onSubmit={
                    handleUpdateAccount
                }
            />

        </Box>
    );
}

export default EmployeeDetailPage;