import { HTTPservicesReturn } from "./http/types";

export interface VerifyOptions {
  manual_verification: boolean;
  exclude_borrower: boolean;
  dry_run: boolean;
}

export interface VerifyResponseSuccess {
  collection_id: string;
}

export interface VerifyResponseError {
  message?: string;
}

export type VerifyResponse = VerifyResponseSuccess & VerifyResponseError;

export interface VerifyPayload {
  transaction_id: string;
  collection_id: string;
  partner_name: string;
  options: VerifyOptions;
}

export type VerifyAPI = ({
  data,
}: {
  data: VerifyPayload;
}) => Promise<HTTPservicesReturn<VerifyResponse>>;
