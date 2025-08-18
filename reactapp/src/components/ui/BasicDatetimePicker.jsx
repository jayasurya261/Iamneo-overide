import * as React from "react";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateTimePicker } from "@mui/x-date-pickers/DateTimePicker";
import { TextField } from "@mui/material";

const BasicDateTimePicker = ({ value, onChange }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DateTimePicker
        value={value}
        onChange={(newValue) => onChange(newValue)}
        enableAccessibleFieldDOMStructure={false}
        slots={{
          textField: TextField,
        }}
        slotProps={{
          textField: {
            sx: {
              "& .MuiInputBase-root": {
                backgroundColor: "#171717", // dark bg
                color: "white !important", // force white text
                borderRadius: "6px"
              },
              "& .MuiInputBase-input": {
                color: "white !important", // ensure input text is white
              },
              "& .MuiInputLabel-root": { 
                color: "#e6dab8 !important" 
              },
              "& .MuiInputLabel-root.Mui-focused": { 
                color: "#e6dab8 !important" 
              },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#444"
              },
              "& .MuiOutlinedInput-root:hover .MuiOutlinedInput-notchedOutline": {
                borderColor: "#666"
              },
              "& .MuiOutlinedInput-root.Mui-focused .MuiOutlinedInput-notchedOutline": {
                borderColor: "#e6dab8"
              },
              "& .MuiIconButton-root": {
                color: "white !important" // calendar icon color
              }
            }
          }
        }}
      />
    </LocalizationProvider>
  );
};

export default BasicDateTimePicker;