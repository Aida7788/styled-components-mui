import { Switch, SwitchProps, styled } from "@mui/material";

interface StyledSwitchProps extends SwitchProps {
    checkedcolor?: string;
}

export const CustomSwitch = styled(Switch)<StyledSwitchProps> (({ checkedcolor='#177ddc', theme })=> ({
    width: 36,
    height: 20,
    padding: 0,
    display: 'flex',
    '&:active': {
      '& .MuiSwitch-thumb': {
        width: 16,
      },
      '& .MuiSwitch-switchBase.Mui-checked': {
        transform: 'translateX(8px)',
      },
    },
    '& .MuiSwitch-switchBase': {
      padding: 2,
      color:"#FFFFFF",
      '&.Mui-checked': {
        transform: 'translateX(16px)',
        color: '#fff',
        '& + .MuiSwitch-track': {
          opacity: 1,
          backgroundColor: checkedcolor,
        },
      },
    },
    '& .MuiSwitch-thumb': {
      boxShadow: '0 2px 4px 0 rgb(0 35 11 / 20%)',
      width: 16,
      height: 16,
      borderRadius: 8,
      transition: theme.transitions.create(['width'], {
        duration: 200,
      }),
    },
    '& .MuiSwitch-track': {
      borderRadius: 16,
      opacity: 1,
      backgroundColor:'#EAECF0',
      boxSizing: 'border-box',
    },
  }));