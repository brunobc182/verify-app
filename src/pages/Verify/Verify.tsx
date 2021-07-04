import React from "react";
import { SubmitHandler } from "react-hook-form";
import { Grid, Typography, IconButton } from "@material-ui/core";
import { Alert, AlertTitle } from "@material-ui/lab";
import { FileCopyOutlined } from "@material-ui/icons";
import { useHistory } from "react-router-dom";
import { VerifyForm } from "../../organisms/VerifyForm";
import { useVerify } from "../../hooks";
import { Inputs } from "../../organisms/VerifyForm/VerifyForm.types";
import { copyTextToClipboard } from "../../utils";
import useStyles from "./Verify.style";

const Verify: React.FC = () => {
  const classes = useStyles();
  const history = useHistory();
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

    const response = await verify({ data });

    if (response.success) {
      history.push("/report", {
        employment: response.employment.data,
        income: response.income.data,
      });
    }
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
          <Grid key={error.title} className={classes.itemWrapper} item>
            <Alert
              severity={error.severity}
              action={
                error.url && (
                  <IconButton
                    aria-label="copy to clipboard"
                    color="inherit"
                    onClick={() => {
                      copyTextToClipboard(error.url);
                    }}
                  >
                    <FileCopyOutlined fontSize="inherit" />
                  </IconButton>
                )
              }
            >
              <AlertTitle>{error.title}</AlertTitle>
              {error.message}
            </Alert>
          </Grid>
        ))}
    </Grid>
  );
};

export default Verify;
