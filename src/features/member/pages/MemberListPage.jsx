import {
    Alert,
    Avatar,
    Box,
    Button,
    Chip,
    CircularProgress,
    Pagination,
    Paper,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    Typography,
} from "@mui/material";

import VisibilityIcon
from "@mui/icons-material/Visibility";

import {
    useEffect,
} from "react";

import {
    useDispatch,
    useSelector,
} from "react-redux";

import {
    useNavigate,
} from "react-router-dom";

import {
    fetchMembers,
} from "../store/memberThunk";

import {
    formatDateTime,
} from "../../../util/formatDateTime";

const DEFAULT_AVATAR =
    "https://ui-avatars.com/api/?background=random&name=Member";

function MemberListPage() {

    const dispatch =
        useDispatch();

    const navigate =
        useNavigate();

    const {
        members,

        pageNumber,
        pageSize,
        totalPages,
        totalElements,

        loading,
        error,
    } = useSelector(
        state => state.member
    );

    useEffect(() => {

        dispatch(
            fetchMembers({
                pageNumber: 0,
                pageSize: 10,
            })
        );

    }, [dispatch]);

    const handlePageChange =
        (_, page) => {

            dispatch(
                fetchMembers({
                    pageNumber:
                        page - 1,

                    pageSize,
                })
            );
        };

    return (

        <Box
            sx={{
                p: 3,
            }}
        >

            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 3,
                }}
            >
                Danh sách hội viên
            </Typography>

            <Typography
                sx={{
                    mb: 2,
                    color:
                        "text.secondary",
                }}
            >
                Tổng số hội viên:
                {" "}
                {
                    totalElements
                }
            </Typography>

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
                        display: "flex",
                        justifyContent:
                            "center",

                        py: 8,
                    }}
                >
                    <CircularProgress />
                </Box>

            ) : (

                <>

                    <TableContainer
                        component={Paper}
                        sx={{
                            borderRadius: 3,
                            overflow:
                                "hidden",
                        }}
                    >

                        <Table>

                            <TableHead>

                                <TableRow>

                                    <TableCell>
                                        Avatar
                                    </TableCell>

                                    <TableCell>
                                        Mã hội viên
                                    </TableCell>

                                    <TableCell>
                                        Họ tên
                                    </TableCell>

                                    <TableCell>
                                        Email
                                    </TableCell>

                                    <TableCell>
                                        Giới tính
                                    </TableCell>

                                    <TableCell>
                                        Điểm
                                    </TableCell>

                                    <TableCell>
                                        Trạng thái
                                    </TableCell>

                                    <TableCell>
                                        Ngày tạo
                                    </TableCell>

                                    <TableCell
                                        align="center"
                                    >
                                        Thao tác
                                    </TableCell>

                                </TableRow>

                            </TableHead>

                            <TableBody>

                                {members.map(
                                    member => (

                                        <TableRow
                                            key={
                                                member.id
                                            }
                                            hover
                                        >

                                            <TableCell>

                                                <Avatar
                                                    src={
                                                        member
                                                            .memberProfile
                                                            ?.imageUrl ||

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
                                                    member
                                                        .memberProfile
                                                        ?.memberCode
                                                }

                                            </TableCell>

                                            <TableCell>

                                                {
                                                    member
                                                        .memberProfile
                                                        ?.fullName
                                                }

                                            </TableCell>

                                            <TableCell>

                                                {
                                                    member.email
                                                }

                                            </TableCell>

                                            <TableCell>

                                                {
                                                    member
                                                        .memberProfile
                                                        ?.isMale

                                                        ? "Nam"

                                                        : "Nữ"
                                                }

                                            </TableCell>

                                            <TableCell>

                                                {
                                                    member
                                                        .memberProfile
                                                        ?.loyaltyPoint
                                                        ?.toLocaleString()
                                                }

                                            </TableCell>

                                            <TableCell>

                                                <Chip
                                                    color={
                                                        member.isActive
                                                            ? "success"
                                                            : "error"
                                                    }
                                                    label={
                                                        member.isActive
                                                            ? "Hoạt động"
                                                            : "Đã khóa"
                                                    }
                                                />

                                            </TableCell>

                                            <TableCell>

                                                {
                                                    formatDateTime(
                                                        member.createdAt
                                                    )
                                                }

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
                                                            `/members/detail/${member.id}`
                                                        )
                                                    }
                                                >
                                                    Xem
                                                </Button>

                                            </TableCell>

                                        </TableRow>
                                    )
                                )}

                            </TableBody>

                        </Table>

                    </TableContainer>

                    <Box
                        sx={{
                            display:
                                "flex",

                            justifyContent:
                                "center",

                            mt: 4,
                        }}
                    >

                        <Pagination
                            page={
                                pageNumber + 1
                            }
                            count={
                                totalPages
                            }
                            color="primary"
                            size="large"
                            onChange={
                                handlePageChange
                            }
                        />

                    </Box>

                </>

            )}

        </Box>
    );
}

export default MemberListPage;