import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    Chip,
    CircularProgress,
    Divider,
    Grid,
    Paper,
    Stack,
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
    useSelector,
} from "react-redux";

import {
    getProductInfoApi,
} from "../services/productApi";

import {
    formatDateTime,
} from "../../../util/formatDateTime";

function ProductDetailPage() {

    const navigate =
        useNavigate();

    const { productId } =
        useParams();

    const user =
        useSelector(
            state =>
                state.auth.user
        );

    const isAdmin =
        user?.role === "ADMIN";

    const [
        product,
        setProduct,
    ] = useState(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        error,
        setError,
    ] = useState(null);

    useEffect(() => {

        const fetchProduct =
            async () => {

                try {

                    const result =
                        await getProductInfoApi(
                            productId
                        );

                    setProduct(
                        result
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

        fetchProduct();

    }, [productId]);

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

    if (error) {
        return (
            <Typography
                color="error"
            >
                {error}
            </Typography>
        );
    }

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

                    mb: 3,
                }}
            >

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Chi tiết sản phẩm
                </Typography>

                {isAdmin && (

                    <Button
                        variant="contained"
                        startIcon={
                            <EditIcon />
                        }
                        onClick={() =>
                            navigate(
                                `/products/update/${product.id}`
                            )
                        }
                    >
                        Cập nhật
                    </Button>

                )}

            </Stack>

            <Paper
                elevation={3}
                sx={{
                    p: 3,
                    borderRadius: 4,
                }}
            >

                <Grid
                    container
                    spacing={4}
                >

                    <Grid
                        size={{
                            xs: 12,
                            md: 4,
                        }}
                    >

                        <Card
                            sx={{
                                borderRadius: 4,
                                overflow:
                                    "hidden",
                            }}
                        >

                            <CardMedia
                                component="img"
                                image={
                                    product.imageUrl ||
                                    "https://placehold.co/600x400?text=No+Image"
                                }
                                alt={
                                    product.productName
                                }
                                onError={(
                                    e
                                ) => {

                                    e.target.src =
                                        "https://placehold.co/600x400?text=No+Image";
                                }}
                                sx={{
                                    width:
                                        "100%",

                                    height:
                                        350,

                                    objectFit:
                                        "cover",
                                }}
                            />

                        </Card>

                    </Grid>

                    <Grid
                        size={{
                            xs: 12,
                            md: 8,
                        }}
                    >

                        <Card
                            sx={{
                                height:
                                    "100%",
                                borderRadius: 4,
                            }}
                        >

                            <CardContent>

                                <Typography
                                    variant="h4"
                                    sx={{
                                        fontWeight: 700,
                                        mb: 2,
                                    }}
                                >
                                    {
                                        product.productName
                                    }
                                </Typography>

                                <Chip
                                    label={
                                        product.isActive
                                            ? "Đang hoạt động"
                                            : "Ngưng hoạt động"
                                    }
                                    color={
                                        product.isActive
                                            ? "success"
                                            : "error"
                                    }
                                    sx={{
                                        mb: 3,
                                    }}
                                />

                                <Divider
                                    sx={{
                                        mb: 3,
                                    }}
                                />

                                <Stack
                                    spacing={
                                        2
                                    }
                                >

                                    <Typography>
                                        <strong>
                                            ID:
                                        </strong>
                                        {" "}
                                        {
                                            product.id
                                        }
                                    </Typography>

                                    <Typography>
                                        <strong>
                                            Mã sản phẩm:
                                        </strong>
                                        {" "}
                                        {
                                            product.productCode
                                        }
                                    </Typography>

                                    <Typography>
                                        <strong>
                                            Tên sản phẩm:
                                        </strong>
                                        {" "}
                                        {
                                            product.productName
                                        }
                                    </Typography>

                                    <Typography>
                                        <strong>
                                            Đơn vị:
                                        </strong>
                                        {" "}
                                        {
                                            product.unit
                                        }
                                    </Typography>

                                    <Typography>
                                        <strong>
                                            Giá bán:
                                        </strong>
                                        {" "}
                                        {
                                            product.unitPrice?.toLocaleString()
                                        }
                                        đ
                                    </Typography>

                                    <Typography>
                                        <strong>
                                            Tồn kho:
                                        </strong>
                                        {" "}
                                        {
                                            product.stockQuantity
                                        }
                                    </Typography>

                                    <Typography>
                                        <strong>
                                            Ngày tạo:
                                        </strong>
                                        {" "}
                                        {
                                            formatDateTime(
                                                product.createdAt
                                            )
                                        }
                                    </Typography>

                                </Stack>

                            </CardContent>

                        </Card>

                    </Grid>

                </Grid>

            </Paper>

        </Box>
    );
}

export default ProductDetailPage;