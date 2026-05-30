import axiosClient from "../../../services/axiosClient";

export const getProductsApi = async ({
    isActive,
    pageNumber = 0,
    pageSize = 10,
}) => {

    const params = {
        pageNumber,
        pageSize,
    };

    if (isActive !== undefined) {
        params.isActive = isActive;
    }

    const response = await axiosClient.get(
        "/api/products",
        {
            params,
        }
    );

    return response.data.result;
};