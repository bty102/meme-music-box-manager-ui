import axiosClient from "../../../services/axiosClient";

export const getTemporaryInvoiceApi = async (roomId) => {

    const response = await axiosClient.get(
        "/api/invoices/temporary",
        {
            params: {
                roomId,
            },
        }
    );

    return response.data.result;
};