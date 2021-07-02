import { makeStyles } from "@material-ui/core/styles";

const useStyles = makeStyles((theme) => ({
  container: {
    padding: theme.spacing(3),
  },
  heading: {
    fontSize: theme.typography.pxToRem(24),
    maxWidth: 325,
    lineHeight: 1.3,
  },
  itemWrapper: { width: "100%", maxWidth: 325 },
}));

export default useStyles;
