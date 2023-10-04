import React from "react";
import { Box, Typography } from '@mui/material';
import { Navibar } from "../components/Navibar";
import { TableAdmin } from "../components/TableAdmin";
import { UsersTable } from "../components/UsersTable";
import { fetchUsers, fetchActivities } from "../components/utils/adminUtils";
/*
const fetchedUsers = fetchUsers();
const fetchedActivities = fetchActivities();
*/
const fetchedUsers = [];
const fetchedActivities = [];

const userColumns = ["Name", "Email"];
const data = [
    ["Joe James", "joe_james@tec.mx"],
    ["John Walsh", "john_walsh@tec.mx"],
    ["Bob Herm", "bob_herm@tec.mx"],
    ["James Houston", "james_houston@tec.mx"],
];

export default function Admin() {

    const [users, setUsers] = React.useState(fetchedUsers);
    const [activities, setActivities] = React.useState(fetchedActivities);

    return (
        <div>
            <Navibar />
            <div id="admin-content">
            <Box sx={{
                width: '100%',
                padding: '3rem'
            }}>
                <Typography variant="h3" align="center" sx={{pb: "2rem"}}> Usuarios y actividades </Typography>
                <TableAdmin  title="Usuarios" data={data} columns={userColumns}/>
                <UsersTable />
            </Box>
            </div>
        </div>
    );
}
