$(function () {
    const $slider = $('.js-works-slick');
    if (!$slider.length) return;

    // ★ 再初期化対策（これが消えてた）
    if ($slider.hasClass('slick-initialized')) {
        $slider.slick('unslick');
    }

    $slider.slick({
        slidesToShow: 2,
        slidesToScroll: 1,

        centerMode: true,
        centerPadding: '160px',

        autoplay: true,
        autoplaySpeed: 0,      // PC：止まらず流れる
        speed: 5000,
        cssEase: 'linear',
        infinite: true,

        pauseOnHover: false,
        pauseOnFocus: false,

        arrows: false,
        dots: false,

        responsive: [
            {
                breakpoint: 768,
                settings: {
                    slidesToShow: 1,
                    slidesToScroll: 1,

                    centerMode: true,
                    centerPadding: '40px',

                    autoplay: true,
                    autoplaySpeed: 3000, // SP：3秒
                    speed: 500,
                    cssEase: 'ease',
                    infinite: true,

                    arrows: true,
                    prevArrow: $('.works-prev'),
                    nextArrow: $('.works-next'),
                    dots: false
                }
            }
        ]
    });
});


// TOPページ
$(function () {
    const $toTop = $('.js-to-top');
    const $concept = $('#contact');

    if (!$toTop.length || !$concept.length) return;

    $toTop.hide(); // 最初は非表示

    $(window).on('scroll', function () {
        const scrollTop = $(this).scrollTop();
        const conceptTop = $concept.offset().top - 600; // 少し手前で出す

        if (scrollTop >= conceptTop) {
            $toTop.fadeIn();
        } else {
            $toTop.fadeOut();
        }
    });

    $toTop.on('click', function (e) {
        e.preventDefault();
        $('html, body').animate({ scrollTop: 0 }, 800);
    });
});


// カーソル
const isTouchDevice =
    "ontouchstart" in window || navigator.maxTouchPoints > 0;

if (!isTouchDevice) {
    document.addEventListener("click", (e) => {
        if (e.target.closest("input, textarea, select")) return;

        const target = e.target.closest("a, button, .to-top");
        if (!target) return;

        const sparkle = document.createElement("span");
        sparkle.className = "click-sparkle";

        sparkle.style.left = (e.clientX - 13) + "px";
        sparkle.style.top = (e.clientY - 13) + "px";

        document.body.appendChild(sparkle);
        setTimeout(() => sparkle.remove(), 320);
    });
}


// ハンバーガーメニュー

// ハンバーガーメニュー（差し替え用：再発防止つき）
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const openBtn = document.querySelector(".hamburger");
    const menu = document.getElementById("sp-menu");
    const closeBtn = document.querySelector(".sp-menu__close");
    const links = document.querySelectorAll(".sp-menu__list a");

    if (!openBtn || !menu || !closeBtn) return;

    // ▼ CSSのtransition秒数と合わせる
    const DURATION = 250;

    // ▼ CSSの@mediaと同じ数字にする（768→900にしたいならここも900）
    const BREAKPOINT = 768;

    const isSP = () => window.innerWidth <= BREAKPOINT;

    const forceClose = () => {
        menu.classList.remove("is-open");
        body.classList.remove("is-menu-open");
        openBtn.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");
    };

    const openMenu = () => {
        // PC幅では開かない（事故防止）
        if (!isSP()) return;

        menu.classList.add("is-open");
        body.classList.add("is-menu-open");
        openBtn.setAttribute("aria-expanded", "true");
        menu.setAttribute("aria-hidden", "false");
    };

    const closeMenu = () => {
        // 先にメニューを閉じる（フェードアウト開始）
        menu.classList.remove("is-open");
        openBtn.setAttribute("aria-expanded", "false");
        menu.setAttribute("aria-hidden", "true");

        // 背景クラスはフェード後に外す（チラッ防止）
        window.setTimeout(() => {
            body.classList.remove("is-menu-open");
        }, DURATION);
    };

    // クリックで開く
    openBtn.addEventListener("click", openMenu);

    // クリックで閉じる
    closeBtn.addEventListener("click", closeMenu);

    // メニュー内リンクで閉じる
    links.forEach((a) => a.addEventListener("click", closeMenu));

    // Escで閉じる
    document.addEventListener("keydown", (e) => {
        if (e.key === "Escape" && menu.classList.contains("is-open")) {
            closeMenu();
        }
    });

    // ▼ 初期ロード時：PC幅なら強制で閉じる（開きっぱなし事故防止）
    if (!isSP()) forceClose();

    // ▼ リサイズ時：PC幅になったら必ず閉じる（再発防止の本命）
    window.addEventListener("resize", () => {
        if (!isSP()) forceClose();
    });
});
