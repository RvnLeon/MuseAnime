const BASE_URL = "https://api-otakudesu-production.up.railway.app";

const searchAnime = async () => {
  const query = document.getElementById("searchButton");
  if (!query) return alert("Please enter a title of anime...");
};

const fetchSearchData = async () => {
  try {
    const animeName = document.getElementById("searchInput").value;

    const response = await fetch(`${BASE_URL}/api/v1/search/${animeName}`);

    if (!response.ok) {
      throw new Error("Could not fetch resource");
    }

    const data = await response.json();
    const searchResults = document.getElementById("search-results");
    console.log(data.search);

    searchResults.innerHTML = "";
    data.search.forEach((anime) => {
      const animeItem = document.createElement("div");
      animeItem.classList.add("anime-item");
      animeItem.innerHTML = `
        <div class="card">
            <div class="imgCard"><img src="${anime.thumb}" alt="${anime.title}"/></div>
            <div class="card-content">
                <span class="card-btn"><a href="details.html?anime=${anime.endpoint}">View more...</a></span>
                <span class="card-title"<h3>${anime.title}</h3></span>
            </div>
        </div>
        `;
      searchResults.appendChild(animeItem);
      console.log(anime.thumb);
    });
  } catch (error) {
    console.error(error);
  }
};
