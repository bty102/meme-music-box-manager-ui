import {
  Alert,
  Box,
  Button,
  Chip,
  CircularProgress,
  Paper,
  Stack,
  Typography,
} from "@mui/material";

import AddIcon from "@mui/icons-material/Add";

import VisibilityIcon from "@mui/icons-material/Visibility";

import { useEffect } from "react";

import { useDispatch, useSelector } from "react-redux";

import { useNavigate } from "react-router-dom";

import { fetchAreas } from "../store/areaThunk";

function AreaListPage() {
  const dispatch = useDispatch();

  const navigate = useNavigate();

  const user = useSelector((state) => state.auth.user);

  const isEmployee = user?.role === "EMPLOYEE";

  const { areas, loading, error } = useSelector((state) => state.area);

  useEffect(() => {
    dispatch(fetchAreas(isEmployee ? true : undefined));
  }, [dispatch, isEmployee]);

  if (loading) {
    return (
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "100vh",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box
      sx={{
        p: 3,
        minHeight: "100vh",
        bgcolor: "#f5f7fb",
      }}
    >
      <Paper
        elevation={0}
        sx={{
          p: 3,
          borderRadius: 4,
          border: "1px solid #e2e8f0",
        }}
      >
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mb: 3,
          }}
        >
          <Typography variant="h5" fontWeight={700}>
            Danh sách khu vực
          </Typography>

          {!isEmployee && (
            <Button
              variant="contained"
              startIcon={<AddIcon />}
              onClick={() => navigate("/areas/create")}
              sx={{
                textTransform: "none",
              }}
            >
              Thêm mới
            </Button>
          )}
        </Box>

        {error && (
          <Alert
            severity="error"
            sx={{
              mb: 2,
            }}
          >
            {error}
          </Alert>
        )}

        <Stack spacing={2}>
          {areas.map((area) => (
            <Paper
              key={area.id}
              elevation={0}
              sx={{
                p: 2.5,
                border: "1px solid #e2e8f0",
                borderRadius: 3,
              }}
            >
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  alignItems: "center",
                  gap: 2,
                  flexWrap: "wrap",
                }}
              >
                <Box>
                  <Typography
                    sx={{
                      fontWeight: 700,
                      fontSize: 18,
                      mb: 1,
                    }}
                  >
                    {area.areaName}
                  </Typography>

                  <Typography
                    variant="body2"
                    color="text.secondary"
                    sx={{
                      mb: 1,
                    }}
                  >
                    {area.description}
                  </Typography>

                  <Chip
                    label={area.isActive ? "Đang hoạt động" : "Ngưng hoạt động"}
                    color={area.isActive ? "success" : "error"}
                    size="small"
                  />
                </Box>

                <Button
                  variant="contained"
                  startIcon={<VisibilityIcon />}
                  onClick={() => navigate(`/areas/detail/${area.id}`)}
                  sx={{
                    textTransform: "none",
                  }}
                >
                  Xem chi tiết
                </Button>
              </Box>
            </Paper>
          ))}
        </Stack>

        {areas.length === 0 && (
          <Box
            sx={{
              py: 6,
              textAlign: "center",
            }}
          >
            <Typography color="text.secondary">Không có khu vực nào</Typography>
          </Box>
        )}
      </Paper>
    </Box>
  );
}

export default AreaListPage;
