jQuery(document).ready(function ($) {
  if (document.querySelector(".partners-slider .swiper")) {
    const eventsSwiper = new Swiper(document.querySelector(".partners-slider .swiper"), {
      loop: true,
      speed: 5000,
      slidesPerView: "auto",
      spaceBetween: 15,
      autoplay: {
        delay: 0,
      },
      breakpoints: {
        768: {
          slidesPerView: "auto",
          spaceBetween: 40,
        },
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

  if (document.querySelector(".image-slider")) {
    document.querySelectorAll(".image-slider").forEach((el) => {
      const imageSwiper = new Swiper(el.querySelector(".swiper"), {
        loop: true,
        slidesPerView: 1,
        spaceBetween: 0,
        speed: 500,
        navigation: {
          nextEl: el.querySelector(".swiper-button-next"),
          prevEl: el.querySelector(".swiper-button-prev"),
        },
        breakpoints: {
          768: {
            loop: false,
            slidesPerView: 3,
            grid: {
              rows: 2,
            },
            spaceBetween: 20,
          },
          1024: {
            loop: false,
            slidesPerView: 4,
            grid: {
              rows: 2,
            },
            spaceBetween: 20,
          },
          1280: {
            loop: false,
            slidesPerView: 5,
            grid: {
              rows: 2,
            },
            spaceBetween: 14,
          },
          1700: {
            loop: false,
            slidesPerView: 5,
            grid: {
              rows: 2,
            },
            spaceBetween: 20,
          },
        },
      });
    });
  }

  if (document.querySelector(".gallery-slider")) {
    const gallerySwiper = new Swiper(".gallery-slider .swiper", {
      loop: true,
      loopedSlides: 3,
      slidesPerView: 1,
      spaceBetween: 0,
      speed: 500,
      navigation: {
        nextEl: ".gallery-slider .swiper-button-next",
        prevEl: ".gallery-slider .swiper-button-prev",
      },
      breakpoints: {
        768: {},
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
  $(".header-navigation ul a, .anchors a, .link-anchor").on("click", function (e) {
    e.preventDefault();
    var target = $($(this).attr("href"));
    if (target.length) {
      $("html, body").animate({ scrollTop: target.offset().top }, 800);

      if ($(this).attr("href") === "#charity") {
        $(".before-tabs .tabs-nav .active").removeClass("active");
        $(".before-tabs .tab-panel.active").removeClass("active").hide(0);
        $(".before-tabs .tabs-nav a[href='#tab03']").parent().addClass("active");
        $(".before-tabs #tab03").addClass("active").fadeIn(400);
      }
    }
  });

  $(window).on("resize", function () {
    var headerTop = $(".header-top").outerHeight();
    $(".header")
      .get(0)
      .style.setProperty("--header-top", headerTop + "px");
  });

  // tabs
  $(".tab-nav-toggler").on("click", function () {
    $(this).next().slideToggle(200);
  });

  $(".tabs-nav a").each(function () {
    if ($(this).parent().hasClass("active")) {
      var panel = $($(this).attr("href"));
      panel.addClass("active").show(0);
    }
  });
  $(".tabs-nav a").on("click", function (e) {
    e.preventDefault();
    var tabs = $(this).parents(".tabs");
    tabs.find(".tabs-nav .active").removeClass("active");
    tabs.find(".tab-panel.active").removeClass("active").hide(0);
    $(this).parent().addClass("active");
    $($(this).attr("href")).addClass("active").fadeIn(400);
    if ($(this).parents().hasClass("block-events") || $(this).parents().hasClass("block-forms")) {
      if ($(window).width() < 768) {
        $(this).parents(".section").find(".tabs-nav ul").slideUp(20);
      }
    }
  });

  $("#btnDonate").on("click", function () {
    $(".before-donate").slideDown(400);
  });

  $("#btnDonateHide").on("click", function () {
    $(".before-donate").slideUp(400);
  });

  function donateRadiosCheck() {
    var donateRegion = $("#formDonate input[name=region]"),
      donatePayment = $("#formDonate input[name=payment]");
    var region, payment, activePanel;

    donateRegion.each(function () {
      if ($(this).prop("checked")) {
        region = $(this).val();
      }
    });
    donatePayment.each(function () {
      if ($(this).prop("checked")) {
        payment = $(this).val();
      }
    });

    if (region === "ukraine") {
      activePanel = payment === "bank" ? 1 : 2;
    } else {
      activePanel = payment === "bank" ? 3 : 4;
    }

    $(".donate-result.active").removeClass("active");
    $(".donate-result").each(function () {
      var num = parseInt($(this).data("panel"));
      if (num === activePanel) {
        $(this).addClass("active");
      }
    });
  }

  donateRadiosCheck();

  $("#formDonate input[type=radio]").on("change", function () {
    donateRadiosCheck();
  });
});
