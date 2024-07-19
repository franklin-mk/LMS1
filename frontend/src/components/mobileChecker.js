// Import the necessary hooks from React
import { useState, useEffect } from 'react';
// Import styled from styled-components for custom styling
import styled from 'styled-components';
// Import SpeedDial from MUI for custom component styling
import { SpeedDial } from '@mui/material';

// Define a state variable to track if the device is mobile and a function to update it
const [isMobile, setIsMobile] = useState(false);

// useEffect hook to set up a resize event listener to check for mobile screen size
useEffect(() => {
    // Function to handle window resize and update isMobile state based on the screen width
    const handleResize = () => {
        // Check if the screen width is 768px or less
        const isMobileDevice = window.matchMedia("(max-width: 768px)").matches;
        // Update the isMobile state
        setIsMobile(isMobileDevice);
    };

    // Add the resize event listener to the window object
    window.addEventListener("resize", handleResize);
    // Call handleResize to initialize the value on the first render
    handleResize();

    // Clean up the event listener when the component unmounts
    return () => {
        window.removeEventListener("resize", handleResize);
    };
}, []); // Empty dependency array ensures this effect runs only once after the initial render

// StyledSpeedDial is a styled component that customizes the MUI SpeedDial component
const StyledSpeedDial = styled(SpeedDial)`
  // Target the SpeedDial floating action button (fab) for custom styles
  .MuiSpeedDial-fab {
    // Set the background color of the fab
    background-color: #240439;
    // Change the background color on hover
    &:hover {
      background-color: #440080;
    }
  }
`;

// The StyledSpeedDial component can now be used in the render method of another component
