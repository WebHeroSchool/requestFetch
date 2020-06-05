const parametr = window.location.search;
const username = parametr.substring(10);
const url = `https://api.github.com/users/${username}`;
const date = new Date();
const time = 5000;

const getDate = new Promise ((resolve, reject) => {
  setTimeout(() => date ? resolve(date) : reject('Дата неизвестна'), time);
});
const getUrl = new Promise ((resolve, reject) => {
  setTimeout(() => url ? resolve(url) : reject('Ссылка не найдена'), time);
});

const preloader = document.querySelector('.load-1');
const stopPr = new Promise ((resolve, reject) => {
  setTimeout(() => {
    preloader ? resolve(preloader.style.display = 'none') : reject('Неверный класс');
  }, time - 30);
})

Promise.all([stopPr, getDate, getUrl])
  .then(([preloader, date, url]) => fetch(url))
  .then(response => {
    if (response.ok)
      return response.json();
      alert('Информация о пользователе не доступна');
  })
  .then(json => {
    console.log(json.avatar_url);
    console.log(json.name);
    console.log(json.bio);
    console.log(json.html_url);

    const avatar = json.avatar_url;
    const name = json.name;
    const bio = json.bio;
    const mainLink = json.html_url;

    const title = document.createElement('h2');
    const div = document.createElement('div');
    const elem = document.createElement('p');

    const img = new Image();
    img.src = avatar;
    title.innerHTML = name;
    div.innerHTML = bio;
    elem.innerHTML = date;

    document.body.append(img, title, div, elem);

    title.addEventListener("click", () => window.location.assign(mainLink));
  })
  .catch(err => console.log('Failed to fetch'));