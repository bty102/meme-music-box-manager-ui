import { Box, Grid } from "@mui/material";
import { useSelector } from "react-redux";
import RoomItem from "./RoomItem";

function RoomList() {

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

    return (
        <Box sx={{ mb: 3 }}>
            <Grid container spacing={3}>
                {rooms.map((room) => (
                    <Grid
                        key={room.id}
                        size={{
                            xs: 12,
                            md: 6,
                            lg: 4,
                        }}
                    >
                        <RoomItem room={room} />
                    </Grid>
                ))}
            </Grid>
        </Box>
    );
}

export default RoomList;