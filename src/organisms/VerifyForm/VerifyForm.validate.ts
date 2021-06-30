import * as yup from "yup";

const validationSchema = yup.object().shape({
  transactionID: yup.string().required("Transaction ID is required"),
  collectionID: yup.string().required("Collection ID is required"),
});

export default validationSchema;
