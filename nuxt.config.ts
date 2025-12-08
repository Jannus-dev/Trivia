import tailwindcss from "@tailwindcss/vite";

export default defineNuxtConfig({
    compatibilityDate: "2025-07-15",
    devtools: { enabled: true },
    css: ['./app/assets/css/main.css'],
    vite: {
        plugins: [
            tailwindcss(),
        ],
    },
    runtimeConfig: {
        public: {
            supabaseUrl: process.env.SUPABASE_URL,
            supabaseKey: process.env.SUPABASE_KEY
        }
    },
    app: {
        head: {
            title: 'OmniVerse', // default fallback title
        },
    }

});