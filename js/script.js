let overview = document.querySelector(".overview");
let username = "Rayne-Shadow-Legends";

let repoList = document.querySelector(".repo-list");

let gitUserInfo = async function() {
    let userInfoRequest = await fetch(`https://api.github.com/users/${username}`);
    userInfo = await userInfoRequest.json();
    console.log(userInfo);
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
  console.log(repos);
  displayRepoInfo(repos);
};

let displayRepoInfo = function(repos) {
  for(let repo of repos) {
    let li = document.createElement("li");
    li.classList.add("repo")
    li.innerHTML = `<h3>${repo.name}</h3>`;
    repoList.append(li);
  }
};

getRepos();