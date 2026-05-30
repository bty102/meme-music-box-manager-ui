import {
  Box,
  Button,
  Divider,
  IconButton,
  Paper,
  Pagination,
  Stack,
  TextField,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";
import SaveIcon from "@mui/icons-material/Save";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import {
    createProductOfInvoiceApi,
  getInvoiceDetailApi,
  getProductsOfInvoiceApi,
  updateProductOfInvoiceApi,
} from "../services/invoiceApi";
import { getProductsApi } from "../../product/services/productApi";

function InvoiceProductUpdatePage() {
  const { invoiceId } = useParams();

  const [invoice, setInvoice] = useState(null);

  const [invoiceProducts, setInvoiceProducts] = useState([]);

  const [products, setProducts] = useState([]);

  const [pageNumber, setPageNumber] = useState(0);

  const [pageSize] = useState(10);

  const [totalPages, setTotalPages] = useState(0);

  const [updateQuantities, setUpdateQuantities] = useState({});

  const [addQuantities, setAddQuantities] = useState({});

  useEffect(() => {
    const fetchData = async () => {
      const invoiceResponse = await getInvoiceDetailApi(invoiceId);

      const invoiceProductsResponse = await getProductsOfInvoiceApi(invoiceId);

      const productsResponse = await getProductsApi({
        isActive: true,
        pageNumber,
        pageSize,
      });

      setInvoice(invoiceResponse);

      setInvoiceProducts(invoiceProductsResponse);

      setProducts(productsResponse.content);

      setTotalPages(productsResponse.page.totalPages);
    };

    fetchData();
  }, [invoiceId, pageNumber, pageSize]);

  const handleUpdateProductOfInvoice = async (productOfInvoiceId) => {
    try {
      const updatedProduct = await updateProductOfInvoiceApi({
        productOfInvoiceId,
        quantity: Number(updateQuantities[productOfInvoiceId]),
      });

      setInvoiceProducts((prev) =>
        prev.map((item) =>
          item.id === productOfInvoiceId ? updatedProduct : item,
        ),
      );
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };
  const handleAddProduct = async (productId) => {
    try {
      const createdProduct = await createProductOfInvoiceApi({
        invoiceId: Number(invoiceId),

        productId,

        quantity: Number(addQuantities[productId]),
      });

      setInvoiceProducts((prev) => [...prev, createdProduct]);

      setAddQuantities((prev) => ({
        ...prev,
        [productId]: "",
      }));
    } catch (error) {
      alert(error.response?.data?.message || error.message);
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
        p: 3,
      }}
    >
      <Typography
        variant="h4"
        sx={{
          fontWeight: 700,
          mb: 3,
        }}
      >
        Cập nhật sản phẩm hóa đơn
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "420px 1fr",
          },
          gap: 3,
        }}
      >
        {/* LEFT */}

        <Stack spacing={3}>
          {/* INVOICE */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography variant="h5" fontWeight={700} mb={3}>
              Thông tin hóa đơn
            </Typography>

            <Stack spacing={2}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Mã hóa đơn
                </Typography>

                <Typography fontWeight={700}>{invoice?.invoiceCode}</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Thành tiền
                </Typography>

                <Typography variant="h6" color="error" fontWeight={700}>
                  {invoice?.finalAmount?.toLocaleString("vi-VN") || "---"} ₫
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Hội viên
                </Typography>

                <Typography fontWeight={700}>
                  {invoice?.member?.memberProfile?.fullName || "Khách lẻ"}
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* PRODUCTS OF INVOICE */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 4,
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography variant="h5" fontWeight={700} mb={3}>
              Sản phẩm hiện tại
            </Typography>

            <Stack spacing={2}>
              {invoiceProducts.map((item) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    p: 2,
                    border: "1px solid #e2e8f0",
                    borderRadius: 3,
                  }}
                >
                  <Typography fontWeight={700}>
                    {item.product.productName}
                  </Typography>

                  <Typography variant="body2" color="text.secondary">
                    {item.product.unitPrice?.toLocaleString("vi-VN")} ₫
                  </Typography>

                  <Typography variant="body2" color="text.secondary" mb={2}>
                    Thành tiền: {item.lineTotal?.toLocaleString("vi-VN")} ₫
                  </Typography>

                  <Stack direction="row" spacing={1}>
                    <TextField
                      fullWidth
                      size="small"
                      type="number"
                      label="Số lượng"
                      value={updateQuantities[item.id] ?? item.quantity}
                      onChange={(event) =>
                        setUpdateQuantities((prev) => ({
                          ...prev,
                          [item.id]: event.target.value,
                        }))
                      }
                    />

                    <IconButton
                      color="primary"
                      onClick={() => {
                        handleUpdateProductOfInvoice(item.id);
                      }}
                    >
                      <SaveIcon />
                    </IconButton>
                  </Stack>
                </Paper>
              ))}
            </Stack>
          </Paper>
        </Stack>

        {/* RIGHT */}

        <Paper
          elevation={0}
          sx={{
            p: 3,
            borderRadius: 4,
            border: "1px solid #e2e8f0",
          }}
        >
          <Typography variant="h5" fontWeight={700} mb={3}>
            Danh sách sản phẩm
          </Typography>

          <Stack spacing={2}>
            {products.map((product) => (
              <Paper
                key={product.id}
                elevation={0}
                sx={{
                  p: 2,
                  border: "1px solid #e2e8f0",
                  borderRadius: 3,
                }}
              >
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="center"
                  mb={2}
                >
                  <Box>
                    <Typography fontWeight={700}>
                      {product.productName}
                    </Typography>

                    <Typography variant="body2" color="text.secondary">
                      {product.productCode}
                    </Typography>
                  </Box>

                  <Typography fontWeight={700} color="primary">
                    {product.unitPrice?.toLocaleString("vi-VN")} ₫
                  </Typography>
                </Stack>

                <Stack direction="row" spacing={1}>
                  <TextField
                    fullWidth
                    size="small"
                    type="number"
                    label="Số lượng"
                    value={addQuantities[product.id] || ""}
                    onChange={(event) =>
                      setAddQuantities((prev) => ({
                        ...prev,
                        [product.id]: event.target.value,
                      }))
                    }
                  />

                  <Button
                    variant="contained"
                    startIcon={<AddIcon />}
                    onClick={() => {
                      handleAddProduct(product.id);
                    }}
                    sx={{
                      textTransform: "none",
                      borderRadius: 3,
                    }}
                  >
                    Thêm
                  </Button>
                </Stack>
              </Paper>
            ))}
          </Stack>

          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              mt: 4,
            }}
          >
            <Pagination
              count={totalPages}
              page={pageNumber + 1}
              onChange={(_, page) => setPageNumber(page - 1)}
              color="primary"
            />
          </Box>
        </Paper>
      </Box>
    </Box>
  );
}

export default InvoiceProductUpdatePage;
