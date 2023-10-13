import { FormControl, Modal, Stack, Typography } from "@mui/material"
import React from "react";

const styleModalAdmin = {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: 'translate(-50%, -50%)',
    width: 0.5,
    bgcolor: 'white',
    border: '0.25rem solid #D9D9D9',
    boxShadow: 24,
    p: 4,
    borderRadius: '1rem',
};



export function ChangePasswordModal({ openModal, setOpenModal }) {

    const [oldPassword, setOldPassword] = React.useState('');
    const [newPassword, setNewPassword] = React.useState('');
    const [confirmNewPassword, setConfirmNewPassword] = React.useState('');

    // Validate new passwords according to the following rules:
    // - Your password can’t be too similar to your other personal information.
    // - Your password must contain at least 8 characters.
    // - Your password can’t be a commonly used password.
    // - Your password can’t be entirely numeric.
    function validatePasswords(){
        
    }

    function handleCloseModal() {
        setOpenModal(false);
    }

    return (
        <Modal
            open={openModal}
            onClose={handleCloseModal}>
            <Stack
                component='form'
                sx={styleModalAdmin}>
                <Typography variant="h2" gutterBottom>Change password</Typography>
                <FormControl>
                    <InputLabel htmlFor="my-input">Old password</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">New password</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
                <FormControl>
                    <InputLabel htmlFor="my-input">Confirm new password</InputLabel>
                    <Input id="my-input" aria-describedby="my-helper-text" />
                </FormControl>
            </Stack>
        </Modal>
    )
}