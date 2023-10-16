import React from "react";
import { Box, Modal, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const styleModal = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: '1rem',
};

export default function SuccessModal({ open, handleClose, successMessage }) {
    return (
        <Modal
            open={open}
            onClose={handleClose}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...styleModal }}>
                <Alert
                    severity='success'
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                handleClose();
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    autoFocus={false}
                >
                    {successMessage}
                </Alert>
            </Box>
        </Modal>
    );
}