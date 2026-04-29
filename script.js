"use strict";

const menuToggle = document.getElementById("menuToggle");
const navMenu = document.getElementById("navMenu");

if (menuToggle && navMenu) {
    menuToggle.addEventListener("click", function () {
        navMenu.classList.toggle("active");
    });
}
const form = document.getElementById("inquiryForm");

if (form) {
    form.addEventListener("submit", function (e) {
        e.preventDefault();

        let isValid = true;

        function setError(input, message) {
            const group = input.parentElement;
            const error = group.querySelector(".error-message");
            error.textContent = message;
            input.style.borderColor = "#ff6b6b";
            isValid = false;
        }

        function clearError(input) {
            const group = input.parentElement;
            const error = group.querySelector(".error-message");
            error.textContent = "";
            input.style.borderColor = "var(--border-gray)";
        }

        const name = document.getElementById("name");
        const email = document.getElementById("email");
        const pieceType = document.getElementById("piece-type");
        const budget = document.getElementById("budget");
        const timeline = document.getElementById("timeline");
        const description = document.getElementById("description");

        [name, email, pieceType, budget, timeline, description].forEach(clearError);

        if (name.value.trim() === "") {
            setError(name, "Name is required");
        }

        if (email.value.trim() === "") {
            setError(email, "Email is required");
        } else if (!/\S+@\S+\.\S+/.test(email.value)) {
            setError(email, "Enter a valid email");
        }

        if (pieceType.value === "") {
            setError(pieceType, "Select a piece type");
        }

        if (budget.value === "") {
            setError(budget, "Select a budget");
        }

        if (timeline.value === "") {
            setError(timeline, "Select a timeline");
        }

        if (description.value.trim() === "") {
            setError(description, "Please describe your project");
        }

        if (isValid) {
            const successMessage = document.createElement("p");
            successMessage.textContent = `Thank you ${name.value.trim()}, we will be in touch with you soon.`;
            successMessage.style.color = "var(--gold)";
            successMessage.style.textAlign = "center";
            successMessage.style.marginTop = "1rem";

            form.innerHTML = "";
            form.appendChild(successMessage);
        }
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

