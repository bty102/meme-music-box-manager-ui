import {
Alert,
Avatar,
Box,
Button,
CircularProgress,
InputAdornment,
Paper,
Stack,
Table,
TableBody,
TableCell,
TableContainer,
TableHead,
TablePagination,
TableRow,
TextField,
Typography,
Chip,
} from "@mui/material";

import AddIcon
from "@mui/icons-material/Add";

import SearchIcon
from "@mui/icons-material/Search";

import VisibilityIcon
from "@mui/icons-material/Visibility";

import {
useEffect,
useState,
} from "react";

import {
useDispatch,
useSelector,
} from "react-redux";

import {
useNavigate,
} from "react-router-dom";

import {
fetchEmployees,
} from "../store/employeeThunk";

const DEFAULT_AVATAR =
"https://ui-avatars.com/api/?background=random&name=Employee";

function EmployeeListPage() {


const dispatch =
    useDispatch();

const navigate =
    useNavigate();

const {
    employees,

    pageNumber,
    pageSize,

    totalPages,
    totalElements,

    loading,
    error,
} = useSelector(
    state => state.employee
);

const [
    keyword,
    setKeyword,
] = useState("");

useEffect(() => {

    dispatch(
        fetchEmployees({
            pageNumber: 0,
            pageSize: 10,
        })
    );

}, [dispatch]);

const handleSearch =
    () => {

        dispatch(
            fetchEmployees({
                q: keyword,
                pageNumber: 0,
                pageSize,
            })
        );
    };

const handlePageChange =
    (
        _,
        newPage
    ) => {

        dispatch(
            fetchEmployees({
                q: keyword,
                pageNumber:
                    newPage,

                pageSize,
            })
        );
    };

const handleRowsPerPageChange =
    event => {

        dispatch(
            fetchEmployees({
                q: keyword,

                pageNumber: 0,

                pageSize:
                    Number(
                        event.target.value
                    ),
            })
        );
    };

return (

    <Box
        sx={{
            p: 3,
        }}
    >

        <Paper
            elevation={3}
            sx={{
                p: 3,
                borderRadius: 3,
            }}
        >

            <Stack
                direction="row"
                sx={{
                    justifyContent:
                        "space-between",

                    alignItems:
                        "center",

                    mb: 3,
                }}
            >

                <Typography
                    variant="h4"
                    sx={{
                        fontWeight: 700,
                    }}
                >
                    Danh sách nhân viên
                </Typography>

                <Button
                    variant="contained"
                    startIcon={
                        <AddIcon />
                    }
                    onClick={() =>
                        navigate(
                            "/employees/create"
                        )
                    }
                >
                    Thêm nhân viên
                </Button>

            </Stack>

            <Stack
                direction="row"
                spacing={2}
                sx={{
                    mb: 3,
                }}
            >

                <TextField
                    fullWidth
                    label="Tìm theo mã nhân viên hoặc họ tên"
                    value={
                        keyword
                    }
                    onChange={
                        e =>
                            setKeyword(
                                e.target.value
                            )
                    }
                    onKeyDown={
                        e => {

                            if (
                                e.key ===
                                "Enter"
                            ) {
                                handleSearch();
                            }
                        }
                    }
                    InputProps={{
                        startAdornment:
                            (
                                <InputAdornment
                                    position="start"
                                >
                                    <SearchIcon />
                                </InputAdornment>
                            ),
                    }}
                />

                <Button
                    variant="contained"
                    onClick={
                        handleSearch
                    }
                >
                    Tìm kiếm
                </Button>

            </Stack>

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

            {loading ? (

                <Box
                    sx={{
                        display:
                            "flex",

                        justifyContent:
                            "center",

                        py: 8,
                    }}
                >
                    <CircularProgress />
                </Box>

            ) : (

                <>

                    <TableContainer>

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        Avatar
                                    </TableCell>

                                    <TableCell>
                                        Mã NV
                                    </TableCell>

                                    <TableCell>
                                        Họ tên
                                    </TableCell>

                                    <TableCell>
                                        Email
                                    </TableCell>

                                    <TableCell>
                                        SĐT
                                    </TableCell>

                                    <TableCell>
                                        Giới tính
                                    </TableCell>

                                    <TableCell>
                                        Trạng thái
                                    </TableCell>

                                    <TableCell
                                        align="center"
                                    >
                                        Thao tác
                                    </TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {employees.map(
                                    employee => (

                                        <TableRow
                                            hover
                                            key={
                                                employee.id
                                            }
                                        >

                                            <TableCell>

                                                <Avatar
                                                    src={
                                                        employee.employeeProfile?.imageUrl ||

                                                        DEFAULT_AVATAR
                                                    }
                                                    sx={{
                                                        width: 50,
                                                        height: 50,
                                                    }}
                                                />

                                            </TableCell>

                                            <TableCell>

                                                {
                                                    employee.employeeProfile?.employeeCode
                                                }

                                            </TableCell>

                                            <TableCell>

                                                {
                                                    employee.employeeProfile?.fullName
                                                }

                                            </TableCell>

                                            <TableCell>

                                                {
                                                    employee.email
                                                }

                                            </TableCell>

                                            <TableCell>

                                                {
                                                    employee.employeeProfile?.phoneNumber
                                                }

                                            </TableCell>

                                            <TableCell>

                                                {
                                                    employee.employeeProfile?.isMale
                                                        ? "Nam"
                                                        : "Nữ"
                                                }

                                            </TableCell>

                                            <TableCell>

                                                <Chip
                                                    label={
                                                        employee.isActive
                                                            ? "Hoạt động"
                                                            : "Đã khóa"
                                                    }
                                                    color={
                                                        employee.isActive
                                                            ? "success"
                                                            : "error"
                                                    }
                                                />

                                            </TableCell>

                                            <TableCell
                                                align="center"
                                            >

                                                <Button
                                                    variant="outlined"
                                                    startIcon={
                                                        <VisibilityIcon />
                                                    }
                                                    onClick={() =>
                                                        navigate(
                                                            `/employees/detail/${employee.id}`
                                                        )
                                                    }
                                                >
                                                    Chi tiết
                                                </Button>

                                            </TableCell>

                                        </TableRow>

                                    )
                                )}

                            </TableBody>

                        </Table>

                    </TableContainer>

                    <TablePagination
                        component="div"
                        count={
                            totalElements
                        }
                        page={
                            pageNumber
                        }
                        rowsPerPage={
                            pageSize
                        }
                        onPageChange={
                            handlePageChange
                        }
                        onRowsPerPageChange={
                            handleRowsPerPageChange
                        }
                        rowsPerPageOptions={[
                            5,
                            10,
                            20,
                            50,
                        ]}
                    />

                </>

            )}

        </Paper>

    </Box>
);


}

export default EmployeeListPage;
