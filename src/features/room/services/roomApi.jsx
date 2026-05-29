import axiosClient from "../../../services/axiosClient";

export const getRoomsApi = async ({
    areaId,
    isActive,
    pageNumber = 0,
    pageSize = 5,
}) => {

    const params = {
        areaId,
        pageNumber,
        pageSize,
    };

    if (isActive !== undefined) {
        params.isActive = isActive;
    }

    const response = await axiosClient.get("/api/rooms", {
        params,
    });

    return response.data;
};