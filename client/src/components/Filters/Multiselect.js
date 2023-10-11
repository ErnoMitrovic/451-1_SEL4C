import React from "react"
import { FormControl, InputLabel, Select, MenuItem, ListItemIcon, Checkbox, ListItemText, OutlinedInput } from '@mui/material';
import { MenuProps } from '../utils/chartUtils';

export default function Multiselect({ identifier, selectedData, isAllSelected, handleChange, options }) {
    return (
        <FormControl sx={{ m: 1, width: 200 }}>
            <InputLabel id={`${identifier}-multiple-checkbox-label`}>{identifier}</InputLabel>
            <Select
                labelId={`${identifier}-multiple-checkbox-label`}
                id={`${identifier}-multiple-checkbox`}
                multiple
                value={selectedData}
                onChange={handleChange}
                input={<OutlinedInput label={identifier} />}
                renderValue={(selected) => selected.join(', ')}
                MenuProps={MenuProps}
            >
                <MenuItem
                    value="all"
                >
                    <ListItemIcon>
                        <Checkbox
                            checked={isAllSelected}
                            indeterminate={
                                selectedData.length > 0 && selectedData.length < options.length
                            }
                        />
                    </ListItemIcon>
                    <ListItemText
                        primary="Todos"
                    />
                </MenuItem>
                {options.map((option) => (
                    <MenuItem key={option} value={option}>
                        <ListItemIcon>
                            <Checkbox checked={selectedData.indexOf(option) > -1} />
                        </ListItemIcon>
                        <ListItemText primary={option} />
                    </MenuItem>
                ))}
            </Select>
        </FormControl>
    );
}
