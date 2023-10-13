import React from "react";
import { Box, Modal, IconButton, Alert } from '@mui/material';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';

const styleModal = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: '1rem',
};

export default function SuccessModal({ openSuccess, handleCloseSuccess, successMessage }) {
    return (
        <Modal
            open={openSuccess}
            onClose={handleCloseSuccess}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...styleModal }}>
                <Alert
                    severity='success'
                    autoFocus={false}
                >
                    {successMessage}
                </Alert>
            </Box>
        </Modal>
    );
}