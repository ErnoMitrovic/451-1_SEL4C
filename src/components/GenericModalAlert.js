import React, { useEffect } from "react";
import { Box, Modal, IconButton, Alert } from '@mui/material';
import { ErrorOutline, Close, CheckCircleOutline, InfoOutlined } from "@mui/icons-material";

const styleModal = {
    position: 'absolute',
    top: '20%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    boxShadow: 24,
    borderRadius: '1rem',
};

export default function GenericModalAlert({ open, handleClose, message, severity }) {

    const [openModal, setOpenModal] = React.useState(open);

    useEffect(() => {
        setOpenModal(open);
    }, [open])

    return (
        <Modal
            open={openModal | false}
            onClose={()=> {
                setOpenModal(false)
                handleClose()
            }}
            aria-labelledby="child-modal-title"
            aria-describedby="child-modal-description"
        >
            <Box sx={{ ...styleModal }}>
                <Alert
                    severity={severity}
                    iconMapping={{
                        success: <CheckCircleOutline />,
                        error: <ErrorOutline />,
                        info: <InfoOutlined />,
                    }}
                    action={
                        <IconButton
                            aria-label="close"
                            color="inherit"
                            size="small"
                            onClick={() => {
                                setOpenModal(false);
                                handleClose();
                            }}
                        >
                            <Close fontSize="inherit" />
                        </IconButton>
                    }
                    autoFocus={false}
                >
                    {message}
                </Alert>
            </Box>
        </Modal>
    );
}