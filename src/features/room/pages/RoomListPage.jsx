import { Box } from "@mui/material";
import AreaTabList from "../components/AreaTabList";
import RoomList from "../components/RoomList";
import RoomPagination from "../components/RoomPagination";
import RoomFuncMenu from "../components/RoomFuncMenu";

function RoomListPage() {
    return ( 
        <Box>
            <AreaTabList />
            <RoomFuncMenu />
            <RoomList />
            <RoomPagination />
        </Box> 
    );
}

export default RoomListPage;