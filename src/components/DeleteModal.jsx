import { Modal, Box, Typography, Button } from "@mui/material";

const style = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    maxWidth: '90%', 
    width: '100%',
    bgcolor: 'background.paper',
    border: 'none',
    boxShadow: 24,
    borderRadius: '10px',
    maxHeight: '80vh', 
    overflow: 'auto', 
    p: 4,
};

const DeleteModal = ({ open, handleClose, onConfirm }) => {
    return (
        <Modal
            open={open}
            onClose={handleClose} 
            aria-labelledby="modal-title"
            aria-describedby="modal-description"
        >
            <Box sx={style}>
                <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
                    ¿Seguro que quiere eliminar esta Derivación?
                </Typography>
                <Box sx={{ display: 'flex', justifyContent: 'space-around', mt: 2 }}>
                    <Button variant="contained" color="primary" onClick={onConfirm}>SI</Button>
                    <Button variant="contained" color="secondary" onClick={handleClose}>NO</Button>
                </Box>
            </Box>
        </Modal>
    );
};

export default DeleteModal;
