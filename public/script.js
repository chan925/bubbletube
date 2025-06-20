function searchYouTube(pageToken = '') {
  const query = document.getElementById("searchInput").value;
  localStorage.setItem("lastSearch", query);
  const resultsDiv = document.getElementById("results");
  resultsDiv.innerHTML = '<img src="assets/spinner.svg" class="spinner" />';

  fetch(`/api/search?q=${encodeURIComponent(query)}&pageToken=${pageToken}`)
    .then(res => res.json())
    .then(data => {
      resultsDiv.innerHTML = "";
      data.items.forEach(item => {
        const videoId = item.id.videoId;
        const title = item.snippet.title;
        const thumbnail = item.snippet.thumbnails.medium.url;
        resultsDiv.innerHTML += `
          <div class="video">
            <a href="https://www.youtube.com/watch?v=${videoId}" target="_blank">
              <img src="${thumbnail}" alt="${title}" />
              <p>${title}</p>
            </a>
          </div>
        `;
      });
      if (data.prevPageToken || data.nextPageToken) {
        resultsDiv.innerHTML += `
          <div class="pagination">
            ${data.prevPageToken ? `<button onclick="searchYouTube('${data.prevPageToken}')">⬅ Prev</button>` : ""}
            ${data.nextPageToken ? `<button onclick="searchYouTube('${data.nextPageToken}')">Next ➡</button>` : ""}
          </div>
        `;
      }
    })
    .catch(err => {
      resultsDiv.innerHTML = "❌ Error fetching videos.";
      console.error(err);
    });
}

window.onload = () => {
  const lastSearch = localStorage.getItem("lastSearch");
  if (lastSearch) {
    document.getElementById("searchInput").value = lastSearch;
    searchYouTube();
  }
};
