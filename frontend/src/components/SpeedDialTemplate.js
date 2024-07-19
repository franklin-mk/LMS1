import React from 'react'
import { SpeedDial, SpeedDialAction, styled } from '@mui/material';
import TuneIcon from '@mui/icons-material/Tune';

const SpeedDialTemplate = ({ actions }) => {
    return (
        <CustomSpeedDial
            ariaLabel="SpeedDial playground example"
            icon={<TuneIcon />}
            direction="left"
        >
            {actions.map((action) => (
    // Iterate over each action in the actions array and return a SpeedDialAction component for each
    <SpeedDialAction
        key={action.name} // Use the action name as the unique key for each component
        icon={action.icon} // Set the icon of the SpeedDialAction to the action's icon
        tooltipTitle={action.name} // Set the tooltip title to the action's name
        onClick={action.action} // Set the onClick event to the action's handler function
    />
))}

            
        </CustomSpeedDial>
    )
}

export default SpeedDialTemplate

const CustomSpeedDial = styled(SpeedDial)`
  .MuiSpeedDial-fab {
    background-color: #032803;
    
    &:hover {
      background-color: green;
    }
  }
`;