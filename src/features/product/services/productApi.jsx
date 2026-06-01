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

export const searchProductsApi = async ({
    q,
    isActive,
    pageNumber = 0,
    pageSize = 10,
}) => {

    const params = {
        q,
        pageNumber,
        pageSize,
    };

    if (isActive !== undefined) {
        params.isActive = isActive;
    }

    const response =
        await axiosClient.get(
            "/api/products/search",
            {
                params,
            }
        );

    return response.data.result;
};

export const getProductInfoApi =
    async (productId) => {

        const response =
            await axiosClient.get(
                `/api/products/info/${productId}`
            );

        return response.data.result;
    };

export const createProductApi =
    async (data) => {

        const response =
            await axiosClient.post(
                "/api/products",
                data
            );

        return response.data.result;
    };

export const updateProductApi =
    async (
        productId,
        data
    ) => {

        const response =
            await axiosClient.put(
                `/api/products/${productId}`,
                data
            );

        return response.data.result;
    };

export const updateProductImageApi =
    async (
        productId,
        imageFile
    ) => {

        const formData =
            new FormData();

        formData.append(
            "image",
            imageFile
        );

        const response =
            await axiosClient.post(
                `/api/products/updateImage/${productId}`,
                formData,
            );

        return response.data;
    };