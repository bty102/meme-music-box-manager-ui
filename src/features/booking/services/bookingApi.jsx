import axiosClient from "../../../services/axiosClient";

export const getBookingDetailApi = async (
    bookingId
) => {

    const response = await axiosClient.get(
        `/api/booking/${bookingId}`
    );

    return response.data.result;
};

export const checkInBookingApi = async (
    roomBookingId
) => {

    const response = await axiosClient.get(
        "/api/booking/checkIn",
        {
            params: {
                roomBookingId,
            },
        }
    );

    return response.data.result;
};

export const cancelBookingApi = async (
    roomBookingId
) => {

    const response = await axiosClient.get(
        "/api/booking/cancel",
        {
            params: {
                roomBookingId,
            },
        }
    );

    return response.data.result;
};