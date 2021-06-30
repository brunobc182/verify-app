import { http } from "./http";
import { VerifyAPI } from "./types";

export const verifyIncome: VerifyAPI = async ({ data }) => {
  try {
    const response = await http({
      method: "POST",
      data,
      url: "/income",
    });

    return {
      ok: true,
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      status: error.response?.status,
      data: error.response?.data,
      raw: error,
    };
  }
};

export const retrieveEmploymentVerification: VerifyAPI = async ({ data }) => {
  try {
    const response = await http({
      method: "GET",
      url: `/employment/income/${data.transaction_id}/collections/${data.collection_id}`,
    });

    return {
      ok: true,
      status: response.status,
      data: response.data,
    };
  } catch (error) {
    return {
      ok: false,
      status: error.response?.status,
      data: error.response?.data,
      raw: error,
    };
  }
};
