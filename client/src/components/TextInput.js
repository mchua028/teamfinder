import React from 'react';
import { TextField } from "@mui/material";

export default function TextInput({ ...rest }) {
    return (
        <TextField
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
                },
            },
        }}
        />
    );
}