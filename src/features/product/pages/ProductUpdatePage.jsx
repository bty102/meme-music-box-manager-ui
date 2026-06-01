import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    FormControlLabel,
    Stack,
    Switch,
    TextField,
    Typography,
} from "@mui/material";

import SaveIcon
from "@mui/icons-material/Save";

import {
    useEffect,
    useState,
} from "react";

import {
    useNavigate,
    useParams,
} from "react-router-dom";

import {
    getProductInfoApi,
    updateProductApi,
} from "../services/productApi";

function ProductUpdatePage() {

    const navigate =
        useNavigate();

    const { productId } =
        useParams();

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        saving,
        setSaving,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState(null);

    const [
        form,
        setForm,
    ] = useState({
        productCode: "",
        productName: "",
        unit: "",
        unitPrice: "",
        stockQuantity: "",
        isActive: true,
    });

    const [
        errors,
        setErrors,
    ] = useState({});

    useEffect(() => {

        const fetchProduct =
            async () => {

                try {

                    const result =
                        await getProductInfoApi(
                            productId
                        );

                    setForm({
                        productCode:
                            result.productCode,
                        productName:
                            result.productName,
                        unit:
                            result.unit,
                        unitPrice:
                            result.unitPrice,
                        stockQuantity:
                            result.stockQuantity,
                        isActive:
                            result.isActive,
                    });

                } catch (err) {

                    setError(
                        err.response
                            ?.data
                            ?.message
                    );

                } finally {

                    setLoading(
                        false
                    );
                }
            };

        fetchProduct();

    }, [productId]);

    const handleChange =
        (e) => {

            const {
                name,
                value,
            } = e.target;

            setForm(
                prev => ({
                    ...prev,
                    [name]: value,
                })
            );
        };

    const validate =
        () => {

            const newErrors = {};

            // productCode
            if (
                form.productCode === null ||
                form.productCode === undefined ||
                form.productCode.trim() === ""
            ) {

                newErrors.productCode =
                    "Mã sản phẩm không được để trống";

            } else if (
                form.productCode.length < 1 ||
                form.productCode.length > 20
            ) {

                newErrors.productCode =
                    "Mã sản phẩm phải từ 1 đến 20 ký tự";
            }

            // productName
            if (
                form.productName === null ||
                form.productName === undefined ||
                form.productName.trim() === ""
            ) {

                newErrors.productName =
                    "Tên sản phẩm không được để trống";

            } else if (
                form.productName.length < 1 ||
                form.productName.length > 100
            ) {

                newErrors.productName =
                    "Tên sản phẩm phải từ 1 đến 100 ký tự";
            }

            // unit
            if (
                form.unit === null ||
                form.unit === undefined ||
                form.unit.trim() === ""
            ) {

                newErrors.unit =
                    "Đơn vị không được để trống";

            } else if (
                form.unit.length < 1 ||
                form.unit.length > 20
            ) {

                newErrors.unit =
                    "Đơn vị phải từ 1 đến 20 ký tự";
            }

            // unitPrice
            if (
                form.unitPrice === "" ||
                form.unitPrice === null ||
                form.unitPrice === undefined
            ) {

                newErrors.unitPrice =
                    "Giá bán không được để trống";

            } else if (
                Number(
                    form.unitPrice
                ) < 0
            ) {

                newErrors.unitPrice =
                    "Giá bán phải >= 0";
            }

            // stockQuantity
            if (
                form.stockQuantity === "" ||
                form.stockQuantity === null ||
                form.stockQuantity === undefined
            ) {

                newErrors.stockQuantity =
                    "Tồn kho không được để trống";

            } else if (
                Number(
                    form.stockQuantity
                ) < 0
            ) {

                newErrors.stockQuantity =
                    "Tồn kho phải >= 0";
            }

            // isActive
            if (
                form.isActive === null ||
                form.isActive === undefined
            ) {

                newErrors.isActive =
                    "Trạng thái không hợp lệ";
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
        async (e) => {

            e.preventDefault();

            if (
                !validate()
            ) {
                return;
            }

            try {

                setSaving(
                    true
                );

                await updateProductApi(
                    productId,
                    {
                        ...form,
                        unitPrice:
                            Number(
                                form.unitPrice
                            ),
                        stockQuantity:
                            Number(
                                form.stockQuantity
                            ),
                    }
                );

                alert(
                    "Cập nhật sản phẩm thành công"
                );

                navigate(
                    `/products/detail/${productId}`
                );

            } catch (err) {

                alert(
                    err.response
                        ?.data
                        ?.message
                );

            } finally {

                setSaving(
                    false
                );
            }
        };

    if (loading) {

        return (
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
        );
    }

    return (

        <Box
            sx={{
                p: 3,

                display: "flex",

                justifyContent:
                    "center",
            }}
        >

            <Card
                sx={{
                    width: "100%",

                    maxWidth: 900,

                    borderRadius: 4,
                }}
            >

                <CardContent
                    sx={{
                        p: 4,
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
                            Cập nhật sản phẩm
                        </Typography>

                        <Button
                            variant="outlined"
                            onClick={() =>
                                navigate(
                                    `/products/updateImage/${productId}`
                                )
                            }
                        >
                            Cập nhật ảnh
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
                                label="Mã sản phẩm"
                                name="productCode"
                                value={
                                    form.productCode
                                }
                                onChange={
                                    handleChange
                                }
                                error={
                                    !!errors.productCode
                                }
                                helperText={
                                    errors.productCode || " "
                                }
                                fullWidth
                            />

                            <TextField
                                label="Tên sản phẩm"
                                name="productName"
                                value={
                                    form.productName
                                }
                                onChange={
                                    handleChange
                                }
                                error={
                                    !!errors.productName
                                }
                                helperText={
                                    errors.productName || " "
                                }
                                fullWidth
                            />

                            <TextField
                                label="Đơn vị"
                                name="unit"
                                value={
                                    form.unit
                                }
                                onChange={
                                    handleChange
                                }
                                error={
                                    !!errors.unit
                                }
                                helperText={
                                    errors.unit || " "
                                }
                                fullWidth
                            />

                            <TextField
                                type="number"
                                label="Giá bán"
                                name="unitPrice"
                                value={
                                    form.unitPrice
                                }
                                onChange={
                                    handleChange
                                }
                                error={
                                    !!errors.unitPrice
                                }
                                helperText={
                                    errors.unitPrice || " "
                                }
                                fullWidth
                            />

                            <TextField
                                type="number"
                                label="Tồn kho"
                                name="stockQuantity"
                                value={
                                    form.stockQuantity
                                }
                                onChange={
                                    handleChange
                                }
                                error={
                                    !!errors.stockQuantity
                                }
                                helperText={
                                    errors.stockQuantity || " "
                                }
                                fullWidth
                            />

                            <FormControlLabel
                                control={
                                    <Switch
                                        checked={
                                            form.isActive
                                        }
                                        onChange={(
                                            e
                                        ) =>
                                            setForm(
                                                prev => ({
                                                    ...prev,
                                                    isActive:
                                                        e.target.checked,
                                                })
                                            )
                                        }
                                    />
                                }
                                label="Đang hoạt động"
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                disabled={
                                    saving
                                }
                                startIcon={
                                    saving
                                        ? (
                                            <CircularProgress
                                                size={20}
                                                color="inherit"
                                            />
                                        )
                                        : (
                                            <SaveIcon />
                                        )
                                }
                                sx={{
                                    height: 52,

                                    fontWeight: 700,
                                }}
                            >
                                {
                                    saving
                                        ? "Đang cập nhật..."
                                        : "Cập nhật sản phẩm"
                                }
                            </Button>

                        </Stack>

                    </Box>

                </CardContent>

            </Card>

        </Box>
    );
}

export default ProductUpdatePage;
