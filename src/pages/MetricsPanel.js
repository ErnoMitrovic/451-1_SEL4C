import './MetricsPanel.sass';
import React from 'react';
import { Sel4cCard } from '../components/Sel4cCard';
import { RadarChart } from '../components/Charts/RadarChart';
import { BarChart } from '../components/Charts/BarChart';
import { RadarChartFilters } from '../components/Filters/RadarChartFilters';
import { BarChartFilters } from '../components/Filters/BarChartFilters';
import { fetchData, filterData, calculateAverage, initialBlankRadarData, initialBlankBarData, softColors, colors, downloadExcel } from '../components/utils/chartUtils';
import { FilterList, TableChartOutlined } from '@mui/icons-material';
import { Stack, Modal, Container, IconButton } from '@mui/material';
import ErrorModal from '../components/ErrorModal';

export default function MetricsPanel() {

    // Fetch the data from the API; store full data in fetchedData and filtered data in filteredData
    const [fetchedData, setFetchedData] = React.useState({});
    // filteredData is the filtered data from any modal interaction that will be displayed in the charts stored in JSON.
    const [filteredData, setFilteredData] = React.useState({});

    // Update the radar chart data. 
    // radarData is the data formatted for the chart.js.
    const [radarData, setRadarData] = React.useState(initialBlankRadarData);
    const [filteredRadarData, setFilteredRadarData] = React.useState(filteredData);

    // Update the bar chart data.
    // barData is the data formatted for the chart.js.
    const [barData, setBarData] = React.useState(initialBlankBarData);
    const [filteredBarData, setFilteredBarData] = React.useState(filteredData);

    // Error handling
    const [openError, setOpenError] = React.useState(false);
    const handleCloseError = () => setOpenError(false);
    const [errorMessage, setErrorMessage] = React.useState('');

    // Selected filters - initial filters are set for the first time the page is loaded
    const [filteredDataFromModal, setFilteredDataFromModal] = React.useState(
        {
            sex: ['Masculino', 'Femenino', 'No binarie', 'Prefiero no decir'],
            disciplines: ['Arquitectura, Arte y Diseño', 'Ciencias Sociales', 'Ciencias de la Salud', 'Humanidades y Educación', 'Ingeniería y Ciencias', 'Negocios'],
            countries: ['México'],
            academic_degrees: ['Pregrado', 'Posgrado', 'Educación Continua'],
            institutions: ['Tecnológico de Monterrey', 'Otros'],
            age: [18, 45],
        });
    const [filteredBarDataFromModal, setFilteredBarDataFromModal] = React.useState(filteredDataFromModal);

    React.useEffect(() => {
        const init = async () => {
            try {
                // Fetch the data from the API and set the full raw gathered data and the on-load filtered data
                const fetchedData = await fetchData();
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
                setFilteredRadarData(filteredData);
                setFilteredBarData(filteredData);

                // Filter and set the bar chart data
                const initialScores = calculateAverage(filteredData, 'initial_score');
                const finalScores = calculateAverage(filteredData, 'final_score');
                setBarData({
                    labels: [
                        ['Innovación', 'social y', 'sostenibilidad', 'financiera'],
                        ['Conciencia', 'y valor', 'social'],
                        'Liderazgo',
                        'Autocontrol',
                        ['Pensamiento', 'sistémico'],
                        ['Pensamiento', 'científico'],
                        ['Pensamiento', 'crítico'],
                        ['Pensamiento', 'innovador'],
                    ],
                    datasets: [{
                        label: 'Formulario Inicial',
                        data: initialScores,
                        backgroundColor: softColors,
                    }, {
                        label: 'Formulario Final',
                        data: finalScores,
                        backgroundColor: colors,
                    }]
                });

                // Filter and set the radar chart data
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
            } catch (error) {
                setErrorMessage('Error al cargar los datos');
                setOpenError(true);
            }
        };
        init();
    }, []);

    // Filters modals
    const [openModal, setOpenModal] = React.useState(false);
    const [openBarModal, setOpenBarModal] = React.useState(false);

    function handleCloseModal() {
        setRadarData(radarData);
        setOpenModal(false);
    }
    function handleCloseBarModal() {
        setBarData(barData);
        setOpenBarModal(false);
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
                        updateRadarData={setRadarData}
                        setFilteredData={setFilteredRadarData}
                        onFiltersChange={setFilteredDataFromModal}
                        currentFilters={filteredDataFromModal} />
                </Container>
            </Modal>
            <Sel4cCard>
                <Stack maxWidth={1} width='100%'>
                    <Stack width={1} direction='row' justifyContent='right' borderBottom={2}>
                        <IconButton
                            onClick={() => {
                                downloadExcel(filteredBarData);
                            }}>
                            <TableChartOutlined color='#1d6f42' />
                        </IconButton>
                        <IconButton onClick={() => setOpenBarModal(true)}>
                            <FilterList />
                        </IconButton>
                    </Stack>
                    <BarChart data={barData} />
                </Stack>
            </Sel4cCard>
            <Modal open={openBarModal} onClose={handleCloseBarModal}>
                <Container sx={{
                    bgcolor: 'background.paper',
                    border: '4px solid #000',
                    boxShadow: 24,
                    p: 2,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                }}>
                    <BarChartFilters
                        fetchedData={fetchedData}
                        updateBarData={setBarData}
                        setFilteredData={setFilteredBarData}
                        onFiltersChange={setFilteredBarDataFromModal}
                        currentFilters={filteredBarDataFromModal} />
                </Container>
            </Modal>
            <ErrorModal openError={openError} handleCloseError={handleCloseError} errorMessage={errorMessage} />
        </div >
    );
}