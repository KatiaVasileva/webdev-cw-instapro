export function saveUserToLocalStorage(user) {
    window.localStorage.setItem("user", JSON.stringify(user));
}

export function getUserFromLocalStorage(user) {
    try {
        return JSON.parse(window.localStorage.getItem("user"));
    } catch (error) {
        return null;
    }
}

export function removeUserFromLocalStorage(user) {
    window.localStorage.removeItem("user");
}

export function sanitize(text) {
    return text.replaceAll("<", "&lt;").replaceAll(">", "&gt;");
}

export function getLikeString(likeLength, nameString) {
    let likeString;
    if (likeLength === 0) {
        likeString = 0;
    } else if (likeLength === 1) {
        likeString = nameString;
    } else {
        likeString = nameString + " и еще " + (likeLength - 1);
    }
    return likeString;
}
