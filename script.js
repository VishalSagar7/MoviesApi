const movieContainer = document.getElementById('movieContainer');
const searchInput = document.getElementById('searchinput');

async function getData() {
    const searchQuery = searchInput.value;
    console.log(searchQuery);

    const response = await fetch(`https://www.omdbapi.com/?s=${searchQuery}&apikey=89c3c3f7`);
    const data = await response.json();
    return data;
}

document.querySelector('button').addEventListener('click', async () => {
    movieContainer.innerHTML = "";

    try {

        const moviesData = await getData();
        console.log(moviesData);
        const movieDetail = moviesData.Search;
        const defaultImg = 'https://eticketsolutions.com/demo/themes/e-ticket/img/movie.jpg';

        if (movieDetail && movieDetail.length > 0) {

            let snippet = "";

            movieDetail.forEach(movie => {

                const posterSrc = movie.Poster && movie.Poster !== 'N/A' ? movie.Poster : defaultImg;

                snippet += `<div class="individualMovieDiv">
                               <div class="img-div">
                                   <a href="indevidualmovie.html?imdbID=${movie.imdbID}"><img src="${posterSrc}" alt="${movie.Title} poster"></img></a>
                               </div>
                               <h2>${movie.Title}</h2>
                               <h3>${movie.Year}</h3>
                            </div>`;
            });

            movieContainer.innerHTML = snippet;
        } else {
            movieContainer.innerHTML = '<p>No movies found</p>';
        }
    } catch (error) {
        console.error('Error fetching movies:', error);
        movieContainer.innerHTML = '<p>Error fetching movies. Please try again later.</p>';
    }
});






