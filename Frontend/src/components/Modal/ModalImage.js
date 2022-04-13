import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';
import Modal from '@mui/material/Modal';
import { Image } from 'cloudinary-react';
import { Fab } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ImageIcon from '@mui/icons-material/Image';

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 500,
    bgcolor: 'background.paper',
    border: '2px solid #000',
    boxShadow: 24,
    p: 4,
};

export default function ModalImage(props) {
    const [open, setOpen] = React.useState(false);
    const handleOpen = () => setOpen(true);
    const handleClose = () => setOpen(false);

    return (
        <div>
            {props.image ? 
            <Button className='btn btn-red' onClick={handleOpen}><ImageIcon/> Screenshot</Button> : 
            <Button disabled>No image uploaded</Button>}
            <Modal
                open={open}
                onClose={handleClose}
                aria-labelledby="modal-modal-title"
                aria-describedby="modal-modal-description"
            >
                
                <Box sx={style}>
                <Fab size="medium" color="primary" aria-label="add" onClick={handleClose}>
                    <CloseIcon/>
                </Fab>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                        <Image cloudName="du8mkgw6r" publicId={props.image} />
                    </Typography>
                </Box>
            </Modal>
        </div>
    );
}