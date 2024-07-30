import React, { useEffect, useState } from 'react';
import { Modal as MuiModal, Box, Typography, Button, TextField } from '@mui/material';
import FormEdit from './FormEdit';

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

const EditModal = ({ open, handleClose, data, handleSave }) => {
  const [formData, setFormData] = useState(data);
   
  useEffect(() => {
    setFormData(data);
    console.log(data)
  }, [data]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleSubmit = () => {
    handleSave(formData);
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
        <Typography id="modal-title" variant="h6" component="h2">
          Editar Derivacion
        </Typography>
     <FormEdit data={data}/> 
      </Box>
    </MuiModal>
  );
}

export default EditModal;
