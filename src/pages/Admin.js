import React, { useState, useEffect } from "react";
import { Box, Typography } from '@mui/material';
import { Sel4cTable } from "../components/Sel4cTable";
import AdminModal from "../components/Admin/AdminModal";
import { adminColumns, getAdmins, deleteData as deleteUser } from "../models/users";
import ErrorModal from "../components/ErrorModal";

const Admin = () => {
    // Track users data
    const [usersData, setUsersData] = useState([]);

    // Error feedback
    const [openError, setOpenError] = useState(false);
    const handleCloseError = () => setOpenError(false);
    const [errorMessage, setErrorMessage] = useState('');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const userResponseData = await getAdmins();
                setUsersData(userResponseData);
            } catch (error) {
                // Handle errors, e.g., show an error message
                setErrorMessage('Error al cargar datos');
                setOpenError(true);
            }
        };

        fetchData();
    }, []);

    const handleUserCreationSuccess = (userData) => {
        setUsersData([...usersData, userData]);
    };

    const handleUserRowsDelete = async (rowsDeleted, newTableData) => {
        try {
            const updatedUsersData = [...usersData];

            for (const row of rowsDeleted.data) {
                const rowIndex = row.dataIndex;
                // Update the is_active property to false for the user
                updatedUsersData[rowIndex].is_active = false;

                const userIdToDelete = updatedUsersData[rowIndex].user;
                // Deactivate user in the backend
                await deleteUser(userIdToDelete);
            }

            // Set the updated copy as the new state for usersData
            setUsersData(updatedUsersData);
        } catch (error) {
            setErrorMessage('Error al desactivar usuario(s)');
            setOpenError(true);
        }
    };



    return (
        <div id="admin-content">
            <Box sx={{
                width: '100%',
                padding: '3rem'
            }}>
                <Typography variant="h3" align="center"> Administrar Investigadores </Typography>
                <Sel4cTable
                    title="Usuarios"
                    data={usersData}
                    columns={adminColumns}
                    options={{
                        customToolbar: () => <AdminModal onSuccess={handleUserCreationSuccess} usersData={usersData} />,
                        onRowsDelete: handleUserRowsDelete,
                        selectableRowsOnClick: true,
                        print: false,
                        responsive: "simple",
                    }}
                />
            </Box>
            <ErrorModal open={openError} handleClose={handleCloseError} errorMessage={errorMessage} />
        </div>
    );
}

export default Admin;
