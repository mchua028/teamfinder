import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Box from '@mui/material/Box';


export default function StyledTabs({ ...rest }) {
    return (
        <Tabs
        {...rest}
        sx={{
            '& .MuiTabs-indicator': {
                backgroundColor: '#24fefe',
              },
        }}
        />
    );
}



