document.addEventListener("DOMContentLoaded", () => {
    const track = document.querySelector(".works-track");
    const items = document.querySelectorAll(".works-item");
    const prevBtn = document.querySelector(".works-prev");
    const nextBtn = document.querySelector(".works-next");
    const dots = document.querySelectorAll(".works-dot");

    const itemGap = 20; // CSSの gap と同じ
    const visibleCount = 2; // 2枚表示
    const itemWidth = items[0].offsetWidth + itemGap;

    let currentIndex = 0;

    // 最大インデックス（最後で止まらないため）
    const maxIndex = items.length - visibleCount;

    function updateSlider() {
        track.style.transform = `translateX(${-currentIndex * itemWidth}px)`;

        dots.forEach((dot, i) => {
            dot.classList.toggle(
                "is-active",
                i === currentIndex || i === currentIndex + 1
            );
        });
    }

    nextBtn.addEventListener("click", () => {
        currentIndex++;
        if (currentIndex > maxIndex) {
            currentIndex = 0; // 無限ループ
        }
        updateSlider();
    });

    prevBtn.addEventListener("click", () => {
        currentIndex--;
        if (currentIndex < 0) {
            currentIndex = maxIndex; // 無限ループ
        }
        updateSlider();
    });

    dots.forEach((dot, index) => {
        dot.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
        });
    });
});
