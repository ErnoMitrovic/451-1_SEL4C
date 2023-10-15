import React, { useState, useEffect } from 'react';
import { Box, Typography } from '@mui/material';
import { Sel4cTable } from "../components/Sel4cTable";
import { usersColumns, getUsers, deleteData as deleteUser } from "../models/users";
import { formResponseColumns, getData as getFormResponses } from "../models/forms";
import { getData as getQuestions } from '../models/questions';
import { activitiesColumns, getData as getActivities, filterUserDefaults, getActivityProgress } from "../models/activities";
import ErrorModal from "../components/ErrorModal";

function TableView() {
    // Track users data
    const [usersData, setUsersData] = useState([]);
    // Track form responses data
    const [formResponseData, setFormResponseData] = useState([]);
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
            try {
                const usersData = await getUsers();
                setUsersData(usersData);
                const formResponseData = await getFormResponses();
                // Append user.full_name to their matching form response
                formResponseData.forEach((formResponse) => {
                    const user = usersData.find((user) => user.user === formResponse.user);
                    formResponse.user = user.full_name;

                });
                const questionsData = await getQuestions();
                // Append question.question to their matching form response
                formResponseData.forEach((formResponse) => {
                    const question = questionsData.find((question) => question.id === formResponse.question);
                    formResponse.question = `${question.id}. ${question.question}`;
                });
                setFormResponseData(formResponseData);
                const rawActivitiesData = await getActivities();
                const activitiesData = await filterUserDefaults(rawActivitiesData);
                setActivitiesData(getActivityProgress(activitiesData));
            } catch (error) {
                // Handle errors, e.g., show an error message
                setErrorMessage('Error al cargar datos');
                setOpenError(true);
            }
        };
        fetchData();
    }, []);

    return (
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
                    }}
                />
                <Sel4cTable
                    title="Respuestas de formulario"
                    data={formResponseData}
                    columns={formResponseColumns}
                    options={{
                        print: false,
                        responsive: "simple",
                        customToolbarSelect: () => {},
                    }}
                />
                <Sel4cTable
                    title="Progreso de Actividades por Usuario"
                    data={activitiesData}
                    columns={activitiesColumns}
                    options={{
                        print: false,
                        responsive: "simple",
                        customToolbarSelect: () => {},
                    }}
                />
            </Box>
            <ErrorModal open={openError} handleClose={handleCloseError} errorMessage={errorMessage} />
        </div>
    );
}

export default TableView;
