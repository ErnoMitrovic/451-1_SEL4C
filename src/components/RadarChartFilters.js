import React from "react";
import { Box } from "@mui/system";
import OutlinedInput from '@mui/material/OutlinedInput';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import ListItemText from '@mui/material/ListItemText';
import Select from '@mui/material/Select';
import Checkbox from '@mui/material/Checkbox';

const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250,
        },
    },
};

const sexs = [
    'Masculino',
    'Femenino',
    'No binarie'
];

export function RadarChartFilters() {
    const [selectedSex, setSelectedSex] = React.useState([]);

    const handleChange = (event) => {
        const {
            target: { value },
        } = event;
        setSelectedSex(
            // On autofill we get a stringified value.
            typeof value === 'string' ? value.split(',') : value,
        );
    };

    return (
        <Box sx={{
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            justifyContent: 'center',
            flexWrap: 'wrap',
            margin: '2rem 0',
            width: '30rem',
            maxWidth: '100%',
        }}>
            <div className="filters">
                <FormControl sx={{ m: 1, width: 100 }}>
                    <InputLabel id="demo-multiple-checkbox-label">Sexo</InputLabel>
                    <Select
                        labelId="demo-multiple-checkbox-label"
                        id="demo-multiple-checkbox"
                        multiple
                        value={selectedSex}
                        onChange={handleChange}
                        input={<OutlinedInput label="Sexo" />}
                        renderValue={(selected) => selected.join(', ')}
                        MenuProps={MenuProps}
                    >
                        {sexs.map((sex) => (
                            <MenuItem key={sex} value={sex}>
                                <Checkbox checked={selectedSex.indexOf(sex) > -1} />
                                <ListItemText primary={sex} />
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>
            </div>
        </Box>
    );
}