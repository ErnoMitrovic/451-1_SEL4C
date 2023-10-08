import './MetricsPanel.sass';
import React from 'react';
import Box from '@mui/material/Box';
import { Sel4cCard } from '../components/Sel4cCard';
import { RadarChart } from '../components/RadarChart';
import { BarChart } from '../components/BarChart';
import { RadarChartFilters } from '../components/RadarChartFilters';
import { BarChartFilters } from '../components/BarChartFilters';
import { fetchData, filterData, calculateAverage } from '../components/utils/chartUtils';

export default function MetricsPanel() {

    const [fetchedData, setFetchedData] = React.useState({});
    const [filteredData, setFilteredData] = React.useState({});

    const [radarData, setRadarData] = React.useState({
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
            label: 'Masculino',
            data: [],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }, {
            label: 'Femenino',
            data: [],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
            label: 'No binarie',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 194, 0, 0.2)',
            borderColor: 'rgb(0, 194, 0)',
            pointBackgroundColor: 'rgb(0, 194, 0)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(0, 194, 0)'
        }, {
            label: 'Prefiero no decir',
            data: [],
            fill: true,
            backgroundColor: 'rgba(255, 255, 0, 0.2)',
            borderColor: 'rgb(255, 255, 0)',
            pointBackgroundColor: 'rgb(255, 255, 0)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 255, 0)'
        }]
    });
    const updateRadarData = (newData) => {
        setRadarData(newData);
    };

    React.useEffect(() => {
        const init = async () => {
            const fetchedData = await fetchData();
            //const fetchedData = users;
            setFetchedData(fetchedData);
            var filters = {
                sex: ['Masculino', 'Femenino', 'No binarie', 'Prefiero no decir'],
                disciplines: ['Arquitectura, Arte y Diseño', 'Ciencias Sociales', 'Ciencias de la Salud', 'Humanidades y Educación', 'Ingeniería y Ciencias', 'Negocios'],
                countries: ['México'],
                academic_degrees: ['Pregrado', 'Posgrado', 'Educación Continua'],
                institutions: ['Tecnológico de Monterrey', 'Otros'],
                age: [18, 45],
            };
            const filteredData = filterData(filters, fetchedData);
            setFilteredData(filteredData);
            filters['sex'] = ['Masculino']
            const masculineData = calculateAverage(filterData(filters, filteredData), 'final_score');
            filters['sex'] = ['Femenino']
            const femenineData = calculateAverage(filterData(filters, filteredData), 'final_score');
            filters['sex'] = ['No binarie']
            const nonBinaryData = calculateAverage(filterData(filters, filteredData), 'final_score');
            filters['sex'] = ['Prefiero no decir']
            const noSexResponseData = calculateAverage(filterData(filters, filteredData), 'final_score');
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
                    label: 'Masculino',
                    data: masculineData,
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }, {
                    label: 'Femenino',
                    data: femenineData,
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }, {
                    label: 'No binarie',
                    data: nonBinaryData,
                    fill: true,
                    backgroundColor: 'rgba(0, 194, 0, 0.2)',
                    borderColor: 'rgb(0, 194, 0)',
                    pointBackgroundColor: 'rgb(0, 194, 0)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(0, 194, 0)'
                }, {
                    label: 'Prefiero no decir',
                    data: noSexResponseData,
                    fill: true,
                    backgroundColor: 'rgba(255, 255, 0, 0.2)',
                    borderColor: 'rgb(255, 255, 0)',
                    pointBackgroundColor: 'rgb(255, 255, 0)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 255, 0)'
                }]
            });
        };
        init();
    }, []);


    return (
        <div>
            <Sel4cCard >
                <RadarChart data={radarData} />
                <Box className='hide-on-small' sx={{ bgcolor: '#D9D9D9', width: '0.5rem', height: '48rem' }} />
                <RadarChartFilters fetchedData={fetchedData} updateRadarData={updateRadarData} filteredData={filteredData} />
            </Sel4cCard>
            <Sel4cCard>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    flexGrow: 1,
                }}>
                    <BarChart />
                    <BarChart />
                </Box>
                <Box className='hide-on-small' sx={{ bgcolor: '#D9D9D9', width: '0.5rem', height: '34rem' }} />
                <BarChartFilters />
            </Sel4cCard>
        </div >
    );
}