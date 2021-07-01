import { useState } from "react";
import { employment, income } from "../services";
import { HTTPservicesReturn } from "../services/http/types";
import { VerifyPayload, VerifyResponse } from "../services/types";

interface ErrorMessage {
  title: string;
  message: string;
}

enum Service {
  verify = "verify",
  retrieveCollection = "retrieveCollection",
}

type ErrorMessagList = Array<ErrorMessage>;

const buildErrorMessage = (
  responseVerifyEmployment: HTTPservicesReturn<VerifyResponse>,
  responseVerifyIncome: HTTPservicesReturn<VerifyResponse>,
  service: Service
): ErrorMessagList => {
  const defaultMessage = "An error has occurred, please try again later.";

  let errorList = [];

  if (!responseVerifyEmployment.ok) {
    errorList.push({
      title:
        service === Service.verify
          ? "Verify Employment"
          : "Retrieve Employment Collection",
      message: responseVerifyEmployment.data?.message || defaultMessage,
    });
  }

  if (!responseVerifyIncome.ok) {
    errorList.push({
      title:
        service === Service.verify
          ? "Verify Income"
          : "Retrieve Income Collection",
      message: responseVerifyIncome.data?.message || defaultMessage,
    });
  }

  return errorList;
};

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
  }): Promise<{ success: boolean }> => {
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

    console.log(responseVerifyEmployment);
    console.log(responseVerifyIncome);

    if (!responseVerifyEmployment.ok || !responseVerifyIncome.ok) {
      setLoading(false);

      const errorMessages = buildErrorMessage(
        responseVerifyEmployment,
        responseVerifyIncome,
        Service.verify
      );

      setErrors(errorMessages);

      console.log(errorMessages);

      return { success: false };
    }

    const [
      responseRetrieveCollectionEmployment,
      responseRetrieveCollectionIncome,
    ] = await Promise.all([
      employment.retrieveEmploymentVerification({
        data: {
          ...data,
          collection_id: responseVerifyEmployment.data.collection_id,
        },
      }),
      income.retrieveIncomeVerification({
        data: {
          ...data,
          collection_id: responseVerifyIncome.data.collection_id,
        },
      }),
    ]);

    if (
      !responseRetrieveCollectionEmployment.ok ||
      !responseRetrieveCollectionIncome.ok
    ) {
      setLoading(false);

      const errorMessages = buildErrorMessage(
        responseRetrieveCollectionEmployment,
        responseRetrieveCollectionIncome,
        Service.retrieveCollection
      );

      setErrors(errorMessages);

      return { success: false };
    }

    setLoading(false);
    return { success: true };
  };

  return {
    loading,
    errors,
    clear: init,
    verify,
  };
};

export default useVerify;
