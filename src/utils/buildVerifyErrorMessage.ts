import { HTTPservicesReturn } from "../services/http/types";
import { VerifyResponse } from "../services/types";

export enum Service {
  verify = "verify",
  retrieveCollection = "retrieveCollection",
}

enum AlertSeverity {
  error = "error",
  info = "info",
  success = "success",
  warning = "warning",
}

export interface ErrorMessage {
  title: string;
  message: string | { message?: string };
  severity: AlertSeverity;
  url?: string;
}

export type ErrorMessagList = Array<ErrorMessage>;

const buildMessage = (
  responseVerifyEmployment: HTTPservicesReturn<VerifyResponse>,
  responseVerifyIncome: HTTPservicesReturn<VerifyResponse>,
  service: Service
): ErrorMessagList => {
  const defaultMessage = "An error has occurred, please try again later.";

  let errorList = [];

  if (!responseVerifyEmployment || !responseVerifyIncome) {
    return [
      {
        title: "Internal Error",
        message: "An error has occurred, please try again later.",
        severity: AlertSeverity.error,
      },
    ];
  }

  if (!responseVerifyEmployment.ok) {
    const message = responseVerifyEmployment.data?.message || defaultMessage;
    errorList.push({
      title:
        service === Service.verify
          ? "Verify Employment"
          : "Retrieve Employment Collection",
      message,
      severity: AlertSeverity.error,
    });
  } else if (responseVerifyEmployment.data?.status === "ACTION_NEEDED") {
    errorList.push({
      title:
        service === Service.verify
          ? "Verify Employment"
          : "Retrieve Employment Collection",
      message:
        "Please copy to clipboard the url by clicking on the button and forward it to the borrower.",
      severity: AlertSeverity.warning,
      url: responseVerifyEmployment.data.url,
    });
  }

  if (!responseVerifyIncome.ok) {
    const messageIncome =
      responseVerifyIncome.data?.message.indexOf('{"message":') !== -1
        ? JSON.parse(responseVerifyIncome.data?.message)?.message
        : null;

    const message =
      messageIncome || responseVerifyIncome.data?.message || defaultMessage;

    errorList.push({
      title:
        service === Service.verify
          ? "Verify Income"
          : "Retrieve Income Collection",
      message,
      severity: AlertSeverity.error,
    });
  } else if (responseVerifyIncome.data?.status === "ACTION_NEEDED") {
    errorList.push({
      title:
        service === Service.verify
          ? "Verify Income"
          : "Retrieve Income Collection",
      message:
        "Please copy to clipboard the url by clicking on the button and forward it to the borrower.",
      severity: AlertSeverity.warning,
      url: responseVerifyIncome.data.url,
    });
  }

  return errorList;
};

export default buildMessage;
