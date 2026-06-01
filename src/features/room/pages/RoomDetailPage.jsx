import {
  Box,
  Button,
  ButtonGroup,
  Chip,
  Divider,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getRoomInfoApi } from "../services/roomApi";
import {
  checkOutInvoiceApi,
  getTemporaryInvoiceApi,
} from "../../invoice/services/invoiceApi";
import { useSelector } from "react-redux";

function RoomDetailPage() {
  const { id } = useParams();

  const navigate = useNavigate();

  const [room, setRoom] = useState(null);
  const [invoice, setInvoice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const user = useSelector((state) => state.auth.user);

  const isEmployee = user?.role === "EMPLOYEE";

  useEffect(() => {
    const fetchRoomInfo = async () => {
      try {
        setLoading(true);
        const response = await getRoomInfoApi(id);
        setRoom(response);
      } catch (err) {
        setError(err.response?.data?.message || "Lỗi khi tải thông tin phòng");
      } finally {
        setLoading(false);
      }
    };
    fetchRoomInfo();
  }, [id]);

  useEffect(() => {
    const fetchTemporaryInvoice = async () => {
      try {
        setLoading(true);
        const response = await getTemporaryInvoiceApi(id);
        setInvoice(response);
      } catch (err) {
        setError(err.response?.data?.message || "Lỗi khi tải hóa đơn tạm thời");
      } finally {
        setLoading(false);
      }
    };
    fetchTemporaryInvoice();
  }, [id]);

  const handleCheckOut = async () => {
    if (!confirm("Bạn có chắc chắn muốn trả phòng?")) {
      return;
    }
    try {
      await checkOutInvoiceApi(invoice.id);
      navigate(`/invoices/detail/${invoice.id}`);
    } catch (err) {
      // console.log(err);
      alert(err.response?.data?.message || "Lỗi khi trả phòng");
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
          color: "#1e293b",
        }}
      >
        Chi tiết phòng
      </Typography>

      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            lg: "1fr 1fr",
          },
          gap: 3,
        }}
      >
        {/* THÔNG TIN PHÒNG */}

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: 3,
            border: "1px solid #e2e8f0",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Phòng {room?.roomNumber}
          </Typography>

          <Stack spacing={2.5}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                Số phòng
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                {room?.roomNumber}
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="body2" color="text.secondary">
                Sức chứa
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                {room?.capacity} người
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="body2" color="text.secondary">
                Giá theo giờ
              </Typography>

              <Typography variant="h6" fontWeight={600} color="primary">
                {room?.hourlyRate?.toLocaleString("vi-VN")} ₫
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="body2" color="text.secondary">
                Trạng thái
              </Typography>

              <Chip
                label={room?.status}
                color={
                  room?.status === "AVAILABLE"
                    ? "success"
                    : room?.status === "BOOKED"
                      ? "warning"
                      : "error"
                }
                sx={{
                  mt: 1,
                  fontWeight: 600,
                }}
              />
            </Box>

            <Divider />

            <Box>
              <Typography variant="body2" color="text.secondary">
                Khu vực
              </Typography>

              <Typography variant="h6" fontWeight={600}>
                {room?.area?.areaName}
              </Typography>

              <Typography
                color="text.secondary"
                sx={{
                  mt: 1,
                }}
              >
                {room?.area?.description}
              </Typography>
            </Box>

            <Divider />

            <Box>
              <Typography variant="body2" color="text.secondary">
                Hoạt động
              </Typography>

              <Typography
                variant="h6"
                fontWeight={600}
                color={room?.isActive ? "success.main" : "error.main"}
              >
                {room?.isActive ? "Đang hoạt động" : "Ngừng hoạt động"}
              </Typography>
            </Box>

            <Divider />

            <Box sx={{ display: "flex", justifyContent: "center" }}>
              <ButtonGroup orientation="vertical" variant="text">
                <Button
                  onClick={() => {
                    navigate(`/rooms/invoices/${room?.id}`);
                  }}
                >
                  Danh sách hóa đơn
                </Button>

                <Button
                  onClick={() => {
                    navigate(`/rooms/bookings/${room?.id}`);
                  }}
                >
                  Danh sách lịch đặt
                </Button>
                {invoice && <Button onClick={handleCheckOut}>Trả phòng</Button>}

                {!isEmployee && (
                  <Button
                    onClick={() => {
                      navigate(`/rooms/update/${room?.id}`);
                    }}
                  >
                    Cập nhật thông tin
                  </Button>
                )}
              </ButtonGroup>
            </Box>
          </Stack>
        </Paper>

        {/* HÓA ĐƠN TẠM */}

        <Paper
          elevation={0}
          sx={{
            borderRadius: 4,
            p: 3,
            border: "1px solid #e2e8f0",
          }}
        >
          <Typography
            variant="h5"
            sx={{
              fontWeight: 700,
              mb: 3,
            }}
          >
            Hóa đơn tạm
          </Typography>

          {!invoice ? (
            <Box
              sx={{
                height: 400,
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              <Typography color="text.secondary">
                Chưa có hóa đơn tạm
              </Typography>
            </Box>
          ) : (
            <Stack spacing={2.5}>
              <Box>
                <Typography variant="body2" color="text.secondary">
                  Mã hóa đơn
                </Typography>

                <Typography fontWeight={600}>{invoice.invoiceCode}</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Trạng thái
                </Typography>

                <Chip
                  label={invoice.status}
                  color="warning"
                  sx={{
                    mt: 1,
                    fontWeight: 600,
                  }}
                />
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Hội viên
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography fontWeight={600}>
                    {invoice?.member?.memberProfile?.fullName || "Khách lẻ"}
                  </Typography>

                  <Box>
                    <Button
                      onClick={() => {
                        navigate(`/invoices/update/member/${invoice.id}`);
                      }}
                    >
                      Cập nhật
                    </Button>
                  </Box>
                </Box>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Thu ngân
                </Typography>

                <Typography fontWeight={600}>
                  {invoice?.createdBy.employeeProfile?.fullName || "AD"}
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  VAT
                </Typography>

                <Typography fontWeight={600}>{invoice.vatPercent}%</Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Giảm giá
                </Typography>

                <Typography fontWeight={600}>
                  {invoice.discountPercent}%
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Tiền phòng
                </Typography>

                <Typography fontWeight={600}>
                  {invoice.roomCharge?.toLocaleString("vi-VN") || "---"} ₫
                </Typography>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Tiền dịch vụ
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                  }}
                >
                  <Typography fontWeight={600}>
                    {invoice.serviceCharge?.toLocaleString("vi-VN") || "---"} ₫
                  </Typography>
                  <Button
                    onClick={() => {
                      navigate(`/invoices/update/product/${invoice.id}`);
                    }}
                  >
                    Cập nhật
                  </Button>
                </Box>
              </Box>

              <Divider />

              <Box>
                <Typography variant="body2" color="text.secondary">
                  Thành tiền
                </Typography>

                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 2,
                    justifyContent: "space-between",
                  }}
                >
                  <Typography
                    variant="h5"
                    sx={{
                      mt: 1,
                      fontWeight: 700,
                      color: "error.main",
                    }}
                  >
                    {invoice.finalAmount?.toLocaleString("vi-VN") || "---"} ₫
                  </Typography>
                  <Button
                    onClick={() => navigate(`/invoices/transfer/${invoice.id}`)}
                  >
                    Chuyển phòng
                  </Button>
                </Box>
              </Box>
            </Stack>
          )}
        </Paper>
      </Box>
    </Box>
  );
}

export default RoomDetailPage;
