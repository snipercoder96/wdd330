const ytKey = import.meta.env.VITE_YOUTUBE_KEY;
const omdbKey = import.meta.env.VITE_OMDB_KEY;

// movieTitle comes from the clicked movie card (already the OMDB title)
export async function displayTrailer(movieTitle) {
    const trailerContainer = document.getElementById("trailer");
    trailerContainer.innerHTML = "<p>Loading trailer...</p>";

    try {
        // Fetch YouTube results for this title
        const ytRes = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(movieTitle)}+official+trailer&type=video&maxResults=5&key=${ytKey}`
        );
        const ytData = await ytRes.json();

        const normalise = str => str.toLowerCase().replace(/[^a-z0-9\s]/g, "").trim();
        const omdbNeedle = normalise(movieTitle); // e.g. "the dark knight"

        // Find the YT video whose snippet.title contains the OMDB title
        const matched = ytData.items?.find(item =>
            normalise(item.snippet.title).includes(omdbNeedle)
        );

        if (!matched) {
            trailerContainer.innerHTML = `<p>No matching trailer found for "<strong>${movieTitle}</strong>".</p>`;
            return;
        }

        // Use the YT video's own title (not the search query) as the heading
        const videoId = matched.id.videoId;
        const ytTitle = matched.snippet.title;

        trailerContainer.innerHTML = `
            <h3>${ytTitle}</h3>
            <iframe
                width="560" height="315"
                src="https://www.youtube.com/embed/${videoId}"
                frameborder="0"
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                allowfullscreen>
            </iframe>
        `;

    } catch (error) {
        console.error("Trailer fetch error:", error);
        trailerContainer.innerHTML = "<p>Error loading trailer. Please try again.</p>";
    }
}
