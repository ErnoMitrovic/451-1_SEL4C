// React components.
import React from "react";
import { styled } from '@mui/material/styles';
import { Box, ListItemIcon, OutlinedInput, InputLabel, MenuItem, FormControl, ListItemText, Select, Checkbox, Typography, Slider, Grid, Switch, FormControlLabel, FormGroup, Button } from "@mui/material";
import MuiInput from '@mui/material/Input';

// SEL4C custom data and functions.
// Data.
import { MenuProps, disciplines, sexs, academic_degrees, institutions, countries } from "./utils/chartUtils";
// Functions.
import { filterData, calculateAverage } from "./utils/chartUtils";

// Export data to Excel.
import * as XLSX from "xlsx";

function transformItem(item) {
    // Flatten the 'initial' and 'final' objects
    const transformedItem =  {
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
    for (const key in item.initial) {
        if (item.initial.hasOwnProperty(key)) {
            transformedItem[`initial_${key}`] = item.initial[key];
        }
    }

    // Append `final_` to the keys of the final object
    for (const key in item.final) {
        if (item.initial.hasOwnProperty(key)) {
            transformedItem[`final_${key}`] = item.final[key];
        }
    }

    return {
        ...transformedItem,
    };
}

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


const Input = styled(MuiInput)`
width: 42px;
`;


export function RadarChartFilters({ fetchedData, updateRadarData, filteredData }) {

    const [selectedSexs, setSelectedSexs] = React.useState([
        'Masculino',
        'Femenino',
        'No binarie',
        'Prefiero no decir'
    ]);
    const isAllSelectedSexs = sexs.length > 0 && selectedSexs.length === sexs.length;
    const handleSexChange = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setSelectedSexs(selectedSexs.length === sexs.length ? [] : sexs);
            return;
        }
        setSelectedSexs(value);
    };


    const [selectedDisciplines, setSelectedDisciplines] = React.useState([
        'Arquitectura, Arte y Diseño',
        'Ciencias Sociales',
        'Ciencias de la Salud',
        'Humanidades y Educación',
        'Ingeniería y Ciencias',
        'Negocios'
    ]);
    const isAllSelectedDisciplines = disciplines.length > 0 && selectedDisciplines.length === disciplines.length;
    const handleChangeDisciplines = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setSelectedDisciplines(selectedDisciplines.length === disciplines.length ? [] : disciplines);
            return;
        }
        setSelectedDisciplines(value);
    };


    const [selectedCountries, setSelectedCountries] = React.useState(['México']);
    const isAllSelectedCountries = countries.length > 0 && selectedCountries.length === countries.length;
    const handleChangeCountry = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setSelectedCountries(selectedCountries.length === countries.length ? [] : countries);
            return;
        }
        setSelectedCountries(value);
    };


    const [selectedAcademicDegrees, setSelectedAcademicDegrees] = React.useState([
        'Pregrado',
        'Posgrado',
        'Educación Continua'
    ]);
    const isAllSelectedAcademicDegrees = academic_degrees.length > 0 && selectedAcademicDegrees.length === academic_degrees.length;
    const handleChangeAcademicDegrees = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setSelectedAcademicDegrees(selectedAcademicDegrees.length === academic_degrees.length ? [] : academic_degrees);
            return;
        }
        setSelectedAcademicDegrees(value);
    };


    const [selectedInstitutions, setSelectedInstitutions] = React.useState(['Tecnológico de Monterrey', 'Otros']);
    const isAllSelectedInstitutions = institutions.length > 0 && selectedInstitutions.length === institutions.length;
    const handleChangeInstitutions = (event) => {
        const value = event.target.value;
        if (value[value.length - 1] === "all") {
            setSelectedInstitutions(selectedInstitutions.length === institutions.length ? [] : institutions);
            return;
        }
        setSelectedInstitutions(value);
    };


    const [selectedAge, setSelectedAge] = React.useState([18, 45]);
    const handleAgeChange = (event, newValue) => {
        setSelectedAge(newValue);
    };
    const handleMinAgeInputChange = (event) => {
        const newMinAge = event.target.value === '' ? 0 : Number(event.target.value);
        const newMaxAge = selectedAge[1];
        if (newMinAge <= newMaxAge) {
            setSelectedAge([newMinAge, newMaxAge]);
        } else {
            // Min age cannot be greater than max age, so keep the previous values.
            setSelectedAge([selectedAge[0], selectedAge[1]]);
        }
    };
    const handleMaxAgeInputChange = (event) => {
        const newMaxAge = event.target.value === '' ? 100 : Number(event.target.value);
        const newMinAge = selectedAge[0];
        if (newMaxAge >= newMinAge) {
            setSelectedAge([newMinAge, newMaxAge]);
        } else {
            // Max age cannot be less than min age, so keep the previous values.
            setSelectedAge([selectedAge[0], selectedAge[1]]);
        }
    };
    const handleMinAgeBlur = () => {
        if (selectedAge[0] < 0) {
            setSelectedAge([0, selectedAge[1]]);
        }
    };
    const handleMaxAgeBlur = () => {
        if (selectedAge[1] > 100) {
            setSelectedAge([selectedAge[0], 100]);
        }
    };


    // Swtich to chose if the chart displays the initial or final average scores.
    const [initialOrFinal, setInitialOrFinal] = React.useState(true);
    const handleTestChange = (event) => {
        setInitialOrFinal(event.target.checked);
    };


    // Update the radar chart data. 
    // filteredRadarData is the data that will be displayed in the chart stored in JSON.
    const [filteredRadarData, setFilteredRadarData] = React.useState(filteredData);
    const handleUpdateRadarData = () => {

        if (selectedSexs.length === 0) {
            alert('Selecciona al menos un sexo');
            return;
        } else if (selectedDisciplines.length === 0) {
            alert('Selecciona al menos una disciplina');
            return;
        } else if (selectedCountries.length === 0) {
            alert('Selecciona al menos un país');
            return;
        } else if (selectedAcademicDegrees.length === 0) {
            alert('Selecciona al menos un grado de estudios');
            return;
        } else if (selectedInstitutions.length === 0) {
            alert('Selecciona al menos una institución');
            return;
        }

        const filters = {
            sex: selectedSexs,
            disciplines: selectedDisciplines,
            countries: selectedCountries,
            academic_degrees: selectedAcademicDegrees,
            institutions: selectedInstitutions,
            age: selectedAge,
        };
        const initialOrFinalString = initialOrFinal ? 'final' : 'initial';

        const jsonData = filterData(filters, fetchedData);

        var masculineData = [];
        var femenineData = [];
        var nonBinaryData = [];
        var noSexResponseData = [];

        if (selectedSexs.includes('Masculino')) {
            filters['sex'] = ['Masculino']
            masculineData = calculateAverage(filterData(filters, jsonData), initialOrFinalString);
        }
        if (selectedSexs.includes('Femenino')) {
            filters['sex'] = ['Femenino']
            femenineData = calculateAverage(filterData(filters, jsonData), initialOrFinalString);
        }
        if (selectedSexs.includes('No binarie')) {
            filters['sex'] = ['No binarie']
            nonBinaryData = calculateAverage(filterData(filters, jsonData), initialOrFinalString);
        }
        if (selectedSexs.includes('Prefiero no decir')) {
            filters['sex'] = ['Prefiero no decir']
            noSexResponseData = calculateAverage(filterData(filters, jsonData), initialOrFinalString);
        }

        var newData = {
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
        }
        setFilteredRadarData(jsonData);
        updateRadarData(newData);
    };


    return (
        <Box sx={{
            className: 'reset-margins',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            marginLeft: '2rem',
            width: '30rem',
            maxWidth: '100%',
            padding: '2rem',
        }}>
            <Typography variant='h6' sx={{ marginBottom: '1rem', color: 'gray' }}>Filtrar datos:</Typography>


            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="sex-multiple-checkbox-label">Sexos</InputLabel>
                <Select
                    labelId="sex-multiple-checkbox-label"
                    id="sex-multiple-checkbox"
                    multiple
                    value={selectedSexs}
                    onChange={handleSexChange}
                    input={<OutlinedInput label="Sexos" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    <MenuItem
                        value="all"
                    >
                        <ListItemIcon>
                            <Checkbox
                                checked={isAllSelectedSexs}
                                indeterminate={
                                    selectedSexs.length > 0 && selectedSexs.length < sexs.length
                                }
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Todos"
                        />
                    </MenuItem>
                    {sexs.map((option) => (
                        <MenuItem key={option} value={option}>
                            <ListItemIcon>
                                <Checkbox checked={selectedSexs.indexOf(option) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="discipline-multiple-checkbox-label">Disciplinas</InputLabel>
                <Select
                    labelId="discipline-multiple-checkbox-label"
                    id="discipline-multiple-checkbox"
                    multiple
                    value={selectedDisciplines}
                    onChange={handleChangeDisciplines}
                    input={<OutlinedInput label="Disciplinas" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    <MenuItem
                        value="all"
                    >
                        <ListItemIcon>
                            <Checkbox
                                checked={isAllSelectedDisciplines}
                                indeterminate={
                                    selectedDisciplines.length > 0 && selectedDisciplines.length < disciplines.length
                                }
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Todos"
                        />
                    </MenuItem>
                    {disciplines.map((option) => (
                        <MenuItem key={option} value={option}>
                            <ListItemIcon>
                                <Checkbox checked={selectedDisciplines.indexOf(option) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="country-multiple-checkbox-label">Países</InputLabel>
                <Select
                    labelId="country-multiple-checkbox-label"
                    id="country-multiple-checkbox"
                    multiple
                    value={selectedCountries}
                    onChange={handleChangeCountry}
                    input={<OutlinedInput label="Países" />}
                    renderValue={(selected) => selected.join(', ')}
                    MenuProps={MenuProps}
                >
                    <MenuItem
                        value="all"
                    >
                        <ListItemIcon>
                            <Checkbox
                                checked={isAllSelectedCountries}
                                indeterminate={
                                    selectedCountries.length > 0 && selectedCountries.length < countries.length
                                }
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Todos"
                        />
                    </MenuItem>
                    {countries.map((country) => (
                        <MenuItem key={country} value={country}>
                            <ListItemIcon>
                                <Checkbox checked={selectedCountries.indexOf(country) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={country} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="academic-degree-multiple-checkbox-label">Estudios</InputLabel>
                <Select
                    labelId="academic-degree-multiple-checkbox-label"
                    id="academic-degree-multiple-checkbox"
                    multiple
                    value={selectedAcademicDegrees}
                    onChange={handleChangeAcademicDegrees}
                    input={<OutlinedInput label="Estudios" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    <MenuItem
                        value="all"
                    >
                        <ListItemIcon>
                            <Checkbox
                                checked={isAllSelectedAcademicDegrees}
                                indeterminate={
                                    selectedAcademicDegrees.length > 0 && selectedAcademicDegrees.length < academic_degrees.length
                                }
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Todos"
                        />
                    </MenuItem>
                    {academic_degrees.map((option) => (
                        <MenuItem key={option} value={option}>
                            <ListItemIcon>
                                <Checkbox checked={selectedAcademicDegrees.indexOf(option) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="institution-checkbox-label">Instituciones</InputLabel>
                <Select
                    labelId="institution-multiple-checkbox-label"
                    id="institution-multiple-checkbox"
                    multiple
                    value={selectedInstitutions}
                    onChange={handleChangeInstitutions}
                    input={<OutlinedInput label="Instituciones" />}
                    renderValue={(selected) => selected.join(", ")}
                    MenuProps={MenuProps}
                >
                    <MenuItem
                        value="all"
                    >
                        <ListItemIcon>
                            <Checkbox
                                checked={isAllSelectedInstitutions}
                                indeterminate={
                                    selectedInstitutions.length > 0 && selectedInstitutions.length < institutions.length
                                }
                            />
                        </ListItemIcon>
                        <ListItemText
                            primary="Todos"
                        />
                    </MenuItem>
                    {institutions.map((option) => (
                        <MenuItem key={option} value={option}>
                            <ListItemIcon>
                                <Checkbox checked={selectedInstitutions.indexOf(option) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={option} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            <Box sx={{
                width: 250,
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                justifyContent: 'center',
                flexWrap: 'wrap',
                margin: '2rem 0',
            }}>
                <Typography variant='body1' sx={{ marginBottom: '1rem', color: 'gray' }}>Edad en años:</Typography>
                <Grid container spacing={2} alignItems='center'>
                    <Grid item xs={12} sm={5}>
                        <Slider
                            getAriaLabel={() => 'Rango de Edad'}
                            value={selectedAge}
                            onChange={handleAgeChange}
                            valueLabelDisplay="auto"
                            min={18}
                            max={100}
                        />
                    </Grid>
                    <Grid item xs={4} sm={2}>
                        <Input
                            value={selectedAge[0]}
                            size="small"
                            onChange={handleMinAgeInputChange}
                            onBlur={handleMinAgeBlur}
                            inputProps={{
                                step: 10,
                                min: 0,
                                max: selectedAge[1],
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                    <Grid item xs={4} sm={2}>
                        <Typography variant='body1' sx={{ color: 'gray' }}>a</Typography>
                    </Grid>
                    <Grid item xs={4} sm={2}>
                        <Input
                            value={selectedAge[1]}
                            size="small"
                            onChange={handleMaxAgeInputChange}
                            onBlur={handleMaxAgeBlur}
                            inputProps={{
                                step: 10,
                                min: selectedAge[0],
                                max: 100,
                                type: 'number',
                                'aria-labelledby': 'input-slider',
                            }}
                        />
                    </Grid>
                </Grid>
            </Box>


            <FormGroup>
                <FormControlLabel
                    control={
                        <Switch
                            checked={initialOrFinal}
                            onChange={handleTestChange}
                            aria-label="login switch"
                        />
                    }
                    label={initialOrFinal ? 'Posttest' : 'Pretest'}
                />
            </FormGroup>


            <Button variant="contained" sx={{ marginTop: '1rem' }}
                onClick={() => {
                    handleUpdateRadarData();
                }}>
                Aplicar filtros
            </Button>
            <Button variant="contained" sx={{ marginTop: '1rem' }}
                onClick={() => {
                    downloadExcel(filteredRadarData);
                }}>
                Descargar Excel
            </Button>
        </Box>
    );
}