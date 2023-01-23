import React from 'react';
import { Select } from "@mui/material";

import MenuItem from '@mui/material/MenuItem';

export default function SelectInput({ ...rest }) {
    return (
        <Select
        {...rest}
            sx={{
                input: {color: '#fff'},
                '& label': {
                    color: '#fff',
                    '&.Mui-focused':{
                    color: '#24fefe',
                    }
                },
                '& .MuiOutlinedInput-root': {
                    borderRadius: 4,
                    backgroundColor: 'gray.main',
                    '& fieldset': {
                        borderColor: 'secondary.main',
                        backgroundColor: 'Gray.main',
                    },
                    '&:hover fieldset': {
                        borderColor: '#secondary.main',
                        backgroundColor: 'Gray.main',
                    },
                    '&.Mui-focused fieldset': {
                        borderColor: 'secondary.main',
                        backgroundColor: 'Gray.main',
                    },
                },
            }}
        >
            <MenuItem value={0}>Male</MenuItem>
            <MenuItem value={1}>Female</MenuItem>
            <MenuItem value={30}>Thirty</MenuItem>
            
        </Select>
    )}