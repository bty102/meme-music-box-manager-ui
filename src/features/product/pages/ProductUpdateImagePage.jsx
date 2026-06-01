import {
    Box,
    Button,
    Card,
    CardContent,
    CardMedia,
    CircularProgress,
    Stack,
    Typography,
} from "@mui/material";

import UploadIcon
from "@mui/icons-material/Upload";

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
    updateProductImageApi,
} from "../services/productApi";

function ProductUpdateImagePage() {

    const navigate =
        useNavigate();

    const { productId } =
        useParams();

    const [
        product,
        setProduct,
    ] = useState(null);

    const [
        imageFile,
        setImageFile,
    ] = useState(null);

    const [
        preview,
        setPreview,
    ] = useState(null);

    const [
        loading,
        setLoading,
    ] = useState(true);

    const [
        saving,
        setSaving,
    ] = useState(false);

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

                } finally {

                    setLoading(
                        false
                    );
                }
            };

        fetchProduct();

    }, [productId]);

    const handleSelectImage =
        (e) => {

            const file =
                e.target.files[0];

            if (!file) {
                return;
            }

            setImageFile(
                file
            );

            setPreview(
                URL.createObjectURL(
                    file
                )
            );
        };

    const handleUpload =
        async () => {

            if (
                !imageFile
            ) {

                alert(
                    "Vui lòng chọn ảnh"
                );

                return;
            }

            try {

                setSaving(
                    true
                );

                await updateProductImageApi(
                    productId,
                    imageFile
                );

                alert(
                    "Cập nhật ảnh thành công"
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
            <CircularProgress />
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
                    maxWidth: 700,
                    borderRadius: 4,
                }}
            >

                <CardContent>

                    <Typography
                        variant="h4"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                        }}
                    >
                        Cập nhật ảnh sản phẩm
                    </Typography>

                    <CardMedia
                        component="img"
                        image={
                            preview ||
                            product.imageUrl ||
                            "https://placehold.co/600x400?text=No+Image"
                        }
                        sx={{
                            width: "100%",
                            height: 350,
                            objectFit:
                                "cover",
                            borderRadius: 3,
                            mb: 3,
                        }}
                    />

                    <Stack
                        spacing={2}
                    >

                        <Button
                            component="label"
                            variant="outlined"
                        >
                            Chọn ảnh

                            <input
                                hidden
                                type="file"
                                accept="image/*"
                                onChange={
                                    handleSelectImage
                                }
                            />
                        </Button>

                        <Button
                            variant="contained"
                            startIcon={
                                <UploadIcon />
                            }
                            onClick={
                                handleUpload
                            }
                            disabled={
                                saving
                            }
                        >
                            {
                                saving
                                    ? "Đang tải lên..."
                                    : "Cập nhật ảnh"
                            }
                        </Button>

                    </Stack>

                </CardContent>

            </Card>

        </Box>
    );
}

export default ProductUpdateImagePage;