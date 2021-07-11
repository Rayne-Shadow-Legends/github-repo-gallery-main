let overview = document.querySelector(".overview");
let username = "Rayne-Shadow-Legends";

let repoList = document.querySelector(".repo-list");

let reposClass = document.querySelector(".repos");
let repoData = document.querySelector(".repo-data");

let repoBackButton = document.querySelector(".view-repos");
let filterInput = document.querySelector(".filter-repos");

let gitUserInfo = async function() {
    let userInfoRequest = await fetch(`https://api.github.com/users/${username}`);
    userInfo = await userInfoRequest.json();
    displayUserInfo(userInfo);
};

    gitUserInfo();

    let displayUserInfo = function(){
        let div = document.createElement("div");
        div.classList.add("user-info");

        div.innerHTML = `
        <figure>
          <img alt="user avatar" src=${userInfo.avatar_url} />
        </figure>
        <div>
          <p><strong>Name:</strong> ${userInfo.name}</p>
          <p><strong>Bio:</strong> ${userInfo.bio}</p>
          <p><strong>Location:</strong> ${userInfo.location}</p>
          <p><strong>Number of public repos:</strong> ${userInfo.public_repos}</p>
        </div>
      `;
      overview.append(div);
    };

let getRepos = async function() {
  let repoRequest = await fetch(`https://api.github.com/users/${username}/repos?sort=updated&per_page=100`);
  let repos = await repoRequest.json();
  displayRepos(repos);
};

let displayRepos = function(repos) {
  filterInput.classList.remove("hide");
  for(let repo of repos) {
    let li = document.createElement("li");
    li.classList.add("repo");
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
};

getRepos();

repoList.addEventListener("click", function(e){
  if (e.target.matches("h3")){
    let repoName = e.target.innerText;
    getRepoInfo(repoName);
  };
});

let getRepoInfo = async function(repoName){
  let repoInfoRequest = await fetch(`https://api.github.com/repos/${username}/${repoName}`);
  let repoInfo = await repoInfoRequest.json();
  console.log(repoInfo);

  let fetchLanguages =  await fetch(repoInfo.languages_url);
  let languageData = await fetchLanguages.json();

  for(let language in languageData) {
    let languages = [];
    languages.push(language);

    displayRepoInfo(repoInfo, languages);
  };
};

let displayRepoInfo = async function(repoInfo, languages) {
  repoData.innerHTML = "";
  let div = document.createElement("div");
  div.innerHTML = `
    <h3>Name: ${repoInfo.name}</h3>
      <p>Description: ${repoInfo.description}</p>
      <p>Default Branch: ${repoInfo.default_branch}</p>
      <p>Languages: ${languages.join(", ")}</p>
      <a class="visit" href="${repoInfo.html_url}" target="_blank" rel="noreferrer noopener">View Repo on GitHub!</a>`;

      repoData.append(div);
      repoData.classList.remove("hide");
      reposClass.classList.add("hide")

      repoBackButton.classList.remove("hide");
  };

repoBackButton.addEventListener("click", function(){
  reposClass.classList.remove("hide");
  repoData.classList.add("hide");
  repoBackButton.classList.add("hide");
});

filterInput.addEventListener("input", function(e){
  let searchValue = e.target.value;
  let repos = document.querySelectorAll(".repo");
  let userSearch = searchValue.toLowerCase();

  for(let repo of repos) {
    let repoLowerCase = repo.innerText.toLowerCase();
    if(repoLowerCase.includes(userSearch)) {
      repo.classList.remove("hide")
    } else{
      repo.classList.add("hide");
    };
  };
});
