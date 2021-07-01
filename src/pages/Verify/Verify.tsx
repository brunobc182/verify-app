import React from "react";
import { SubmitHandler } from "react-hook-form";
import { Grid, Typography } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { VerifyForm } from "../../organisms/VerifyForm";
import useVerify from "../../hooks/useVerify";
import { Inputs } from "../../organisms/VerifyForm/VerifyForm.types";
import useStyles from "./Verify.style";

const Verify: React.FC = () => {
  const classes = useStyles();
  const { loading, errors, verify } = useVerify();

  const onSubmit: SubmitHandler<Inputs> = async (formValues) => {
    const data = {
      transaction_id: formValues.transactionID,
      collection_id: formValues.collectionID,
      partner_name: "default",
      options: {
        manual_verification: formValues.manualVerification,
        exclude_borrower: formValues.excludeBorrower,
        dry_run: formValues.excludeBorrower,
      },
    };

    const response = verify({ data });
    console.log(data, response);
  };

  return (
    <Grid
      className={classes.container}
      spacing={3}
      direction="column"
      alignItems="center"
      container
    >
      <Grid item>
        <Typography variant="h1" align="center" className={classes.heading}>
          Employment and Income Verification
        </Typography>
      </Grid>
      <Grid className={classes.itemWrapper} item>
        <VerifyForm onSubmit={onSubmit} loading={loading} />
      </Grid>
      {errors &&
        errors.map((error) => (
          <Grid className={classes.itemWrapper} item>
            <Alert severity="error">
              <AlertTitle>{error.title}</AlertTitle>
              {error.message}
            </Alert>
          </Grid>
        ))}
    </Grid>
  );
};

export default Verify;