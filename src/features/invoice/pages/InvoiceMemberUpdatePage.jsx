import {
    Avatar,
    Box,
    Button,
    Chip,
    Divider,
    List,
    ListItem,
    Paper,
    Stack,
    Typography,
} from "@mui/material";

import DeleteIcon from "@mui/icons-material/Delete";
import PersonAddIcon from "@mui/icons-material/PersonAdd";
import PersonIcon from "@mui/icons-material/Person";

import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { deleteInvoiceMemberApi, getInvoiceDetailApi, updateInvoiceMemberApi } from "../services/invoiceApi";
import { getActiveMembersApi } from "../../member/services/memberApi";


function InvoiceMemberUpdatePage() {

    const { invoiceId } = useParams();

    const [invoice, setInvoice] = useState(null);

    const [activeMembers,
        setActiveMembers] = useState([]);

    useEffect(() => {

        const fetchData = async () => {

            const invoiceResponse =
                await getInvoiceDetailApi(
                    invoiceId
                );

            const membersResponse =
                await getActiveMembersApi();

            setInvoice(invoiceResponse);

            setActiveMembers(
                membersResponse
            );
        };

        fetchData();

    }, [invoiceId]);

    const handleDeleteMember = async () => {
        if(!confirm("Bạn có chắc chắn muốn xóa hội viên hiện tại khỏi hóa đơn?")) return;
        try {

            const updatedInvoice =
                await deleteInvoiceMemberApi(
                    invoiceId,
                );

            setInvoice(
                updatedInvoice
            );

        } catch (error) {

            alert(
                error.response?.data?.message
            );
        }
    }

    const handleSelectMember = async (memberAccId) => {
        if(!confirm("Bạn có chắc chắn muốn cập nhật hội viên cho hóa đơn?")) return;
        try {

            const updatedInvoice =
                await updateInvoiceMemberApi({
                    invoiceId,
                    memberAccId,
                });

            setInvoice(
                updatedInvoice
            );

        } catch (error) {

            alert(
                error.response?.data?.message
            );
        }
    }

    return (
        <Box
            sx={{
                minHeight: "100vh",
                bgcolor: "#f5f7fb",
                p: 3,
            }}
        >
            <Typography
                variant="h4"
                sx={{
                    fontWeight: 700,
                    mb: 3,
                    color: "#1e293b",
                }}
            >
                Cập nhật hội viên hóa đơn
            </Typography>

            <Box
                sx={{
                    display: "grid",
                    gridTemplateColumns: {
                        xs: "1fr",
                        lg: "420px 1fr",
                    },
                    gap: 3,
                }}
            >
                {/* THÔNG TIN HÓA ĐƠN */}

                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        border:
                            "1px solid #e2e8f0",
                        height: "fit-content",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                        }}
                    >
                        Thông tin hóa đơn
                    </Typography>

                    <Stack spacing={2}>
                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Mã hóa đơn
                            </Typography>

                            <Typography
                                fontWeight={600}
                            >
                                {
                                    invoice
                                        ?.invoiceCode
                                }
                            </Typography>
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Trạng thái
                            </Typography>

                            <Chip
                                label={
                                    invoice?.status
                                }
                                color="success"
                                sx={{
                                    mt: 1,
                                }}
                            />
                        </Box>

                        <Divider />

                        <Box>
                            <Typography
                                variant="body2"
                                color="text.secondary"
                            >
                                Thành tiền
                            </Typography>

                            <Typography
                                variant="h6"
                                fontWeight={700}
                                color="error"
                            >
                                {invoice?.finalAmount?.toLocaleString(
                                    "vi-VN"
                                )} ₫
                            </Typography>
                        </Box>

                        <Divider />

                        <Typography
                            variant="h6"
                            sx={{
                                fontWeight: 700,
                            }}
                        >
                            Hội viên hiện tại
                        </Typography>

                        {!invoice?.member ? (
                            <Typography
                                color="text.secondary"
                            >
                                Hóa đơn hiện chưa
                                có hội viên
                            </Typography>
                        ) : (
                            <Paper
                                elevation={0}
                                sx={{
                                    p: 2,
                                    border:
                                        "1px solid #e2e8f0",
                                    borderRadius: 3,
                                    bgcolor:
                                        "#fafafa",
                                }}
                            >
                                <Stack
                                    direction="row"
                                    spacing={2}
                                    alignItems="center"
                                >
                                    <Avatar>
                                        <PersonIcon />
                                    </Avatar>

                                    <Box
                                        sx={{
                                            flex: 1,
                                        }}
                                    >
                                        <Typography
                                            fontWeight={
                                                700
                                            }
                                        >
                                            {
                                                invoice
                                                    ?.member
                                                    ?.memberProfile
                                                    ?.fullName
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                invoice
                                                    ?.member
                                                    ?.email
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Điểm:
                                            {" "}
                                            {
                                                invoice
                                                    ?.member
                                                    ?.memberProfile
                                                    ?.loyaltyPoint
                                            }
                                        </Typography>
                                    </Box>
                                </Stack>

                                <Button
                                    fullWidth
                                    color="error"
                                    variant="outlined"
                                    startIcon={
                                        <DeleteIcon />
                                    }
                                    onClick={handleDeleteMember}
                                    sx={{
                                        mt: 2,
                                        textTransform:
                                            "none",
                                    }}
                                >
                                    Xóa hội viên
                                    hiện tại
                                </Button>
                            </Paper>
                        )}
                    </Stack>
                </Paper>

                {/* DANH SÁCH HỘI VIÊN */}

                <Paper
                    elevation={0}
                    sx={{
                        p: 3,
                        borderRadius: 4,
                        border:
                            "1px solid #e2e8f0",
                    }}
                >
                    <Typography
                        variant="h5"
                        sx={{
                            fontWeight: 700,
                            mb: 3,
                        }}
                    >
                        Danh sách hội viên
                    </Typography>

                    <List
                        sx={{
                            p: 0,
                        }}
                    >
                        {activeMembers.map(
                            (member) => (
                                <ListItem
                                    key={
                                        member.id
                                    }
                                    sx={{
                                        mb: 2,
                                        border:
                                            "1px solid #e2e8f0",
                                        borderRadius: 3,
                                        p: 2,
                                        display:
                                            "flex",
                                        alignItems:
                                            "center",
                                        gap: 2,
                                    }}
                                >
                                    <Avatar
                                        src={
                                            member
                                                ?.memberProfile
                                                ?.imageUrl
                                        }
                                    >
                                        {
                                            member
                                                ?.memberProfile
                                                ?.fullName?.[0]
                                        }
                                    </Avatar>

                                    <Box
                                        sx={{
                                            flex: 1,
                                        }}
                                    >
                                        <Typography
                                            fontWeight={
                                                700
                                            }
                                        >
                                            {
                                                member
                                                    ?.memberProfile
                                                    ?.fullName
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            {
                                                member.email
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Mã:
                                            {" "}
                                            {
                                                member
                                                    ?.memberProfile
                                                    ?.memberCode
                                            }
                                        </Typography>

                                        <Typography
                                            variant="body2"
                                            color="text.secondary"
                                        >
                                            Điểm:
                                            {" "}
                                            {
                                                member
                                                    ?.memberProfile
                                                    ?.loyaltyPoint
                                            }
                                        </Typography>
                                    </Box>

                                    <Button
                                        variant="contained"
                                        startIcon={
                                            <PersonAddIcon />
                                        }
                                        onClick={() => {handleSelectMember(member.id)}}
                                        sx={{
                                            textTransform:
                                                "none",
                                            borderRadius: 3,
                                        }}
                                    >
                                        Chọn
                                    </Button>
                                </ListItem>
                            )
                        )}
                    </List>
                </Paper>
            </Box>
        </Box>
    );
}

export default InvoiceMemberUpdatePage;