import React from "react";
import { Box } from "@mui/system";
import { styled } from '@mui/material/styles';
import { MenuProps, disciplines, sexs, countries, academic_degrees, institutions } from "../utils/chartUtils";
import ListItemIcon from "@mui/material/ListItemIcon";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';
import Typography from '@mui/material/Typography';
import Slider from '@mui/material/Slider';
import MuiInput from '@mui/material/Input';
import Grid from '@mui/material/Grid';
import Button from '@mui/material/Button';

const Input = styled(MuiInput)`
width: 42px;
`;

export function BarChartFilters() {

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


    const [selectedInstitutions, setSelectedInstitutions] = React.useState([
        'Tecnológico de Monterrey',
        'Otros'
    ]);
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
            padding: '1rem',
        }}>
            <Typography variant='h6' sx={{ marginBottom: '1rem', color: 'gray' }}>Filtrar datos:</Typography>


            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="sex-multiple-checkbox-label">Sexo</InputLabel>
                <Select
                    labelId="sex-multiple-checkbox-label"
                    id="sex-multiple-checkbox"
                    multiple
                    value={selectedSexs}
                    onChange={handleSexChange}
                    input={<OutlinedInput label="Sexo" />}
                    renderValue={(selected) => selected.join(', ')}
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
                <InputLabel id="discipline-multiple-checkbox-label">Disciplina</InputLabel>
                <Select
                    labelId="discipline-multiple-checkbox-label"
                    id="discipline-multiple-checkbox"
                    multiple
                    value={selectedDisciplines}
                    onChange={handleChangeDisciplines}
                    input={<OutlinedInput label="Disciplina" />}
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
                <InputLabel id="country-multiple-checkbox-label">País</InputLabel>
                <Select
                    labelId="country-multiple-checkbox-label"
                    id="country-multiple-checkbox"
                    multiple
                    value={selectedCountries}
                    onChange={handleChangeCountry}
                    input={<OutlinedInput label="País" />}
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
                <InputLabel id="academic-degree-multiple-checkbox-label">Grado Académico</InputLabel>
                <Select
                    labelId="academic-degree-multiple-checkbox-label"
                    id="academic-degree-multiple-checkbox"
                    multiple
                    value={selectedAcademicDegrees}
                    onChange={handleChangeAcademicDegrees}
                    input={<OutlinedInput label="Grado Académico" />}
                    renderValue={(selected) => selected.join(', ')}
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
                    {academic_degrees.map((academic_degree) => (
                        <MenuItem key={academic_degree} value={academic_degree}>
                            <ListItemIcon>
                                <Checkbox checked={selectedAcademicDegrees.indexOf(academic_degree) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={academic_degree} />
                        </MenuItem>
                    ))}
                </Select>
            </FormControl>


            <FormControl sx={{ m: 1, width: 200 }}>
                <InputLabel id="institution-multiple-checkbox-label">Institución</InputLabel>
                <Select
                    labelId="institution-multiple-checkbox-label"
                    id="institution-multiple-checkbox"
                    multiple
                    value={selectedInstitutions}
                    onChange={handleChangeInstitutions}
                    input={<OutlinedInput label="Institución" />}
                    renderValue={(selected) => selected.join(', ')}
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
                    {institutions.map((institution) => (
                        <MenuItem key={institution} value={institution}>
                            <ListItemIcon>
                                <Checkbox checked={selectedInstitutions.indexOf(institution) > -1} />
                            </ListItemIcon>
                            <ListItemText primary={institution} />
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


            <Button variant="contained" sx={{ marginTop: '1rem' }}>Aplicar filtros</Button>


            {/*
            <Typography variant='h6' sx={{ marginBottom: '1rem', color: 'gray' }}>Filtros seleccionados:</Typography>
            <Typography variant='body1' sx={{ marginBottom: '1rem', color: 'gray' }}>Sexo: {selectedSexs.join(', ')}</Typography>
            <Typography variant='body1' sx={{ marginBottom: '1rem', color: 'gray' }}>Disciplinas: {selectedDisciplines.join(', ')}</Typography>
            <Typography variant='body1' sx={{ marginBottom: '1rem', color: 'gray' }}>País: {selectedCountries.join(', ')}</Typography>
            <Typography variant='body1' sx={{ marginBottom: '1rem', color: 'gray' }}>Edad: {selectedAge[0]} a {selectedAge[1]} años</Typography>
            <Typography variant='body1' sx={{ marginBottom: '1rem', color: 'gray' }}>Test: {initialOrFinal ? 'Posttest' : 'Pretest'}</Typography>
            */}
        </Box>
    );
}