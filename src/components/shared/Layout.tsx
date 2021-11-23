import React from "react";
import { createUseStyles } from "react-jss";
import { Outlet } from "react-router-dom";
import Header from "./Header";
import SideNav from "./SideNav";

const useStyles = createUseStyles({
  container: {
    minHeight: "100vh",
  },
  subContainer: {
    // minHeight: "calc(100vh - 80px)", //if header excises
    minHeight: "100vh",
    display: "flex",
  },
  flex1: {
    flex: 1,
  },
});

function Layout() {
  const classes = useStyles();
  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.subContainer}>
        <div>
          <SideNav />
        </div>
        <div className={classes.flex1}>
          <Outlet />
        </div>
      </div>
    </div>
  );
}

export default Layout;
