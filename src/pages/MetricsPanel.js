import React from 'react';
import { Navibar } from '../components/Navibar';
import { Sel4cCard } from '../components/Sel4cCard';
import { Chart } from '../components/Chart';

export default function MetricsPanel() {
    return (
        <div>
            <Navibar />
            <Sel4cCard>
                <Chart text="Gráfica de Radar"/>
            </Sel4cCard>
            <Sel4cCard>
                <Chart text="Gráfica de barras"/>
            </Sel4cCard>
        </div>
    );
}