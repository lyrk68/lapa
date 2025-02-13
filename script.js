document.addEventListener("DOMContentLoaded", function () {
    let currentIndex = 0;
    const slides = document.querySelectorAll(".slide");
    const totalSlides = slides.length;
    
    function showSlide(index) {
        const slideContainer = document.querySelector(".slides");
        slideContainer.style.transform = `translateX(-${index * 100}%)`;
    }

    window.nextSlide = function () {
        currentIndex = (currentIndex + 1) % totalSlides;
        showSlide(currentIndex);
    };

    window.prevSlide = function () {
        currentIndex = (currentIndex - 1 + totalSlides) % totalSlides;
        showSlide(currentIndex);
    };

    setInterval(() => {
        nextSlide();
    }, 4000); // Cambia de imagen cada 4 segundos

    window.playMusic = function () {
        const audio = document.getElementById("backgroundMusic");
        audio.play();
    };

    // Animación de corazones en el fondo
    const heartCanvas = document.getElementById("heartCanvas");
    const ctx = heartCanvas.getContext("2d");
    heartCanvas.width = window.innerWidth;
    heartCanvas.height = window.innerHeight;

    const hearts = [];

    function createHeart() {
        return {
            x: Math.random() * heartCanvas.width,
            y: heartCanvas.height + 10,
            size: Math.random() * 20 + 10,
            speed: Math.random() * 2 + 1,
            opacity: Math.random() * 0.5 + 0.5,
        };
    }

    function drawHearts() {
        ctx.clearRect(0, 0, heartCanvas.width, heartCanvas.height);
        hearts.forEach((heart, index) => {
            ctx.fillStyle = `rgba(255, 0, 100, ${heart.opacity})`;
            ctx.beginPath();
            ctx.arc(heart.x, heart.y, heart.size, 0, Math.PI * 2);
            ctx.fill();
            heart.y -= heart.speed;

            if (heart.y < -10) hearts[index] = createHeart();
        });
    }

    function updateHearts() {
        if (hearts.length < 50) {
            hearts.push(createHeart());
        }
        drawHearts();
        requestAnimationFrame(updateHearts);
    }

    updateHearts();
});
