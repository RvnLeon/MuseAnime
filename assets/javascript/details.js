const BASE_URL = "https://api-otakudesu-production.up.railway.app";

const fetchAnimeDetails = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const animeEndpoint = urlParams.get("anime");

  try {
    const response = await fetch(`${BASE_URL}/api/v1/detail/${animeEndpoint}`);
    const data = await response.json();
    console.log(data);
    const detailsInfo = data.anime_detail.detail
      .map((detail) => `<p>${detail}</p>`)
      .join(" ");
    const detailsContent = document.getElementById("details-content");
    detailsContent.innerHTML = `
      <h1 id="anime-title" class="anime-title">${data.anime_detail.title}</h1>
      <div class="details-header">
        <img id="anime-thumb" class="anime-thumb"src="${
          data.anime_detail.thumb
        }" alt="Anime Image" />
        <div class="details-info">
          ${detailsInfo}
        </div>
      </div>
      <p id="anime-sypnosis" class="anime-sypnosis">${
        Array.isArray(data.anime_detail.sinopsis)
          ? data.anime_detail.sinopsis.join(" ")
          : data.anime_detail.sinopsis
      }</p>
      `;
    console.log(data.anime_detail.sinopsis.join(" "));

    const episodeContainer = document.getElementById("episodes");
    const totalEpisodes = data.episode_list.length;

    const filteredEpisodes = data.episode_list.filter(
      (_, index) => index !== 0 && index !== 1 && index !== totalEpisodes - 1
    );
    filteredEpisodes.forEach((episode) => {
      const episodeItem = document.createElement("a");
      episodeItem.classList.add("episode-card");
      episodeItem.href = `watch.html?episode=${episode.episode_endpoint}`;
      episodeItem.innerHTML = `
      <h3>${episode.episode_title}</h3>
      <p>Watch now!</p>
      <h5>${episode.episode_date}</h5>
      `;
      episodeContainer.appendChild(episodeItem);
    });
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", fetchAnimeDetails);
