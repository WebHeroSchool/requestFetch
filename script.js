const parametr = window.location.search;
const username = parametr.substring(10);
const url = `https://api.github.com/users/${username}`;

fetch(url)
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

    const img = new Image();
    img.src = avatar;
    title.innerHTML = name;
    div.innerHTML = bio;

    document.body.append(img, title, div);

    title.addEventListener("click", () => window.location.assign(mainLink));
  })
  .catch(err => console.log('Failed to fetch'));