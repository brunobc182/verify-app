import { HTTPservicesReturn } from "./http/types";

export interface VerifyOptions {
  manual_verification: boolean;
  exclude_borrower: boolean;
  dry_run: boolean;
}

export interface Verify {
  transaction_id: string;
  collection_id: string;
  partner_name: string;
  options: VerifyOptions;
}

export type VerifyAPI = ({
  data,
}: {
  data: Verify;
}) => Promise<HTTPservicesReturn<Verify>>;
