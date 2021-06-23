let profileInfo = document.querySelector(".overview")
let username = "Rayne-Shadow-Legends"

let gitUserInfo = async function() {
    let userInfo = await fetch(`https://api.github.com/users/${username}`);
    UserInfo = await userInfo.json;
    console.log(userInfo);
}

gitUserInfo();
