import React from "react";
import MUIDataTable from "mui-datatables";
import { Box } from "@mui/material";

export const Sel4cTable = ({ columns, title, data, options }) => {

    return (
        <Box sx={{ m: "2rem" }}>
            <MUIDataTable
                title={title}
                data={data}
                columns={columns}
                options={options}
            />
        </Box>
    )
}