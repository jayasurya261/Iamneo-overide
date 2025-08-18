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
        renderInput={(params) => (
          <TextField
            {...params}
            sx={{
              "& .MuiInputBase-root": {
                backgroundColor: "#171717", // dark bg
                color: "white",
                borderRadius: "6px"
              },
              "& .MuiInputLabel-root": { color: "#e6dab8" },
              "& .MuiOutlinedInput-notchedOutline": {
                borderColor: "#444"
              }
            }}
          />
        )}
      />
    </LocalizationProvider>
  );
};

export default BasicDateTimePicker;
