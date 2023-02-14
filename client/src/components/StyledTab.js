import * as React from 'react';
import { styled } from '@mui/material/styles';
import Tab from '@mui/material/Tab';


export default function StyledTabs({ ...rest }) {
    return (
        <Tab
        disableRipple
        {...rest}
        sx={{
            marginRight: 0,
            minWidth: 0,
            textTransform: 'none',
            color: 'rgba(255, 255, 255, 0.7)',
            // paddingLeft:0,
            // paddingRight:0,
            // marginRight:'8px', 
            // marginLeft:'8px', 
            '&.Mui-selected': {
                color: 'secondary.main',
            }
        }}
        />
    );
}