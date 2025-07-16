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
    loadCardMovies(data.results)
  })
  .catch(err => console.error(err));

const loadCardMovies = (filmes) => {
  const container = document.getElementById('movie-container')

  /* Percorrer cada item da lista e criar o card */
  filmes.forEach(objeto => {
    /* Criar a div colum  */
    const divCol = document.createElement('div')
    divCol.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';

    /* Div que tem a classe do card, ou seja, o card container  */
    const divCard = document.createElement('div')
    divCard.className = 'card h-100 d-flex flex-column';

    const imageURL = 'https://media.themoviedb.org/t/p/w500'

    divCard.innerHTML =
     `<img src="${imageURL}${objeto.poster_path}" class="card-img-top" alt="...">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${objeto.title}</h5>
        <p class="card-text text-overview">${objeto.overview}</p>
        <div class="mt-auto d-flex justify-content-between align-items-center">
          <a href="#">Ver mais</a>
          <small class="text-muted"><strong>Estréia: </strong> 
          ${formatDate(objeto.release_date)}</small>
        </div>
      </div>`

    divCol.appendChild(divCard)
    container.appendChild(divCol)
    //console.log(objeto.title);
  });

};

const formatDate = (data) => {
  const [ano, mes, dia] = data.split('-');
  return `${dia}/${mes}/${ano}`;
};

/* const loadCardMovies = (movies) => {
  const container = document.getElementById('movie-container');
  container.innerHTML = '';

  movies.forEach(movie => {
    const col = document.createElement('div');
    col.className = 'col-12 col-sm-6 col-md-4 col-lg-3 mb-4';
  
    const card = document.createElement('div');
    card.className = 'card h-100';
  
    const posterPath = movie.poster_path
      ? `https://image.tmdb.org/t/p/w500${movie.poster_path}`
      : 'https://via.placeholder.com/500x750?text=No+Image';
  
    card.innerHTML = `
      <img src="${posterPath}" class="card-img-top" alt="${movie.title}">
      <div class="card-body d-flex flex-column">
        <h5 class="card-title">${movie.title}</h5>
        <p class="card-text">${movie.overview.substring(0, 100)}...</p>
        <a href="#" class="btn btn-primary mt-auto">Ver mais</a>
      </div>
    `;
  
    col.appendChild(card);
    container.appendChild(col);
  });
}; */