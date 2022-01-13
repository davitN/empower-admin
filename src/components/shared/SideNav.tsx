import { createUseStyles } from 'react-jss';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import classNames from 'classnames';
import { useSelector } from 'react-redux';
import COLORS from '../../services/colors.service';
import Login from '../LogIn/LogIn';
import Logo from '../../assets/images/logo.png';
import { RootState } from '../../store/configureStore';
import { routes } from '../../helpers/routes';

const SideNav = () => {
  const classes = useStyles();
  const navigate = useNavigate();
  const { isSignedIn } = useSelector((state: RootState) => state.mainReducer);
  const { pathname } = useLocation();

  return (
    <div className={classes.container}>
      <img className={classNames('p-col', classes.logo)} src={Logo} alt="Ups." onClick={() => navigate('/analytics')} />
      {isSignedIn ? (
        <ul className={classNames('p-pt-6 p-pl-0', classes.ul)}>
          {routes.map(({
            hiddenInNav, disabled, name, path,
          }) => (
            !hiddenInNav && !disabled && (
            <li className={classNames(classes.li, pathname.includes(path) && 'p-text-bold')} key={path}>
              <Link to={path} className={classes.link}>
                {name}
              </Link>
            </li>
            )
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
    cursor: 'pointer',
  },
  link: {
    textDecoration: 'none',
    color: COLORS.white,
  },
  li: {
    borderTop: `2px solid ${COLORS.white}`,
    padding: '1rem',
    '&:last-child': {
      borderBottom: `2px solid ${COLORS.white}`,
    },
  },
  ul: { listStyleType: 'none' },
});
