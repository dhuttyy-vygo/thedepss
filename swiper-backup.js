var marq = function () {
  const marquee = document.querySelectorAll(".cb-marquee");

  marquee.forEach((e) => {
    // Create swiper carousel
    const carousel = e.querySelectorAll(".cb-marquee-carousel");

    carousel.forEach((e) => {
      const items = e.querySelector(".cb-marquee-items");
      const item = e.querySelectorAll(".cb-marquee-item");

      e.classList.add("swiper-container");
      items.classList.add("swiper-wrapper");
      item.forEach((e) => e.classList.add("swiper-slide"));

      const slider = new Swiper(e, {
        slidesPerView: "auto",
        loop: true,
        freeMode: true,
        freeModeMomentumBounce: false,
        freeModeMomentumVelocityRatio: 0.3
      });
    });

    // Scroll triggered movement
    const tl = new gsap.timeline();

    tl.set(carousel, { willChange: "transform" });

    tl.fromTo(
      carousel[0],
      {
        x: -300
      },
      {
        x: 0,
        ease: "none"
      },
      0
    );

    tl.fromTo(
      carousel[1],
      {
        x: 300,
        opacity: 1
      },
      {
        x: 0,
        opacity: 0,
        ease: "none"
      },
      0
    );

    tl.set(carousel, { willChange: "auto" });

    ScrollTrigger.create({
      trigger: e,
      animation: tl,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.3,
      refreshPriority: -14
    });
  });
};

// You may invoke the function here to execute the code
marq();

// Select the elements with the class "swiper"
var swiperElements = document.querySelectorAll(".swiper2");

swiperElements.forEach(function (swiperElement) {
  // Create and append the div elements with the specified classes
  swiperElement.insertAdjacentHTML(
    "beforeend",
    '<div class="swiper-pagination"></div>'
  );
  swiperElement.insertAdjacentHTML(
    "beforeend",
    '<div class="swiper-arrow button-prev"></div>'
  );
  swiperElement.insertAdjacentHTML(
    "beforeend",
    '<div class="swiper-arrow button-next"></div>'
  );
});

const swiper2 = new Swiper(".swiper2", {
  // Optional parameters
  direction: "horizontal",
  loop: true,
  slidesPerView: 1,
  slidesPerGroup: 1,
  spaceBetween: 20,
  loop: false,
  parallax: true,
  centeredSlides: true,
  mousewheel: {
    forceToAxis: true
  },
  speed: 300,
  // Responsive breakpoints
  breakpoints: {
    // when window width is >= 480px
    480: {
      slidesPerView: 1
    },
    // when window width is >= 768px
    768: {
      slidesPerView: 1
    },
    // when window width is >= 992px
    992: {
      slidesPerView: 1
    }
  },

  // If we need pagination
  pagination: {
    el: ".swiper-pagination",
    clickable: true
  },

  // Navigation arrows
  navigation: {
    nextEl: ".button-next",
    prevEl: ".button-prev",
    hiddenClass: "swiper-button-hidden"
  }
});
