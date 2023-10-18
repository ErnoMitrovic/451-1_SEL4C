import React, { useState, useEffect } from 'react';
import { Box, Typography, CircularProgress } from '@mui/material';
import { Sel4cTable } from "../components/Sel4cTable";
import { usersColumns, getUsers, deleteData as deleteUser } from "../models/users";
import { getData as getFormResponses } from "../models/forms";
import { activitiesColumns, getData as getActivities, filterUserDefaults, getActivityProgress } from "../models/activities";
import ErrorModal from "../components/ErrorModal";

function TableView() {

    // Loading state to display a loading spinner while the data is being fetched
    const [loading, setLoading] = React.useState(true);

    // Track users data
    const [usersData, setUsersData] = useState([]);
    // Track activities data
    const [activitiesData, setActivitiesData] = useState([]);

    // Error feedback
    const [openError, setOpenError] = useState(false);
    const handleCloseError = () => setOpenError(false);
    const [errorMessage, setErrorMessage] = useState('');

    // Handle user deactivation
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

    useEffect(() => {
        // Fetch data from API or any other source
        const fetchData = async () => {
            setLoading(true);
            try {
                const usersData = await getUsers();
                setUsersData(usersData);
                const formResponseData = await getFormResponses();
                // Append user.full_name to their matching form response
                formResponseData.forEach((formResponse) => {
                    const user = usersData.find((user) => user.user === formResponse.user);
                    formResponse.user = user.full_name;

                });
                const rawActivitiesData = await getActivities();
                const activitiesData = await filterUserDefaults(rawActivitiesData);
                let activitiesProgressData = getActivityProgress(activitiesData);
                // Append user.full_name to their matching activity
                activitiesProgressData.forEach((activity) => {
                    const user = usersData.find((user) => user.user === activity.user);
                    activity.user = user.full_name;
                });
                setActivitiesData(activitiesProgressData);
            } catch (error) {
                // Handle errors, e.g., show an error message
                setErrorMessage('Error al cargar datos');
                setOpenError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            {loading ? (
                <div
                    style={{
                        position: 'fixed',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                    }}
                >
                    <CircularProgress />
                </div>
            ) : (
                <div id="tables-content">
                    <Box sx={{
                        width: '100%',
                        padding: '3rem'
                    }}>
                        <Typography variant="h3" align="center"> Usuarios: respuestas y actividades </Typography>
                        <Sel4cTable
                            title="Datos de Usuarios"
                            data={usersData}
                            columns={usersColumns}
                            options={{
                                onRowsDelete: handleUserRowsDelete,
                                selectableRowsOnClick: true,
                                print: false,
                                responsive: "simple",
                                customToolbarSelect: () => { },
                            }}
                        />
                        <Sel4cTable
                            title="Progreso de Actividades por Usuario"
                            data={activitiesData}
                            columns={activitiesColumns}
                            options={{
                                print: false,
                                responsive: "simple",
                                customToolbarSelect: () => { },
                            }}
                        />
                    </Box>
                    <ErrorModal open={openError} handleClose={handleCloseError} errorMessage={errorMessage} />
                </div>
            )}
        </>
    );
}

export default TableView;
