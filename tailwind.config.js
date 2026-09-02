import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],

    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
            },
        },
    },

    plugins: [forms, require('daisyui')],

    daisyui: {
        themes: [
            {
                stride: {
                    'primary': '#5425D4',
                    'primary-content': '#ffffff',
                    'secondary': '#70FBC1',
                    'secondary-content': '#007350',
                    'accent': '#DFD3FB',
                    'accent-content': '#5425D4',
                    'neutral': "#E8E8E8",
                    'info': '#3b82f6',
                    'warning': '#FAF0B3',
                    'error': '#FFDAD6',
                },
            },
        ],
    },
};
