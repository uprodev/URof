jQuery(document).ready(function ($) {
  ("partners-slider");

  if (document.querySelector(".partners-slider .swiper")) {
    const eventsSwiper = new Swiper(document.querySelector(".partners-slider .swiper"), {
      loop: false,
      slidesPerView: "auto",
      spaceBetween: 0,
      speed: 500,
      freeMode: {
        enabled: true,
        sticky: true,
      },
      breakpoints: {
        1024: {
          slidesPerView: "auto",
          spaceBetween: 51,
        },
        1700: {
          slidesPerView: "auto",
          spaceBetween: 72,
        },
      },
    });
  }

  // menu toggle
  $(".navbar-toggler").on("click", function () {
    if ($(this).hasClass("active")) {
      const body = document.body;
      const scrollY = body.style.top;
      body.removeAttribute("style");
      window.scrollTo(0, parseInt(scrollY || "0") * -1);
      $(this).removeClass("active");
      $(".header-navigation").removeClass("active");
    } else {
      const scrollY = $(window).scrollTop();
      $("body").css({ position: "fixed", top: -scrollY });
      $(this).addClass("active");
      $(".header-navigation").addClass("active");
    }
  });

  // anchors
  $(".header-navigation a, .anchors a, .link-anchor").on("click", function (e) {
    e.preventDefault();
    var target = $($(this).attr("href"));
    if (target.length) {
      $("html, body").animate({ scrollTop: target.offset().top }, 800);
    }
  });

  $(window).on("resize", function () {
    var headerTop = $(".header-top").outerHeight();
    $(".header")
      .get(0)
      .style.setProperty("--header-top", headerTop + "px");
  });

  // tabs
  $(".tabs-nav a").each(function () {
    if ($(this).parent().hasClass("active")) {
      var panel = $($(this).attr("href"));
      panel.addClass("active").show(0);
    }
  });
  $(".tabs-nav a").on("click", function (e) {
    e.preventDefault();
    $(".tabs-nav .active").removeClass("active");
    $(".tab-panel.active").removeClass("active").hide(0);
    $(this).parent().addClass("active");
    $($(this).attr("href")).addClass("active").fadeIn(400);
  });

  $("#btnDonate").on("click", function () {
    $(".before-donate").slideDown(400);
  });

  $("#btnDonateHide").on("click", function () {
    $(".before-donate").slideUp(400);
  });
});
