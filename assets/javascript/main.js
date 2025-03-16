// const API_KEY = "04ea01bd16ad1936db4a321fbc077641";

// document.addEventListener("DOMContentLoaded", async () => {
//   let slideIndex = 1;
//   let slideInterval;

//   // Slideshow
//   const API_KEY = "04ea01bd16ad1936db4a321fbc077641";
//   const URI = `https://api.themoviedb.org/3/discover/tv?api_key=${API_KEY}&with_genres=16&with_origin_country=JP&sort_by=popularity.desc&first_air_date.gte=2024-01-01&vote_count.gte=100`;

//   const fetchAnimeData = async () => {
//     try {
//       const response = await fetch(URI);
//       const data = await response.json();
//       return data.results.slice(0, 10);
//     } catch (error) {
//       console.error("Error fetching anime data:", error);
//       return [];
//     }
//   };

//   const updateSlideshow = async () => {
//     const animeList = await fetchAnimeData();
//     window.animeList = animeList;
//     const slideShowContainer = document.querySelector(".slideshow");

//     slideShowContainer.innerHTML = animeList
//       .map((anime, index) => {
//         return `
//         <div class="slides fade">
//             <div class="numberSlide">${index + 1}/${animeList.length}</div>
//             <img src="https://image.tmdb.org/t/p/w1280${
//               anime.backdrop_path
//             }" alt="${anime.name}" onclick="openPopup(${index})"/>
//             <div class="captionSlide">${anime.name}</div>
//         </div>
//         `;
//       })
//       .join("");

//     slideShowContainer.innerHTML += `
//       <a class="prev" onclick="plusSlides(-1)">&#10094;</a>
//       <a class="next" onclick="plusSlides(1)">&#10095;</a>
//       `;

//     showSlides(slideIndex);
//   };

//   const showSlides = (n) => {
//     let i;
//     const slides = document.getElementsByClassName("slides");
//     if (slides.length === 0) return;
//     if (n > slides.length) {
//       slideIndex = 1;
//     }
//     if (n < 1) {
//       slideIndex = slides.length;
//     }
//     for (i = 0; i < slides.length; i++) {
//       slides[i].style.display = "none";
//     }
//     slides[slideIndex - 1].style.display = "block";
//   };

//   const plusSlides = (n) => {
//     showSlides((slideIndex += n));
//   };

//   window.plusSlides = plusSlides;

//   await updateSlideshow();

//   const startSlideShow = () => {
//     slideInterval = setInterval(() => {
//       plusSlides(1);
//     }, 10000);
//   };

//   startSlideShow();

//   // Popup
//   window.openPopup = (index) => {
//     const popup = document.getElementById("popup");
//     const popupContent = document.getElementById("popupContent");

//     if (!popup || !popupContent) {
//       console.error("Popup element not found.");
//       return;
//     }

//     if (!window.animeList || window.animeList.length === 0) {
//       console.error("Anime list is empty.");
//       return;
//     }

//     if (index < 0 || index >= window.animeList.length) {
//       console.error("Invalid index.");
//       return;
//     }

//     const anime = window.animeList[index];

//     popupContent.innerHTML = `
//       <button class="close-btn" onclick="closePopup()">&times;</button>
//       <h2>${anime.name}</h2>
//       <img src="https://image.tmdb.org/t/p/w500${anime.poster_path}" alt="${anime.name}"/>
//       <p>${anime.overview}</p>
//     `;

//     console.log("Popup dibuka!");
//     popup.classList.add("show");
//     clearInterval(slideInterval);
//     console.log("Popup opened:", anime.name);
//   };

//   window.closePopup = () => {
//     const popup = document.getElementById("popup");
//     if (!popup) {
//       console.error("Popup element not found when trying to close.");
//       return;
//     }
//     console.log("Popup ditutup!");
//     popup.classList.remove("show");
//     slideInterval = setInterval(() => {
//       plusSlides(1);
//     }, 10000);
//     console.log("Popup closed.");
//   };
// });

console.log("Makan cuyy");
const searchPage = () => {
  window.location.href = "search.html";
};
