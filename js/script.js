let overview = document.querySelector(".overview")
let username = "Rayne-Shadow-Legends"

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

        div.innerHTML = `<div> 
        <figure>
        <img alt="user avatar" src=${userInfo.avatar_url}/>
      </figure>
      <div>
        <p><strong>Name:</strong> ${userInfo.name}</p>
        <p><strong>Bio:</strong> ${userInfo.bio}</p>
        <p><strong>Location:</strong> ${userInfo.location}</p>
        <p><strong>Number of public repos:</strong> ${userInfo.public_repos}</p>
      </div>
        </div>`
        overview.append(div);
    };