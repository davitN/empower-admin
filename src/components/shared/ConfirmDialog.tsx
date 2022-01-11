import { Dialog } from 'primereact/dialog';
import Button from './Inputs/Button';

const ConfirmDialog = ({
  title, description, visible, handleClose, handleSuccess, loading,
}: PropsTypes) => {
  const renderFooter = () => {
    return (
      <div className="p-d-flex p-jc-end">
        <Button handleClick={handleClose}>NO</Button>
        <Button handleClick={handleSuccess} loading={loading}>YES</Button>
      </div>
    );
  };
  return (
    <Dialog
      draggable={false}
      header={title}
      visible={visible}
      style={{ maxWidth: '30rem', width: '100%' }}
      footer={renderFooter()}
      onHide={handleClose}
    >
      <p>
        {description}
      </p>
    </Dialog>
  );
};

export default ConfirmDialog;

interface PropsTypes {
  title: string,
  description: string,
  visible: boolean,
  handleClose: () => void,
  handleSuccess: () => void,
  loading: boolean
}
