import './SingleMetrics.sass'
import React, { useState, useEffect } from 'react';
import { Typography, Paper, TextField, Autocomplete, CircularProgress, Stack, Box, Divider } from '@mui/material';
import { initialBlankRadarDataForSingleUser, initialBlankBarData, colors } from '../components/utils/chartUtils';
import { Sel4cCard } from '../components/Sel4cCard';
import { RadarChart } from '../components/Charts/RadarChart';
import { BarChart } from '../components/Charts/BarChart';
import { getUsers } from '../models/users';
import { getData as getActivities, filterUserDefaults, getActivityProgress } from '../models/activities';
import ErrorModal from '../components/ErrorModal';

function CircularProgressWithLabel(props) {
    return (
        <Box sx={{ position: 'relative', display: 'inline-flex' }}>
            <CircularProgress
                variant="determinate"
                color="secondary"
                size={100} // Adjust the size as needed
                thickness={2} // Adjust the thickness as needed
                {...props}
            />
            <Box
                sx={{
                    top: 0,
                    left: 0,
                    bottom: 0,
                    right: 0,
                    position: 'absolute',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}
            >
                <Typography variant="h6" component="div" color="text.secondary">
                    {`${Math.round(props.value)}%`}
                </Typography>
            </Box>
        </Box>
    );
}

function getValuesForProperties(data) {
    if (!data || typeof data !== 'object') {
        return [];
    } else {
        const values = [
            data.social_innovation_and_financial_sustainability_score,
            data.consciousness_and_social_value_score,
            data.leadership_score,
            data.self_control_score,
            data.systemic_thinking_score,
            data.scientific_thinking_score,
            data.critical_thinking_score,
            data.innovative_thinking_score
        ];
        return values;
    }
}

const SingleMetrics = () => {
    const [loading, setLoading] = useState(true);
    const [users, setUsers] = useState(null);
    const [selectedUser, setSelectedUser] = useState(null);

    // Radar & bar chart data
    const [radarData, setRadarData] = useState(initialBlankRadarDataForSingleUser);
    const [barData, setBarData] = useState(initialBlankBarData);

    // Error handling
    const [openError, setOpenError] = React.useState(false);
    const handleCloseError = () => setOpenError(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    const handleUserChange = (event, newValue) => {
        setSelectedUser(newValue);
        if (newValue) {

            const initialScore = newValue.initial_score;
            const finalScore = newValue.final_score;
            const initialData = getValuesForProperties(initialScore);
            const finalData = getValuesForProperties(finalScore);
            // get the delta between initial and final scores
            const deltaData = initialData.map((value, index) => finalData[index] - value);

            setRadarData({
                labels: [
                    'Innovación social y sostenibilidad financiera',
                    'Conciencia y valor social',
                    'Liderazgo',
                    'Autocontrol',
                    'Pensamiento sistémico',
                    'Pensamiento científico',
                    'Pensamiento crítico',
                    'Pensamiento innovador',
                ],
                datasets: [{
                    label: 'Cuestionario Inicial',
                    data: initialData,
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }, {
                    label: 'Cuestionario Final',
                    data: finalData,
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }],
            });
            setBarData({
                labels: [
                    ['Innovación', 'social y', 'sostenibilidad', 'financiera'],
                    ['Conciencia', 'y valor', 'social'],
                    'Liderazgo',
                    'Autocontrol',
                    ['Pensamiento', 'sistémico'],
                    ['Pensamiento', 'científico'],
                    ['Pensamiento', 'crítico'],
                    ['Pensamiento', 'innovador'],
                ],
                datasets: [{
                    label: 'Cambio de puntaje con respecto a la primera evaluación',
                    data: deltaData,
                    backgroundColor: colors,
                }],
            });

        } else {
            // Handle the case when no user is selected, you can set your data to some default values or clear it.
            setRadarData(initialBlankRadarDataForSingleUser);
            setBarData(initialBlankBarData);
        }

    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            try {
                const data = await getUsers();
                const rawActivitiesData = await getActivities();
                const activitiesData = await filterUserDefaults(rawActivitiesData);
                const activitiesProgress = getActivityProgress(activitiesData);
                // Add to users their progress based on activitiesProgress
                const updatedUsers = data.map(user => {
                    const userProgress = activitiesProgress.find(progress => progress.user === user.user);
                    if (userProgress) {
                        // If user has a matching activity progress, add user.progress
                        user.progress = userProgress.progress;
                    } else {
                        // If no matching progress found, set user.progress to 0
                        user.progress = 0;
                    }
                    return user;
                });
                setUsers(updatedUsers);
            } catch (error) {
                setErrorMessage('Error al cargar los datos');
                setOpenError(true);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    return (
        <>
            <Typography variant="h2" gutterBottom textAlign={'center'} m={2}>
                Métricas individuales
            </Typography>
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
                <div>
                    <Sel4cCard>
                        <Stack direction="column" spacing={2} m={2} width={'80%'}>
                            <Autocomplete
                                options={users}
                                getOptionLabel={(user) => user.full_name}
                                value={selectedUser}
                                onChange={handleUserChange}
                                renderInput={(params) => <TextField {...params} label="Selecciona usuario" />}
                            />
                            {selectedUser && (
                                <>
                                    <Box>
                                        <Typography variant="h2" m={2}>{selectedUser.full_name}</Typography>
                                        <Divider />
                                        <Typography variant='h4' textAlign={'center'} m={2}>Información demográfica</Typography>
                                        <Typography variant='body1'><span className="label">Usuario número:</span> {selectedUser.user}</Typography>
                                        <Typography variant="body1"><span className="label">Email:</span> {selectedUser.email}</Typography>
                                        <Typography variant="body1"><span className="label">Grado académico:</span> {selectedUser.academic_degree}</Typography>
                                        <Typography variant='body1'><span className="label">Institución:</span> {selectedUser.institution}</Typography>
                                        <Typography variant='body1'><span className="label">Disciplina:</span> {selectedUser.discipline}</Typography>
                                        <Typography variant='body1'><span className="label">Género:</span> {selectedUser.gender}</Typography>
                                        <Typography variant='body1'><span className="label">Edad:</span> {selectedUser.age}</Typography>
                                        <Typography variant='body1'><span className="label">País:</span> {selectedUser.country}</Typography>
                                    </Box>
                                    <Divider />
                                    <Box flexWrap={1}>
                                        <Typography variant='h4' textAlign={'center'} m={2}>Porcentaje de finalización de las actividades de SEL4C</Typography>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <CircularProgressWithLabel value={selectedUser.progress} />
                                        </Box>
                                    </Box>
                                    <Divider />
                                    <Stack spacing={3}>
                                        <Box sx={{ display: 'flex', justifyContent: 'center' }}>
                                            <Paper elevation={3}>
                                                <RadarChart data={radarData} />
                                            </Paper>
                                        </Box>
                                        <Divider />
                                        <BarChart data={barData} />
                                    </Stack>
                                </>
                            )}
                        </Stack>
                    </Sel4cCard>
                    <ErrorModal openError={openError} handleCloseError={handleCloseError} errorMessage={errorMessage} />
                </div>
            )}
        </>
    );
};

export default SingleMetrics;