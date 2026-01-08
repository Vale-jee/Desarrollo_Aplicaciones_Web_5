const imageUrlInput = document.getElementById('image-url');
const addImageBtn = document.getElementById('add-image');
const deleteImageBtn = document.getElementById('delete-image');
const gallery = document.getElementById('gallery');

let selectedImage = null;

// Crear elemento de imagen con animaciones y selección
function createImageElement(url) {
    const img = document.createElement('img');
    img.src = url;

    img.addEventListener('click', () => {
        if (selectedImage) selectedImage.classList.remove('selected');
        selectedImage = img;
        img.classList.add('selected');
    });

    gallery.appendChild(img);
    setTimeout(() => img.classList.add('show'), 10);
}

// Cargar galería desde localStorage al iniciar la página
function loadGallery() {
    const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
    savedImages.forEach(url => createImageElement(url));
}

// Guardar una nueva URL en localStorage
function saveImage(url) {
    const savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
    savedImages.push(url);
    localStorage.setItem('galleryImages', JSON.stringify(savedImages));
}

// Eliminar URL de localStorage
function removeImage(url) {
    let savedImages = JSON.parse(localStorage.getItem('galleryImages')) || [];
    savedImages = savedImages.filter(imgUrl => imgUrl !== url);
    localStorage.setItem('galleryImages', JSON.stringify(savedImages));
}

// Agregar imagen desde input
function addImage() {
    const url = imageUrlInput.value.trim();
    if (!url) {
        alert("Por favor ingresa una URL válida.");
        return;
    }
    createImageElement(url);
    saveImage(url);
    imageUrlInput.value = '';
}

// Eliminar imagen seleccionada
function deleteImage() {
    if (!selectedImage) {
        alert("No hay ninguna imagen seleccionada.");
        return;
    }
    const url = selectedImage.src;
    selectedImage.classList.add('removed');
    setTimeout(() => {
        if (selectedImage && selectedImage.parentNode) {
            gallery.removeChild(selectedImage);
            removeImage(url);
            selectedImage = null;
        }
    }, 300);
}

// Eventos
addImageBtn.addEventListener('click', addImage);
deleteImageBtn.addEventListener('click', deleteImage);
imageUrlInput.addEventListener('keydown', (e) => {
    if (e.key === 'Enter') addImage();
});

// Inicializar galería al cargar
loadGallery();