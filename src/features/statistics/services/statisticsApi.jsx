import axiosClient from "../../../services/axiosClient";

export const getMonthlyRevenueStatisticsApi =
    async ({
        month,
        year,
    }) => {

        const response =
            await axiosClient.get(
                "/api/statistics/monthly",
                {
                    params: {
                        month,
                        year,
                    },
                }
            );

        return response.data.result;
    };

export const getAnnualRevenueStatisticsApi =
    async (year) => {

        const response =
            await axiosClient.get(
                "/api/statistics/annual",
                {
                    params: {
                        year,
                    },
                }
            );

        return response.data.result;
    };