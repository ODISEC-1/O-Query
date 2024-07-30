import React, { useEffect, useState } from 'react';
import { Modal as MuiModal, Box, Typography } from '@mui/material';
import FormEdit from './FormEdit';

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

const EditModal = ({ open, handleClose, data, handleSave }) => {
  const [formData, setFormData] = useState(data);

  useEffect(() => {
    setFormData(data);
  }, [data]);

  const Close = () => {
    handleClose();
  };

  return (
    <MuiModal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-title"
      aria-describedby="modal-description"
    >
      <Box sx={style}>
        <Typography id="modal-title" variant="h6" component="h2" sx={{ mb: 2, textAlign: 'center', fontWeight: 'bold', color: '#1976d2' }}>
          Editar Derivación
        </Typography>
        <FormEdit data={data} close={Close} />
      </Box>
    </MuiModal>
  );
}

export default EditModal;
