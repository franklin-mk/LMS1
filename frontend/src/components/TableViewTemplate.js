import React, { useState } from 'react'
import { StyledTableCell, StyledTableRow } from './styles';
import { Table, TableBody, TableContainer, TableHead, TablePagination } from '@mui/material';

const TableViewTemplate = ({ columns, rows }) => {
    const [page, setPage] = useState(0);
    const [rowsPerPage, setRowsPerPage] = useState(5);
    return (
        <>
            <TableContainer>
                <Table stickyHeader aria-label="sticky table">
                    <TableHead>
                        <StyledTableRow>
                            {columns.map((column, index) => (
                                <StyledTableCell
                                    key={index}
                                    align={column.align}
                                    style={{ minWidth: column.minWidth }}
                                >
                                    {column.label}
                                </StyledTableCell>
                            ))}
                        </StyledTableRow>
                    </TableHead>
                    <TableBody>
                        {rows
                            .slice(page * rowsPerPage, page * rowsPerPage + rowsPerPage)
                            .map((row) => {
                                return (
                                    // Render a styled table row with hover effect and checkbox role
<StyledTableRow hover role="checkbox" tabIndex={-1} key={row.id}>
    {/* Map over the columns array to render each cell in the row */}
    {columns.map((column, index) => {
        // Retrieve the value from the row object based on the column id
        const value = row[column.id];
        return (
            // Render a styled table cell with key and alignment properties
            <StyledTableCell key={index} align={column.align}>
                {
                    // If the column has a format function and the value is a number, format the value
                    column.format && typeof value === 'number'
                        ? column.format(value)
                        : value // Otherwise, display the value as is
                }
            </StyledTableCell>
        );
    })}
</StyledTableRow>

                                );
                            })}
                    </TableBody>
                </Table>
            </TableContainer>
            <TablePagination
                rowsPerPageOptions={[5, 10, 25, 100]}
                component="div"
                count={rows.length}
                rowsPerPage={rowsPerPage}
                page={page}
                onPageChange={(event, newPage) => setPage(newPage)}
                onRowsPerPageChange={(event) => {
                    // Function to set the number of rows per page and reset the current page to the first page
setRowsPerPage(parseInt(event.target.value, 10));
setPage(0);

                }}
            />
        </>
    )
}

export default TableViewTemplate