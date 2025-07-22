const API_KEY = 'eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGU3MDFkYjNmNTUyZTBhNTFjMDlkNDMxMzdiZDI3MCIsInN1YiI6IjY0YTdmOWM2OTY1MjIwMDExZGYwOGU3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YhX8YDb0OF8ovacEzdWjUTSWr0xZLaZOItyxsnzgVMI';
const BASE_URL = 'https://api.themoviedb.org/3';
const IMAGE_BASE = 'https://image.tmdb.org/t/p/w500';
/* const options = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: `Bearer ${API_KEY}`
  }
};
 */

const config = {
  method: 'GET',
  headers: {
    accept: 'application/json',
    Authorization: 'Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI0OGU3MDFkYjNmNTUyZTBhNTFjMDlkNDMxMzdiZDI3MCIsIm5iZiI6MTY4ODczMDA1NC44NzgsInN1YiI6IjY0YTdmOWM2OTY1MjIwMDExZGYwOGU3MyIsInNjb3BlcyI6WyJhcGlfcmVhZCJdLCJ2ZXJzaW9uIjoxfQ.YhX8YDb0OF8ovacEzdWjUTSWr0xZLaZOItyxsnzgVMI'
  }
};

fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR', config)
  .then(response => response.json())
  .then(data => {
    console.log(data.results)
    renderFeaturedMovies(data.results)
  })
  .catch(err => console.error(err));
// Filmes em destaque
/* fetch('https://api.themoviedb.org/3/movie/popular?language=pt-BR&page=1', options)
  .then(res => res.json())
  .then(data => {
    console.log(data.results)
    renderFeaturedMovies(data.results)
  })
  .catch(err => console.error(err)); */

function renderFeaturedMovies(movies) {
  console.log('movies', movies);

  const container = document.getElementById('featuredMovies');
  container.innerHTML = '';

  movies.slice(0, 12).forEach(movie => {
    const col = document.createElement('div');
    col.className = 'col-6 col-sm-4 col-md-3';

    const vote = movie.vote_average.toFixed(1).replace('.', ',');

    col.innerHTML = `
        <div class="movie-card">
          <div class="vote-circle">${vote}</div>
          <img src="https://image.tmdb.org/t/p/w500${movie.poster_path}" alt="${movie.title}" />
          <div class="movie-info">
            <div class="movie-title">${movie.title}</div>
                <div class="movie-date">${formatDate(movie.release_date)}</div>

          </div>
        </div>
      `;

    container.appendChild(col);
  });
}


function formatDate(dateStr) {
  if (!dateStr) return '';
  const date = new Date(dateStr);
  const day = String(date.getDate()).padStart(2, '0');
  const month = String(date.getMonth() + 1).padStart(2, '0'); // +1 porque começa em 0
  const year = date.getFullYear();
  return `${day}/${month}/${year}`;
}

