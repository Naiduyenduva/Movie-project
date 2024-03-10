document.addEventListener('DOMContentLoaded',function(){

    const moviescontainer = document.getElementById("movies-container");
    const modal = document.getElementById("modal");
    const modalcontent = document.getElementById("modal-content");
    const searchInput = document.getElementById("searchInput");
    let moviesdata;


     fetch('movies.json').then(response => response.json()).then(
    data => {
      moviesdata = data;
        displaymovies(moviesdata);
    })
    .catch(error => console.error("error fetching movies data",error));

    function displaymovies(movies) {
        moviescontainer.innerHTML = '';
        movies.forEach(movie => {
            const movieDiv = document.createElement('div');
            movieDiv.classList.add('movie-thumbnail');
            movieDiv.innerHTML = `
            <img src="${movie.image}" alt="${movie.title}">
            <h3> ${movie.title}</h3>
            ` ;

            moviescontainer.appendChild(movieDiv);
            movieDiv.addEventListener('click',() => openModal(movie))
        });
    }

    function openModal (movie) {
        modalcontent.innerHTML = `
        <span class = "close" onclick = "closeModal()">&times;</span>
        <h2>${movie.title}</h2>
        <p><strong>Director : </strong>${movie.director}</p>
        <p><strong>Genre : </strong>${movie.genre}</p>
        <p><strong>ReleaseYear : </strong>${movie.releaseYear}</p>
        <p><strong>Rating : </strong>${movie.rating}</p>
        <p>${movie.synopsis}</p>
        `;
        modal.style.display ='block';
    }

    window.closeModal = function () {
        modal.style.display = 'none';
    }

        searchInput.addEventListener('input',function() {
        const searchTerm = searchInput.value.toLowerCase();
        const filteredMovies = moviesdata.filter(movie => movie.title.toLowerCase().includes(searchTerm));

        if(filteredMovies.length > 0) {
            displaymovies(filteredMovies);
        } else {
            moviescontainer.innerHTML = `<p>No data found</p>`
        }
    })

})
