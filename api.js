import { getUserFromLocalStorage, sanitize } from "./helpers.js";

const personalKey = "katia-vasileva";
const baseHost = "https://wedev-api.sky.pro";
const postsHost = `${baseHost}/api/v1/${personalKey}/instapro`;

export function getPosts({ token }) {
  return fetch(postsHost, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function registerUser({ login, password, name, imageUrl }) {
  return fetch(baseHost + "/api/user", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
      name,
      imageUrl,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Такой пользователь уже существует");
    }
    return response.json();
  });
}

export function loginUser({ login, password }) {
  return fetch(baseHost + "/api/user/login", {
    method: "POST",
    body: JSON.stringify({
      login,
      password,
    }),
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Неверный логин или пароль");
    }
    return response.json();
  });
}

// Загружает картинку в облако, возвращает url загруженной картинки
export function uploadImage({ file }) {
  const data = new FormData();
  data.append("file", file);

  return fetch(baseHost + "/api/upload/image", {
    method: "POST",
    body: data,
  }).then((response) => {
    return response.json();
  });
}

export function addPost({ description, imageUrl }) {
  let user = getUserFromLocalStorage();

  return fetch(postsHost, {
    method: "POST",
    headers: {
      Authorization: `Bearer ${user.token}`
    },
    body: JSON.stringify({
      description: sanitize(description),
      imageUrl: imageUrl
    })
  }).then((response) => {
    if (response.status === 400) {
      throw new Error("Bad request");
    }
    return response.json();
  })
}

export function getUserPosts({ token, id }) {
  return fetch(postsHost + "/user-posts/" + id, {
    method: "GET",
    headers: {
      Authorization: token,
    },
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Нет авторизации");
      }

      return response.json();
    })
    .then((data) => {
      return data.posts;
    });
}

export function likePost({ token, id }) {
  let user = getUserFromLocalStorage();

  return fetch(postsHost + "/" + id + "/like", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${!user ? token : user.token}`
    }
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      return response.json();
    })
}

export function unlikePost({ token, id }) {
  let user = getUserFromLocalStorage();

  return fetch(postsHost + "/" + id + "/dislike", {
    method: "POST",
    headers: {
      Authorization: `Bearer ${!user ? token : user.token}`
    }
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      return response.json();
    });
}

export function deletePost({ token, id }) {
  let user = getUserFromLocalStorage();

  return fetch(postsHost + "/" + id, {
    method: "DELETE",
    headers: {
      Authorization: `Bearer ${!user ? token : user.token}`
    }
  })
    .then((response) => {
      if (response.status === 401) {
        throw new Error("Unauthorized");
      }
      return response.json();
    });
}

