import React from "react";
import Box from '@mui/material/Box';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend } from 'chart.js';
import { Radar } from 'react-chartjs-2';


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export function RadarChart({ data }) {
    /*
    scales: {
                y: {
                    beginAtZero: true,
                    grid: {
                        color: '#000',
                        drawBorder: false 
                    }
                },
                x: {
                    grid: {
                        display: false,
                    }
                }
            },        */
    return (
        <Box sx={{ width: '30rem', height: '30rem', maxWidth: 1, justifyContent: 'center', mt: 2 }}>
            <Radar id="radar" data={data} options={{ maintainAspectRatio: false, }} />
        </Box>
    );
};
