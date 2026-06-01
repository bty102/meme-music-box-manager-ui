import {
  Alert,
  Box,
  Button,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Grid,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import SearchIcon from "@mui/icons-material/Search";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { fetchProducts, searchProducts } from "../store/productThunk";

import { setMode, setSearchKeyword } from "../store/productSlice";

function ProductListPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const isEmployee = user?.role === "EMPLOYEE";

  const isAdmin = user?.role === "ADMIN";

  const {
    products,
    loading,
    error,

    pageNumber,
    pageSize,
    totalPages,

    searchKeyword,
    mode,
  } = useSelector((state) => state.product);

  useEffect(() => {
    dispatch(
      fetchProducts({
        isActive: isEmployee ? true : undefined,

        pageNumber: 0,
        pageSize,
      }),
    );
  }, []);

  const handleSearch = () => {
    if (!searchKeyword.trim()) {
      dispatch(setMode("LIST"));

      dispatch(
        fetchProducts({
          isActive: isEmployee ? true : undefined,

          pageNumber: 0,
          pageSize,
        }),
      );

      return;
    }

    dispatch(setMode("SEARCH"));

    dispatch(
      searchProducts({
        q: searchKeyword,

        isActive: isEmployee ? true : undefined,

        pageNumber: 0,
        pageSize,
      }),
    );
  };

  const handlePageChange = (event, page) => {
    if (mode === "SEARCH") {
      dispatch(
        searchProducts({
          q: searchKeyword,

          isActive: isEmployee ? true : undefined,

          pageNumber: page - 1,

          pageSize,
        }),
      );
    } else {
      dispatch(
        fetchProducts({
          isActive: isEmployee ? true : undefined,

          pageNumber: page - 1,

          pageSize,
        }),
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
        direction="row"
        justifyContent="space-between"
        alignItems="center"
        mb={3}
        sx={{ justifyContent: "space-between", alignItems: "center", mb: 3 }}
      >
        <Typography variant="h4" fontWeight={700} sx={{ fontWeight: 700 }}>
          Products
        </Typography>

        {isAdmin && (
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => navigate("/products/create")}
          >
            Thêm mới
          </Button>
        )}
      </Stack>

      <Stack direction="row" spacing={2} mb={4} sx={{ mb: 4 }}>
        <TextField
          fullWidth
          label="Tìm theo mã hoặc tên sản phẩm"
          value={searchKeyword}
          onChange={(event) => dispatch(setSearchKeyword(event.target.value))}
        />

        <Button
          variant="contained"
          startIcon={<SearchIcon />}
          onClick={handleSearch}
        >
          Tìm
        </Button>
      </Stack>

      {loading && (
        <Box
          sx={{
            textAlign: "center",
          }}
        >
          <CircularProgress />
        </Box>
      )}

      {error && <Alert severity="error">{error}</Alert>}

      <Grid container spacing={3} alignItems="stretch">
        {products.map((product) => (
          <Grid
            item
            size={{
              xs: 12,
              sm: 6,
              lg: 4,
            }}
            key={product.id}
          >
            <Card
              sx={{
                height: "100%",
                display: "flex",
                flexDirection: "column",

                borderRadius: 4,

                overflow: "hidden",

                transition: "0.25s",

                border: "1px solid #e2e8f0",

                "&:hover": {
                  transform: "translateY(-4px)",
                  boxShadow: "0 12px 30px rgba(0,0,0,0.12)",
                },
              }}
            >
              <Box
                sx={{
                  width: "100%",
                  height: 240,

                  overflow: "hidden",

                  bgcolor: "#f8fafc",

                  borderBottom: "1px solid #e2e8f0",
                }}
              >
                <CardMedia
                  component="img"
                  image={
                    product.imageUrl ||
                    "https://placehold.co/600x400?text=No+Image"
                  }
                  alt={product.productName}
                  onError={(e) => {
                    e.target.src = "/images/default-product.png";
                  }}
                  sx={{
                    width: "100%",
                    height: "100%",

                    objectFit: "cover",
                  }}
                />
              </Box>

              <CardContent
                sx={{
                  flex: 1,

                  display: "flex",
                  flexDirection: "column",
                }}
              >
                <Typography
                  sx={{
                    fontSize: 20,
                    fontWeight: 700,
                    mb: 1,
                    minHeight: 56,
                  }}
                >
                  {product.productName}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    mb: 0.5,
                  }}
                >
                  Mã sản phẩm: {product.productCode}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    mb: 0.5,
                  }}
                >
                  Đơn vị: {product.unit}
                </Typography>

                <Typography
                  sx={{
                    color: "text.secondary",
                    mb: 0.5,
                  }}
                >
                  Tồn kho: {product.stockQuantity}
                </Typography>

                <Typography
                  sx={{
                    mt: 1,

                    fontSize: 24,
                    fontWeight: 700,

                    color: "primary.main",
                  }}
                >
                  {product.unitPrice.toLocaleString()}đ
                </Typography>

                <Box
                  sx={{
                    mt: 1,
                    mb: 2,
                  }}
                >
                  <Typography
                    sx={{
                      display: "inline-block",

                      px: 1.5,
                      py: 0.5,

                      borderRadius: 2,

                      fontWeight: 600,

                      bgcolor: product.isActive ? "#dcfce7" : "#fee2e2",

                      color: product.isActive ? "#166534" : "#991b1b",
                    }}
                  >
                    {product.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
                  </Typography>
                </Box>

                <Box
                  sx={{
                    mt: "auto",
                  }}
                >
                  <Button
                    fullWidth
                    variant="contained"
                    startIcon={<VisibilityIcon />}
                    onClick={() => navigate(`/products/detail/${product.id}`)}
                    sx={{
                      textTransform: "none",
                      fontWeight: 700,
                      borderRadius: 3,
                      py: 1.2,
                    }}
                  >
                    Xem chi tiết
                  </Button>
                </Box>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          mt: 4,
        }}
      >
        <Pagination
          page={pageNumber + 1}
          count={totalPages}
          color="primary"
          onChange={handlePageChange}
        />
      </Box>
    </Box>
  );
}
export default ProductListPage;
