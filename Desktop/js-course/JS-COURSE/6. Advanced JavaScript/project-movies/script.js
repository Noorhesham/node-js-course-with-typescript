const searchInput = document.getElementById("searchInput");
const searchButton = document.getElementById("searchButton");
const resultsDiv = document.getElementById("results");
const API_KEY = "your_api_key_here";

async function searchMovies() {
  resultsDiv.innerHTML = "Loading...";
  let query = searchInput.value;
  try {
    let response = await fetch(`https://www.omdbapi.com/?s=${query}&apikey=${API_KEY}`);
    if (!response.ok) throw new Error("Error fetching data");
    let data = await response.json();
    displayResults(data);
  } catch (error) {
    resultsDiv.innerHTML = `<p style="color: red;">${error.message}</p>`;
  }
}

function displayResults(data) {
  resultsDiv.innerHTML = "";
  if (data.Response === "False") {
    resultsDiv.innerHTML = `<p>No results found</p>`;
    return;
  }
  data.Search.forEach((movie) => {
    let movieDiv = document.createElement("div");
    movieDiv.classList.add("movie");
    movieDiv.innerHTML = `
            <h3>${movie.Title}</h3>
            <img src="${movie.Poster}" alt="${movie.Title}">
            <p>Year: ${movie.Year}</p>
        `;
    resultsDiv.appendChild(movieDiv);
  });
}

searchButton.addEventListener("click", searchMovies);
