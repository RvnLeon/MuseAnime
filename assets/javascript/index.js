document.addEventListener("DOMContentLoaded", async () => {
  const BASE_URL = "https://api-otakudesu-production.up.railway.app";
  let currentOngoingPage = 1;
  let totalOngoingPages = Infinity;
  let currentCompletedPage = 1;
  let totalCompletedPages = Infinity;

  const fetchDataOngoing = async (page) => {
    const response = await fetch(`${BASE_URL}/api/v1/ongoing/${page}`);
    const data = await response.json();

    if (!data.ongoing.length) {
      totalOngoingPages = page - 1;
      return [];
    }

    return data.ongoing;
  };

  const loadOngoing = async (page) => {
    const ongoing = document.getElementById("ongoing");
    const ongoingData = await fetchDataOngoing(page);

    if (page > totalOngoingPages) {
      currentOngoingPage = totalOngoingPages;
      return loadOngoing(currentOngoingPage);
    }

    console.log(ongoingData);

    ongoing.innerHTML = `
        <div class="top-title">
            <h1>Ongoing</h1>
        </div>
        ${ongoingData
          .map((ongoing) => {
            return `
            <a href="details.html?anime=${ongoing.endpoint}" class="aside-episode">
                <img src="${ongoing.thumb}" alt="${ongoing.title}" class="ongoing-img" loading="lazy" />
                <div class="info">
                    <h4>${ongoing.title}</h4>
                    <h5>${ongoing.updated_on}</h5>
                </div>
            </a>
            `;
          })
          .join("")}
    
        <div class="pagination">
              <button id="ongoing-prevPage" ${
                page === 1 ? "disabled" : ""
              }>Previous</button>
              <span>Page ${page}</span>
              <button id="ongoing-nextPage" ${
                page >= totalOngoingPages ? "disabled" : ""
              }>Next</button>
        </div>`;

    document
      .getElementById("ongoing-prevPage")
      .addEventListener("click", () => {
        if (page > 1) {
          currentOngoingPage--;
          loadOngoing(currentOngoingPage);
        }
      });

    document
      .getElementById("ongoing-nextPage")
      .addEventListener("click", () => {
        if (page < totalOngoingPages) {
          currentOngoingPage++;
          loadOngoing(currentOngoingPage);
        }
      });
  };

  const fetchDataCompleted = async (page) => {
    const response = await fetch(`${BASE_URL}/api/v1/completed/${page}`);
    const data = await response.json();

    if (!data.completed.length) {
      totalOngoingPages = page - 1;
      return [];
    }

    return data.completed;
  };

  const loadCompleted = async (page) => {
    const completed = document.getElementById("completed");
    const completedData = await fetchDataCompleted(page);

    if (page > totalOngoingPages) {
      currentCompletedPage = totalCompletedPages;
      return loadCompleted(currentCompletedPage);
    }

    console.log(completedData);

    completed.innerHTML = `
        <div class="top-title">
            <h1>Completed</h1>
        </div>
        ${completedData
          .map((completed) => {
            return `
            <a href="details.html?anime=${completed.endpoint}" class="aside-episode">
                <img src="${completed.thumb}" alt="${completed.title}" class="completed-img" loading="lazy" />
                <div class="info">
                    <h4>${completed.title}</h4>
                    <h5>${completed.updated_on}</h5>
                </div>
            </a>
            `;
          })
          .join("")}
    
        <div class="pagination">
              <button id="completed-prevPage" ${
                page === 1 ? "disabled" : ""
              }>Previous</button>
              <span>Page ${page}</span>
              <button id="completed-nextPage" ${
                page >= totalCompletedPages ? "disabled" : ""
              }>Next</button>
        </div>`;

    document
      .getElementById("completed-prevPage")
      .addEventListener("click", () => {
        if (page > 1) {
          currentCompletedPage--;
          loadCompleted(currentCompletedPage);
        }
      });

    document
      .getElementById("completed-nextPage")
      .addEventListener("click", () => {
        if (page < totalOngoingPages) {
          currentCompletedPage++;
          loadCompleted(currentCompletedPage);
        }
      });
  };

  loadCompleted(currentCompletedPage);
  loadOngoing(currentOngoingPage);
});
