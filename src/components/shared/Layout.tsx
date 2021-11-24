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
    display: "grid",
    gridTemplateColumns: 'minmax(300px, 1fr) 5fr'
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
          <Outlet />
      </div>
    </div>
  );
}

export default Layout;
