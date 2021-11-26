import { createUseStyles } from 'react-jss';
import { Link } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import COLORS from '../../services/colors.service';
import Login from '../LogIn/LogIn';
import Logo from '../../assets/images/logo.png';
import { RootState } from '../../store/configureStore';

const SideNav = () => {
  const classes = useStyles();
  const { isSignedIn } = useSelector((state: RootState) => state.mainReducer);

  return (
    <div className={classes.container}>
      <img className={classNames('p-col', classes.logo)} src={Logo} alt="Ups." />
      {isSignedIn ? (
        <ul className={classNames('p-pt-6 p-pl-0', classes.ul)}>
          {routes.map(({ title, path }) => (
            <li className={classes.li}>
              <Link to={path} className={classes.link}>
                {title}
              </Link>
            </li>
          ))}
        </ul>
      ) : (
        <Login />
      )}
    </div>
  );
};

export default SideNav;

const useStyles = createUseStyles({
  container: {
    height: '100%',
    width: '100%',
    backgroundColor: COLORS.lightBlue,
    padding: '50px 0px',
  },
  logo: {
    height: '60px',
    width: '180px',
    margin: 'auto',
    display: 'flex',
  },
  link: {
    textDecoration: 'none',
    color: COLORS.white,
  },
  li: {
    borderTop: `1px solid ${COLORS.white}`,
    borderBottom: `1px solid ${COLORS.white}`,
    padding: '1rem',
  },
  ul: { listStyleType: 'none' },
});

const routes: Array<{ title: string, path: string }> = [
  {
    title: 'Companies',
    path: '/companies',
  },
  {
    title: 'App users',
    path: '/app-users',
  },
  {
    title: 'App Content',
    path: '/app-content',
  },
  {
    title: 'Account',
    path: '/account',
  },
];
