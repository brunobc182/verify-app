import React from "react";
import {
  Card,
  CardContent,
  CardActions,
  Typography,
  Button,
} from "@material-ui/core";
import { CloudDownload } from "@material-ui/icons";
import { format } from "date-fns";
import useStyles from "./VerifyReport.style";

interface VerifyReportProps {
  title: string;
  data: {
    metadata: {
      verification_state: string;
      created_at: Date;
      last_updated_at: Date;
      results: {
        info: string;
      };
    };
  };
}

const VerifyReport: React.FC<VerifyReportProps> = ({ title, data }) => {
  const classes = useStyles();

  return (
    <Card raised className={classes.container}>
      <CardContent>
        <Typography
          variant="h2"
          align="center"
          className={classes.heading}
          gutterBottom
        >
          {title}
        </Typography>
        <Typography className={classes.text}>
          Verification State:
          <strong>{data.metadata?.verification_state}</strong>
        </Typography>
        <Typography className={classes.text}>
          Information: <strong>{data.metadata?.results?.info}</strong>
        </Typography>
        <Typography className={classes.text}>
          Created:
          <strong>
            {format(new Date(data.metadata.created_at), "MM-dd-yyyy")}
          </strong>
        </Typography>
        <Typography className={classes.text}>
          Last Update:
          <strong>
            {format(new Date(data.metadata.last_updated_at), "MM-dd-yyyy")}
          </strong>
        </Typography>
      </CardContent>
      <CardActions className={classes.buttonWrapper}>
        <Button
          variant="contained"
          color="primary"
          size="small"
          href={`data:text/json;charset=utf-8,${encodeURIComponent(
            JSON.stringify(data)
          )}`}
          download={`${title}-Report.json`}
          startIcon={<CloudDownload />}
        >
          Download Full Report
        </Button>
      </CardActions>
    </Card>
  );
};

export default VerifyReport;
