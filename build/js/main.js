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
  $(".header-navigation ul a, .anchors a, .link-anchor").on("click", function (e) {
    e.preventDefault();
    var target = $($(this).attr("href"));
    if (target.length) {
      $("html, body").animate({ scrollTop: target.offset().top }, 800);

      if ($(this).attr("href") === "#charity") {
        $(".tabs-nav .active").removeClass("active");
        $(".tab-panel.active").removeClass("active").hide(0);
        $(".tabs-nav a[href='#tab03']").parent().addClass("active");
        $("#tab03").addClass("active").fadeIn(400);
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
