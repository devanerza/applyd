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
                sans: ['"Roboto Flex"', 'system-ui', '-apple-system', 'sans-serif'],
                headline: ['"Google Sans Flex"', 'system-ui', '-apple-system', 'sans-serif'],
                label: ['"Space Mono"', 'ui-monospace', 'monospace'],
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
                    'secondary-content': '#03633B',
                    'accent': '#DFD3FB',
                    'accent-content': '#5425D4',
                    'neutral': '#E8E8E8',
                    'neutral-content': '#1f2937',
                    'info': '#3b82f6',
                    'warning': '#FAF0B3',
                    'warning-content': '4F4A28',
                    'error': '#FFDAD6',
                },
            },
        ],
    },
};
