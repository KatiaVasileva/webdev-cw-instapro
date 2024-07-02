import { uploadImage } from "../api.js";
import { renderAddPostPageComponent } from "./add-post-page-component.js";
import { addPost } from "../api.js";
import { goToPage, page } from "../render-pages.js";
import { ADD_POSTS_PAGE, AUTH_PAGE, POSTS_PAGE } from "../routes.js";
import { renderAuthPageComponent } from "./auth-page-component.js";

export function renderUploadImageComponent({ element, onImageUrlChange }) {
    let imageUrl = "";

    const render = () => {
        element.innerHTML = `
  <div class="upload=image">
      ${
          imageUrl
              ? `
          <div class="file-upload-image-conrainer">
            <img class="file-upload-image" src="${imageUrl}">
            <button class="file-upload-remove-button button">Заменить фото</button>
          </div>
          `
              : `
            <label class="file-upload-label secondary-button">
                <input
                  type="file"
                  class="file-upload-input"
                  style="display:none"
                />
                Выберите фото
            </label>
          
      `
      }
  </div>
`;

        const fileInputElement = element.querySelector(".file-upload-input");
        const appEl = document.getElementById("app");

        fileInputElement?.addEventListener("change", () => {
            const file = fileInputElement.files[0];
            if (file) {
                const lableEl = document.querySelector(".file-upload-label");
                lableEl.setAttribute("disabled", true);
                lableEl.textContent = "Загружаю файл...";
                uploadImage({ file })
                    .then(({ fileUrl }) => {
                        imageUrl = fileUrl;
                        onImageUrlChange(imageUrl);
                        render();
                    })
                    .catch((error) => {
                        alert(
                            "Кажется, у вас сломался интернет, попробуйте позже",
                        );
                        console.error(error);
                        if (page === ADD_POSTS_PAGE) {
                            renderAddPostPageComponent({
                                appEl,
                                onAddPostClick({ description, imageUrl }) {
                                    addPost({
                                        description: description,
                                        imageUrl,
                                    }).then(() => {
                                        goToPage(POSTS_PAGE);
                                    });
                                },
                            });
                        } else if (page === AUTH_PAGE) {
                            renderAuthPageComponent({ appEl, setUser: null });
                        }
                    });
            }
        });

        element
            .querySelector(".file-upload-remove-button")
            ?.addEventListener("click", () => {
                imageUrl = "";
                onImageUrlChange(imageUrl);
                render();
            });
    };

    render();
}
