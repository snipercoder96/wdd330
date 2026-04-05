const ytKey = import.meta.env.VITE_YOUTUBE_KEY;

// movieTitle comes from the clicked movie card (already the OMDB title)
export async function displayTrailer(title, year = "") {
    const query = `${title} ${year} official trailer`.trim();

    try {
        const response = await fetch(
            `https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(query)}&type=video&maxResults=1&key=${ytKey}`
        );
        const container = document.getElementById("movie-details");
        const data = await response.json();
        const videoId = data.items?.[0]?.id?.videoId;
        

        if (videoId) {
            container.innerHTML = `
                <h1>${title ? title : `title not found`} ${year ? `(${year})` : ``}</h1>
                <iframe
                    width="560" height="315"
                    src="https://www.youtube.com/embed/${videoId}"
                    frameborder="0"
                    allow="autoplay; encrypted-media"
                    allowfullscreen>
                </iframe>
                `;
                
        } else {
            container.innerHTML = "<p>Trailer not found.</p>";
        }
    } catch (err) {
        const container = document.getElementById("movie-details");
        container.innerHTML =
            `<p>${err} : Failed to load movies. Please try again.</p>`;
    }
}
