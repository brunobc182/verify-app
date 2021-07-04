import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    maxWidth: 325,
    padding: theme.spacing(2),
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    lineHeight: 1.3,
    fontWeight: theme.typography.fontWeightBold,
  },
  text: {
    margin: theme.spacing(0.5, 0),
  },
  buttonWrapper: {
    justifyContent: "center",
  },
}));

export default useStyles;
