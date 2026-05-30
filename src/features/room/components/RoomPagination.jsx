import { Pagination } from "@mui/material";
import { fetchRooms, searchRooms } from "../store/roomThunk";
import { useDispatch, useSelector } from "react-redux";

function RoomPagination() {
  const dispatch = useDispatch();
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

  const handlePageChange = (event, value) => {
    if (isEmployee == undefined) return;
    if (mode === "SEARCH") {
      if (isEmployee) {
        dispatch(
          searchRooms({
            q: searchKeyword,
            isActive: true,
            pageNumber: value - 1,
            pageSize,
          }),
        );
      } else {
        dispatch(
          searchRooms({
            q: searchKeyword,
            pageNumber: value - 1,
            pageSize,
          }),
        );
      }

    } else {
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
