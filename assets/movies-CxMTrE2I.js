import"./style-DKZTLw2X.js";import{t as e}from"./SearchBar-zcIDFzTZ.js";var t=`AIzaSyA4zdST2SyqJ9zt0STvk6Q8oG-bicMhz2w`,n=`0db2b97fda8bdb113cd7fe172fd59810`;async function r(e,r=``,i){let a=`${e} ${r} official trailer`.trim();try{let e=(await(await fetch(`https://www.googleapis.com/youtube/v3/search?part=snippet&q=${encodeURIComponent(a.toLowerCase())}&type=video&maxResults=1&key=${t}`)).json()).items?.[0]?.id?.videoId,r=await(await fetch(`https://api.themoviedb.org/3/movie/${i}?api_key=${n}`)).json(),o=await(await fetch(`https://api.themoviedb.org/3/movie/${i}/credits?api_key=${n}`)).json(),s=o.crew?.filter(e=>e.job===`Director`)||[],c=o.crew?.filter(e=>[`Writer`,`Screenplay`,`Author`].includes(e.job))||[],l=o.cast?.slice(0,5)||[],u=document.getElementById(`movie-details`);e?u.innerHTML=`
            <div>
                <h1>${r.title} (${r.release_date.split(`-`)[0]})</h1>
                <div>
                    <p><strong>Rating:</strong> ${r.vote_average} / 10</p>
                    <p><strong>Release Year:</strong> ${r.release_date.split(`-`)[0]}</p>
                </div>
                    <iframe
                        width="560" height="315"
                        src="https://www.youtube.com/embed/${e}"
                        frameborder="0"
                        allow="autoplay; encrypted-media"
                        allowfullscreen>
                    </iframe>
                <div>
                <h2>Genres</h2>
                <div>
                    ${r.genres.map(e=>`<p>${e.name}</p>`).join(``)}</div>
                </div>
                <div>
                    <h2>Synopsis</h2>
                    <p>${r.overview||`No synopsis available.`}</p>
                </div>
                <div>
                    <h2>Director(s)</h2>
                    <div>${s.map(e=>`<p>${e.name}</p>`).join(``)||`<p>Not available</p>`}</div>
                </div>
                <div>
                    <h2>Writer(s)</h2>
                    <div>${c.map(e=>`<p>${e.name}</p>`).join(``)||`<p>Not available</p>`}</div>
                </div>
                <div>
                <h2>Main Cast</h2>
                    <div>
                        ${l.map(e=>`
                        <p>${e.name} as ${e.character}</p>
                        `).join(``)}
                    </div>
                </div>
            </div>
            `:u.innerHTML=`<p>Trailer not found.</p>`}catch(e){let t=document.getElementById(`movie-details`);t.innerHTML=`<p>${e} : Failed to load movie details. Please try again.</p>`}}e();var i=new URLSearchParams(window.location.search),a=i.get(`title`),o=i.get(`year`),s=i.get(`id`);a?r(a,o,s):document.getElementById(`movie-details`).innerHTML=`<p>No movie selected.</p>`;