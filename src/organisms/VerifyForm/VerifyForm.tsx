import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
  Box,
  Button,
  Checkbox,
  CircularProgress,
  Grid,
  TextField,
  FormControlLabel,
} from "@material-ui/core";
import { yupResolver } from "@hookform/resolvers/yup";
import validationSchema from "./VerifyForm.validate";
import { Inputs, VerifyFormProps } from "./VerifyForm.types";
import useStyles from "./VerifyForm.style";

const VerifyForm: React.FC<VerifyFormProps> = ({ loading, onSubmit }) => {
  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

  const classes = useStyles();
  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Grid spacing={2} direction="column" container>
        <Grid item>
          <TextField
            id="transactionID"
            label="Transaction ID"
            variant="outlined"
            error={!!errors.transactionID}
            helperText={errors.transactionID?.message}
            {...register("transactionID")}
          />
        </Grid>
        <Grid item>
          <TextField
            id="collectionID"
            label="Collection ID"
            variant="outlined"
            error={!!errors.collectionID}
            helperText={errors.collectionID?.message}
            {...register("collectionID")}
          />
        </Grid>
        <Grid item>
          <Controller
            name="manualVerification"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ "aria-label": "manual verification" }}
                    {...field}
                  />
                }
                label="Manual Verification"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="excludeBorrower"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ "aria-label": "exclude borrower" }}
                    {...field}
                  />
                }
                label="Exclude Borrower"
              />
            )}
          />
        </Grid>
        <Grid item>
          <Controller
            name="dryRun"
            control={control}
            defaultValue={false}
            render={({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    inputProps={{ "aria-label": "dry run" }}
                    {...field}
                  />
                }
                label="Dry Run"
              />
            )}
          />
        </Grid>
        <Grid xs={12} item className={classes.buttonWrapper}>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained" color="primary">
              Verify
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default VerifyForm;
