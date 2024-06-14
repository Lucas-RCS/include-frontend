import React, { useState } from 'react';
import { styled } from '@mui/material/styles';
import Switch, { SwitchProps } from '@mui/material/Switch';

const IOSSwitch = styled((props: SwitchProps) => (
  <Switch focusVisibleClassName=".Mui-focusVisible" disableRipple {...props} />
))(({ theme }) => ({
  width: 32,
  height: 21,
  padding: 0,
  '& .MuiSwitch-switchBase': {
    padding: 0,
    margin: 2,
    color: 'var(--primary)',
    transitionDuration: '300ms',
    transitionTimingFunction: 'ease-in-out',
    '&.Mui-checked': {
      transform: 'translateX(12px)',
      color: 'var(--secondary)',
      '& + .MuiSwitch-track': {
        backgroundColor:
          theme.palette.mode === 'dark'
            ? 'var(--components)'
            : 'var(--components)',
        opacity: 1,
        border: '2px solid var(--secondary)',
      },
      '&.Mui-disabled + .MuiSwitch-track': {
        opacity: 0.5,
      },
    },
    '&.Mui-focusVisible .MuiSwitch-thumb': {
      color: 'var(--primary)',
      border: '2px solid var(--primary)',
    },
    '&.Mui-disabled .MuiSwitch-thumb': {
      color:
        theme.palette.mode === 'light'
          ? theme.palette.grey[100]
          : theme.palette.grey[600],
    },
    '&.Mui-disabled + .MuiSwitch-track': {
      opacity: theme.palette.mode === 'light' ? 0.7 : 0.3,
    },
  },
  '& .MuiSwitch-thumb': {
    boxSizing: 'border-box',
    width: 16,
    height: 16,
  },
  '& .MuiSwitch-track': {
    borderRadius: 26 / 2,
    border: '2px solid var(--primary)',
    backgroundColor:
      theme.palette.mode === 'light'
        ? 'var(--components)'
        : 'var(--components)',
    opacity: 1,
    transition: theme.transitions.create(['background-color'], {
      duration: 500,
    }),
  },
}));

interface SwitchLoginProps {
  onChange: (checked: boolean) => void;
  txtActive?: string;
  txtInactive?: string;
}

export default function SwitchDefault({ onChange, txtActive, txtInactive }: SwitchLoginProps) {
  const [checked, setChecked] = useState(false);

  const handleSwitchChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const isChecked = event.target.checked;
    setChecked(isChecked);
    onChange(isChecked);
   };

  const style = {
    container: {
      color: 'var(--text-l)',
      fontSize: 'var(--fnt-sz-md)',
      fontWeight: 'var(--fnt-wg-lg)',
      display: 'flex',
      alignItems: 'center',
      gap: 'var(--gap-sm)',
    },
  };

  return (
    <div style={style.container}>
      <IOSSwitch
        sx={{ m: 1 }}
        checked={checked}
        onChange={handleSwitchChange}
      />
      <span>{checked ? txtActive : txtInactive}</span>
    </div>
  );
}
