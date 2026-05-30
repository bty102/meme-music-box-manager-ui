import axiosClient from "../../../services/axiosClient";

export const getActiveMembersApi = async () => {

    const response = await axiosClient.get(
        "/api/accounts/activeMembers"
    );

    return response.data.result;
};