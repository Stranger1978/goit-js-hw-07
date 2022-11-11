import { galleryItems } from './gallery-items.js';
// Change code below this line
//import * as basicLightbox from 'basiclightbox';
//const addLinkCss = document.querySelector('head');
//const addLinkScript = document.querySelector('script');
//addLinkCss.insertAdjacentHTML('beforeend', `<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.css">`);
//addLinkScript.insertAdjacentHTML('beforebegin', `<script src="https://cdn.jsdelivr.net/npm/basiclightbox@5.0.4/dist/basicLightbox.min.js"></script>`);

// Створення галереї по шаблону
const body = document.body;
const imageGalleryContainer = document.querySelector('.gallery');
const imageGalleryMarkup = createImageGalleryMarkup(galleryItems);  

let instance = '';

imageGalleryContainer.insertAdjacentHTML('beforeend', imageGalleryMarkup);
function createImageGalleryMarkup (galleryItems) {
    return galleryItems.map(({preview, original, description}) => {
     return  `<div class="gallery__item">
     <a class="gallery__link" href="${original}">
     <img
       class="gallery__image"
       src="${preview}"
       data-source="${original}"
       alt="${description}"
     />
     </a>
     </div>
     `;  
    }).join('');
}

// слухач кліку (перевірка на те, що клік саме по необхідній області)
imageGalleryContainer.addEventListener('click', onImageGalleryContainerClick);

function onImageGalleryContainerClick (evt) {
    evt.preventDefault();

    if (!evt.target.classList.contains('gallery__image')){
        return;
    }
    const originImage = evt.target.dataset.source;

    createModalWindow(originImage);
}

// функція відкриття модального вікна
function createModalWindow(originImage) {
    instance = basicLightbox.create(`<img src="${originImage}" width="800" height="600">`,
{onShow: () => window.addEventListener('keydown', onEscapeButtonKeyPress),
 onClose: () => window.addEventListener('keydown', onEscapeButtonKeyPress),
});
instance.show();

}

// слухач кліку на ЕСКЕЙП

function onEscapeButtonKeyPress(evt){
    
    if (evt.code !== 'Escape') {
        return;
    } 
   instance.close();   
} 
