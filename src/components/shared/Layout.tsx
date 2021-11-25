import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { Outlet, useLocation } from 'react-router-dom';
import COLORS from '../../services/colors.service';
import Header from './Header';
import SideNav from './SideNav';

function Layout() {
  const { pathname } = useLocation();
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <Header />
      <div className={classes.subContainer}>
        <div>
          <SideNav />
        </div>
        <Outlet />
        {pathname === '/auth' && (
          <h1 className={classNames(classes.text, 'text-5xl')}>
            THE POWER OF
            {' '}
            <span>US</span>
            {' '}
            BEGINS WITH
            {' '}
            <span>YOU</span>
          </h1>
        )}
      </div>
    </div>
  );
}

export default Layout;

const useStyles = createUseStyles({
  container: {
    minHeight: '100vh',
  },
  subContainer: {
    // minHeight: "calc(100vh - 80px)", //if header excises
    minHeight: '100vh',
    display: 'grid',
    gridTemplateColumns: 'minmax(350px, 1fr) 5fr',
  },
  text: {
    margin: 'auto',
    fontWeight: 400,
    textAlign: 'center',
    '& > span': {
      color: COLORS.orange,
    },
  },
});
