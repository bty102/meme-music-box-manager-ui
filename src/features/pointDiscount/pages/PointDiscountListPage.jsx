import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Dialog,
    DialogActions,
    DialogContent,
    DialogTitle,
    Grid,
    Stack,
    TextField,
    Typography,
} from "@mui/material";

import AddIcon
from "@mui/icons-material/Add";

import EditIcon
from "@mui/icons-material/Edit";

import DeleteIcon
from "@mui/icons-material/Delete";

import {
    useEffect,
    useState,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    fetchPointDiscounts,
} from "../store/pointDiscountThunk";

import {
    createPointDiscountApi,
    deletePointDiscountApi,
    updatePointDiscountApi,
} from "../services/pointDiscountApi";

function PointDiscountListPage() {

    const dispatch =
        useDispatch();

    const {
        pointDiscounts,
        loading,
        error,
    } = useSelector(
        state =>
            state.pointDiscount
    );

    const [
        openCreate,
        setOpenCreate,
    ] = useState(false);

    const [
        openUpdate,
        setOpenUpdate,
    ] = useState(false);

    const [
        selectedDiscount,
        setSelectedDiscount,
    ] = useState(null);

    const [
        createForm,
        setCreateForm,
    ] = useState({
        requiredPoint: "",
        discountPercent: "",
        description: "",
    });

    const [
        updateForm,
        setUpdateForm,
    ] = useState({
        requiredPoint: "",
        discountPercent: "",
        description: "",
    });

    const [
        errors,
        setErrors,
    ] = useState({});

    useEffect(() => {

        dispatch(
            fetchPointDiscounts()
        );

    }, [dispatch]);

    const validate =
        (form) => {

            const newErrors = {};

            if (
                form.requiredPoint === ""
            ) {

                newErrors.requiredPoint =
                    "Điểm yêu cầu không được để trống";

            } else if (
                Number(
                    form.requiredPoint
                ) < 0
            ) {

                newErrors.requiredPoint =
                    "Điểm yêu cầu phải >= 0";
            }

            if (
                form.discountPercent === ""
            ) {

                newErrors.discountPercent =
                    "Phần trăm giảm giá không được để trống";

            } else if (
                Number(
                    form.discountPercent
                ) < 0 ||

                Number(
                    form.discountPercent
                ) > 100
            ) {

                newErrors.discountPercent =
                    "Phần trăm giảm giá từ 0 đến 100";
            }

            if (
                form.description
                    ?.length > 255
            ) {

                newErrors.description =
                    "Mô tả tối đa 255 ký tự";
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

    const handleCreate =
        async () => {

            if (
                !validate(
                    createForm
                )
            ) {
                return;
            }

            if (
                !window.confirm(
                    "Bạn có chắc chắn muốn thêm ưu đãi?"
                )
            ) {
                return;
            }

            try {

                await createPointDiscountApi({

                    requiredPoint:
                        Number(
                            createForm.requiredPoint
                        ),

                    discountPercent:
                        Number(
                            createForm.discountPercent
                        ),

                    description:
                        createForm.description,
                });

                setOpenCreate(
                    false
                );

                setCreateForm({
                    requiredPoint: "",
                    discountPercent: "",
                    description: "",
                });

                dispatch(
                    fetchPointDiscounts()
                );

            } catch (error) {

                alert(
                    error.response
                        ?.data
                        ?.message
                );
            }
        };

    const handleUpdate =
        async () => {

            if (
                !validate(
                    updateForm
                )
            ) {
                return;
            }

            if (
                !window.confirm(
                    "Bạn có chắc chắn muốn cập nhật?"
                )
            ) {
                return;
            }

            try {

                await updatePointDiscountApi(

                    selectedDiscount.id,

                    {
                        requiredPoint:
                            Number(
                                updateForm.requiredPoint
                            ),

                        discountPercent:
                            Number(
                                updateForm.discountPercent
                            ),

                        description:
                            updateForm.description,
                    }
                );

                setOpenUpdate(
                    false
                );

                dispatch(
                    fetchPointDiscounts()
                );

            } catch (error) {

                alert(
                    error.response
                        ?.data
                        ?.message
                );
            }
        };

    const handleDelete =
        async (
            pointDiscountId
        ) => {

            if (
                !window.confirm(
                    "Bạn có chắc chắn muốn xóa ưu đãi?"
                )
            ) {
                return;
            }

            try {

                await deletePointDiscountApi(
                    pointDiscountId
                );

                dispatch(
                    fetchPointDiscounts()
                );

            } catch (error) {

                alert(
                    error.response
                        ?.data
                        ?.message
                );
            }
        };

    return (

        <Box
            sx={{
                p: 3,
            }}
        >

            <Stack
                sx={{
                    flexDirection:
                        "row",

                    justifyContent:
                        "space-between",

                    alignItems:
                        "center",

                    mb: 4,
                }}
            >

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Danh sách ưu đãi
                </Typography>

                <Button
                    variant="contained"
                    startIcon={
                        <AddIcon />
                    }
                    onClick={() =>
                        setOpenCreate(
                            true
                        )
                    }
                >
                    Thêm ưu đãi
                </Button>

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

            {loading ? (

                <Box
                    sx={{
                        display: "flex",
                        justifyContent:
                            "center",
                        mt: 5,
                    }}
                >
                    <CircularProgress />
                </Box>

            ) : (

                <Grid
                    container
                    spacing={3}
                >

                    {pointDiscounts.map(
                        discount => (

                            <Grid
                                item
                                xs={12}
                                md={6}
                                lg={4}
                                key={
                                    discount.id
                                }
                            >

                                <Card
                                    sx={{
                                        height:
                                            "100%",

                                        borderRadius:
                                            4,
                                    }}
                                >

                                    <CardContent>

                                        <Typography
                                            variant="h4"
                                            sx={{
                                                fontWeight:
                                                    700,

                                                color:
                                                    "primary.main",
                                            }}
                                        >
                                            {
                                                discount.discountPercent
                                            }%
                                        </Typography>

                                        <Typography
                                            sx={{
                                                mt: 1,
                                            }}
                                        >
                                            Điểm yêu cầu:
                                            {" "}
                                            {
                                                discount.requiredPoint
                                                    .toLocaleString()
                                            }
                                        </Typography>

                                        <Typography
                                            sx={{
                                                mt: 2,
                                                minHeight:
                                                    60,
                                            }}
                                        >
                                            {
                                                discount.description
                                            }
                                        </Typography>

                                        <Stack
                                            sx={{
                                                flexDirection:
                                                    "row",

                                                gap: 1,

                                                mt: 3,
                                            }}
                                        >

                                            <Button
                                                variant="outlined"
                                                startIcon={
                                                    <EditIcon />
                                                }
                                                onClick={() => {

                                                    setSelectedDiscount(
                                                        discount
                                                    );

                                                    setUpdateForm({

                                                        requiredPoint:
                                                            discount.requiredPoint,

                                                        discountPercent:
                                                            discount.discountPercent,

                                                        description:
                                                            discount.description,
                                                    });

                                                    setOpenUpdate(
                                                        true
                                                    );
                                                }}
                                            >
                                                Cập nhật
                                            </Button>

                                            <Button
                                                color="error"
                                                variant="contained"
                                                startIcon={
                                                    <DeleteIcon />
                                                }
                                                onClick={() =>
                                                    handleDelete(
                                                        discount.id
                                                    )
                                                }
                                            >
                                                Xóa
                                            </Button>

                                        </Stack>

                                    </CardContent>

                                </Card>

                            </Grid>
                        )
                    )}

                </Grid>

            )}

            <Dialog
                open={
                    openCreate
                }
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle>
                    Thêm ưu đãi
                </DialogTitle>

                <DialogContent>

                    <Stack
                        spacing={2}
                        sx={{
                            mt: 1,
                        }}
                    >

                        <TextField
                            label="Điểm yêu cầu"
                            type="number"
                            value={
                                createForm.requiredPoint
                            }
                            onChange={e =>
                                setCreateForm(
                                    prev => ({
                                        ...prev,
                                        requiredPoint:
                                            e.target.value,
                                    })
                                )
                            }
                            error={
                                !!errors.requiredPoint
                            }
                            helperText={
                                errors.requiredPoint || " "
                            }
                        />

                        <TextField
                            label="Phần trăm giảm giá"
                            type="number"
                            value={
                                createForm.discountPercent
                            }
                            onChange={e =>
                                setCreateForm(
                                    prev => ({
                                        ...prev,
                                        discountPercent:
                                            e.target.value,
                                    })
                                )
                            }
                            error={
                                !!errors.discountPercent
                            }
                            helperText={
                                errors.discountPercent || " "
                            }
                        />

                        <TextField
                            label="Mô tả"
                            multiline
                            rows={4}
                            value={
                                createForm.description
                            }
                            onChange={e =>
                                setCreateForm(
                                    prev => ({
                                        ...prev,
                                        description:
                                            e.target.value,
                                    })
                                )
                            }
                            error={
                                !!errors.description
                            }
                            helperText={
                                errors.description || " "
                            }
                        />

                    </Stack>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() =>
                            setOpenCreate(
                                false
                            )
                        }
                    >
                        Hủy
                    </Button>

                    <Button
                        variant="contained"
                        onClick={
                            handleCreate
                        }
                    >
                        Thêm
                    </Button>

                </DialogActions>

            </Dialog>

            <Dialog
                open={
                    openUpdate
                }
                fullWidth
                maxWidth="sm"
            >

                <DialogTitle>
                    Cập nhật ưu đãi
                </DialogTitle>

                <DialogContent>

                    <Stack
                        spacing={2}
                        sx={{
                            mt: 1,
                        }}
                    >

                        <TextField
                            label="Điểm yêu cầu"
                            type="number"
                            value={
                                updateForm.requiredPoint
                            }
                            onChange={e =>
                                setUpdateForm(
                                    prev => ({
                                        ...prev,
                                        requiredPoint:
                                            e.target.value,
                                    })
                                )
                            }
                            error={
                                !!errors.requiredPoint
                            }
                            helperText={
                                errors.requiredPoint || " "
                            }
                        />

                        <TextField
                            label="Phần trăm giảm giá"
                            type="number"
                            value={
                                updateForm.discountPercent
                            }
                            onChange={e =>
                                setUpdateForm(
                                    prev => ({
                                        ...prev,
                                        discountPercent:
                                            e.target.value,
                                    })
                                )
                            }
                            error={
                                !!errors.discountPercent
                            }
                            helperText={
                                errors.discountPercent || " "
                            }
                        />

                        <TextField
                            label="Mô tả"
                            multiline
                            rows={4}
                            value={
                                updateForm.description
                            }
                            onChange={e =>
                                setUpdateForm(
                                    prev => ({
                                        ...prev,
                                        description:
                                            e.target.value,
                                    })
                                )
                            }
                            error={
                                !!errors.description
                            }
                            helperText={
                                errors.description || " "
                            }
                        />

                    </Stack>

                </DialogContent>

                <DialogActions>

                    <Button
                        onClick={() =>
                            setOpenUpdate(
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
                    >
                        Cập nhật
                    </Button>

                </DialogActions>

            </Dialog>

        </Box>
    );
}

export default PointDiscountListPage;
