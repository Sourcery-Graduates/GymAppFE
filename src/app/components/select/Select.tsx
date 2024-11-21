import * as React from 'react';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import FormControl from '@mui/material/FormControl';
import NativeSelect from '@mui/material/NativeSelect';
import { SelectChangeEvent, SxProps, Theme } from '@mui/material';
import { v4 as uuid } from 'uuid';
import { useMemo } from 'react';
import './Select.scss';

interface SelectProps {
  sx?: SxProps<Theme>;
  style?: React.CSSProperties;
  label?: string;
  values: string[];
  optionValue: string;
  setOptionValue: React.Dispatch<React.SetStateAction<string>>;
}

const Select = ({ style, sx, label, values, optionValue, setOptionValue }: SelectProps) => {
  const labelUuid: string = useMemo(() => {
    return uuid();
  }, []);

  const handleSelectChange = (event: SelectChangeEvent) => {
    setOptionValue(event.target.value);
  };

  return (
    <Box style={style} sx={{ ...sx, minWidth: 120 }}>
      <FormControl>
        {label && (
          <InputLabel variant='standard' htmlFor={`select-label-${labelUuid}`}>
            {label}
          </InputLabel>
        )}
        <NativeSelect
          value={optionValue}
          onChange={handleSelectChange}
          inputProps={{
            name: 'select',
            id: `select-label-${labelUuid}`,
          }}
          className='app-select'
        >
          {values.map((value) => (
            <option className='app-select-option' key={value} value={value}>
              {value}
            </option>
          ))}
        </NativeSelect>
      </FormControl>
    </Box>
  );
};

export default Select;
