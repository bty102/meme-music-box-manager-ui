
import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Box,
    ButtonGroup,
    Button,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import { openRoomApi } from "../services/roomApi";
import { useDispatch, useSelector } from "react-redux";
import { fetchRooms, searchRooms } from "../store/roomThunk";
import { useNavigate, useParams } from "react-router-dom";
import { transferInvoiceToRoomApi } from "../../invoice/services/invoiceApi";

function RoomTransferItem({ room }) {

    const { invoiceId } = useParams();

    const dispatch = useDispatch();

    const navigate = useNavigate();

  const {
    rooms,

    areaId,

    searchKeyword,

    pageNumber,
    pageSize,
    totalPages,
    totalElements,

    mode,

    loading,
    error,
  } = useSelector((state) => state.room);

  const user = useSelector((state) => state.auth.user);

  const isEmployee = user?.role === "EMPLOYEE";

    const getStatusConfig = () => {

        if (!room.isActive) {
            return {
                label: "Ngừng hoạt động",
                color: "default",
            };
        }

        switch (room.status) {
            case "AVAILABLE":
                return {
                    label: "Đang trống",
                    color: "success",
                };

            case "IN_USE":
                return {
                    label: "Đang sử dụng",
                    color: "error",
                };

            case "BOOKED":
                return {
                    label: "Đã đặt trước",
                    color: "warning",
                };

            case "TEMPORARY":
                return {
                    label: "Tạm giữ",
                    color: "info",
                };

            default:
                return {
                    label: room.status,
                    color: "default",
                };
        }
    };

    const status = getStatusConfig();

    const handleOpenRoom = async() => {
        if(confirm(`Bạn có chắc chắn muốn mở phòng ${room.roomNumber}?`)) {
            try {
                const response = await openRoomApi({ roomId: room.id });
                alert(`Phòng ${room.roomNumber} đã được mở thành công!`);
                if(isEmployee) {
                    if(mode === "SEARCH") {
                        dispatch(
                            searchRooms({
                                q: searchKeyword,
                                isActive: true,
                                pageNumber,
                                pageSize,
                            }),
                        );
                    } else {
                        dispatch(
                            fetchRooms({
                                areaId,
                                isActive: true,
                                pageNumber,
                                pageSize,
                            }),
                        );
                    }
                } else {
                    if(mode === "SEARCH") {
                        dispatch(
                            searchRooms({
                                q: searchKeyword,
                                pageNumber,
                                pageSize,
                            }),
                        );
                    } else {
                        dispatch(
                            fetchRooms({
                                areaId,
                                pageNumber,
                                pageSize,
                            }),
                        );
                    }
                }
            } catch (error) {
                // console.error("Lỗi khi mở phòng:", error);
                // alert("Có lỗi xảy ra khi mở phòng. Vui lòng thử lại.");
                alert(error.response?.data?.message || "Có lỗi xảy ra khi mở phòng. Vui lòng thử lại.");
            }
        }
    }

    const handleViewDetail = () => {
        navigate(`/rooms/detail/${room.id}`);
    }

    const handleTransferToRoom = async (roomId) => {
        if (confirm(`Bạn có chắc chắn muốn chuyển hóa đơn đến phòng ${room.roomNumber}?`)) {
            try {
                const response = await transferInvoiceToRoomApi({ invoiceId, roomId });
                alert(`Hóa đơn đã được chuyển đến phòng ${room.roomNumber} thành công!`);
                navigate(`/rooms/detail/${roomId}`);
            } catch (error) {
                alert(error.response?.data?.message || "Có lỗi xảy ra khi chuyển hóa đơn. Vui lòng thử lại.");
            }
        }
    };

    return (
        <Card
            elevation={3}
            sx={{
                borderRadius: 3,
                transition: "0.2s",
                cursor: "pointer",

                "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: 8,
                },

                ...(room.isActive
                    ? {}
                    : {
                          opacity: 0.7,
                          bgcolor: "grey.100",
                      }),
            }}
        >
            <CardContent>

                <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                    sx={{justifyContent: "space-between", alignItems: "center", mb: 2}}
                >
                    <Typography
                        variant="h5"
                        fontWeight={700}
                    >
                        Phòng {room.roomNumber}
                    </Typography>

                    <Chip
                        label={status.label}
                        color={status.color}
                    />
                </Stack>

                <Typography
                    variant="body2"
                    color="text.secondary"
                    gutterBottom
                >
                    Khu vực: {room.area?.areaName}
                </Typography>

                <Stack spacing={1.5} mt={2}>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        sx={{display: "flex", alignItems: "center", gap: 1}}
                    >
                        <PeopleIcon
                            fontSize="small"
                            color="action"
                        />

                        <Typography variant="body1">
                            Sức chứa: {room.capacity} người
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        sx={{display: "flex", alignItems: "center", gap: 1}}
                    >
                        <AttachMoneyIcon
                            fontSize="small"
                            color="action"
                        />

                        <Typography variant="body1">
                            Giá giờ:
                            {" "}
                            {Number(
                                room.hourlyRate
                            ).toLocaleString("vi-VN")}
                            đ
                        </Typography>
                    </Box>

                    <Box
                        display="flex"
                        alignItems="center"
                        gap={1}
                        sx={{display: "flex", alignItems: "center", gap: 1}}
                    >
                        <MeetingRoomIcon
                            fontSize="small"
                            color="action"
                        />

                        <Typography variant="body1">
                            ID: #{room.id}
                        </Typography>
                    </Box>

                </Stack>

                <Box>
                    <ButtonGroup variant="text" size="small">
                        {/* <Button onClick={handleOpenRoom}>Mở phòng</Button>
                        <Button onClick={handleViewDetail}>Xem chi tiết</Button> */}
                        <Button onClick={() => handleTransferToRoom(room.id)}>Chuyển đến phòng này</Button>
                    </ButtonGroup>
                </Box>

            </CardContent>
        </Card>
    );
}

export default RoomTransferItem;