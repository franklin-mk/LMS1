import React, { useState } from 'react'; // Importing React and the useState hook
import { StyledTableCell, StyledTableRow } from './styles'; // Importing styled components for table cells and rows
import { Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material'; // Importing Material-UI components

// Define the TableTemplate component which takes props: ButtonHaver, columns, and rows
const TableTemplate = ({ buttonHaver: ButtonHaver, columns, rows }) => {
    // State hooks to manage pagination
    const [page, setPage] = useState(0); // State for the current page number
    const [rowsPerPage, setRowsPerPage] = useState(5); // State for the number of rows per page

    return (
        <>
            <TableContainer> {/* Wrapper component for the table */}
                <Table stickyHeader aria-label="sticky table"> {/* Table component with a sticky header */}
                    <TableHead> {/* Table header */}
                        <StyledTableRow> {/* Styled row for the table header */}
                            {columns.map((column) => ( // Loop through the columns prop to create header cells
                                <StyledTableCell
                                    key={column.id} // Unique key for each column
                                    align={column.align} // Alignment for the cell
                                    style={{ minWidth: column.minWidth }} // Minimum width for the cell
                                >
                                    {column.label} {/* Display the column label */}
                                </StyledTableCell>
                            ))}
                            <StyledTableCell align="center"> {/* Additional cell for the Actions column */}
                                Actions
                            </StyledTableCell>
                        </StyledTableRow>
                    </TableHead>
                    <TableBody> {/* Table body */}
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage) // Slice the rows array for pagination
                            .map((row) => ( // Loop through the sliced rows to create body rows
                                <StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}> {/* Styled row with hover effect */}
                                    {columns.map((column) => { // Loop through the columns for each row
                                        const value = row[column.id]; // Get the value for the current column
                                        return (
                                            <StyledTableCell key={column.id} align={column.align}> {/* Styled cell */}
                                                {
                                                    column.format && typeof value === 'number' // Check if formatting is needed
                                                        ? column.format(value) // Format the value if needed
                                                        : value // Display the value as is
                                                }
                                            </StyledTableCell>
                                        );
                                    })}
                                    <StyledTableCell align="center"> {/* Cell for the action button */}
                                        <ButtonHaver row={row} /> {/* Render the ButtonHaver component, passing the row as a prop */}
                                    </StyledTableCell>
                                </StyledTableRow>
                            ))}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]} // Options for the number of rows per page
                component="div"
                count={rows.length} // Total number of rows
                rowsPerPage={rowsPerPage} // Current number of rows per page
                page={page} // Current page number
                onPageChange={(event, newPage) => setPage(newPage)} // Handler for page change
                onRowsPerPageChange={(event) => {
                    setRowsPerPage(parseInt(event.target.value, 5)); // Update the rows per page
                    setPage(0); // Reset to the first page
                }}
            />
        </>
    );
};

export default TableTemplate; // Export the component as default
