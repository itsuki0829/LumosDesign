$(function () {
    // WORKSのスライダーをslickで初期化
    $('.js-works-slick').slick({

        // 同時に表示するスライド数（中央に2枚）
        slidesToShow: 2,

        // 1枚ずつ動かす
        slidesToScroll: 1,

        // 中央寄せ＋チラ見えを有効にする
        centerMode: true,

        // 左右にどれくらいチラ見えさせるか
        centerPadding: '160px',

        // ===== 自動でずっと流れ続ける設定 =====

        autoplay: true,        // 自動再生をON
        autoplaySpeed: 0,      // 待ち時間なし（止まらない）
        speed: 5000,           // 動くスピード
        cssEase: 'linear',     // 一定速度で流す
        infinite: true,        // 無限ループ

        // マウスを乗せても止めない
        pauseOnHover: false,
        pauseOnFocus: false,

        arrows: false,         // 矢印を表示しない
        dots: false,           // 番号（1〜11）を表示しない

        useTransform: false,

        // ===== スマホ用設定 =====
        responsive: [
            {
                breakpoint: 768,   // 768px以下のとき
                settings: {
                    slidesToShow: 1, // 1枚表示
                    centerPadding: '40px'
                }
            }
        ]
    });
});
const toTop = document.querySelector('.to-top');

if (toTop) {
    toTop.addEventListener('click', () => {
        toTop.classList.add('clicked');
        setTimeout(() => {
            toTop.classList.remove('clicked');
        }, 300);
    });
}

// TOPページをCONCEPTセクションで出現させる

$(function () {
    const toTopButton = $(".js-to-top");
    const concept = $("#contact");

    toTopButton.hide(); // 最初は非表示

    $(window).on("scroll", function () {
        const scrollTop = $(this).scrollTop();
        const conceptTop = concept.offset().top - 700; // 開始位置

        if (scrollTop >= conceptTop) {
            toTopButton.fadeIn();
        } else {
            toTopButton.fadeOut();
        }
    });

    toTopButton.on("click", function (e) {
        e.preventDefault();
        $("body,html").animate({ scrollTop: 0 }, 800);
    });
});
