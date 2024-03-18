const api_URL = "https://api.themoviedb.org/3/discover/movie?api_key=47b5f987db0d0c330ae7918d1aa305bd";
const movieContainer = document.getElementById("main");
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=47b5f987db0d0c330ae7918d1aa305bd&query='
const tv_url = 'https://api.themoviedb.org/3/tv/popular?api_key=47b5f987db0d0c330ae7918d1aa305bd'
const trending_url = 'https://api.themoviedb.org/3/trending/all/day?api_key=47b5f987db0d0c330ae7918d1aa305bd';


async function fetchTrailerKey(movieId) {
    try {
        const response = await fetch(`https://api.themoviedb.org/3/movie/${movieId}/videos?api_key=47b5f987db0d0c330ae7918d1aa305bd`);
        const data = await response.json();
        
        for(let result of data.results){
            if (result.name == "Official Trailer"){
                return result.key;
            }
            
        }
        return data.results[0].key
    } catch (e) {
        console.log(e);
    }
}




async function fetchMovies(api_URL) {
    try {
        const response = await fetch(api_URL);
        const data = await response.json();

        movieContainer.innerHTML = '';
        
        data.results.forEach(media => {
            const movieCard = createMovieCard(media);
            movieContainer.appendChild(movieCard);
        });
    } catch (err) {
        console.log(err);
    }
}

function createMovieCard(media) {
    const { id, title, original_name, poster_path, vote_average, release_date, overview } = media;
    const movieTitle = title || original_name;

    const movieCard = document.createElement("div");
    movieCard.classList.add("movie");

    fetchTrailerKey(id).then(trailerId => {
        const trailerLink = `https://www.youtube.com/watch?v=${trailerId}`;
        console.log(trailerLink);

        const movieCardHTML = `<img src='https://image.tmdb.org/t/p/w500/${poster_path}' alt='${movieTitle}'>
                              <div class='movie-details'>
                                  <h3>${movieTitle}</h3>
                                  <span class="${getClassByRate(vote_average)}">${vote_average}</span>
                              </div>
                              <div class="overview">
                                  <h3>Overview</h3>
                                  ${overview} <br>
                                  <strong>Release Date: </strong> ${release_date}<br><br>
                                  <a id='trailer' href="${trailerLink}">Watch Trailer</a>
                              </div>`;

        movieCard.innerHTML = movieCardHTML;
    }).catch(e => {
        console.log(e);
    });

    return movieCard;
}


function getClassByRate(vote) {
    if (vote >= 8) {
        return 'green';
    } else if (vote >= 5) {
        return 'orange';
    } else {
        return 'red';
    }
}

let form = document.getElementById('form');

let search = document.getElementById('search');

form.addEventListener('submit', (e) => {
    e.preventDefault()

    const searchTerm = search.value

    if(searchTerm && searchTerm !== '') {
        fetchMovies(SEARCH_API + searchTerm)

        search.value = ''
    } else {
        window.location.reload()
    }
})


fetchMovies(trending_url);









