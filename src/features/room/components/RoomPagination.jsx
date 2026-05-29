import { Pagination } from "@mui/material";
import { fetchRooms } from "../store/roomThunk";
import { useDispatch, useSelector } from "react-redux";

function RoomPagination() {
  const dispatch = useDispatch();
  const {
    rooms,

    areaId,

    pageNumber,
    pageSize,
    totalPages,
    totalElements,
    loading,
    error,
  } = useSelector((state) => state.room);

  const user = useSelector((state) => state.auth.user);

  const isEmployee = user?.role === "EMPLOYEE";

  const handlePageChange = (event, value) => {
    if(isEmployee == undefined) return;
    if (isEmployee) {
      dispatch(
        fetchRooms({
          areaId,
          isActive: true,
          pageNumber: value - 1,
          pageSize,
        }),
      );
    } else {
      dispatch(
        fetchRooms({
          areaId,
          pageNumber: value - 1,
          pageSize,
        }),
      );
    }
  };
  return (
    <Pagination
      count={totalPages}
      page={pageNumber + 1}
      onChange={handlePageChange}
    />
  );
}

export default RoomPagination;
