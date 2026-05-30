import {
    Card,
    CardContent,
    Typography,
    Chip,
    Stack,
    Box,
} from "@mui/material";
import MeetingRoomIcon from "@mui/icons-material/MeetingRoom";
import PeopleIcon from "@mui/icons-material/People";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";

function RoomItem({ room }) {

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

            </CardContent>
        </Card>
    );
}

export default RoomItem;