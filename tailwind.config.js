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
                    'primary': '#4f46e5',
                    'primary-content': '#ffffff',
                    'secondary': '#f59e0b',
                    'secondary-content': '#1f2937',
                    'accent': '#10b981',
                    'accent-content': '#ffffff',
                    'neutral': '#374151',
                    'neutral-content': '#f3f4f6',
                    'base-100': '#f9fafb',
                    'base-200': '#f3f4f6',
                    'base-300': '#e5e7eb',
                    'base-content': '#1f2937',
                    'info': '#3b82f6',
                    'success': '#10b981',
                    'warning': '#f59e0b',
                    'error': '#ef4444',
                },
            },
        ],
    },
};
