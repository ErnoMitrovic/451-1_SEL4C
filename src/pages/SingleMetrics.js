import './SingleMetrics.sass'
import React, { useState, useEffect } from 'react';
import { Typography, Grid, Paper, TextField, Autocomplete, CircularProgress, Stack, Box, Divider } from '@mui/material';
import { initialBlankRadarDataForSingleUser, initialBlankBarData, softColors, colors } from '../components/utils/chartUtils';
import { Sel4cCard } from '../components/Sel4cCard';
import { RadarChart } from '../components/Charts/RadarChart';
import { BarChart } from '../components/Charts/BarChart';
import { getUsers } from '../models/users';

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

    const handleUserChange = (event, newValue) => {
        setSelectedUser(newValue);

        const initialScore = newValue.initial_score;
        const finalScore = newValue.final_score;
        const initialData = getValuesForProperties(initialScore);
        const finalData = getValuesForProperties(finalScore);


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
                label: 'Formulario Inicial',
                data: initialData,
                backgroundColor: softColors,
            }, {
                label: 'Formulario Final',
                data: finalData,
                backgroundColor: colors,
            }],
        });
    }

    useEffect(() => {
        const fetchData = async () => {
            setLoading(true);
            const data = await getUsers();
            setUsers(data);
            setLoading(false);
        };
        fetchData();
    }, []);

    return (
        <Grid item xs={12} md={4} lg={3}>
            <Paper>
                <Typography variant="h2" gutterBottom textAlign={'center'} m={2}>
                    Métricas individuales
                </Typography>
                {loading ? (
                    <CircularProgress />
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
                                            <Typography variant="h2">{selectedUser.full_name}</Typography>
                                            <Divider />
                                            <Typography variant='h4' textAlign={'center'}>Información demográfica</Typography>
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
                                        <Box>
                                            <RadarChart data={radarData} />
                                            <BarChart data={barData} />
                                        </Box>
                                    </>
                                )}
                            </Stack>
                        </Sel4cCard>
                    </div>
                )}
            </Paper>
        </Grid>
    );
};

export default SingleMetrics;