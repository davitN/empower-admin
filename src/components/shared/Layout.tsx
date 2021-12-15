import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import { Outlet, useLocation } from 'react-router-dom';
import { useSelector } from 'react-redux';
import COLORS from '../../services/colors.service';
import Header from './Header';
import SideNav from './SideNav';
import { RootState } from '../../store/configureStore';
import SetPassword from '../../routes/SetPassword';

function Layout() {
  const classes = useStyles();
  const { isSignedIn } = useSelector((state: RootState) => state.mainReducer);
  const { pathname } = useLocation();
  const showPasswordSetForm = pathname.includes('set_password');
  return (
    <div className={classes.container}>
      {showPasswordSetForm ? <SetPassword /> : (
        <>
          <Header />
          <div className={classes.subContainer}>
            <div>
              <SideNav />
            </div>
            <div className={classes.content}>
              {isSignedIn ? <Outlet /> : (
                <h1 className={classNames(classes.text, 'text-5xl')}>
                  THE POWER OF
                  <span>US</span>
                  BEGINS WITH
                  <span>YOU</span>
                </h1>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}

export default Layout;

const useStyles = createUseStyles({
  container: {
    minHeight: '100vh',
    display: 'flex',
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
      padding: '0 10px',
    },
  },
  content: {
    maxHeight: '100vh',
    overflow: 'auto',
    display: 'flex',
  },
});
