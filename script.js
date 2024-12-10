const apiKey = 'afc5dc34b35d479ab4a3a0f5a2d65562';
const categorySelect = document.getElementById('category');
const searchInput = document.getElementById('search');
const searchButton = document.getElementById('search-btn');
const newsContainer = document.getElementById('news-container');

async function fetchNews(query = '', category = '') {
  const url = query
    ? `https://newsapi.org/v2/everything?q=${query}&apiKey=${apiKey}`
    : `https://newsapi.org/v2/top-headlines?category=${category}&apiKey=${apiKey}`;

  try {
    const response = await fetch(url);
    const data = await response.json();

    if (data.status === 'ok') {
      displayNews(data.articles);
    } else {
      newsContainer.innerHTML = '<p>Failed to load news.</p>';
    }
  } catch (error) {
    console.error('Error fetching news:', error);
    newsContainer.innerHTML = '<p>Something went wrong. Please try again later.</p>';
  }
}

function displayNews(articles) {
  newsContainer.innerHTML = ''; 

  articles.forEach(article => {
    const articleElement = document.createElement('article');
    
    const imageUrl = article.urlToImage || 'https://via.placeholder.com/150'; 
    articleElement.innerHTML = `
      <img src="${imageUrl}" alt="${article.title}" style="width: 100%; border-radius: 8px;">
      <h2><a href="${article.url}" target="_blank">${article.title}</a></h2>
      <p>${article.description || 'No description available.'}</p>
    `;
    newsContainer.appendChild(articleElement);
  });
}

fetchNews('', 'technology');

categorySelect.addEventListener('change', (event) => {
  fetchNews('', event.target.value);
});

searchButton.addEventListener('click', () => {
  const query = searchInput.value.trim();
  if (query) {
    fetchNews(query);
  }
});