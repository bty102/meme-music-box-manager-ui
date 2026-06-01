import {
  Box,
  Button,
  Chip,
  CircularProgress,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import CancelIcon from "@mui/icons-material/Cancel";
import EventNoteIcon from "@mui/icons-material/EventNote";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PersonIcon from "@mui/icons-material/Person";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import {
  cancelBookingApi,
  checkInBookingApi,
  getBookingDetailApi,
} from "../services/bookingApi";
import { formatDateTime } from "../../../util/formatDateTime";

function BookingDetailPage() {
  const { bookingId } = useParams();

  const [booking, setBooking] = useState(null);

  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBooking = async () => {
      try {
        const response = await getBookingDetailApi(bookingId);

        setBooking(response);
      } finally {
        setLoading(false);
      }
    };

    fetchBooking();
  }, [bookingId]);

  const getStatusColor = (status) => {
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

  const getStatusText = (status) => {
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

  const handleCheckIn = async () => {
    if (!window.confirm("Xác nhận khách hàng đã tới nhận phòng?")) {
      return;
    }

    try {
      const updatedBooking = await checkInBookingApi(booking.id);

      setBooking(updatedBooking);

      alert("Nhận phòng thành công!");
    } catch (error) {
      alert(error.response?.data?.message);
    }
  };

  const handleCancel = async () => {
    if (!window.confirm("Bạn có chắc chắn muốn hủy lịch đặt này?")) {
      return;
    }

    try {
      const updatedBooking = await cancelBookingApi(booking.id);

      setBooking(updatedBooking);

      alert("Hủy lịch đặt thành công!");
    } catch (error) {
      alert(error.response?.data?.message);
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
      <Paper
        elevation={0}
        sx={{
          p: 4,
          borderRadius: 4,
          border: "1px solid #e2e8f0",
        }}
      >
        <Stack
          direction="row"
          spacing={1}
          alignItems="center"
          mb={3}
          sx={{ alignItems: "center", mb: 3 }}
        >
          <EventNoteIcon />

          <Typography variant="h4" fontWeight={700} sx={{ fontWeight: 700 }}>
            Chi tiết lịch đặt
          </Typography>
        </Stack>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: {
              xs: "1fr",
              md: "1fr 1fr",
            },
            gap: 4,
          }}
        >
          {/* THÔNG TIN LỊCH ĐẶT */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid #e2e8f0",
            }}
          >
            <Typography
              variant="h6"
              fontWeight={700}
              mb={2}
              sx={{ fontWeight: 700, mb: 2 }}
            >
              Thông tin lịch đặt
            </Typography>

            <Stack spacing={2}>
              <Box>
                <Typography color="text.secondary">Mã lịch đặt</Typography>

                <Typography fontWeight={700} sx={{ fontWeight: 700 }}>
                  #{booking.id}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography color="text.secondary">Thời gian đặt</Typography>

                <Typography fontWeight={700} sx={{ fontWeight: 700 }}>
                  {formatDateTime(booking.bookingTime)}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography color="text.secondary">Thời gian tạo</Typography>

                <Typography fontWeight={700} sx={{ fontWeight: 700 }}>
                  {formatDateTime(booking.createdAt)}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography color="text.secondary">Trạng thái</Typography>

                <Chip
                  sx={{
                    mt: 1,
                  }}
                  label={getStatusText(booking.status)}
                  color={getStatusColor(booking.status)}
                />
              </Box>
            </Stack>
          </Paper>

          {/* THÔNG TIN PHÒNG */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid #e2e8f0",
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mb={2}
              sx={{ alignItems: "center", mb: 2 }}
            >
              <MeetingRoomIcon />

              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ fontWeight: 700 }}
              >
                Thông tin phòng
              </Typography>
            </Stack>

            <Stack spacing={2}>
              <Box>
                <Typography color="text.secondary">Số phòng</Typography>

                <Typography fontWeight={700} sx={{ fontWeight: 700 }}>
                  {booking.room.roomNumber}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography color="text.secondary">Khu vực</Typography>

                <Typography fontWeight={700} sx={{ fontWeight: 700 }}>
                  {booking.room.area.areaName}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography color="text.secondary">Sức chứa</Typography>

                <Typography fontWeight={700} sx={{ fontWeight: 700 }}>
                  {booking.room.capacity} người
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography color="text.secondary">Giá giờ</Typography>

                <Typography fontWeight={700} sx={{ fontWeight: 700 }}>
                  {booking.room.hourlyRate.toLocaleString("vi-VN")} ₫
                </Typography>
              </Box>
            </Stack>
          </Paper>

          {/* THÔNG TIN HỘI VIÊN */}

          <Paper
            elevation={0}
            sx={{
              p: 3,
              borderRadius: 3,
              border: "1px solid #e2e8f0",
              gridColumn: {
                md: "1 / span 2",
              },
            }}
          >
            <Stack
              direction="row"
              spacing={1}
              alignItems="center"
              mb={2}
              sx={{ alignItems: "center", mb: 2 }}
            >
              <PersonIcon />

              <Typography
                variant="h6"
                fontWeight={700}
                sx={{ fontWeight: 700 }}
              >
                Thông tin hội viên
              </Typography>
            </Stack>

            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: {
                  xs: "1fr",
                  md: "1fr 1fr 1fr",
                },
                gap: 3,
              }}
            >
              <Box>
                <Typography color="text.secondary">Họ tên</Typography>

                <Typography fontWeight={700} sx={{ fontWeight: 700 }}>
                  {booking.memberAccount.memberProfile.fullName}
                </Typography>
              </Box>

              <Box>
                <Typography color="text.secondary">Email</Typography>

                <Typography fontWeight={700} sx={{ fontWeight: 700 }}>
                  {booking.memberAccount.email}
                </Typography>
              </Box>

              <Box>
                <Typography color="text.secondary">Mã hội viên</Typography>

                <Typography fontWeight={700} sx={{ fontWeight: 700 }}>
                  {booking.memberAccount.memberProfile.memberCode}
                </Typography>
              </Box>
            </Box>
          </Paper>
        </Box>

        {/* ACTIONS */}

        {booking.status === "PENDING" && (
          <Stack direction="row" spacing={2} mt={4} sx={{ mt: 4 }}>
            <Button
              variant="contained"
              color="success"
              size="large"
              startIcon={<CheckCircleIcon />}
              onClick={handleCheckIn}
              sx={{
                textTransform: "none",
              }}
            >
              Nhận phòng
            </Button>

            <Button
              variant="contained"
              color="error"
              size="large"
              startIcon={<CancelIcon />}
              onClick={handleCancel}
              sx={{
                textTransform: "none",
              }}
            >
              Hủy lịch đặt
            </Button>
          </Stack>
        )}
      </Paper>
    </Box>
  );
}

export default BookingDetailPage;
