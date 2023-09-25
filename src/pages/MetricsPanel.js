import './MetricsPanel.sass';
import React from 'react';
import Box from '@mui/material/Box';
import { Navibar } from '../components/Navibar';
import { Sel4cCard } from '../components/Sel4cCard';
import { Chart } from '../components/Chart';
import { RadarChartFilters } from '../components/RadarChartFilters';
import { BarChartFilters } from '../components/BarChartFilters';

export default function MetricsPanel() {
    return (
        <div>
            <Navibar />
            <Sel4cCard >
                <Chart/>
                <Box className='hide-on-small' sx={{ bgcolor: '#D9D9D9', width:'0.5rem', height: '30rem'}} />
                <RadarChartFilters/>
            </Sel4cCard>
            <Sel4cCard>
                <Chart/>
                <Box className='hide-on-small' sx={{ bgcolor: '#D9D9D9', width:'0.5rem', height: '30rem'}} />
                <BarChartFilters/>
            </Sel4cCard>
        </div>
    );
}