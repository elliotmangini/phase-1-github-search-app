

let form = document.querySelector('#github-form');
let searchField = document.querySelector('#github-form #search')
let userList = document.querySelector('#user-list');
let repoList = document.querySelector('#repos-list');



const displayUser = (jsData) => {
    console.log(jsData);
    let name = document.createElement('h1');
    name.textContent = jsData.login;
    let avatar = document.createElement('img');
    avatar.width = 300;
    avatar.src = jsData.avatar_url;
    userList.append(name);
    userList.append(avatar);
};

const displayRepos = (jsData) => {
    console.log(jsData);

    jsData.forEach(object => {

        console.log(object.name);

        let repo = document.createElement('li')
        repo.textContent = object.name;
        repoList.append(repo);
        let link = document.createElement('a')
        link.href = object.html_url;
        link.textContent = 'check out this repo ^';
        repoList.append(link);

    });
};

form.addEventListener('submit', (e) => {

    e.preventDefault();

    fetch(`https://api.github.com/users/${searchField.value}`)
    .then(resp => resp.json())
    .then(jsContent => displayUser(jsContent))
    .catch();

    fetch(`https://api.github.com/users/${searchField.value}/repos`)
    .then(resp => resp.json())
    .then(jsContent => displayRepos(jsContent))
    .catch();

})