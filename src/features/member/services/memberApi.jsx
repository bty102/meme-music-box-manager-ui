import axiosClient from "../../../services/axiosClient";

export const getActiveMembersApi = async () => {

    const response = await axiosClient.get(
        "/api/accounts/activeMembers"
    );

    return response.data.result;
};

export const getMembersApi = async ({
    pageNumber = 0,
    pageSize = 10,
}) => {

    const response =
        await axiosClient.get(
            "/api/accounts/members",
            {
                params: {
                    pageNumber,
                    pageSize,
                },
            }
        );

    return response.data.result;
};

export const getMemberDetailApi = async (
    memberAccountId
) => {

    const response =
        await axiosClient.get(
            `/api/accounts/members/${memberAccountId}`
        );

    return response.data.result;
};

export const updateMemberProfileApi = async (
    memberProfileId,
    data
) => {

    const response =
        await axiosClient.put(
            `/api/memberProfiles/${memberProfileId}`,
            data
        );

    return response.data.result;
};