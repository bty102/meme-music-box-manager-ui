import axiosClient from "../../../services/axiosClient";

export const loginApi = async (data) => {

    const response = await axiosClient.post(
        "/api/auth/login",
        data
    );

    return response.data;
};

export const getMyInfoApi = async () => {

    const response = await axiosClient.get(
        "/api/auth/me"
    );

    return response.data;
};

export const logoutApi = async (
    accessToken
) => {

    const response =
        await axiosClient.post(
            "/api/auth/logout",
            {
                accessToken
            }
        );

    return response.data;
};