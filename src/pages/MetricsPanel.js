import './MetricsPanel.sass';
import React from 'react';
import Box from '@mui/material/Box';
import { Sel4cCard } from '../components/Sel4cCard';
import { RadarChart } from '../components/RadarChart';
import { BarChart } from '../components/BarChart';
import { RadarChartFilters } from '../components/RadarChartFilters';
import { BarChartFilters } from '../components/BarChartFilters';
import { fetchData, filterData, calculateAverage } from '../components/utils/chartUtils';
import * as XLSX from "xlsx";
import { FilterList, TableChartOutlined } from '@mui/icons-material';
import { Stack, Modal, Container, IconButton } from '@mui/material';

export default function MetricsPanel() {

    const [fetchedData, setFetchedData] = React.useState({});
    const [filteredData, setFilteredData] = React.useState({});    

    // Update the radar chart data. 
    // filteredRadarData is the data that will be displayed in the chart stored in JSON.
    const [filteredRadarData, setFilteredRadarData] = React.useState(filteredData);
    const [radarData, setRadarData] = React.useState({
        labels: [
            'Innovación social y sostenibilidad financiera',
            'Conciencia y valor social',
            'Liderazgo',
            'Autocontrol',
            'Pensamiento sistémico',
            'Pensamiento científico',
            'Pensamiento crítico',
            'Pensamiento innovador',
        ],
        datasets: [{
            label: 'Masculino',
            data: [],
            fill: true,
            backgroundColor: 'rgba(54, 162, 235, 0.2)',
            borderColor: 'rgb(54, 162, 235)',
            pointBackgroundColor: 'rgb(54, 162, 235)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(54, 162, 235)'
        }, {
            label: 'Femenino',
            data: [],
            fill: true,
            backgroundColor: 'rgba(255, 99, 132, 0.2)',
            borderColor: 'rgb(255, 99, 132)',
            pointBackgroundColor: 'rgb(255, 99, 132)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 99, 132)'
        }, {
            label: 'No binarie',
            data: [],
            fill: true,
            backgroundColor: 'rgba(0, 194, 0, 0.2)',
            borderColor: 'rgb(0, 194, 0)',
            pointBackgroundColor: 'rgb(0, 194, 0)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(0, 194, 0)'
        }, {
            label: 'Prefiero no decir',
            data: [],
            fill: true,
            backgroundColor: 'rgba(255, 255, 0, 0.2)',
            borderColor: 'rgb(255, 255, 0)',
            pointBackgroundColor: 'rgb(255, 255, 0)',
            pointBorderColor: '#fff',
            pointHoverBackgroundColor: '#fff',
            pointHoverBorderColor: 'rgb(255, 255, 0)'
        }]
    });
    
    function transformItem(item) {
        console.log(item);
        // Flatten the 'initial' and 'final' objects
        const transformedItem = {
            id: item.id,
            full_name: item.full_name,
            academic_degree: item.academic_degree,
            institution: item.institution,
            gender: item.gender,
            age: item.age,
            country: item.country,
            discipline: item.discipline,
            user: item.user,
        };

        // Append `initial_` to the keys of the initial object
        for (const key in item.initial_score) {
            if (item.initial.hasOwnProperty(key)) {
                transformedItem[`initial_score_${key}`] = item.initial_score[key];
            }
        }

        // Append `final_` to the keys of the final object
        for (const key in item.final_score) {
            if (item.initial.hasOwnProperty(key)) {
                transformedItem[`final_score_${key}`] = item.final_score[key];
            }
        }

        return {
            ...transformedItem,
        };
    }

    const [filteredDataFromModal, setFilteredDataFromModal] = React.useState(
        {
            sex: ['Masculino', 'Femenino', 'No binarie', 'Prefiero no decir'],
            disciplines: ['Arquitectura, Arte y Diseño', 'Ciencias Sociales', 'Ciencias de la Salud', 'Humanidades y Educación', 'Ingeniería y Ciencias', 'Negocios'],
            countries: ['México'],
            academic_degrees: ['Pregrado', 'Posgrado', 'Educación Continua'],
            institutions: ['Tecnológico de Monterrey', 'Otros'],
            age: [18, 45],
        });

    function transformData(data) {
        // Use .map to transform each item in the data array
        return data.map(transformItem);
    }

    function downloadExcel(data) {
        const transformedData = transformData(data);
        const worksheet = XLSX.utils.json_to_sheet(transformedData);
        const workbook = XLSX.utils.book_new();
        XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
        //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
        //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
        XLSX.writeFile(workbook, "DataSheet.xlsx");
    };

    const updateRadarData = (newData) => {
        setRadarData(newData);
    };

    React.useEffect(() => {
        const init = async () => {
            const fetchedData = await fetchData();
            //const fetchedData = users;
            setFetchedData(fetchedData);
            var filters = {
                sex: ['Masculino', 'Femenino', 'No binarie', 'Prefiero no decir'],
                disciplines: ['Arquitectura, Arte y Diseño', 'Ciencias Sociales', 'Ciencias de la Salud', 'Humanidades y Educación', 'Ingeniería y Ciencias', 'Negocios'],
                countries: ['México'],
                academic_degrees: ['Pregrado', 'Posgrado', 'Educación Continua'],
                institutions: ['Tecnológico de Monterrey', 'Otros'],
                age: [18, 45],
            };
            const filteredData = filterData(filters, fetchedData);
            setFilteredData(filteredData);
            filters['sex'] = ['Masculino']
            const masculineData = calculateAverage(filterData(filters, filteredData), 'final_score');
            filters['sex'] = ['Femenino']
            const femenineData = calculateAverage(filterData(filters, filteredData), 'final_score');
            filters['sex'] = ['No binarie']
            const nonBinaryData = calculateAverage(filterData(filters, filteredData), 'final_score');
            filters['sex'] = ['Prefiero no decir']
            const noSexResponseData = calculateAverage(filterData(filters, filteredData), 'final_score');
            setRadarData({
                labels: [
                    'Innovación social y sostenibilidad financiera',
                    'Conciencia y valor social',
                    'Liderazgo',
                    'Autocontrol',
                    'Pensamiento sistémico',
                    'Pensamiento científico',
                    'Pensamiento crítico',
                    'Pensamiento innovador',
                ],
                datasets: [{
                    label: 'Masculino',
                    data: masculineData,
                    fill: true,
                    backgroundColor: 'rgba(54, 162, 235, 0.2)',
                    borderColor: 'rgb(54, 162, 235)',
                    pointBackgroundColor: 'rgb(54, 162, 235)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(54, 162, 235)'
                }, {
                    label: 'Femenino',
                    data: femenineData,
                    fill: true,
                    backgroundColor: 'rgba(255, 99, 132, 0.2)',
                    borderColor: 'rgb(255, 99, 132)',
                    pointBackgroundColor: 'rgb(255, 99, 132)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 99, 132)'
                }, {
                    label: 'No binarie',
                    data: nonBinaryData,
                    fill: true,
                    backgroundColor: 'rgba(0, 194, 0, 0.2)',
                    borderColor: 'rgb(0, 194, 0)',
                    pointBackgroundColor: 'rgb(0, 194, 0)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(0, 194, 0)'
                }, {
                    label: 'Prefiero no decir',
                    data: noSexResponseData,
                    fill: true,
                    backgroundColor: 'rgba(255, 255, 0, 0.2)',
                    borderColor: 'rgb(255, 255, 0)',
                    pointBackgroundColor: 'rgb(255, 255, 0)',
                    pointBorderColor: '#fff',
                    pointHoverBackgroundColor: '#fff',
                    pointHoverBorderColor: 'rgb(255, 255, 0)'
                }]
            });
        };
        init();
    }, []);

    const [openModal, setOpenModal] = React.useState(false);

    function handleCloseModal() {
        updateRadarData(radarData);
        setOpenModal(false);
    }

    return (
        <div>
            <Sel4cCard flexDirection='column'>
                <Stack maxWidth={1} width='30rem' p={0.5}>
                    <Stack width={1} direction='row' justifyContent='right' borderBottom={2}>
                        <IconButton
                            onClick={() => {
                                downloadExcel(filteredRadarData);
                            }}>
                            <TableChartOutlined color='#1d6f42' />
                        </IconButton>
                        <IconButton onClick={() => setOpenModal(true)}>
                            <FilterList />
                        </IconButton>
                    </Stack>
                    <RadarChart data={radarData} />
                </Stack>
            </Sel4cCard>
            <Modal open={openModal} onClose={handleCloseModal}>
                <Container sx={{
                    bgcolor: 'background.paper',
                    border: '4px solid #000',
                    boxShadow: 24,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <RadarChartFilters
                        fetchedData={fetchedData}
                        updateRadarData={updateRadarData}
                        setFilteredRadarData={setFilteredRadarData}
                        onFiltersChange={setFilteredDataFromModal}
                        currentFilters={filteredDataFromModal} />
                </Container>
            </Modal>
            <Sel4cCard>
                <Box sx={{
                    display: 'flex',
                    flexDirection: 'column',
                    alignItems: 'center',
                    justifyContent: 'center',
                    flexWrap: 'wrap',
                    flexGrow: 1,
                }}>
                    <BarChart />
                    <BarChart />
                </Box>
                <Box className='hide-on-small' sx={{ bgcolor: '#D9D9D9', width: '0.5rem', height: '34rem' }} />
                <BarChartFilters />
            </Sel4cCard>
        </div >
    );
}