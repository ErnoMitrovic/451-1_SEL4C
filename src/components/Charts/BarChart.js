import React from "react";
import Box from '@mui/material/Box';
import {
    Chart as ChartJS,
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend,
} from 'chart.js';
import { Bar } from 'react-chartjs-2';

ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    Title,
    Tooltip,
    Legend
);

const options = {
    responsive: true,
    plugins: {
        legend: {
            position: 'top',
        },
        title: {
            display: true,
            text: 'Chart.js Bar Chart',
        },
    },
};

export const data = {
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
};

export function BarChart(props) {
    return (
        <Box sx={{ width: '30rem', maxWidth: '100%', padding: '2rem' }}>
            <Bar data={data} options={options}/>
        </Box>
    );
};