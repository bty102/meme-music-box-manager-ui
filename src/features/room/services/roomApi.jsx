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

export const searchRoomsApi = async ({
    q,
    isActive,
    pageNumber = 0,
    pageSize = 8,
}) => {

    const params = {
        q,
        pageNumber,
        pageSize,
    };

    if (isActive !== undefined) {
        params.isActive = isActive;
    }

    const response = await axiosClient.get(
        "/api/rooms/search",
        {
            params,
        }
    );

    return response.data;
};

export const openRoomApi = async ({
    roomId,
    memberAccId,
}) => {

    const params = {
        roomId,
    };

    if (memberAccId !== undefined && memberAccId !== null) {
        params.memberAccId = memberAccId;
    }

    const response = await axiosClient.get(
        "/api/rooms/open",
        {
            params,
        }
    );

    return response.data;
};

export const getRoomInfoApi = async (roomId) => {

    const response = await axiosClient.get(
        `/api/rooms/info/${roomId}`
    );

    return response.data.result;
};