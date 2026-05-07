const galleryContainer = document.querySelector("#gallery-container");
const loadMoreButton = document.querySelector("#load-more-button");
const statusText = document.querySelector("#status-text");

async function loadImages() {
  statusText.textContent = "Loading adorable dogs...";

  for (let i = 1; i <= 6; i++) {
    try {
      const response = await fetch("https://dog.ceo/api/breeds/image/random");

      if (!response.ok) {
        throw new Error("Unable to fetch");
      }

      const data = await response.json();
      const url = data.message;

      const card = document.createElement("article");
      card.className = "gallery-item";

      const img = document.createElement("img");
      img.src = url;
      img.alt = "A randomly fetched dog.";

      const caption = document.createElement("p");
      caption.textContent = `Dog #${galleryContainer.children.length + 1}`;

      card.appendChild(img);
      card.appendChild(caption);
      galleryContainer.appendChild(card);
    } catch (error) {
      statusText.textContent = "Something went wrong while loading dogs.";
      console.log(error);
      return;
    }
  }

  statusText.textContent = "Loaded a fresh set of dogs.";
}

loadMoreButton.addEventListener("click", loadImages);

loadImages();
