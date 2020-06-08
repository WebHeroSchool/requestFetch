const parametr = window.location.search;
const username = parametr.substring(10);
const url = `https://api.github.com/users/${username}`;
const date = new Date();
const time = 5000;
const elem = document.getElementById('section');

const getDate = new Promise ((resolve, reject) => {
  setTimeout(() => date ? resolve(date) : reject('Дата неизвестна'), time);
});
const getUrl = new Promise ((resolve, reject) => {
  setTimeout(() => url ? resolve(url) : reject('Ссылка не найдена'), time);
});

const preloader = document.querySelector('.load-1');
const stopPr = new Promise ((resolve, reject) => {
  setTimeout(() => preloader ? resolve(true) : reject('Неверный класс'), time - 30);
});

Promise.all([stopPr, getDate, getUrl])
  .then(([preloader, date, url]) => fetch(url))
  .then(response => {
    if (response.ok)
      return response.json();
      alert('Информация о пользователе не доступна');
  })
  .then(json => {
    const avatar = json.avatar_url;
    const name = json.name;
    const bio = json.bio;
    const mainLink = json.html_url;

    preloader.style.display = 'none';

    elem.insertAdjacentHTML('beforeend', `<img src = '${avatar}' alt = 'photo'>`);
    elem.insertAdjacentHTML('beforeend', `<h2>${name}</h2>`);
    elem.insertAdjacentHTML('beforeend', `<div>${bio}</div>`);
    elem.insertAdjacentHTML('beforeend', `<p>${date}</p>`);

    const title = document.querySelector('h2');
    title.addEventListener("click", () => window.location.assign(mainLink));
  })
  .catch(err => alert('Failed to fetch'));