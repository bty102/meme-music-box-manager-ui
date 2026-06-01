import axiosClient from "../../../services/axiosClient";

export const getPointDiscountsApi =
    async () => {

        const response =
            await axiosClient.get(
                "/api/pointDiscounts"
            );

        return response.data.result;
    };

export const createPointDiscountApi =
    async (data) => {

        const response =
            await axiosClient.post(
                "/api/pointDiscounts",
                data
            );

        return response.data.result;
    };

export const updatePointDiscountApi =
    async (
        pointDiscountId,
        data
    ) => {

        const response =
            await axiosClient.put(
                `/api/pointDiscounts/${pointDiscountId}`,
                data
            );

        return response.data.result;
    };

export const deletePointDiscountApi =
    async (
        pointDiscountId
    ) => {

        const response =
            await axiosClient.delete(
                `/api/pointDiscounts/${pointDiscountId}`
            );

        return response.data;
    };
