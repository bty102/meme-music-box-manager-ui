import {
    Avatar,
    Box,
    Card,
    CardContent,
    Chip,
    Divider,
    Grid,
    Stack,
    Typography
} from "@mui/material";

import { useSelector } from "react-redux";
import { formatDateTime } from "../../../util/formatDateTime";

function MyInfoPage() {

    const user = useSelector(
        state => state.auth.user
    );

    const isEmployee =
        user?.role === "EMPLOYEE";

    const employee =
        user?.employeeProfile;

    const displayName = isEmployee
        ? employee?.fullName
        : user?.email;

    const avatarUrl = isEmployee
        ? employee?.imageUrl
        : null;

    return (

        <Box>

            <Typography
                variant="h4"
                fontWeight="bold"
                mb={3}
                sx={{fontWeight: "bold",mb: 3}}
            >
                My Profile
            </Typography>

            <Card
                sx={{
                    borderRadius: 4,
                    boxShadow: 3
                }}
            >

                <CardContent
                    sx={{
                        p: 4
                    }}
                >

                    <Grid
                        container
                        spacing={4}
                    >

                        {/* LEFT */}

                        <Grid
                            item
                            xs={12}
                            md={4}
                        >

                            <Stack
                                alignItems="center"
                                spacing={2}
                                sx={{alignItems: "center",spacing: 2}}
                            >

                                <Avatar
                                    src={avatarUrl}
                                    sx={{
                                        width: 140,
                                        height: 140,
                                        fontSize: 50
                                    }}
                                >
                                    {
                                        displayName
                                            ?.charAt(0)
                                            ?.toUpperCase()
                                    }
                                </Avatar>

                                <Typography
                                    variant="h5"
                                    fontWeight="bold"
                                    textAlign="center"
                                    sx={{fontWeight: "bold",textAlign: "center"}}
                                >
                                    {displayName}
                                </Typography>

                                <Chip
                                    label={user?.role}
                                    color="primary"
                                />

                            </Stack>

                        </Grid>

                        {/* RIGHT */}

                        <Grid
                            item
                            xs={12}
                            md={8}
                        >

                            <Typography
                                variant="h6"
                                fontWeight="bold"
                                mb={2}
                                sx={{fontWeight: "bold",mb: 2}}
                            >
                                Account Information
                            </Typography>

                            <Divider
                                sx={{ mb: 3 }}
                            />

                            <Grid
                                container
                                spacing={3}
                            >

                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                >

                                    <Typography
                                        color="text.secondary"
                                    >
                                        Email
                                    </Typography>

                                    <Typography
                                        fontWeight="bold"
                                        sx={{fontWeight: "bold"}}
                                    >
                                        {user?.email}
                                    </Typography>

                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                    sm={6}
                                >

                                    <Typography
                                        color="text.secondary"
                                    >
                                        Role
                                    </Typography>

                                    <Typography
                                        fontWeight="bold"
                                        sx={{fontWeight: "bold"}}
                                    >
                                        {user?.role}
                                    </Typography>

                                </Grid>

                                <Grid
                                    item
                                    xs={12}
                                >

                                    <Typography
                                        color="text.secondary"
                                    >
                                        Created At
                                    </Typography>

                                    <Typography
                                        fontWeight="bold"
                                        sx={{fontWeight: "bold"}}
                                    >
                                        {
                                            formatDateTime(user?.createdAt)
                                        }
                                    </Typography>

                                </Grid>

                            </Grid>

                            {
                                isEmployee && (
                                    <>

                                        <Typography
                                            variant="h6"
                                            fontWeight="bold"
                                            mt={5}
                                            mb={2}
                                            sx={{fontWeight: "bold",mt: 5,mb: 2}}
                                        >
                                            Employee Information
                                        </Typography>

                                        <Divider
                                            sx={{
                                                mb: 3
                                            }}
                                        />

                                        <Grid
                                            container
                                            spacing={3}
                                        >

                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                            >

                                                <Typography
                                                    color="text.secondary"
                                                >
                                                    Employee Code
                                                </Typography>

                                                <Typography
                                                    fontWeight="bold"
                                                    sx={{fontWeight: "bold"}}
                                                >
                                                    {
                                                        employee?.employeeCode
                                                    }
                                                </Typography>

                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                            >

                                                <Typography
                                                    color="text.secondary"
                                                >
                                                    Phone Number
                                                </Typography>

                                                <Typography
                                                    fontWeight="bold"
                                                    sx={{fontWeight: "bold"}}
                                                >
                                                    {
                                                        employee?.phoneNumber
                                                    }
                                                </Typography>

                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                            >

                                                <Typography
                                                    color="text.secondary"
                                                >
                                                    National ID
                                                </Typography>

                                                <Typography
                                                    fontWeight="bold"
                                                    sx={{fontWeight: "bold"}}
                                                >
                                                    {
                                                        employee?.nationalId
                                                    }
                                                </Typography>

                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                            >

                                                <Typography
                                                    color="text.secondary"
                                                >
                                                    Gender
                                                </Typography>

                                                <Typography
                                                    fontWeight="bold"
                                                    sx={{fontWeight: "bold"}}
                                                >
                                                    {
                                                        employee?.isMale
                                                            ? "Male"
                                                            : "Female"
                                                    }
                                                </Typography>

                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                                sm={6}
                                            >

                                                <Typography
                                                    color="text.secondary"
                                                >
                                                    Date Of Birth
                                                </Typography>

                                                <Typography
                                                    fontWeight="bold"
                                                    sx={{fontWeight: "bold"}}
                                                >
                                                    {
                                                        employee?.dateOfBirth
                                                    }
                                                </Typography>

                                            </Grid>

                                            <Grid
                                                item
                                                xs={12}
                                            >

                                                <Typography
                                                    color="text.secondary"
                                                >
                                                    Address
                                                </Typography>

                                                <Typography
                                                    fontWeight="bold"
                                                    sx={{fontWeight: "bold"}}
                                                >
                                                    {
                                                        employee?.address
                                                    }
                                                </Typography>

                                            </Grid>

                                        </Grid>

                                    </>
                                )
                            }

                        </Grid>

                    </Grid>

                </CardContent>

            </Card>

        </Box>
    );
}

export default MyInfoPage;