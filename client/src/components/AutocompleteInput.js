import React from 'react';
import { Autocomplete } from "@mui/material";

export default function AutocompleteInput({ ...rest }) {
    return (
        <Autocomplete
        {...rest}
        sx={{
            input: {color: '#fff'},
            '& label': {
                color: '#fff',
                '&.Mui-focused':{
                color: '#24fefe',
                }
              },
            '& .MuiButtonBase-root':{
                color: '#000',
                backgroundColor: '#24fefe',
            },
            '& .MuiIconButton-root':{
                backgroundColor: 'transparent',
            },
            '& .MuiSvgIcon-root':{
                color: '#24fefe',
            },
            
            '& .MuiOutlinedInput-root': {
                borderRadius: 4,
                backgroundColor: 'gray.main',
                '& fieldset': {
                    borderColor: '#24fefe',
                    backgroundColor: 'Gray.main',
                },
                '&:hover fieldset': {
                    borderColor: '#24fefe',
                    backgroundColor: 'Gray.main',
                },
                '&.Mui-focused fieldset': {
                    borderColor: '#24fefe',
                    backgroundColor: 'Gray.main',
                }
            },
        }}
        />
    );
}