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

export const getInvoiceDetailApi = async (
    invoiceId
) => {

    const response = await axiosClient.get(
        `/api/invoices/detail/${invoiceId}`
    );

    return response.data.result;
};

export const deleteInvoiceMemberApi = async (
    invoiceId
) => {

    const response = await axiosClient.get(
        "/api/invoices/deleteMember",
        {
            params: {
                invoiceId,
            },
        }
    );

    return response.data.result;
};

export const updateInvoiceMemberApi = async ({
    invoiceId,
    memberAccId,
}) => {

    const response = await axiosClient.get(
        "/api/invoices/updateMember",
        {
            params: {
                invoiceId,
                memberAccId,
            },
        }
    );

    return response.data.result;
};

export const getProductsOfInvoiceApi = async (
    invoiceId
) => {

    const response = await axiosClient.get(
        "/api/productOfInvoice",
        {
            params: {
                invoiceId,
            },
        }
    );

    return response.data.result;
};

export const updateProductOfInvoiceApi = async ({
    productOfInvoiceId,
    quantity,
}) => {

    const response = await axiosClient.put(
        `/api/productOfInvoice/${productOfInvoiceId}`,
        {
            quantity,
        }
    );

    return response.data.result;
};

export const createProductOfInvoiceApi = async ({
    invoiceId,
    productId,
    quantity,
}) => {

    const response = await axiosClient.post(
        "/api/productOfInvoice",
        {
            invoiceId,
            productId,
            quantity,
        }
    );

    if (response.data.code !== 1000) {
        throw new Error(
            response.data.message
        );
    }

    return response.data.result;
};

export const transferInvoiceToRoomApi = async ({
    invoiceId,
    roomId,
}) => {

    const response = await axiosClient.get(
        "/api/invoices/transferToRoom",
        {
            params: {
                invoiceId,
                roomId,
            },
        }
    );

    // if (response.data.code !== 1000) {
    //     throw new Error(
    //         response.data.message
    //     );
    // }

    return response.data;
};

export const getRoomsOfInvoiceApi = async (
    invoiceId
) => {

    const response = await axiosClient.get(
        "/api/roomOfInvoice",
        {
            params: {
                invoiceId,
            },
        }
    );

    return response.data.result;
};

export const getInvoicesOfRoomApi = async ({
    roomId,
    pageNumber = 0,
    pageSize = 10,
}) => {

    const response = await axiosClient.get(
        "/api/invoices/ofRoom",
        {
            params: {
                roomId,
                pageNumber,
                pageSize,
            },
        }
    );

    return response.data.result;
};

export const checkOutInvoiceApi = async (
    invoiceId
) => {

    const response = await axiosClient.get(
        "/api/invoices/checkOut",
        {
            params: {
                invoiceId,
            },
        }
    );

    return response.data;
};

export const paymentConfirmationApi = async (
    invoiceId
) => {

    const response = await axiosClient.get(
        "/api/invoices/paymentConfirmation",
        {
            params: {
                invoiceId,
            },
        }
    );

    return response.data;
};

export const getInvoicesApi = async ({
    pageNumber = 0,
    pageSize = 10,
}) => {

    const response = await axiosClient.get(
        "/api/invoices",
        {
            params: {
                pageNumber,
                pageSize,
            },
        }
    );

    return response.data.result;
};

export const getInvoicesCreatedByApi = async ({
    pageNumber = 0,
    pageSize = 10,
}) => {

    const response = await axiosClient.get(
        "/api/invoices/createdBy",
        {
            params: {
                pageNumber,
                pageSize,
            },
        }
    );

    return response.data.result;
};

export const exportInvoicePdfApi = async (
    invoiceId
) => {

    const response =
        await axiosClient.get(
            `/api/invoices/pdf/${invoiceId}`,
            {
                responseType: "blob",
            }
        );

    return response.data;
};