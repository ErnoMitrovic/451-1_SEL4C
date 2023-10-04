import React from "react";
import MUIDataTable from "mui-datatables";
import axios from "axios";

export const UsersTable = () => {
    const [users, setUsers] = React.useState([]);
    const url = "https://gorest.co.in/public/v2/users";
    const getData = async () => {
        await axios.get(url).then((response) => {
            const data = response.data;
            console.log(data);
            setUsers(data);
        })
    };

    React.useEffect(() => {
        getData();
    }, []);

    const columns = [
        {
            name:  "id",
            label: "ID",
        },
        {
            name: "name",
            label: "Name",
        },
        {
            name: "email",
            label: "Email",
        },
        {
            name: "gender",
            label: "Gender",
        },
        {
            name: "status",
            label: "Status",
        },
    ];
    
    return (
        <MUIDataTable
        title={"Users"}
        data={users}
        columns={columns}
        />
    )
}