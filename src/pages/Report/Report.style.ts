import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    width: "100%",
    margin: "0 auto",
  },
  heading: {
    fontSize: theme.typography.pxToRem(32),
    maxWidth: 325,
    lineHeight: 1.3,
  },
}));

export default useStyles;
