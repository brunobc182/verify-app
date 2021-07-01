import React from "react";
import { useForm, Controller } from "react-hook-form";
import {
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
  const classes = useStyles();

  const {
    register,
    handleSubmit,
    control,
    formState: { errors },
  } = useForm<Inputs>({
    resolver: yupResolver(validationSchema),
    mode: "onChange",
  });

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
            fullWidth
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
            fullWidth
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
        <Grid justify="center" className={classes.buttonWrapper} container>
          {loading ? (
            <CircularProgress />
          ) : (
            <Button type="submit" variant="contained" color="primary" fullWidth>
              Verify
            </Button>
          )}
        </Grid>
      </Grid>
    </form>
  );
};

export default VerifyForm;
