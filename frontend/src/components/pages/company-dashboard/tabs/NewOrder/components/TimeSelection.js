//React
import React, {useState, useEffect} from 'react';

// MUI components
import {
  Box,
  Typography,
  FormControl,
  Select,
  MenuItem,
  InputLabel
} from '@mui/material';

// TODO: move to utils
function parseTimeString(inputTime) {
  if (typeof inputTime !== 'string') {
    return "Invalid input";
  }

  const dateObj = new Date(inputTime);
  if (isNaN(dateObj)) {
    return "Invalid date format";
  }

  // const year = dateObj.getFullYear();
  // const month = String(dateObj.getMonth() + 1).padStart(2, '0');
  // const day = String(dateObj.getDate()).padStart(2, '0');
  const hours = String(dateObj.getHours()).padStart(2, '0');
  const minutes = String(dateObj.getMinutes()).padStart(2, '0');
  // const seconds = String(dateObj.getSeconds()).padStart(2, '0');

  // return `${year}-${month}-${day} ${hours}:${minutes}:${seconds}`;
  // return `${hours}:${minutes}:${seconds}`;
  return `${hours}:${minutes}`;
}

function TimeSelection({
  availableTimes, 
  selectedDate,
  setSelectedDate,
  selectedTime,
  setSelectedTime,
  ...rest
}){

  const handleChangeDate = (event) => {
    setSelectedDate(event.target.value);
  };

  const handleChangeTime = (event) => {
    setSelectedTime(event.target.value);
  };

  return (
    <Box
      sx={{
        display: 'flex',
        gap: "15px",
        maxWidth: "450px",
        ...rest?.sx
      }}
    >
      
      <FormControl fullWidth>
        <InputLabel id="date" size="small">Date</InputLabel>
        <Select
          labelId="date"
          id="date-select"
          value={selectedDate}
          label="Date"
          onChange={handleChangeDate}
          size="small"
        >
          {
            availableTimes?.map((availableTime, index) => (
              <MenuItem key={index} value={availableTime.date}>{availableTime.date}</MenuItem>
            ))
          }
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel id="time" size="small">Time</InputLabel>
        <Select
          labelId="time"
          id="time-select"
          value={selectedTime}
          label="Date"
          onChange={handleChangeTime}
          size="small"
        >
          {
            availableTimes?.find(availableTime => availableTime.date === selectedDate)?.availableTimes.map((time, index) => {
              const timeRange = `${parseTimeString(time.start)} - ${parseTimeString(time.end)}`;
              return (
                <MenuItem key={index} value={timeRange}>{timeRange}</MenuItem>
              );
            }
          )}
        </Select>
      </FormControl>

    </Box>
  );

}

export default TimeSelection;