import './MetricsPanel.sass';
import React from 'react';
import Box from '@mui/material/Box';
import { Navibar } from '../components/Navibar';
import { Sel4cCard } from '../components/Sel4cCard';
import { RadarChart } from '../components/RadarChart';
import { BarChart } from '../components/BarChart';
import { RadarChartFilters } from '../components/RadarChartFilters';
import { BarChartFilters } from '../components/BarChartFilters';
import { fetchData, filterData, calculateAverage } from '../components/utils/chartUtils';
import { users } from '../components/utils/sampleJsons';

//export const fetchedData = fetchData();
const fetchedData = users;

var filters = {
    sex: ['Masculino', 'Femenino', 'No binarie', 'Prefiero no decir'],
    disciplines: ['Arquitectura, Arte y Diseño', 'Ciencias Sociales', 'Ciencias de la Salud', 'Humanidades y Educación', 'Ingeniería y Ciencias', 'Negocios'],
    countries: ['México'],
    academic_degrees: ['Pregrado', 'Posgrado', 'Educación Continua'],
    institutions: ['Tecnológico de Monterrey', 'Otros'],
    age: [18, 45],
};
const filteredData = filterData(filters, fetchedData);
filters['sex'] = ['Masculino']
const masculineData = calculateAverage(filterData(filters, filteredData), 'final');
filters['sex'] = ['Femenino']
const femenineData = calculateAverage(filterData(filters, filteredData), 'final');
filters['sex'] = ['No binarie']
const nonBinaryData = calculateAverage(filterData(filters, filteredData), 'final');
filters['sex'] = ['Prefiero no decir']
const noSexResponseData = calculateAverage(filterData(filters, filteredData), 'final');
const datasets = [{
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
}];

export default function MetricsPanel() {

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
        datasets: datasets,
    });
    const [initialBarData, setInitialBarData] = React.useState({
        labels: [
            'Pregrado',
            'Posgrado',
            'Educación continua',
        ],
        datasets: [{
            label: 'Autocontrol',
            data: [31, 23, 30],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
        }, {
            label: 'Liderazgo',
            data: [28, 25, 29],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
        }, {
            label: 'Conciencia y valor social',
            data: [32, 24, 28],
            fill: true,
            backgroundColor: 'rgba(0, 0, 110, 0.2)',
            borderColor: 'rgb(0, 0, 110)',
        }, {
            label: 'Innovación social y sostenibilidad financiera',
            data: [32, 24, 28],
            fill: true,
            backgroundColor: 'rgba(110, 0, 0, 0.2)',
            borderColor: 'rgb(110, 0, 0)',
        }, {
            label: 'Pensamiento sistémico',
            data: [32, 24, 28],
            fill: true,
            backgroundColor: 'rgba(0, 194, 200, 0.2)',
            borderColor: 'rgb(0, 194, 200)',
        }, {
            label: 'Pensamiento científico',
            data: [32, 24, 28],
            fill: true,
            backgroundColor: 'rgba(100, 30, 150, 0.2)',
            borderColor: 'rgb(100, 30, 150)',
        }, {
            label: 'Pensamiento crítico',
            data: [32, 24, 28],
            fill: true,
            backgroundColor: 'rgba(200, 194, 0, 0.2)',
            borderColor: 'rgb(200, 194, 0)',
        }, {
            label: 'Pensamiento innovador',
            data: [32, 24, 28],
            fill: true,
            backgroundColor: 'rgba(50, 194, 0, 0.2)',
            borderColor: 'rgb(50, 194, 0)',
        }]
    });
    const [finalBarData, setFinalBarData] = React.useState({
        labels: [
            'Pregrado',
            'Posgrado',
            'Educación continua',
        ],
        datasets: [{
            label: 'Autocontrol',
            data: [31, 23, 30],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
        }, {
            label: 'Liderazgo',
            data: [28, 25, 29],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
        }, {
            label: 'Conciencia y valor social',
            data: [32, 24, 28],
            fill: true,
            backgroundColor: 'rgba(0, 0, 110, 0.2)',
            borderColor: 'rgb(0, 0, 110)',
        }, {
            label: 'Innovación social y sostenibilidad financiera',
            data: [32, 24, 28],
            fill: true,
            backgroundColor: 'rgba(110, 0, 0, 0.2)',
            borderColor: 'rgb(110, 0, 0)',
        }, {
            label: 'Pensamiento sistémico',
            data: [32, 24, 28],
            fill: true,
            backgroundColor: 'rgba(0, 194, 200, 0.2)',
            borderColor: 'rgb(0, 194, 200)',
        }, {
            label: 'Pensamiento científico',
            data: [32, 24, 28],
            fill: true,
            backgroundColor: 'rgba(100, 30, 150, 0.2)',
            borderColor: 'rgb(100, 30, 150)',
        }, {
            label: 'Pensamiento crítico',
            data: [32, 24, 28],
            fill: true,
            backgroundColor: 'rgba(200, 194, 0, 0.2)',
            borderColor: 'rgb(200, 194, 0)',
        }, {
            label: 'Pensamiento innovador',
            data: [32, 24, 28],
            fill: true,
            backgroundColor: 'rgba(50, 194, 0, 0.2)',
            borderColor: 'rgb(50, 194, 0)',
        }]
    });

    const updateRadarData = (newData) => {
        setRadarData(newData);
    };
    const updateInitialBarData = (newData) => {
        setInitialBarData(newData);
    };
    const updateFinalBarData = (newData) => {
        setFinalBarData(newData);
    };


    return (
        <div>
            <Navibar />
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