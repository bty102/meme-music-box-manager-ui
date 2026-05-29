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