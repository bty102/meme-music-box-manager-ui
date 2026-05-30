import { Box, Button, TextField } from "@mui/material";
import SearchIcon from "@mui/icons-material/Search";
import { useState } from "react";

function RoomSearchForm({ onSearch }) {
  const [keyword, setKeyword] = useState("");

  const handleSubmit = (event) => {
    event.preventDefault();

    onSearch(keyword.trim());
  };

  return (
    <Box
      component="form"
      onSubmit={handleSubmit}
      sx={{
        display: "flex",
        alignItems: "center",
        gap: 2,
        width: "100%",
        mb: 3,
      }}
    >
      <TextField
        fullWidth
        placeholder="Tìm theo số phòng hoặc sức chứa..."
        value={keyword}
        onChange={(event) => setKeyword(event.target.value)}
        size="small"
        sx={{
          "& .MuiOutlinedInput-root": {
            borderRadius: 3,
            backgroundColor: "#fff",
          },
        }}
      />

      <Button
        type="submit"
        variant="contained"
        startIcon={<SearchIcon />}
        size="medium"
        sx={{
          minWidth: 130,
        //   height: 56,
          borderRadius: 3,
          textTransform: "none",
          fontWeight: 600,
        }}
      >
        Tìm kiếm
      </Button>
    </Box>
  );
}

export default RoomSearchForm;
