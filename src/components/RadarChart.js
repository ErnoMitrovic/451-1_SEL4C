import React from "react";
import Box from '@mui/material/Box';
import { Chart as ChartJS, RadialLinearScale, PointElement, LineElement, Filler, Tooltip, Legend} from 'chart.js';
import { Radar } from 'react-chartjs-2';


ChartJS.register(
    RadialLinearScale,
    PointElement,
    LineElement,
    Filler,
    Tooltip,
    Legend
);

export function RadarChart({data}) {
    return (
       <Box sx={{className:'reset-margins', width:'30rem', maxWidth:'100%', padding:'2rem', justifyContent: 'center', marginRight: '3rem'}}>
           <Radar data={data} />
       </Box> 
    );
};
