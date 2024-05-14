import { renderHeaderComponent } from "./header-component.js";
import { renderUploadImageComponent } from "./upload-image-component.js";

export function renderAddPostPageComponent({ appEl, onAddPostClick }) {
  let imageUrl = "";

  const render = () => {
    const appHtml = `
    <div class="page-container">
      <div class="header-container"></div>
      <h3 class="form-title">Добавление поста</h3>
      <div class="form-inputs">
        <input type="text" id="description-input" class="input" placeholder="Описание"/>
        <div class="upload-image-container"></div>
        <div class="form-error"></div>
        <button class="button" id="add-button">Добавить</button>
      </div>
    </div>
  `;

    appEl.innerHTML = appHtml;

    renderHeaderComponent({
      element: document.querySelector(".header-container"),
    });

    const uploadImageContainer = appEl.querySelector(".upload-image-container");

    if (uploadImageContainer) {
      renderUploadImageComponent({
        element: appEl.querySelector(".upload-image-container"),
        onImageUrlChange(newImageUrl) {
          imageUrl = newImageUrl;
        },
      });
    }

    document.getElementById("add-button").addEventListener("click", () => {
      const description = document.getElementById("description-input").value;
      onAddPostClick({
        description: description,
        imageUrl: imageUrl,
      });
      if (!description || description.trim() === "") {
            alert("Введите описание");
            return;
          }
          if (!imageUrl) {
            alert("Не выбрана фотография");
            return;
          }
    });
  };

  render();
}
