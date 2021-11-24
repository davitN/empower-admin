import useStyles from './styles';
const Auth = () => {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <h1 className="text-3xl">LOG IN</h1>
    </div>
  );
};

export default Auth;
