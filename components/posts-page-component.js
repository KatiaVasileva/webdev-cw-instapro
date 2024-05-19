import { USER_POSTS_PAGE } from "../routes.js";
import { renderHeaderComponent } from "./header-component.js";
import { posts, goToPage, page } from "../index.js";
import { getLikeString, sanitize } from "../helpers.js";
import { likePost, unlikePost } from "../api.js";

export function renderPostsPageComponent({ appEl, onLikePostClick }) {

  /**
   * TODO:  отформатировать дату создания поста в виде "19 минут назад"
   * c использованием https://date-fns.org/v2.29.3/docs/formatDistanceToNow
   */
  const postHtml = posts
    .map((post) => {

      let nameString = post.likes[0]?.name ?? 0;
      let likes = getLikeString(post.likes.length, nameString);

      return `
        <li class="post">
          <div class="${page === USER_POSTS_PAGE ? "post-header-none" : "post-header"}" data-user-id="${post.user.id}">
            <img src="${post.user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${sanitize(post.user.name)}</p>
          </div>
          <div class="post-image-container">
            <img class="post-image" src="${post.imageUrl}">
          </div>
          <div class="post-likes">
            <button data-post-id="${post.id}" data-liked="${post.isLiked}" class="like-button">
              <img id="like-image" src="${post.isLiked ? "./assets/images/like-active.svg" : "./assets/images/like-not-active.svg"}"}>
            </button>
            <p class="post-likes-text">
              Нравится: <strong>${likes}</strong>
            </p>
          </div>
          <p class="post-text">
            <span class="user-name">${sanitize(post.user.name)}</span>
            ${sanitize(post.description)}
          </p>
          <p class="post-date">
            ${post.createdAt}
          </p>
        </li>`;
    })
    .join("");

  const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <h3 class="${page === USER_POSTS_PAGE ? "form-title" : "form-title-none"}">
        <div class="post-header" data-user-id="${posts[0].user.id}">
            <img src="${posts[0].user.imageUrl}" class="post-header__user-image">
            <p class="post-header__user-name">${sanitize(posts[0].user.name)}</p>
        </div>
      </h3>
      <ul class="posts">${postHtml}</ul>
    </div>`;

  appEl.innerHTML = appHtml;

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  for (let userEl of document.querySelectorAll(".post-header")) {
    userEl.addEventListener("click", () => {
      goToPage(USER_POSTS_PAGE, {
        userId: userEl.dataset.userId,
      });
    });
  }

  const likeButtonElements = document.querySelectorAll(".like-button");
  const postHeaderElement = document.querySelector(".post-header");

  for (let likeButtonElement of likeButtonElements) {
    
    likeButtonElement.addEventListener("click", () => {
      onLikePostClick({
        id: likeButtonElement.dataset.postId,
        action: likeButtonElement.dataset.liked.toString() === "true" ? unlikePost : likePost,
        userId: postHeaderElement.dataset.userId
      });      
    })
  }
}
