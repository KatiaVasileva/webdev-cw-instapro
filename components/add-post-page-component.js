import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <h3 class="form-title">Добавление поста</h3>
      <div class="form-inputs">
        <input type="text" id="name-input" class="input" placeholder="Описание"/>
        <div class="upload-image-container"></div>
        <button class="button" id="add-button">Добавить</button>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    document.getElementById("add-button").addEventListener("click", () => {
      onAddPostClick({
        description: "Описание картинки",
        imageUrl: "https://image.png",
      });
    });
  };

  render();

  renderHeaderComponent({
    element: document.querySelector(".header-container"),
  });

  const uploadImageContainer = appEl.querySelector(".upload-image-container");

  if (uploadImageContainer) {
    renderUploadImageComponent({
      element: appEl.querySelector(".upload-image-container"),
      // onImageUrlChange(newImageUrl) {
      //   imageUrl = newImageUrl;
      // },
    });
  }
}
