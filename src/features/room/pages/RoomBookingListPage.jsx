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

import EventNoteIcon from "@mui/icons-material/EventNote";
import VisibilityIcon from "@mui/icons-material/Visibility";

import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import { getRoomInfoApi } from "../services/roomApi";
import { getBookingsOfRoomApi } from "../services/roomApi";

import { formatDateTime } from "../../../util/formatDateTime";

function RoomBookingListPage() {

    const { roomId } = useParams();

    const navigate = useNavigate();

    const [room, setRoom] =
        useState(null);

    const [bookings, setBookings] =
        useState([]);

    const [pageNumber, setPageNumber] =
        useState(0);

    const [pageSize] =
        useState(5);

    const [totalPages, setTotalPages] =
        useState(0);

    const [loading, setLoading] =
        useState(true);

    const [error, setError] =
        useState(null);

    useEffect(() => {

        fetchData();

    }, [roomId, pageNumber]);

    const fetchData = async () => {

        try {

            setLoading(true);

            const roomResponse =
                await getRoomInfoApi(
                    roomId
                );

            const bookingResponse =
                await getBookingsOfRoomApi({
                    roomId,
                    pageNumber,
                    pageSize,
                });

            setRoom(
                roomResponse
            );

            setBookings(
                bookingResponse.content
            );

            setTotalPages(
                bookingResponse.page.totalPages
            );

        } catch (error) {

            setError(
                error.response?.data?.message
            );

        } finally {

            setLoading(false);
        }
    };

    const getStatusColor =
        (status) => {

            switch (status) {

                case "PENDING":
                    return "warning";

                case "CHECKEDIN":
                    return "success";

                case "CANCELLED":
                    return "error";

                default:
                    return "default";
            }
        };

    const getStatusText =
        (status) => {

            switch (status) {

                case "PENDING":
                    return "Chờ nhận phòng";

                case "CHECKEDIN":
                    return "Đã nhận phòng";

                case "CANCELLED":
                    return "Đã hủy";

                default:
                    return status;
            }
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
                p: 3,
                minHeight: "100vh",
                bgcolor: "#f5f7fb",
            }}
        >
            {/* ROOM INFO */}

            <Paper
                elevation={0}
                sx={{
                    p: 3,
                    mb: 3,
                    borderRadius: 4,
                    border: "1px solid #e2e8f0",
                }}
            >
                <Typography
                    variant="h5"
                    fontWeight={700}
                    mb={2}
                    sx={{fontWeight: 700, mb: 2}}
                >
                    Thông tin phòng
                </Typography>

                <Stack
                    direction={{
                        xs: "column",
                        md: "row",
                    }}
                    spacing={4}
                >
                    <Box>
                        <Typography
                            color="text.secondary"
                        >
                            Số phòng
                        </Typography>

                        <Typography
                            fontWeight={700}
                            sx={{fontWeight: 700}}
                        >
                            {room?.roomNumber}
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            color="text.secondary"
                        >
                            Khu vực
                        </Typography>

                        <Typography
                            fontWeight={700}
                            sx={{fontWeight: 700}}
                        >
                            {
                                room?.area
                                    ?.areaName
                            }
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            color="text.secondary"
                        >
                            Sức chứa
                        </Typography>

                        <Typography
                            fontWeight={700}
                            sx={{fontWeight: 700}}
                        >
                            {
                                room?.capacity
                            } người
                        </Typography>
                    </Box>

                    <Box>
                        <Typography
                            color="text.secondary"
                        >
                            Giá giờ
                        </Typography>

                        <Typography
                            fontWeight={700}
                            sx={{fontWeight: 700}}
                        >
                            {
                                room?.hourlyRate?.toLocaleString(
                                    "vi-VN"
                                )
                            } ₫
                        </Typography>
                    </Box>
                </Stack>
            </Paper>

            {/* BOOKING LIST */}

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
                    sx={{alignItems: "center", mb: 3}}
                >
                    <EventNoteIcon />

                    <Typography
                        variant="h5"
                        fontWeight={700}
                        sx={{fontWeight: 700}}
                    >
                        Danh sách lịch đặt
                    </Typography>
                </Stack>

                {error && (
                    <Alert
                        severity="error"
                        sx={{
                            mb: 2,
                        }}
                    >
                        {error}
                    </Alert>
                )}

                <Stack spacing={2}>
                    {bookings.map(
                        (
                            booking
                        ) => (
                            <Paper
                                key={
                                    booking.id
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
                                            fontWeight={700}
                                            sx={{fontWeight: 700}}
                                        >
                                            {
                                                booking.memberAccount
                                                    ?.memberProfile
                                                    ?.fullName
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                booking.memberAccount
                                                    ?.email
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                        >
                                            Thời gian đặt:
                                            {" "}
                                            {formatDateTime(
                                                booking.bookingTime
                                            )}
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                        >
                                            Thời gian tạo:
                                            {" "}
                                            {formatDateTime(
                                                booking.createdAt
                                            )}
                                        </Typography>
                                    </Box>

                                    <Stack
                                        alignItems="flex-end"
                                        spacing={1}
                                        sx={{}}
                                    >
                                        <Chip
                                            label={getStatusText(
                                                booking.status
                                            )}
                                            color={getStatusColor(
                                                booking.status
                                            )}
                                        />

                                        <Button
                                            variant="contained"
                                            startIcon={
                                                <VisibilityIcon />
                                            }
                                            onClick={() =>
                                                navigate(
                                                    `/bookings/detail/${booking.id}`
                                                )
                                            }
                                            sx={{
                                                textTransform:
                                                    "none",
                                            }}
                                        >
                                            Xem chi tiết
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
                                page - 1
                            )
                        }
                        color="primary"
                    />
                </Box>
            </Paper>
        </Box>
    );
}

export default RoomBookingListPage;