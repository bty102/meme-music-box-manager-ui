import {
    Alert,
    Avatar,
    Box,
    Button,
    Card,
    CardContent,
    Chip,
    CircularProgress,
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
    Typography,
} from "@mui/material";

import EditIcon
from "@mui/icons-material/Edit";

import {
    useEffect,
    useState,
} from "react";

import {
    useParams,
} from "react-router-dom";

import {
    useSelector,
} from "react-redux";

import {
    getMemberDetailApi,
    updateMemberProfileApi,
} from "../services/memberApi";

const DEFAULT_AVATAR =
    "https://ui-avatars.com/api/?background=random&size=256&name=Member";

function MemberDetailPage() {

    const { memberAccountId } =
        useParams();

    const user =
        useSelector(
            state => state.auth.user
        );

    const isAdmin =
        user?.role === "ADMIN";

    const [
        member,
        setMember,
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
        openUpdateDialog,
        setOpenUpdateDialog,
    ] = useState(false);

    const [
        updating,
        setUpdating,
    ] = useState(false);

    const [
        formData,
        setFormData,
    ] = useState({
        fullName: "",
        isMale: true,
        dateOfBirth: "",
    });

    const [
        formErrors,
        setFormErrors,
    ] = useState({});

    useEffect(() => {

        fetchMember();

    }, [memberAccountId]);

    const fetchMember =
        async () => {

            try {

                setLoading(
                    true
                );

                const result =
                    await getMemberDetailApi(
                        memberAccountId
                    );

                setMember(
                    result
                );

            } catch (error) {

                setError(
                    error.response?.data?.message
                );

            } finally {

                setLoading(
                    false
                );
            }
        };

    const openUpdateModal =
        () => {

            setFormData({
                fullName:
                    member.memberProfile.fullName,

                isMale:
                    member.memberProfile.isMale,

                dateOfBirth:
                    member.memberProfile.dateOfBirth,
            });

            setFormErrors(
                {}
            );

            setOpenUpdateDialog(
                true
            );
        };

    const validate =
        () => {

            const errors = {};

            if (
                !formData.fullName?.trim()
            ) {

                errors.fullName =
                    "Họ tên không được để trống";

            } else if (
                formData.fullName.length < 1
            ) {

                errors.fullName =
                    "Họ tên không hợp lệ";
            }

            if (
                !formData.dateOfBirth
            ) {

                errors.dateOfBirth =
                    "Ngày sinh không được để trống";
            }

            setFormErrors(
                errors
            );

            return (
                Object.keys(errors)
                    .length === 0
            );
        };

    const handleUpdate =
        async () => {

            if (
                !validate()
            ) {
                return;
            }

            if (
                !window.confirm(
                    "Bạn có chắc chắn muốn cập nhật hồ sơ hội viên?"
                )
            ) {
                return;
            }

            try {

                setUpdating(
                    true
                );

                await updateMemberProfileApi(
                    member.memberProfile.id,
                    formData
                );

                await fetchMember();

                setOpenUpdateDialog(
                    false
                );

                alert(
                    "Cập nhật thành công"
                );

            } catch (error) {

                alert(
                    error.response?.data?.message
                );

            } finally {

                setUpdating(
                    false
                );
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

        <Box
            sx={{
                p: 3,
                maxWidth: 1000,
                mx: "auto",
            }}
        >

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 3,
                }}
            >
                Thông tin hội viên
            </Typography>

            <Card
                sx={{
                    borderRadius: 4,
                }}
            >

                <CardContent>

                    <Stack
                        sx={{
                            alignItems: "center",
                            mb: 4,
                        }}
                    >

                        <Avatar
                            src={
                                member.memberProfile.imageUrl ||
                                DEFAULT_AVATAR
                            }
                            sx={{
                                width: 160,
                                height: 160,
                                mb: 2,
                            }}
                        />

                        <Typography
                            variant="h5"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            {
                                member.memberProfile.fullName
                            }
                        </Typography>

                        <Typography
                            color="text.secondary"
                        >
                            {
                                member.email
                            }
                        </Typography>

                    </Stack>

                    <Box
                        sx={{
                            display: "grid",
                            gridTemplateColumns:
                                {
                                    xs: "1fr",
                                    md: "1fr 1fr",
                                },
                            gap: 2,
                        }}
                    >

                        <InfoItem
                            label="Mã hội viên"
                            value={
                                member.memberProfile.memberCode
                            }
                        />

                        <InfoItem
                            label="Email"
                            value={
                                member.email
                            }
                        />

                        <InfoItem
                            label="Giới tính"
                            value={
                                member.memberProfile.isMale
                                    ? "Nam"
                                    : "Nữ"
                            }
                        />

                        <InfoItem
                            label="Ngày sinh"
                            value={
                                member.memberProfile.dateOfBirth
                            }
                        />

                        <InfoItem
                            label="Điểm tích lũy"
                            value={
                                member.memberProfile.loyaltyPoint
                                    .toLocaleString()
                            }
                        />

                        <Box>

                            <Typography
                                color="text.secondary"
                            >
                                Trạng thái
                            </Typography>

                            <Chip
                                sx={{
                                    mt: 1,
                                }}
                                color={
                                    member.isActive
                                        ? "success"
                                        : "error"
                                }
                                label={
                                    member.isActive
                                        ? "Hoạt động"
                                        : "Đã khóa"
                                }
                            />

                        </Box>

                    </Box>

                    {isAdmin && (

                        <Button
                            variant="contained"
                            startIcon={
                                <EditIcon />
                            }
                            sx={{
                                mt: 4,
                            }}
                            onClick={
                                openUpdateModal
                            }
                        >
                            Cập nhật hồ sơ
                        </Button>

                    )}

                </CardContent>

            </Card>

            <Dialog
                open={
                    openUpdateDialog
                }
                fullWidth
                maxWidth="sm"
                onClose={() =>
                    setOpenUpdateDialog(
                        false
                    )
                }
            >

                <DialogTitle>
                    Cập nhật hồ sơ hội viên
                </DialogTitle>

                <DialogContent>

                    <Stack
                        spacing={3}
                        sx={{
                            mt: 1,
                        }}
                    >

                        <TextField
                            label="Họ và tên"
                            value={
                                formData.fullName
                            }
                            onChange={e =>
                                setFormData(
                                    prev => ({
                                        ...prev,
                                        fullName:
                                            e.target.value,
                                    })
                                )
                            }
                            error={
                                !!formErrors.fullName
                            }
                            helperText={
                                formErrors.fullName
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
                                value={
                                    formData.isMale
                                }
                                label="Giới tính"
                                onChange={e =>
                                    setFormData(
                                        prev => ({
                                            ...prev,
                                            isMale:
                                                e.target.value,
                                        })
                                    )
                                }
                            >

                                <MenuItem
                                    value={
                                        true
                                    }
                                >
                                    Nam
                                </MenuItem>

                                <MenuItem
                                    value={
                                        false
                                    }
                                >
                                    Nữ
                                </MenuItem>

                            </Select>

                        </FormControl>

                        <TextField
                            label="Ngày sinh"
                            type="date"
                            value={
                                formData.dateOfBirth
                            }
                            onChange={e =>
                                setFormData(
                                    prev => ({
                                        ...prev,
                                        dateOfBirth:
                                            e.target.value,
                                    })
                                )
                            }
                            error={
                                !!formErrors.dateOfBirth
                            }
                            helperText={
                                formErrors.dateOfBirth
                            }
                            InputLabelProps={{
                                shrink: true,
                            }}
                            fullWidth
                        />

                    </Stack>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() =>
                            setOpenUpdateDialog(
                                false
                            )
                        }
                    >
                        Hủy
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            handleUpdate
                        }
                        disabled={
                            updating
                        }
                    >
                        {
                            updating
                                ? "Đang cập nhật..."
                                : "Cập nhật"
                        }
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
}

function InfoItem({
    label,
    value,
}) {

    return (

        <Box>

            <Typography
                color="text.secondary"
                sx={{
                    mb: 0.5,
                }}
            >
                {label}
            </Typography>

            <Typography
                sx={{
                    fontWeight: 600,
                }}
            >
                {value}
            </Typography>

        </Box>

    );
}

export default MemberDetailPage;