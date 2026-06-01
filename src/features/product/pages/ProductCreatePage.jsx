import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
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
    createProductApi,
} from "../services/productApi";

function ProductCreatePage() {

    const navigate =
        useNavigate();

    const [
        loading,
        setLoading,
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
    });

    const [
        errors,
        setErrors,
    ] = useState({});

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

            const newErrors =
                {};

            if (
                !form.productCode
                    .trim()
            ) {

                newErrors.productCode =
                    "Mã sản phẩm không được để trống";

            } else if (
                form.productCode
                    .length > 20
            ) {

                newErrors.productCode =
                    "Mã sản phẩm tối đa 20 ký tự";
            }

            if (
                !form.productName
                    .trim()
            ) {

                newErrors.productName =
                    "Tên sản phẩm không được để trống";

            } else if (
                form.productName
                    .length > 100
            ) {

                newErrors.productName =
                    "Tên sản phẩm tối đa 100 ký tự";
            }

            if (
                !form.unit
                    .trim()
            ) {

                newErrors.unit =
                    "Đơn vị không được để trống";

            } else if (
                form.unit
                    .length > 20
            ) {

                newErrors.unit =
                    "Đơn vị tối đa 20 ký tự";
            }

            if (
                form.unitPrice === ""
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

            if (
                form.stockQuantity === ""
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

                setLoading(
                    true
                );

                setError(
                    null
                );

                const result =
                    await createProductApi(
                        {
                            productCode:
                                form.productCode,
                            productName:
                                form.productName,
                            unit:
                                form.unit,
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
                    "Tạo sản phẩm thành công"
                );

                navigate(
                    `/products/detail/${result.id}`
                );

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
                    width:
                        "100%",
                    maxWidth:
                        900,

                    borderRadius:
                        4,
                }}
            >

                <CardContent
                    sx={{
                        p: 4,
                    }}
                >

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight:
                                700,
                            mb: 4,
                        }}
                    >
                        Tạo mới sản phẩm
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

                    <Box
                        component="form"
                        onSubmit={
                            handleSubmit
                        }
                    >

                        <Stack
                            spacing={
                                3
                            }
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
                                    errors.productCode
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
                                    errors.productName
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
                                    errors.unit
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
                                    errors.unitPrice
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
                                    errors.stockQuantity
                                }
                                fullWidth
                            />

                            <Button
                                type="submit"
                                variant="contained"
                                size="large"
                                startIcon={
                                    loading
                                        ? (
                                            <CircularProgress
                                                size={
                                                    20
                                                }
                                                color="inherit"
                                            />
                                        )
                                        : (
                                            <SaveIcon />
                                        )
                                }
                                disabled={
                                    loading
                                }
                                sx={{
                                    mt: 2,

                                    height: 52,

                                    fontWeight:
                                        700,

                                    fontSize:
                                        16,
                                }}
                            >
                                {
                                    loading
                                        ? "Đang tạo..."
                                        : "Tạo sản phẩm"
                                }
                            </Button>

                        </Stack>

                    </Box>

                </CardContent>

            </Card>

        </Box>
    );
}

export default ProductCreatePage;