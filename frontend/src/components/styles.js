// Import necessary components and functions from @mui/material
import {
    TableCell,
    TableRow,
    styled,
    tableCellClasses,
    Drawer as MuiDrawer,
    AppBar as MuiAppBar,
} from "@mui/material";

// Define a constant for the drawer width
const drawerWidth = 240

// Create a styled TableCell component with custom styles
export const StyledTableCell = styled(TableCell)(({ theme }) => ({
    // Styles for the table cell when it's a header
    [`&.${tableCellClasses.head}`]: {
        backgroundColor: theme.palette.common.black, // Black background color
        color: theme.palette.common.white, // White text color
    },
    // Styles for the table cell when it's a body cell
    [`&.${tableCellClasses.body}`]: {
        fontSize: 14, // Font size of 14px
    },
}));

// Create a styled TableRow component with custom styles
export const StyledTableRow = styled(TableRow)(({ theme }) => ({
    // Alternate row background color for odd rows
    '&:nth-of-type(odd)': {
        backgroundColor: theme.palette.action.hover, // Hover color from the theme
    },
    // Hide the last border in the last row
    '&:last-child td, &:last-child th': {
        border: 0,
    },
}));

// Create a styled AppBar component with custom styles and conditional properties
export const AppBar = styled(MuiAppBar, {
    shouldForwardProp: (prop) => prop !== 'open', // Prevent 'open' prop from being forwarded to the DOM
})(({ theme, open }) => ({
    zIndex: theme.zIndex.drawer + 1, // Ensure the AppBar is above the drawer
    transition: theme.transitions.create(['width', 'margin'], {
        easing: theme.transitions.easing.sharp,
        duration: theme.transitions.duration.leavingScreen,
    }),
    ...(open && {
        marginLeft: drawerWidth, // Shift the AppBar when the drawer is open
        width: `calc(100% - ${drawerWidth}px)`, // Adjust the width when the drawer is open
        transition: theme.transitions.create(['width', 'margin'], {
            easing: theme.transitions.easing.sharp,
            duration: theme.transitions.duration.enteringScreen,
        }),
    }),
}));

// Create a styled Drawer component with custom styles and conditional properties
export const Drawer = styled(MuiDrawer, { shouldForwardProp: (prop) => prop !== 'open' })(
    ({ theme, open }) => ({
        '& .MuiDrawer-paper': {
            position: 'relative', // Ensure the drawer stays in the correct position
            whiteSpace: 'nowrap', // Prevent text wrapping
            width: drawerWidth, // Set the width of the drawer
            transition: theme.transitions.create('width', {
                easing: theme.transitions.easing.sharp,
                duration: theme.transitions.duration.enteringScreen,
            }),
            boxSizing: 'border-box', // Include padding and border in the element's total width and height
            ...(!open && {
                overflowX: 'hidden', // Hide horizontal overflow when the drawer is closed
                transition: theme.transitions.create('width', {
                    easing: theme.transitions.easing.sharp,
                    duration: theme.transitions.duration.leavingScreen,
                }),
                width: theme.spacing(7), // Set a smaller width when the drawer is closed
                [theme.breakpoints.up('sm')]: {
                    width: theme.spacing(9), // Adjust width for larger screens
                },
            }),
        },
    }),
);
