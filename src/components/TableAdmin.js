import MUIDataTable from "mui-datatables";

const options = { 
    filterType: 'checkbox',
    responsive: 'standard',
    rowsPerPageOptions: [10,25,100],
};

export const TableAdmin = ({title, data, columns}) => {
    return (
        <MUIDataTable
        title={title}
        data={data}
        columns={columns}
        options={options}
        />
    )
}