import classNames from 'classnames';
import { createUseStyles } from 'react-jss';
import COLORS from '../../services/colors.service';

const Title = ({ title, fontSize = 'text-3xl' }: { title: string, fontSize?: string }) => {
  const classes = useStyles();
  return <h1 className={classNames(fontSize, classes.root)}>{title}</h1>;
};

export default Title;

const useStyles = createUseStyles({
  root: {
    color: COLORS.blueWood,
    fontWeight: 400,
  },
});
