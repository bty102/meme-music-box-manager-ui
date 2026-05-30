
import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import RoomItem from "./RoomItem";
import RoomTransferItem from "./RoomTransferItem";

function RoomTransferList() {

    const {
        rooms,
        loading,
        error,
    } = useSelector((state) => state.room);

    if (loading) {
        return <h1>Loading...</h1>;
    }

    if (error) {
        return <h1>{error}</h1>;
    }

    const transferableRooms = rooms.filter((room) => (room.status === "AVAILABLE" || room.status === "BOOKED") && room.isActive);

    return (
        <Box sx={{ mb: 3 }}>
            <Grid container spacing={3}>
                {transferableRooms.map((room) => (
                    <Grid
                        key={room.id}
                        size={{
                            xs: 12,
                            md: 6,
                            lg: 4,
                        }}
                    >
                        <RoomTransferItem room={room} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default RoomTransferList;