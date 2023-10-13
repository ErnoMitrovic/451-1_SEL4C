import React from "react";
import { Box, Modal, IconButton, Alert } from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';

const styleModalError = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: '1rem',
};

export default function ErrorModal({ openError, handleCloseError, errorMessage }) {
    return (
        <Modal
            open={openError | false}
            onClose={handleCloseError}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...styleModalError }}>
                <Alert
                    severity="error"
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                handleCloseError();
                            }}
                        >
                            <CloseIcon fontSize="inherit" />
                        </IconButton>
                    }
                    autoFocus={false}
                >
                    {errorMessage}
                </Alert>
            </Box>
        </Modal>
    );
}