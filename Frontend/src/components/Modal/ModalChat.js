import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Modal from '@mui/material/Modal';
import ChatBox from '../../components/Message/index';

const style = {
  // position: 'fixed',
  // top: '50%',
  // left: '50%',
  // transform: 'translate(-50%, -50%)',
  // width: 400,
  // bgcolor: 'background.paper',
  // border: '2px solid #000',
  // boxShadow: 24,
  // p: 4,
};

export default function ModalChat(props) {
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => setOpen(true);
  const handleClose = () => setOpen(false);
  const [onOFF, setOnOFF] = React.useState(true);
  React.useEffect(() => {
    if (props.onOFF !=='Open') {
      setOnOFF(true);
    } else {
      setOnOFF(false);
    }
  }, [props.onOFF]);
  return (
    <div>
      <button class="btn btn-ghost"onClick={handleOpen} disabled={onOFF}>Open Chat</button>
      <Modal
        open={open}
        onClose={handleClose}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <ChatBox refresh={props.refresh} userName={props.userName} complId={props.complId} msgs={props.msgs} close={handleClose}/>
        </Box>
      </Modal>
    </div>
  );
}