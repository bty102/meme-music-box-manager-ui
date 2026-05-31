import {
    Alert,
    Box,
    Button,
    Chip,
    CircularProgress,
    Pagination,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

import {
    fetchInvoices,
    fetchInvoicesCreatedBy,
} from "../store/invoiceThunk";

import { formatDateTime } from "../../../util/formatDateTime";

function InvoiceListPage() {

    const dispatch =
        useDispatch();

    const navigate =
        useNavigate();

    const {
        invoices,

        pageNumber,
        pageSize,

        totalPages,

        loading,
        error,
    } = useSelector(
        (state) =>
            state.invoice
    );

    const user =
        useSelector(
            (state) =>
                state.auth.user
        );

    const isAdmin =
        user?.role === "ADMIN";

    useEffect(() => {

        if (isAdmin) {

            dispatch(
                fetchInvoices({
                    pageNumber,
                    pageSize,
                })
            );

        } else {

            dispatch(
                fetchInvoicesCreatedBy({
                    pageNumber,
                    pageSize,
                })
            );
        }

    }, [
        dispatch,
        isAdmin,
        pageNumber,
        pageSize,
    ]);

    const handlePageChange =
        (
            _,
            page
        ) => {

            const newPage =
                page - 1;

            if (isAdmin) {

                dispatch(
                    fetchInvoices({
                        pageNumber:
                            newPage,
                        pageSize,
                    })
                );

            } else {

                dispatch(
                    fetchInvoicesCreatedBy({
                        pageNumber:
                            newPage,
                        pageSize,
                    })
                );
            }
        };

    const formatCurrency =
        (value) => {

            if (
                value === null ||
                value === undefined
            ) {
                return "---";
            }

            return (
                value.toLocaleString(
                    "vi-VN"
                ) + " ₫"
            );
        };

    const getStatusColor =
        (status) => {

            switch (
                status
            ) {

                case "PAID":
                    return "success";

                case "TEMPORARY":
                    return "warning";

                case "UNPAID":
                    return "error";

                default:
                    return "default";
            }
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

    return (
        <Box
            sx={{
                p: 3,
                minHeight:
                    "100vh",
                bgcolor:
                    "#f5f7fb",
            }}
        >
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
                    <ReceiptLongIcon />

                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Danh sách
                        hóa đơn
                    </Typography>
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

                <Stack
                    spacing={2}
                >
                    {invoices.map(
                        (
                            invoice
                        ) => (
                            <Paper
                                key={
                                    invoice.id
                                }
                                elevation={0}
                                sx={{
                                    p: 2.5,
                                    border:
                                        "1px solid #e2e8f0",
                                    borderRadius: 3,
                                }}
                            >
                                <Box
                                    sx={{
                                        display:
                                            "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems:
                                            "center",
                                        gap: 2,
                                        flexWrap:
                                            "wrap",
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            sx={{
                                                fontWeight: 700,
                                                fontSize:
                                                    18,
                                                mb: 1,
                                            }}
                                        >
                                            {
                                                invoice.invoiceCode
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Hội
                                            viên:
                                            {" "}
                                            {invoice
                                                ?.member
                                                ?.memberProfile
                                                ?.fullName ||
                                                "Khách lẻ"}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Người
                                            tạo:
                                            {" "}
                                            {
                                                invoice
                                                    ?.createdBy
                                                    ?.email
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Thành
                                            tiền:
                                            {" "}
                                            {formatCurrency(
                                                invoice.finalAmount
                                            )}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Thời
                                            gian:
                                            {" "}
                                            {formatDateTime(
                                                invoice.createdAt
                                            )}
                                        </Typography>
                                    </Box>

                                    <Stack
                                        spacing={1}
                                        alignItems="flex-end"
                                    >
                                        <Chip
                                            label={
                                                invoice.status
                                            }
                                            color={getStatusColor(
                                                invoice.status
                                            )}
                                        />

                                        <Button
                                            variant="contained"
                                            startIcon={
                                                <VisibilityIcon />
                                            }
                                            sx={{
                                                textTransform:
                                                    "none",
                                            }}
                                            onClick={() =>
                                                navigate(
                                                    `/invoices/detail/${invoice.id}`
                                                )
                                            }
                                        >
                                            Xem
                                            chi
                                            tiết
                                        </Button>
                                    </Stack>
                                </Box>
                            </Paper>
                        )
                    )}
                </Stack>

                <Box
                    sx={{
                        display:
                            "flex",
                        justifyContent:
                            "center",
                        mt: 4,
                    }}
                >
                    <Pagination
                        count={
                            totalPages
                        }
                        page={
                            pageNumber +
                            1
                        }
                        onChange={
                            handlePageChange
                        }
                        color="primary"
                    />
                </Box>
            </Paper>
        </Box>
    );
}

export default InvoiceListPage;