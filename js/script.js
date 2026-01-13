// スライダー
const $slider = $('.js-works-slick');
const mq = window.matchMedia('(max-width: 768px)');

function enableSlick() {
    if ($slider.hasClass('slick-initialized')) return;

    $slider.slick({
        slidesToShow: 1,
        slidesToScroll: 1,
        infinite: true,
        speed: 700,


        autoplay: true,
        autoplaySpeed: 5000,
        pauseOnHover: true,
        pauseOnFocus: true,


        arrows: true,
        prevArrow: $('.works-prev'),
        nextArrow: $('.works-next'),

        // スマホ操作
        swipe: true,
        draggable: true,
        adaptiveHeight: true,
    });
}

function disableSlick() {
    if ($slider.hasClass('slick-initialized')) {
        $slider.slick('unslick');
    }
    $slider.removeAttr('style');
    $slider.find('.works-item, .works-link, img').removeAttr('style');
}

function handle() {
    if (mq.matches) enableSlick();
    else disableSlick();
}

// Safari対策（addEventListenerが効かない環境）
if (mq.addEventListener) mq.addEventListener('change', handle);
else mq.addListener(handle);

handle();

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

document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const openBtn = document.querySelector(".hamburger");
    const menu = document.getElementById("sp-menu");
    const closeBtn = document.querySelector(".sp-menu__close");
    const links = document.querySelectorAll(".sp-menu__list a");

    if (!openBtn || !menu || !closeBtn) return;

    const DURATION = 250;

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

// 雲
document.addEventListener("DOMContentLoaded", () => {
    const clouds = document.querySelectorAll(".kumo-top, .kumo-bottom");
    const concept = document.querySelector("#concept");

    if (!clouds.length || !concept) return;

    if (!("IntersectionObserver" in window)) {
        clouds.forEach(el => el.classList.add("is-in"));
        return;
    }

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (!entry.isIntersecting) return;

                const top = document.querySelector(".kumo-top");
                const bottom = document.querySelector(".kumo-bottom");

                if (top) top.classList.add("is-in");
                if (bottom) setTimeout(() => bottom.classList.add("is-in"), 120);

                io.disconnect();
            });
        },
        {
            root: null,
            threshold: 0.25,
        }
    );

    io.observe(concept);
});

// スクロール
document.addEventListener("DOMContentLoaded", () => {
    const els = document.querySelectorAll(".js-reveal");
    if (!els.length) return;

    if (!("IntersectionObserver" in window)) {
        els.forEach(el => el.classList.add("is-in"));
        return;
    }

    const io = new IntersectionObserver(
        (entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    entry.target.classList.add("is-in");
                } else if (entry.intersectionRatio === 0) {
                    // ★完全に見えなくなった時だけ外す
                    entry.target.classList.remove("is-in");
                }
            });
        },
        {
            threshold: 0.15,
        }
    );

    els.forEach(el => io.observe(el));
});
// スライダークリック
document.addEventListener("click", (e) => {
    const a = e.target.closest(".js-worklink");
    if (!a) return;

    e.preventDefault();              // すぐ遷移を止める
    a.classList.add("is-clicked");   // 押した演出ON

    const href = a.getAttribute("href");
    setTimeout(() => {
        window.location.href = href;   // 0.2秒後に遷移
    }, 200);
});


// ダークモード
document.addEventListener("DOMContentLoaded", () => {
    const body = document.body;
    const toggle = document.querySelector(".js-theme-toggle");

    const applyThemeAssets = (theme) => {
        document.querySelectorAll("img[data-light][data-dark]").forEach((img) => {
            img.src = theme === "dark" ? img.dataset.dark : img.dataset.light;
        });
    };


    const ensureOrbs = (theme) => {
        const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
        if (reduce) return;

        const existing = document.querySelectorAll(".bg-orbs");
        if (theme !== "dark") {
            existing.forEach(el => el.remove());
            return;
        }
        if (existing.length) return;

        const back = document.createElement("div");
        const mid = document.createElement("div");
        const front = document.createElement("div");

        back.className = "bg-orbs bg-orbs--back";
        mid.className = "bg-orbs bg-orbs--mid";
        front.className = "bg-orbs bg-orbs--front";

        body.prepend(front);
        body.prepend(mid);
        body.prepend(back);

        // 視差パララックス
        let ticking = false;
        const SPEED_BACK = 0.05;
        const SPEED_MID = 0.10;
        const SPEED_FRONT = 0.16;

        const SCALE_BACK = 1.10;
        const SCALE_MID = 1.00;
        const SCALE_FRONT = 0.92;

        const update = () => {
            ticking = false;
            const y = window.scrollY || 0;
            back.style.transform = `translate3d(0, ${y * SPEED_BACK}px, 0) scale(${SCALE_BACK})`;
            mid.style.transform = `translate3d(0, ${y * SPEED_MID}px, 0) scale(${SCALE_MID})`;
            front.style.transform = `translate3d(${y * 0.02}px, ${y * SPEED_FRONT}px, 0) scale(${SCALE_FRONT})`;
        };

        const onScroll = () => {
            if (ticking) return;
            ticking = true;
            requestAnimationFrame(update);
        };

        window.addEventListener("scroll", onScroll, { passive: true });
        update();
    };

    const setTheme = (theme) => {

        body.classList.add("is-theme-changing");
        setTimeout(() => body.classList.remove("is-theme-changing"), 650);

        body.dataset.theme = theme;
        localStorage.setItem("theme", theme);
        applyThemeAssets(theme);
        ensureOrbs(theme);
    };

    // 初期テーマ
    const saved = localStorage.getItem("theme");
    const initial = saved
        ? saved
        : (window.matchMedia("(prefers-color-scheme: dark)").matches ? "dark" : "light");
    setTheme(initial);

    // 切り替えボタン
    if (toggle) {
        toggle.addEventListener("click", (e) => {
            e.preventDefault();


            toggle.classList.add("is-switching");
            setTimeout(() => toggle.classList.remove("is-switching"), 520);

            const next = body.dataset.theme === "dark" ? "light" : "dark";
            setTheme(next);
        });
    }
});



// サンクスページ
document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contactForm");
    const iframe = document.querySelector('iframe[name="hidden_iframe"]');
    if (!form || !iframe) return;

    let submitted = false;

    form.addEventListener("submit", () => {
        submitted = true;
    });

    iframe.addEventListener("load", () => {
        if (!submitted) return;
        window.location.href = "./thanks.html";
    });
});

// ローディング
(() => {
    let started = false;

    const runIntro = () => {
        if (started) return;
        started = true;

        const intro = document.querySelector(".intro");
        const name = document.querySelector(".intro__name");

        if (!intro) return;


        if (!name || !(name.dataset.text || "").trim()) {
            intro.classList.add("is-hide");
            intro.style.display = "none";
            return;
        }

        intro.classList.remove("is-hide");
        intro.classList.add("is-show");
        intro.style.display = "grid";

        const text = name.dataset.text.trim();
        name.textContent = "";

        let i = 0;
        const TYPE_SPEED = 160;

        const tick = () => {
            name.textContent += text.charAt(i);
            i++;

            if (i < text.length) {
                setTimeout(tick, TYPE_SPEED);
            } else {
                setTimeout(() => {
                    intro.classList.add("is-hide");
                    setTimeout(() => {
                        intro.style.display = "none";
                    }, 520);
                }, 800);
            }
        };

        tick();
    };

    window.addEventListener("load", runIntro, { once: true });
})();
