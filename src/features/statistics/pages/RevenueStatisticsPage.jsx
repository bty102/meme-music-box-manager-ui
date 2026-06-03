import {
    Alert,
    Box,
    Button,
    Card,
    CardContent,
    CircularProgress,
    Grid,
    Stack,
    Tab,
    Tabs,
    TextField,
    Typography,
} from "@mui/material";

import BarChartIcon
from "@mui/icons-material/BarChart";

import TimelineIcon
from "@mui/icons-material/Timeline";

import SearchIcon
from "@mui/icons-material/Search";

import {
    useEffect,
    useMemo,
    useState,
} from "react";

import {
    LineChart,
} from "@mui/x-charts/LineChart";

import {
    getAnnualRevenueStatisticsApi,
    getMonthlyRevenueStatisticsApi,
} from "../services/statisticsApi";

function RevenueStatisticsPage() {

    const currentDate =
        new Date();

    const [
        tab,
        setTab,
    ] = useState(0);

    const [
        loading,
        setLoading,
    ] = useState(false);

    const [
        error,
        setError,
    ] = useState(null);

    const [
        statistics,
        setStatistics,
    ] = useState([]);

    const [
        month,
        setMonth,
    ] = useState(
        currentDate.getMonth() + 1
    );

    const [
        year,
        setYear,
    ] = useState(
        currentDate.getFullYear()
    );

    const [
        annualYear,
        setAnnualYear,
    ] = useState(
        currentDate.getFullYear()
    );

    const loadMonthlyStatistics =
        async () => {

            try {

                setLoading(
                    true
                );

                setError(
                    null
                );

                const result =
                    await getMonthlyRevenueStatisticsApi({
                        month,
                        year,
                    });

                setStatistics(
                    result
                );

            } catch (err) {

                setError(
                    err.response
                        ?.data
                        ?.message
                );

            } finally {

                setLoading(
                    false
                );
            }
        };

    const loadAnnualStatistics =
        async () => {

            try {

                setLoading(
                    true
                );

                setError(
                    null
                );

                const result =
                    await getAnnualRevenueStatisticsApi(
                        annualYear
                    );

                setStatistics(
                    result
                );

            } catch (err) {

                setError(
                    err.response
                        ?.data
                        ?.message
                );

            } finally {

                setLoading(
                    false
                );
            }
        };

    useEffect(() => {

        loadMonthlyStatistics();

    }, []);

    const chartData =
        useMemo(() => {

            if (tab === 0) {

                return {
                    labels:
                        statistics.map(
                            item =>
                                `Ngày ${item.day}`
                        ),

                    revenues:
                        statistics.map(
                            item =>
                                item.revenue
                        ),
                };
            }

            return {

                labels:
                    statistics.map(
                        item =>
                            `Tháng ${item.month}`
                    ),

                revenues:
                    statistics.map(
                        item =>
                            item.revenue
                    ),
            };

        }, [
            statistics,
            tab,
        ]);

    const totalRevenue =
        statistics.reduce(
            (
                total,
                item
            ) =>
                total +
                Number(
                    item.revenue
                ),
            0
        );

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
                Thống kê doanh thu
            </Typography>

            <Card
                sx={{
                    borderRadius: 4,
                    mb: 3,
                }}
            >

                <CardContent>

                    <Tabs
                        value={tab}
                        onChange={(
                            _,
                            newValue
                        ) =>
                            setTab(
                                newValue
                            )
                        }
                    >

                        <Tab
                            icon={
                                <TimelineIcon />
                            }
                            iconPosition="start"
                            label="Theo tháng"
                        />

                        <Tab
                            icon={
                                <BarChartIcon />
                            }
                            iconPosition="start"
                            label="Theo năm"
                        />

                    </Tabs>

                </CardContent>

            </Card>

            <Grid
                container
                spacing={3}
            >

                <Grid
                    item
                    xs={12}
                    size={{
                        xs: 12,
                    }}        
                >

                    <Card
                        sx={{
                            borderRadius: 4,
                        }}
                    >

                        <CardContent>

                            {tab === 0 ? (

                                <Stack
                                    sx={{
                                        flexDirection:
                                            "row",
                                        gap: 2,
                                        alignItems:
                                            "center",
                                        flexWrap:
                                            "wrap",
                                    }}
                                >

                                    <TextField
                                        label="Tháng"
                                        type="number"
                                        value={
                                            month
                                        }
                                        onChange={e =>
                                            setMonth(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <TextField
                                        label="Năm"
                                        type="number"
                                        value={
                                            year
                                        }
                                        onChange={e =>
                                            setYear(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <Button
                                        variant="contained"
                                        startIcon={
                                            <SearchIcon />
                                        }
                                        onClick={
                                            loadMonthlyStatistics
                                        }
                                    >
                                        Thống kê
                                    </Button>

                                </Stack>

                            ) : (

                                <Stack
                                    sx={{
                                        flexDirection:
                                            "row",
                                        gap: 2,
                                        alignItems:
                                            "center",
                                    }}
                                >

                                    <TextField
                                        label="Năm"
                                        type="number"
                                        value={
                                            annualYear
                                        }
                                        onChange={e =>
                                            setAnnualYear(
                                                e.target.value
                                            )
                                        }
                                    />

                                    <Button
                                        variant="contained"
                                        startIcon={
                                            <SearchIcon />
                                        }
                                        onClick={
                                            loadAnnualStatistics
                                        }
                                    >
                                        Thống kê
                                    </Button>

                                </Stack>

                            )}

                        </CardContent>

                    </Card>

                </Grid>

                <Grid
                    item
                    xs={12}
                    md={4}
                    size={{
                        xs: 12,
                        md: 4,
                    }}
                >

                    <Card
                        sx={{
                            borderRadius: 4,
                            height:
                                "100%",
                        }}
                    >

                        <CardContent>

                            <Typography
                                color="text.secondary"
                            >
                                Tổng doanh thu
                            </Typography>

                            <Typography
                                variant="h4"
                                sx={{
                                    mt: 2,
                                    fontWeight:
                                        700,
                                    color:
                                        "success.main",
                                }}
                            >
                                {
                                    totalRevenue.toLocaleString()
                                }
                                đ
                            </Typography>

                        </CardContent>

                    </Card>

                </Grid>

                <Grid
                    item
                    xs={12}
                    md={8}
                    size={{
                        xs: 12,
                        md: 8,
                     }}
                >

                    <Card
                        sx={{
                            borderRadius: 4,
                        }}
                    >

                        <CardContent>

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

                                <LineChart
                                    height={
                                        450
                                    }
                                    xAxis={[
                                        {
                                            scaleType:
                                                "point",

                                            data:
                                                chartData.labels,
                                        },
                                    ]}
                                    series={[
                                        {
                                            label:
                                                "Doanh thu",

                                            data:
                                                chartData.revenues,
                                        },
                                    ]}
                                />

                            )}

                        </CardContent>

                    </Card>

                </Grid>

            </Grid>

        </Box>
    );
}

export default RevenueStatisticsPage;
