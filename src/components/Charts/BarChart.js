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
            text: 'Razón de cambio en las competencias SEL4C',
        },
        tooltip: {
            callbacks: {
                title: (context) => {
                    return context[0].label.replaceAll(',', ' ');
                },
            },
        },
    },
    maintainAspectRatio: false,
};

export function BarChart({ data }) {
    return (
        <Box sx={{ height: '30rem', width: '100%', maxWidth: '70rem', padding: '2rem' }}>
            <Bar data={data} options={options} />
        </Box>
    );
};