const BASE_URL = "https://api-otakudesu-production.up.railway.app";

const fetchEpisodeDetails = async () => {
  const urlParams = new URLSearchParams(window.location.search);
  const episodeEndpoint = urlParams.get("episode");

  if (!episodeEndpoint) {
    console.error("Episode endpoint not founf in URL parameters");
    document.getElementById("anime-title").textContent = "Episode not found";
    return;
  }

  try {
    const response = await fetch(
      `${BASE_URL}/api/v1/episode/${episodeEndpoint}`
    );
    const data = await response.json();
    console.log(data);
    console.log(data.streamLink);

    const watchContainer = document.getElementById("watchContent");
    watchContainer.innerHTML = `
    <h2 id="anime-title">${data.title}</h2>

      <iframe
        id="video-frame"
        width="800"
        height="450"
        frameborder="0"
        allowfullscreen
        src="${data.streamLink}"
      ></iframe>
    `;

    const qualitySelect = document.getElementById("qualitySelect");
    const mirrorSelect = document.getElementById("mirrorSelect");
    qualitySelect.innerHTML = "";
    mirrorSelect.innerHTML = "";

    const mirrors = Object.values(data).filter(
      (item) =>
        item && item.quality && item.straming && item.straming.length > 0
    );

    mirrors.forEach((mirror, index) => {
      const option = document.createElement("option");
      option.value = index;
      option.textContent = mirror.quality;
      qualitySelect.appendChild(option);
      console.log("ini index:", index);
      console.log("ini quality:", mirror.quality);
    });
    const selectedQuality = mirrors[qualitySelect.value];
    console.log(selectedQuality);

    qualitySelect.addEventListener("change", async () => {
      const selectedQuality = mirrors[qualitySelect.value];
      mirrorSelect.innerHTML = "";

      if (!selectedQuality.straming || selectedQuality.straming.length === 0) {
        console.log("Tidak ada stream tersedia, gunakan data.streamLink");
        document.getElementById("video-frame").src = data.streamLink;
        return;
      }

      const responseStreaming = await fetch(
        `${BASE_URL}${selectedQuality.straming[0].link}`
      );
      const dataStreaming = await responseStreaming.json();

      selectedQuality.straming.forEach((stream) => {
        const option = document.createElement("option");
        option.value = dataStreaming.streaming_url;
        option.textContent = stream.driver;
        mirrorSelect.appendChild(option);
      });

      console.log("Data Streaming Response:", dataStreaming);

      document.getElementById("video-frame").src = dataStreaming.streaming_url;
    });
  } catch (error) {
    console.error(error);
  }
};

document.addEventListener("DOMContentLoaded", fetchEpisodeDetails);
