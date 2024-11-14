/** @type {import('tailwindcss').Config} */
export default {
    content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
    darkMode: "class",
    theme: {
        extend: {
            animation: {
                ping: "ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite",
            },
        },
    },
    plugins: [require('daisyui'),],
};
