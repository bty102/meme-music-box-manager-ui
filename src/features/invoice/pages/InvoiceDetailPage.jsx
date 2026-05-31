import {
    Box,
    Button,
    ButtonGroup,
    Chip,
    CircularProgress,
    Divider,
    Paper,
    Stack,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import Inventory2Icon from "@mui/icons-material/Inventory2";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getInvoiceDetailApi, getProductsOfInvoiceApi, getRoomsOfInvoiceApi, paymentConfirmationApi } from "../services/invoiceApi";
import { formatDateTime } from "../../../util/formatDateTime";


function InvoiceDetailPage() {

    const { invoiceId } = useParams();

    const [invoice, setInvoice] =
        useState(null);

    const [roomsOfInvoice,
        setRoomsOfInvoice] =
        useState([]);

    const [productsOfInvoice,
        setProductsOfInvoice] =
        useState([]);

    const [loading,
        setLoading] =
        useState(true);

    useEffect(() => {

        const fetchData =
            async () => {

                try {

                    const invoiceResponse =
                        await getInvoiceDetailApi(
                            invoiceId
                        );

                    const roomsResponse =
                        await getRoomsOfInvoiceApi(
                            invoiceId
                        );

                    const productsResponse =
                        await getProductsOfInvoiceApi(
                            invoiceId
                        );

                    setInvoice(
                        invoiceResponse
                    );

                    setRoomsOfInvoice(
                        roomsResponse
                    );

                    setProductsOfInvoice(
                        productsResponse
                    );

                } finally {

                    setLoading(
                        false
                    );
                }
            };

        fetchData();

    }, [invoiceId]);

    const formatCurrency =
        (value) => {

            if (
                value === null ||
                value === undefined
            ) {
                return "---";
            }

            return value.toLocaleString(
                "vi-VN"
            ) + " ₫";
        };

    if (loading) {
        return (
            <Box
                sx={{
                    display:
                        "flex",
                    justifyContent:
                        "center",
                    alignItems:
                        "center",
                    minHeight:
                        "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

    const handleConfirmPayment = async () => {
        if(!confirm("Xác nhận đã thanh toán hóa đơn này?")) {
            return;
        }

        try {
            await paymentConfirmationApi(invoiceId);
            alert("Đã xác nhận thanh toán cho hóa đơn này.");
            // Cập nhật lại trạng thái hóa đơn
            window.location.reload();
        } catch (error) {
            alert(error.response?.data?.message || "Có lỗi xảy ra khi xác nhận thanh toán.");
        }
    }

    return (
        <Box
            sx={{
                minHeight:
                    "100vh",
                bgcolor:
                    "#f5f7fb",
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
                Chi tiết hóa đơn
            </Typography>

            {/* INVOICE INFO */}

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 4,
                    border:
                        "1px solid #e2e8f0",
                    mb: 3,
                }}
            >
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={3}
                >
                    <ReceiptLongIcon />

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Thông tin
                        hóa đơn
                    </Typography>
                </Stack>

                <Box
                    sx={{
                        display:
                            "grid",
                        gridTemplateColumns:
                            {
                                xs: "1fr",
                                md: "1fr 1fr",
                            },
                        gap: 3,
                    }}
                >
                    <Stack
                        spacing={2}
                    >
                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Mã hóa đơn
                            </Typography>

                            <Typography
                                fontWeight={
                                    700
                                }
                            >
                                {
                                    invoice?.invoiceCode
                                }
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Trạng
                                thái
                            </Typography>

                            <Chip
                                label={
                                    invoice?.status
                                }
                                color={
                                    invoice?.status ===
                                    "PAID"
                                        ? "success"
                                        : "warning"
                                }
                                sx={{
                                    mt: 1,
                                }}
                            />
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Hội
                                viên
                            </Typography>

                            <Typography
                                fontWeight={
                                    700
                                }
                            >
                                {invoice
                                    ?.member
                                    ?.memberProfile
                                    ?.fullName ||
                                    "Khách lẻ"}
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Người
                                tạo
                            </Typography>

                            <Typography
                                fontWeight={
                                    700
                                }
                            >
                                {
                                    invoice
                                        ?.createdBy
                                        ?.email
                                }
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Thời
                                gian tạo
                            </Typography>

                            <Typography
                                fontWeight={
                                    700
                                }
                            >
                                {
                                    formatDateTime(
                                        invoice?.createdAt
                                    )
                                }
                            </Typography>
                        </Box>
                    </Stack>

                    <Stack
                        spacing={2}
                    >
                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Tiền
                                phòng
                            </Typography>

                            <Typography
                                fontWeight={
                                    700
                                }
                            >
                                {formatCurrency(
                                    invoice?.roomCharge
                                )}
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Tiền
                                dịch vụ
                            </Typography>

                            <Typography
                                fontWeight={
                                    700
                                }
                            >
                                {formatCurrency(
                                    invoice?.serviceCharge
                                )}
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Giảm
                                giá
                            </Typography>

                            <Typography
                                fontWeight={
                                    700
                                }
                            >
                                {
                                    invoice?.discountPercent
                                }
                                %
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                VAT
                            </Typography>

                            <Typography
                                fontWeight={
                                    700
                                }
                            >
                                {
                                    invoice?.vatPercent
                                }
                                %
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Thành
                                tiền
                            </Typography>

                            <Typography
                                variant="h5"
                                color="error"
                                fontWeight={
                                    700
                                }
                            >
                                {formatCurrency(
                                    invoice?.finalAmount
                                )}
                            </Typography>
                        </Box>
                    </Stack>
                </Box>
            </Paper>

            {/* ROOMS */}

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 4,
                    border:
                        "1px solid #e2e8f0",
                    mb: 3,
                }}
            >
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={3}
                >
                    <MeetingRoomIcon />

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Danh sách
                        phòng
                    </Typography>
                </Stack>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Phòng
                                </TableCell>

                                <TableCell>
                                    Check
                                    In
                                </TableCell>

                                <TableCell>
                                    Check
                                    Out
                                </TableCell>

                                <TableCell>
                                    Số giờ
                                </TableCell>

                                <TableCell>
                                    Tiền
                                    phòng
                                </TableCell>

                                <TableCell>
                                    Trạng
                                    thái
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {roomsOfInvoice.map(
                                (
                                    item
                                ) => (
                                    <TableRow
                                        key={
                                            item.id
                                        }
                                    >
                                        <TableCell>
                                            {
                                                item
                                                    .room
                                                    .roomNumber
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                formatDateTime(
                                                    item.checkInAt
                                                )
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                formatDateTime(
                                                    item.checkOutAt
                                                )
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                item.durationHours
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {formatCurrency(
                                                item.roomCharge
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            <Chip
                                                label={
                                                    item.isTransferred
                                                        ? "Đã chuyển"
                                                        : "Hiện tại"
                                                }
                                                color={
                                                    item.isTransferred
                                                        ? "warning"
                                                        : "success"
                                                }
                                                size="small"
                                            />
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>

            {/* PRODUCTS */}

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 4,
                    border:
                        "1px solid #e2e8f0",
                }}
            >
                <Stack
                    direction="row"
                    spacing={1}
                    alignItems="center"
                    mb={3}
                >
                    <Inventory2Icon />

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Danh sách
                        sản phẩm
                    </Typography>
                </Stack>

                <TableContainer>
                    <Table>
                        <TableHead>
                            <TableRow>
                                <TableCell>
                                    Mã SP
                                </TableCell>

                                <TableCell>
                                    Tên SP
                                </TableCell>

                                <TableCell>
                                    Đơn vị
                                </TableCell>

                                <TableCell>
                                    Đơn giá
                                </TableCell>

                                <TableCell>
                                    Số lượng
                                </TableCell>

                                <TableCell>
                                    Thành
                                    tiền
                                </TableCell>
                            </TableRow>
                        </TableHead>

                        <TableBody>
                            {productsOfInvoice.map(
                                (
                                    item
                                ) => (
                                    <TableRow
                                        key={
                                            item.id
                                        }
                                    >
                                        <TableCell>
                                            {
                                                item
                                                    .product
                                                    .productCode
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                item
                                                    .product
                                                    .productName
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {
                                                item
                                                    .product
                                                    .unit
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {formatCurrency(
                                                item
                                                    .product
                                                    .unitPrice
                                            )}
                                        </TableCell>

                                        <TableCell>
                                            {
                                                item.quantity
                                            }
                                        </TableCell>

                                        <TableCell>
                                            {formatCurrency(
                                                item.lineTotal
                                            )}
                                        </TableCell>
                                    </TableRow>
                                )
                            )}
                        </TableBody>
                    </Table>
                </TableContainer>
            </Paper>
            <Box sx={{
                display: "flex",
                justifyContent: "flex-end",
                mt: 2,
            }}>
                <ButtonGroup>
                    {invoice?.status === "UNPAID" && (
                    <Button onClick={handleConfirmPayment} variant="contained" color="primary">
                        Xác nhận đã thanh toán
                    </Button>
                    )}
                </ButtonGroup>            
            </Box>
        </Box>
    );
}

export default InvoiceDetailPage;