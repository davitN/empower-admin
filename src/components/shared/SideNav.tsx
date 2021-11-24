import { createUseStyles } from 'react-jss';
import { Link, useLocation } from 'react-router-dom';
import COLORS from '../../services/colors.service';
import Login from '../Login/index';
import classNames from 'classnames';
import Logo from '../../assets/images/logo.png';

const useStyles = createUseStyles({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.lightBlue,
    padding: '50px 30px',
  },
  logo: {
    height: '60px',
    width: '180px',
    margin: 'auto',
    display: 'flex',
  },
  text: {
    color: COLORS.white,
  },
});

export default function SideNav() {
  const classes = useStyles();
  const { pathname } = useLocation();
  return (
    <div className={classes.container}>
      <img className={classNames('p-col', classes.logo)} src={Logo} />
      {pathname === '/auth' ? (
        <Login />
      ) : (
        <div>
          <div className="p-col">
            <Link to="/companies" className={classNames('p-text-bold', classes.text)}>
              companies
            </Link>
          </div>
          <div className="p-col">
            <Link to="/auth" className={classNames('p-text-bold', classes.text)}>
              log in
            </Link>
          </div>
          <div className="p-col">
            <Link to="/app-users" className={classNames('p-text-bold', classes.text)}>
              app users
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
