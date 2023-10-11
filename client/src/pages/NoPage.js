import React from "react";
import Typography from '@mui/material/Typography';
import { Sel4cCard } from '../components/Sel4cCard';

export default function NoPage() {
    return (
        <div>
            <Sel4cCard>
                <Typography variant="h2" component="div" sx={{ flexGrow: 1 }}>
                    Esta página no existe
                </Typography>
            </Sel4cCard>
        </div>
    );
}
