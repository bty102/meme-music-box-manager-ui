import axiosClient from "../../../services/axiosClient";

export const getAreasApi = async (isActive) => {

    const params = {};

    if (isActive !== undefined) {
        params.isActive = isActive;
    }

    const response = await axiosClient.get("/api/areas", {
        params,
    });

    return response.data;
};

export const getAreaInfoApi = async (
    areaId
) => {

    const response =
        await axiosClient.get(
            `/api/areas/info/${areaId}`
        );

    return response.data.result;
};

export const createAreaApi = async ({
    areaName,
    description,
}) => {

    const response =
        await axiosClient.post(
            "/api/areas",
            {
                areaName,
                description,
            }
        );

    return response.data.result;
};

export const updateAreaApi = async (
    areaId,
    {
        areaName,
        description,
        isActive,
    }
) => {

    const response =
        await axiosClient.put(
            `/api/areas/${areaId}`,
            {
                areaName,
                description,
                isActive,
            }
        );

    return response.data.result;
};