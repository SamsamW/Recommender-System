'use client';
import {Roboto} from 'next/font/google';
import {createTheme} from '@mui/material/styles';

const roboto = Roboto({
    weight: ['300', '400', '500', '700'],
    subsets: ['latin'],
    display: 'swap',
});

const theme = createTheme({
    typography: {
        button: {
            textTransform: 'none'
        }
    },

    palette: {
        primary: {
            main: '#000000',
        },
        secondary: {
            main: '#FFFFFF',
        },
    },

});

export default theme;