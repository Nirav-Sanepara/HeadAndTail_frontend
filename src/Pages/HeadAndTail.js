import React, { useState } from 'react';
import InputLabel from '@mui/material/InputLabel';
import MenuItem from '@mui/material/MenuItem';
import FormControl from '@mui/material/FormControl';
import Select from '@mui/material/Select';
import Button from '@mui/material/Button';
import Typography from '@mui/material/Typography';

const HeadAndTail = () => {
  const [selectedValue, setSelectedValue] = useState('');
  const [columns, setColumns] = useState([]);

  const handleSelectChange = (event) => {
    setSelectedValue(event.target.value);
  };

  const handleButtonClick = () => {
    if (selectedValue === 'H' || selectedValue === 'T') {
      let updatedColumns = [...columns];

      // Check if existing columns avilable and the last ch matches to the selected value
      if (updatedColumns.length > 0 && updatedColumns[updatedColumns.length - 1].type === selectedValue) {
        updatedColumns[updatedColumns.length - 1].characters.push(selectedValue);
      } else {
        // new column
        updatedColumns.push({ type: selectedValue, characters: [selectedValue] });
      }

      setColumns(updatedColumns);
      setSelectedValue("")
    }
  };
  
  return (
    <>
    <br />
    <br />
      <Typography variant="h4" sx={{ my: 3 }}>
        Head & Tail
      </Typography>

      <FormControl sx={{ width: 100 }}>
        <InputLabel id="demo-simple-select-label">Select</InputLabel>
        <Select
          labelId="demo-simple-select-label"
          id="demo-simple-select"
          value={selectedValue}
          label="Select"
          onChange={handleSelectChange}
        >
          <MenuItem value="H">H</MenuItem>
          <MenuItem value="T">T</MenuItem>
        </Select>
      </FormControl>

      <Button
        sx={{ ml: 4, mt: 1 }}
        size="small"
        type="submit"
        variant="contained"
        onClick={handleButtonClick}
      >
        Submit
      </Button>

      <div style={{ display: 'flex' }}>
        {columns.map((column, index) => (
          <div key={index} style={{ marginLeft: index > 0 ? '10px' : '0' }}>
            {column.characters.map((char, charIndex) => (
              <div key={charIndex}>{char}</div>
            ))}
          </div>
        ))}
      </div>
    </>
  );
};

export default HeadAndTail;
