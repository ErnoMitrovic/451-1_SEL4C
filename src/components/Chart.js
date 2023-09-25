import React from "react";
import Box from '@mui/material/Box';
import {
    Chart as ChartJS,
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend,
} from 'chart.js';
import { Radar } from 'react-chartjs-2';

ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export const data = {
    labels: [
        'Innovación social y sostenibilidad financiera',
        'Liderazgo',
        'Conciencia y valor social',
        'Autocontrol',
        'Pensamiento sistémico',
        'Pensamiento científico',
        'Pensamiento crítico',
        'Pensamiento innovador',
    ],
    datasets: [{
        label: 'Masculino',
        data: [31, 23, 30, 16, 24, 27, 28, 20],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
    }, {
        label: 'Femenino',
        data: [28, 25, 29, 20, 28, 24, 31, 21],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
        label: 'No binarie',
        data: [32, 24, 28, 18, 23, 29, 34, 22],
        fill: true,
        backgroundColor: 'rgba(0, 194, 0, 0.2)',
        borderColor: 'rgb(0, 194, 0)',
        pointBackgroundColor: 'rgb(0, 194, 0)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(0, 194, 0)'
    }]
};

export function Chart(props) {
    return (
       <Box sx={{width:'30rem', maxWidth:'100%', padding:'2rem'}}>
           <Radar data={data} />
       </Box> 
    );
};