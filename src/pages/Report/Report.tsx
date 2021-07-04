import React, { useEffect } from "react";
import { Box, Grid, Typography } from "@material-ui/core";
import { useHistory } from "react-router-dom";
import { VerifyReport } from "../../organisms/VerifyReport";
import useStyles from "./Report.style";

function Report() {
  const history = useHistory<any>();
  const classes = useStyles();
  const employment = history.location?.state?.employment;
  const income = history.location?.state?.income;

  useEffect(() => {
    if (!employment || !income) {
      history.replace("/");
    }
  });

  return (
    <Grid
      spacing={2}
      alignItems="center"
      direction="column"
      className={classes.container}
      container
    >
      <Grid item>
        <Box marginBottom={4}>
          <Typography variant="h1" align="center" className={classes.heading}>
            Report Details
          </Typography>
        </Box>
      </Grid>

      <Grid
        alignItems="center"
        spacing={2}
        justify="center"
        direction="row"
        container
      >
        {employment && (
          <Grid item>
            <VerifyReport title="Employment" data={employment} />
          </Grid>
        )}
        {income && (
          <Grid item>
            <VerifyReport title="Income" data={income} />
          </Grid>
        )}
      </Grid>
    </Grid>
  );
}

export default Report;
