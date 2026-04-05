import { defineConfig } from 'vite';

export default defineConfig({
    build: {
        rollupOptions: {
            input: {
                main: 'index.html',                          
                favorites: 'src/Favorites/favorites.html', 
                movies: 'src/movies_selected/movies-selected.html' 
            }
        }
    }
});
