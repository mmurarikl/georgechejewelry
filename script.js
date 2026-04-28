const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
}

const galleryItems = document.querySelectorAll(".gallery-item");
const lightbox = document.getElementById("lightbox");

const lightboxImage = document.getElementById("lightboxImage");
const lightboxTitle = document.getElementById("lightboxTitle");
const lightboxMaterial = document.getElementById("lightboxMaterial");
const lightboxDescription = document.getElementById("lightboxDescription");

const closeLightbox = document.getElementById("closeLightbox");
const prevBtn = document.getElementById("prevBtn");
const nextBtn = document.getElementById("nextBtn");

let currentImages = [];
let currentIndex = 0;

galleryItems.forEach(function (item) {
    item.addEventListener("click", function () {

        currentImages = item.dataset.images.split(",").map(function (img) {
            return img.trim();
        });

        currentIndex = 0;

        // 👇 THIS is what updates your luxury layout
        lightboxTitle.textContent = item.dataset.title;
        lightboxMaterial.textContent = item.dataset.material;
        lightboxDescription.textContent = item.dataset.description;

        showImage();
        lightbox.classList.add("active");
    });
});

function showImage() {
    lightboxImage.src = currentImages[currentIndex];
}

nextBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    currentIndex++;
    if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }

    showImage();
});

prevBtn.addEventListener("click", function (e) {
    e.stopPropagation();

    currentIndex--;
    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    }

    showImage();
});

closeLightbox.addEventListener("click", function () {
    lightbox.classList.remove("active");
});

lightbox.addEventListener("click", function (e) {
    if (e.target === lightbox) {
        lightbox.classList.remove("active");
    }
});