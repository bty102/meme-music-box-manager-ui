import { Box } from "@mui/material";
import RoomPagination from "../components/RoomPagination";
import AreaTabList from "../components/AreaTabList";
import RoomTransferList from "../components/RoomTransferList";
import RoomFuncMenu from "../components/RoomFuncMenu";
import { useParams } from "react-router-dom";

function RoomTransferListPage() {

    const { invoiceId } = useParams();

    return ( <Box>
        <AreaTabList />
        <RoomFuncMenu />
        <RoomTransferList />
        <RoomPagination />
    </Box> );
}

export default RoomTransferListPage;