import React from "react";
import Box from "@mui/material/Box";
import Slider from "@mui/material/Slider";
import { styled } from "@mui/material/styles";

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
    <Box sx={{ position: 'relative', width: 300}}>
      <img
        src={require("../slider-figma.png")}
        alt="Slider Background"
        style={{
          width: '100%',
          position: 'absolute',
          top: '50%',
          left: '0',
          boxShadow:'none',
          
          transform: 'translateY(-50%)',
          zIndex: 1,
          
          
          pointerEvents: 'none', // Ensure it doesn't interfere with slider interaction
        }}
      />
      <Slider
        aria-label="Restricted values"
        defaultValue={50}
        getAriaValueText={valuetext}
        step={null}
        marks={marks}
        onChange={handleChange}
        sx={{
          color: "transparent",
          position: 'relative',
          zIndex: 2, // Ensure the slider components are above the background image
          marginBottom: 0, 
          "& .MuiSlider-thumb": {
            width: 35,
            height: 35,
            backgroundColor: "transparent",
            backgroundImage: `url(${require("../spicy2.jpeg")})`, // Set the background image for the thumb
            backgroundPosition: "center",
            "&:focus, &:hover, &$active": {
              boxShadow: "none",
              
            },
          },
          "& .MuiSlider-track": {
            height: 0, // Hide the track
            borderRadius: 4,
          },
          "& .MuiSlider-rail": {
            height: 0, // Hide the rail
            borderRadius: 4,
          },
          "& .MuiSlider-mark": {
            backgroundColor: "transparent",
           
          },
         
          "& .MuiSlider-markLabel": {
            color: "black", // Adjust the label color if needed
          },
        }}
        ThumbComponent={CustomThumbIcon}
      />
    </Box>
  );
};

export default CustomizedSlider;