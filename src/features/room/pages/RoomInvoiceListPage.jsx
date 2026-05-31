import {
    Box,
    Button,
    Chip,
    CircularProgress,
    Paper,
    Pagination,
    Stack,
    Typography,
} from "@mui/material";

import ReceiptLongIcon from "@mui/icons-material/ReceiptLong";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomInfoApi } from "../services/roomApi";
import { getInvoicesOfRoomApi } from "../../invoice/services/invoiceApi";
import { formatDateTime } from "../../../util/formatDateTime";


function RoomInvoiceListPage() {

    const { roomId } = useParams();

    const navigate = useNavigate();

    const [room, setRoom] =
        useState(null);

    const [invoices, setInvoices] =
        useState([]);

    const [pageNumber, setPageNumber] =
        useState(0);

    const [pageSize] =
        useState(5);

    const [totalPages, setTotalPages] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    useEffect(() => {

        const fetchData =
            async () => {

                try {

                    const roomResponse =
                        await getRoomInfoApi(
                            roomId
                        );

                    const invoiceResponse =
                        await getInvoicesOfRoomApi({
                            roomId,
                            pageNumber,
                            pageSize,
                        });

                    setRoom(
                        roomResponse
                    );

                    setInvoices(
                        invoiceResponse.content
                    );

                    setTotalPages(
                        invoiceResponse.page.totalPages
                    );

                } finally {

                    setLoading(false);
                }
            };

        fetchData();

    }, [
        roomId,
        pageNumber,
        pageSize,
    ]);

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
                    display: "flex",
                    justifyContent: "center",
                    alignItems: "center",
                    minHeight: "100vh",
                }}
            >
                <CircularProgress />
            </Box>
        );
    }

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
                Danh sách hóa đơn của phòng
            </Typography>

            {/* ROOM INFO */}

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid #e2e8f0",
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
                        Thông tin phòng
                    </Typography>
                </Stack>

                <Box
                    sx={{
                        display: "grid",
                        gridTemplateColumns: {
                            xs: "1fr",
                            md: "1fr 1fr",
                        },
                        gap: 3,
                    }}
                >
                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Số phòng
                        </Typography>

                        <Typography
                            fontWeight={700}
                        >
                            {room?.roomNumber}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Khu vực
                        </Typography>

                        <Typography
                            fontWeight={700}
                        >
                            {
                                room?.area
                                    ?.areaName
                            }
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Sức chứa
                        </Typography>

                        <Typography
                            fontWeight={700}
                        >
                            {room?.capacity}
                            {" "}
                            người
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Giá giờ
                        </Typography>

                        <Typography
                            fontWeight={700}
                            color="primary"
                        >
                            {formatCurrency(
                                room?.hourlyRate
                            )}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            variant="body2"
                            color="text.secondary"
                        >
                            Trạng thái
                        </Typography>

                        <Chip
                            label={
                                room?.status
                            }
                            color="success"
                            sx={{
                                mt: 1,
                            }}
                        />
                    </Box>
                </Box>
            </Paper>

            {/* INVOICE LIST */}

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    borderRadius: 4,
                    border: "1px solid #e2e8f0",
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
                        Danh sách hóa đơn
                    </Typography>
                </Stack>

                <Stack spacing={2}>
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
                                    p: 2,
                                    border:
                                        "1px solid #e2e8f0",
                                    borderRadius: 3,
                                }}
                            >
                                <Box
                                    sx={{
                                        display: "flex",
                                        justifyContent:
                                            "space-between",
                                        alignItems:
                                            "center",
                                        flexWrap:
                                            "wrap",
                                        gap: 2,
                                    }}
                                >
                                    <Box>
                                        <Typography
                                            fontWeight={
                                                700
                                            }
                                        >
                                            {
                                                invoice.invoiceCode
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
                                            {
                                                formatDateTime(
                                                    invoice.createdAt
                                                )
                                            }
                                        </Typography>
                                    </Box>

                                    <Stack
                                        alignItems="flex-end"
                                        spacing={1}
                                    >
                                        <Chip
                                            label={
                                                invoice.status
                                            }
                                            color={
                                                invoice.status ===
                                                "PAID"
                                                    ? "success"
                                                    : "warning"
                                            }
                                        />

                                        <Button
                                            variant="contained"
                                            startIcon={
                                                <VisibilityIcon />
                                            }
                                            onClick={() =>
                                                navigate(
                                                    `/invoices/detail/${invoice.id}`
                                                )
                                            }
                                            sx={{
                                                textTransform:
                                                    "none",
                                            }}
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
                        display: "flex",
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
                        onChange={(
                            _,
                            page
                        ) =>
                            setPageNumber(
                                page -
                                    1
                            )
                        }
                        color="primary"
                    />
                </Box>
            </Paper>
        </Box>
    );
}

export default RoomInvoiceListPage;