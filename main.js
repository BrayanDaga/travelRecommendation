const btnSearch = document.getElementById('btnSearch');
const content = document.getElementById('content-home');
const results = document.getElementById('results');
const btnClear = document.getElementById('btnClear');

btnSearch.addEventListener('click', searchPlaces);

btnClear.addEventListener('click', function () {
  content.classList.remove('d-none');
  results.classList.add('d-none');
});

function searchPlaces() {
  content.classList.add('d-none');
  results.classList.remove('d-none');
  const input = document.getElementById('inputSearch').value.toLowerCase();
  results.innerHTML = '';

  fetch('travel_recommendation.json')
    .then(response => response.json())
    .then(data => {

      if (input === 'beach' || input === 'beaches') {
        resultsSearch = data.beaches;
      }
      else if (input === 'temple' || input === 'temples') {
        resultsSearch = data.temples;
      }
      else {
        resultsSearch = data.countries.find((item) => item.name.toLowerCase() === input);
        resultsSearch = resultsSearch.cities;

      }

      results.innerHTML = drawResults(resultsSearch);
    })
}

function drawResults(resultsSearch) {
  const resultsHTML = resultsSearch.map((item) => {
    return `<div class="card">
            <img src="${item.imageUrl}" alt="">
            <h4>${item.name}</h4>
            <p>${item.description}</p>
          </div>`
  }).join('');

  return resultsHTML;

}
