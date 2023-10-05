import React from "react";
import { Box, Typography } from '@mui/material';
import { UsersTable } from "../components/UsersTable";
import { fetchUsers, fetchActivities } from "../components/utils/adminUtils";

export default function Admin() {

    const [users, setUsers] = React.useState();
    const [activities, setActivities] = React.useState();

    return (
        <div>
            <div id="admin-content">
            <Box sx={{
                width: '100%',
                padding: '3rem'
            }}>
                <Typography variant="h3" align="center" sx={{pb: "2rem"}}> Usuarios y actividades </Typography>
                <UsersTable />
            </Box>
            </div>
        </div>
    );
}
