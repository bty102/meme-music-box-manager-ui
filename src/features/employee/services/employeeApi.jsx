import axiosClient from "../../../services/axiosClient";

export const getEmployeesApi = async ({
    q,
    pageNumber = 0,
    pageSize = 10,
}) => {

    const params = {
        pageNumber,
        pageSize,
    };

    if (q?.trim()) {
        params.q = q;
    }

    const response =
        await axiosClient.get(
            "/api/accounts/employees",
            {
                params,
            }
        );

    return response.data.result;
};

export const getEmployeeDetailApi =
    async (accountId) => {

        const response =
            await axiosClient.get(
                `/api/accounts/employees/detail/${accountId}`
            );

        return response.data.result;
    };

export const createEmployeeApi =
    async (data) => {

        const response =
            await axiosClient.post(
                "/api/accounts/employees",
                data
            );

        return response.data.result;
    };

export const updateEmployeeProfileApi =
    async (
        employeeProfileId,
        data
    ) => {

        const response =
            await axiosClient.put(
                `/api/employeeProfiles/${employeeProfileId}`,
                data
            );

        return response.data.result;
    };

export const updateEmployeeAccountApi =
    async (
        accountId,
        data
    ) => {

        const response =
            await axiosClient.put(
                `/api/accounts/employees/${accountId}`,
                data
            );

        return response.data.result;
    };