import { useState } from "react";
import { employment, income } from "../services";
import { VerifyPayload } from "../services/types";
import { ErrorMessagList, Service } from "../utils/buildVerifyErrorMessage";
import { buildVerifyErrorMessage } from "../utils";

const useVerify = () => {
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState<ErrorMessagList | null>(null);

  const init = (): void => {
    setLoading(false);
    setErrors(null);
  };

  const verify = async ({
    data,
  }: {
    data: VerifyPayload;
  }): Promise<{ success: boolean; employment?: any; income?: any }> => {
    init();
    setLoading(true);

    const [responseVerifyEmployment, responseVerifyIncome] = await Promise.all([
      employment.verifyEmployment({
        data,
      }),
      income.verifyIncome({
        data,
      }),
    ]);

    if (!responseVerifyEmployment.ok || !responseVerifyIncome.ok) {
      setLoading(false);

      const errorMessages = buildVerifyErrorMessage(
        responseVerifyEmployment,
        responseVerifyIncome,
        Service.verify
      );

      setErrors(errorMessages);

      return { success: false };
    }

    if (
      responseVerifyEmployment.data.status === "ACTION_NEEDED" ||
      responseVerifyIncome.data.status === "ACTION_NEEDED"
    ) {
      setLoading(false);

      const errorMessages = buildVerifyErrorMessage(
        responseVerifyEmployment,
        responseVerifyIncome,
        Service.verify
      );

      setErrors(errorMessages);

      return { success: false };
    }

    const [
      responseRetrieveCollectionEmployment,
      responseRetrieveCollectionIncome,
    ] = await Promise.all([
      employment.retrieveEmploymentVerification({
        data,
      }),
      income.retrieveIncomeVerification({
        data,
      }),
    ]);

    if (
      !responseRetrieveCollectionEmployment.ok ||
      !responseRetrieveCollectionIncome.ok
    ) {
      setLoading(false);

      const errorMessages = buildVerifyErrorMessage(
        responseRetrieveCollectionEmployment,
        responseRetrieveCollectionIncome,
        Service.retrieveCollection
      );

      setErrors(errorMessages);

      return { success: false };
    }

    setLoading(false);

    return {
      success: true,
      employment: responseRetrieveCollectionEmployment,
      income: responseRetrieveCollectionIncome,
    };
  };

  return {
    loading,
    errors,
    clear: init,
    verify,
  };
};

export default useVerify;
