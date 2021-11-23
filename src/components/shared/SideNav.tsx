import React from "react";
import { createUseStyles } from "react-jss";
import { Link } from "react-router-dom";
import COLORS from "../../services/colors.service";
// eslint-disable-next-line @typescript-eslint/no-var-requires
const classNames = require("classnames");

const useStyles = createUseStyles({
  container: { height: "100%", width: "200px", backgroundColor: "#3B82F6" },
  logo: {
    height: "100px",
  },
  text: {
    color: COLORS.while,
  },
});

export default function SideNav() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <div className={classNames("p-col", classes.logo)}></div>
      <div className="p-col">
        <Link to="/companies" className={classNames("p-text-bold", classes.text)}>
          companies
        </Link>
      </div>
      <div className="p-col">
        <Link to="/auth" className={classNames("p-text-bold", classes.text)}>
          log in
        </Link>
      </div>
      <div className="p-col">
        <Link to="/app-users" className={classNames("p-text-bold", classes.text)}>
          app users
        </Link>
      </div>
    </div>
  );
}
