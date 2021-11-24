import { createUseStyles } from 'react-jss';
import { Link, useLocation } from 'react-router-dom';
import COLORS from '../../services/colors.service';
import Login from '../Login';
import classNames from 'classnames';

const useStyles = createUseStyles({
  container: { height: '100%', width: '100%', backgroundColor: COLORS.lightBlue },
  logo: {
    height: '100px',
  },
  text: {
    color: COLORS.while,
  },
});

export default function SideNav() {
  const classes = useStyles();
  const { pathname } = useLocation();
  return (
    <div className={classes.container}>
      <div className={classNames('p-col', classes.logo)}>Logo</div>
      {pathname === '/auth' ? <Login /> : (
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
