// Function runs on page load to view current popular movies in the US
// endpoint here: https://developer.themoviedb.org/reference/movie-popular-list
function getPopularMovies() {
  // the endpoint
  let endpoint =
    "https://api.themoviedb.org/3/movie/popular?api_key=6103f928103518e6b9b7a0280f0f9a28&language=en-US&page=1";
  // the place on the page where we'll display the movies
  let popularMovies = document.getElementById("popular");
  let imgUrl = "https://image.tmdb.org/t/p/w400";

  // ajax time!
  // create the object
  let xhr = new XMLHttpRequest();

  // attach event handlers
  xhr.addEventListener("readystatechange", function () {
    if (this.readyState === this.DONE) {
      console.log(this.responseText);

      let json = JSON.parse(this.responseText);
      let html = "";

      // display featured movie
      html += `<section id="featured">
                <h3>${json.results[0].title}</h3>
                <img src="${imgUrl}${json.results[0].poster_path}" alt="">
                <p>"${json.results[0].overview}"</p>
              </section>`;

      for (let i = 1; i < json.results.length; i++) {
        let movie = json.results[i];

        html += `<section class="movie">
                  <img src="${imgUrl}${movie.poster_path}" alt="">
                  <div>
                    <h3>${movie.title}</h3>
                    <p>${movie.overview}
                        <span class="vote">Vote Average: ${movie.vote_average}</span>
                    </p>
                  </div>
                </section>`;
      }

      // add to the page
      popularMovies.innerHTML = html;
    }
  });

  // set the response type

  // open the request
  xhr.open("GET", endpoint);

  // send the request
  xhr.send();
}

// function runs only after a year is entered/chosen and submitted through the form
// endpoint here: https://developer.themoviedb.org/reference/discover-movie
function getBirthYearMovies(e) {
  e.preventDefault();

  // Get the user's input/year value
  const year = encodeURI(document.getElementById("userYear").value);
  const API_KEY = "6103f928103518e6b9b7a0280f0f9a28";

  // the place on the page where we'll add the movies
  let birthYearMovies = document.getElementById("birthYear");

  if (year < 1940 || year > 2024 || year == "") {
    birthYearMovies.innerHTML = `<p style="color: red; background-color: white;">Please enter a year between 1940 and 2022</p>`;
  } else {
    const endpoint = `https://api.themoviedb.org/3/discover/movie?api_key=${API_KEY}&include_adult=false&include_video=false&language=en-US&page=1&primary_release_year=${year}&sort_by=popularity.desc`;
    let imgUrl = "https://image.tmdb.org/t/p/w400";

    // ajax time!
    // create the object
    let xhr = new XMLHttpRequest();

    // attach event handlers
    xhr.addEventListener("readystatechange", function () {
      if (this.readyState === this.DONE) {
        console.log(this.responseText);

        let json = JSON.parse(this.responseText);
        let html = "";

        let counter = 0;

        for (let i = 0; counter < 6; i++) {
          let movie = json.results[i];

          if (json.results[i].poster_path === null) {
            continue;
          } else {
            html += `<section class="yrMovie">
                        <img src="${imgUrl}${movie.poster_path}" alt="">
                        <h3>${movie.title}</h3>
                    </section>`;
            counter++;
          }
        }

        // add to the page
        birthYearMovies.innerHTML = html;
      }
    });

    // set the response type

    // open the request
    xhr.open("GET", endpoint);

    // attach the headers (optional)
    xhr.send();
  }
}

window.addEventListener("load", function () {
  getPopularMovies();
  document
    .getElementById("yearBtn")
    .addEventListener("click", getBirthYearMovies);
});
