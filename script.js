$(document).ready(function () {
  const menuBtn = $("#menu-btn");
  const closeBtn = $("#close-menu");
  const menu = $("#mobile-menu");
  const overlay = $("#menu-overlay");

  // Mobile Menu Toggle
  menuBtn.click(function () {
    menu.toggleClass("open");
    overlay.show();
  });

  // Close menu when clicking the close button
  closeBtn.click(function () {
    menu.removeClass("open");
    overlay.hide();
  });

  // Close menu when clicking outside the menu
  overlay.click(function () {
    menu.removeClass("open");
    overlay.hide();
  });

  // Toggle Dropdown on Click (Mobile)
  $(".dropdown > a").click(function (e) {
    e.preventDefault();
    $(".dropdown").toggleClass("active");
  });

  // Search Toggle
  $("#search-btn").click(function () {
    $(".right").addClass("search-active");
  });

  $("#close-search").click(function () {
    $(".right").removeClass("search-active");
  });

  // ----------- Responsive Highlight Slider -------------
  let currentIndex = 0;
  const $slider = $(".highlight ul");
  const $items = $(".highlight li");
  const totalItems = $items.length;
  let interval;

  function updateSlider() {
    const windowWidth = $(window).width();

    if (windowWidth > 1024) {
      $slider.css("transform", "translateX(0)");
      clearInterval(interval);
      return;
    }

    const itemsPerView = windowWidth >= 768 ? 2 : 1;
    const maxIndex = totalItems - itemsPerView;

    if (currentIndex > maxIndex) {
      currentIndex = 0;
    }

    const translateValue = currentIndex * (100 / totalItems);
    $slider.css("transform", `translateX(-${translateValue}%)`);
  }

  function startAutoScroll() {
    const windowWidth = $(window).width();
    if (windowWidth <= 1024) {
      clearInterval(interval);
      interval = setInterval(() => {
        currentIndex = (currentIndex + 1) % totalItems;
        updateSlider();
      }, 3000);
    }
  }

  // Initial setup
  updateSlider();
  startAutoScroll();

  // Handle window resize
  let resizeTimer;
  $(window).on("resize", function () {
    clearTimeout(resizeTimer);
    clearInterval(interval);

    resizeTimer = setTimeout(() => {
      currentIndex = 0;
      updateSlider();
      startAutoScroll();
    }, 250);
  });

  // Pause on hover
  $(".highlight").hover(
    function () {
      clearInterval(interval);
    },
    function () {
      startAutoScroll();
    }
  );


    // Hero Section Slick Slider
    $(".hero-slider").slick({
      dots: false,
      arrows: false,
      autoplay: true,
      autoplaySpeed: 3000,
    });
});
