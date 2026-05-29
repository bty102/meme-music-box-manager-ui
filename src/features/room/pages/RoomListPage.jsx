import { Box } from "@mui/material";
import AreaTabList from "../components/AreaTabList";
import RoomList from "../components/RoomList";
import RoomPagination from "../components/RoomPagination";

function RoomListPage() {
    return ( 
        <Box>
            <AreaTabList />
            <RoomList />
            <RoomPagination />
        </Box> 
    );
}

export default RoomListPage;