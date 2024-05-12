import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles"; // Import styled from @mui/material/styles

// Define a styled component for the thumb
const CustomThumbIcon = styled("span")({
  width: 24,
  height: 24,
  backgroundImage: `url(${require("../spicy2.jpeg")})`, // Set the background image
  backgroundSize: "contain", // Adjust to contain the image within the thumb
  backgroundRepeat: "no-repeat",
  backgroundColor: "transparent",
  display: "inline-block",
  transform: "translate(-50%, -50%)", // Center the thumb
  "&:focus, &:hover, &$active": {
    boxShadow: "none",
  },
});

const marks = [
  { value: 0, label: "רגיש" },
  { value: 25, label: "חמוד" },
  { value: 50, label: "רגיל" },
  { value: 75, label: "פלרטטן" },
  { value: 100, label: "חריף" },
];

function valuetext(value) {
  return { value };
}

const CustomizedSlider = ({ onChange }) => {
  const handleChange = (event, value) => {
    console.log(value); // Log the value when it changes
    onChange(value);
  };

  return (
    <Box>
      <Box sx={{ width: 300 }}>
        <Slider
          aria-label="Restricted values"
          defaultValue={50}
          getAriaValueText={valuetext}
          step={null}
          // valueLabelDisplay="auto"
          marks={marks}
          onChange={handleChange}
          sx={{
            color: "red",
            "& .MuiSlider-thumb": {
              width: 28,
              height: 28,
              backgroundColor: "transparent",
              backgroundImage: `url(${require("../spicy2.jpeg")})`, // Set the background image
              backgroundPosition: "-5px center", // Adjust the position of the background image to the left
              "&:focus, &:hover, &$active": {
                boxShadow: "none",
              },
            },
            "& .MuiSlider-track": {
              height: 8,
              borderRadius: 4,
            },
            "& .MuiSlider-rail": {
              height: 8,
              borderRadius: 4,
            },
          }}
          ThumbComponent={CustomThumbIcon}
        />
      </Box>
    </Box>
  );
};

export default CustomizedSlider;
