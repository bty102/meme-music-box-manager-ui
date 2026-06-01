import { Box, Button, ButtonGroup } from "@mui/material";
import RoomSearchForm from "./RoomSearchForm";
import { useDispatch, useSelector } from "react-redux";
import { searchRooms } from "../store/roomThunk";
import { useNavigate } from "react-router-dom";

function RoomFuncMenu() {
  const navigate = useNavigate();

  const dispatch = useDispatch();

  const user = useSelector((state) => state.auth.user);

  const isEmployee = user?.role === "EMPLOYEE";

  const handleSearch = (keyword) => {
    if (isEmployee == undefined) return;
    if (isEmployee) {
      dispatch(
        searchRooms({
          q: keyword,
          isActive: true,
          pageNumber: 0,
          pageSize: 6,
        }),
      );
    } else {
      dispatch(
        searchRooms({
          q: keyword,
          pageNumber: 0,
          pageSize: 6,
        }),
      );
    }
  };
  return (
    <Box
      sx={{
        display: "flex",
        flexDirection: "row",
        gap: 3,
        alignItems: "center",
        justifyContent: "space-between",
      }}
    >
      <Box>
        <ButtonGroup>
          {!isEmployee && (
            <Button
              onClick={() => {
                navigate("/rooms/create");
              }}
            >
              Thêm phòng
            </Button>
          )}
        </ButtonGroup>
      </Box>
      <Box>
        <RoomSearchForm onSearch={handleSearch} />
      </Box>
    </Box>
  );
}

export default RoomFuncMenu;
