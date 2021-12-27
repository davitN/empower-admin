import { ReactNode } from 'react';
import { createUseStyles } from 'react-jss';
import classNames from 'classnames';
import Title from './Title';
import COLORS from '../../services/colors.service';

interface PropTypes {
  children: ReactNode,
  itemId?: string,
  sectionTitle?: string,
  idText?: string
}

const Container = ({
  children, itemId, sectionTitle, idText,
}: PropTypes) => {
  const classes = useStyles();
  return (
    <div className={classNames('p-p-6', classes.root)}>
      {(sectionTitle || itemId) && (
      <div className={classNames('p-d-flex p-jc-between p-ai-center p-mb-3', classes.textColor)}>
        {sectionTitle && <Title title={sectionTitle} fontSize="text-4xl" costumeStyles="p-mr-6" />}
        {itemId !== 'new' && itemId && idText && (
        <p className={classNames('p-d-flex p-ai-center p-flex-column text-lg p-text-bold', classes.textColor)}>
          {idText}
          <span className="p-text-normal">{itemId}</span>
        </p>
        )}
      </div>
      )}
      {children}
    </div>
  );
};

export default Container;

const useStyles = createUseStyles({
  root: {
    width: '100%',
    minWidth: '950px',
    height: '100vh',
    overflow: 'auto',
  },
  textColor: COLORS.blueWood,
});
