// App.js — main entry point
import searchBar from "./SearchBar.mjs";
import { displayGlobalMovies } from "./DisplayMovies.mjs";

// Boot the app
searchBar();           // wire up the search button
displayGlobalMovies(); // load default movies on page load