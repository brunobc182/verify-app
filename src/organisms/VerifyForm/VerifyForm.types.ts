export interface Inputs {
  transactionID: string;
  collectionID: string;
  manualVerification: boolean;
  excludeBorrower: boolean;
  dryRun: boolean;
}

export interface VerifyFormProps {
  onSubmit: (data: Inputs) => void;
  loading: boolean;
}
