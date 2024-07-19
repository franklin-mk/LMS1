// Import necessary libraries from React and Recharts
import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer } from 'recharts';

// Define an array of colors to be used for the pie chart slices
const COLORS = ['#326e0a', '#930909'];

// Constant for converting degrees to radians
const RADIAN = Math.PI / 180;

// Function to render customized labels for the pie chart slices
// This function is passed as a prop to the Pie component
const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent, index }) => {
    // Calculate the radius at which the label should be placed
    const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
    // Calculate the x and y coordinates for the label position
    const x = cx + radius * Math.cos(-midAngle * RADIAN);
    const y = cy + radius * Math.sin(-midAngle * RADIAN);

    // Return a text element positioned at the calculated coordinates
    // The text element displays the percentage value for the slice
    return (
        <text x={x} y={y} fill="white" textAnchor={x > cx ? 'start' : 'end'} dominantBaseline="central">
            {`${(percent * 100).toFixed(0)}%`}
        </text>
    );
};

// Define the CustomPieChart component
// It takes 'data' as a prop which is an array of objects representing the chart data
const CustomPieChart = ({ data }) => {
    return (
        // ResponsiveContainer adjusts the chart to fit the width of its container
        <ResponsiveContainer width="100%" height={400}>
            {/* Define the PieChart component */}
            <PieChart>
                {/* Define the Pie component with various properties */}
                <Pie
                    data={data} // Data for the pie chart
                    cx="50%" // Center x-coordinate of the pie chart
                    cy="50%" // Center y-coordinate of the pie chart
                    labelLine={false} // Disable the default label lines
                    label={renderCustomizedLabel} // Use the custom label rendering function
                    outerRadius={80} // Outer radius of the pie chart
                    fill="#8884d8" // Default fill color for the pie slices
                    dataKey="value" // Key to use for the value of each slice
                >
                    {/* Map through the data and create a Cell component for each entry */}
                    {data.map((entry, index) => (
                        // Each Cell represents a slice of the pie chart
                        // Fill color is determined by the COLORS array, cycling through the colors
                        <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                    ))}
                </Pie>
            </PieChart>
        </ResponsiveContainer>
    );
};

// Export the CustomPieChart component as the default export
export default CustomPieChart;
