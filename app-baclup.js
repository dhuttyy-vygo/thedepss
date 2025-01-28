let lenis;
if (Webflow.env("editor") === undefined) {
  lenis = new Lenis({
    lerp: 1,
    // wheelMultiplier: 0.8,
    gestureOrientation: "vertical"
  });
  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }
  requestAnimationFrame(raf);
}

$("[data-lenis-start]").on("click", function () {
  lenis.start();
});
$("[data-lenis-stop]").on("click", function () {
  lenis.stop();
});
$("[data-lenis-toggle]").on("click", function () {
  $(this).toggleClass("stop-scroll");
  if ($(this).hasClass("stop-scroll")) {
    lenis.stop();
  } else {
    lenis.start();
  }
});

$(document).ready(function () {
  $('[data-toggle="datepicker"]').datepicker({
    autoHide: true,
    pick: function (e) {
      e.preventDefault(); //prvent any default action..
      var pickedDate = e.date; //get date
      var date = e.date.getDate();
      var day = $(this).datepicker("getDayName", true);
      var month = $(this).datepicker("getMonthName", true, true);
      var year = e.date.getFullYear();
      var new_date = day + " " + date + " " + month + " " + year;
      //set date
      // $(this).val(`${date} ${month} ${year}`)
      $(this).val(new_date);
    }
  });
});

const cursor = new MouseFollower({
  speed: 0.8,
  skewing: 1,
  skewingText: 1
});

const elImage = document.querySelectorAll("[data-type='image']");
const elVideo = document.querySelectorAll(
  "[data-type='player'], .dp-project-video"
);

elImage.forEach(function (element) {
  element.addEventListener("mouseenter", () => {
    cursor.setText("VIEW");
  });

  element.addEventListener("mouseleave", () => {
    cursor.removeText();
  });
});

elVideo.forEach(function (element) {
  element.addEventListener("mouseenter", () => {
    cursor.setText("PLAY");
  });

  element.addEventListener("mouseleave", () => {
    cursor.removeText();
  });
});

window.addEventListener("DOMContentLoaded", (event) => {
  setTimeout(() => {
    $("[dp-fade-in]").each(function (index) {
      let textEl = $(this).find("[text-split]");
      let textContent = textEl.text();
      let tl;
      gsap.set(textEl, { autoAlpha: 1 });

      function splitText() {
        new SplitType(textEl, { types: "lines", tagName: "span" });
        textEl.find(".line").each(function (index) {
          let lineContent = $(this).html();
          $(this).html("");
          $(this).append(
            `<span class="line-inner" style="display: block;">${lineContent}</span>`
          );
        });
        tl = gsap.timeline({
          scrollTrigger: {
            trigger: textEl,
            start: "top bottom",
            end: "bottom bottom",
            toggleActions: "none play none none"
          }
        });
        tl.fromTo(
          textEl.find(".line-inner"),
          { yPercent: 100, opacity: 0 },
          {
            yPercent: 0,
            opacity: 1,
            duration: 0.7,
            stagger: { amount: 0.3, ease: "power4.out" }
          }
        );
      }
      splitText();

      let windowWidth = window.innerWidth;
      window.addEventListener("resize", function () {
        if (windowWidth !== window.innerWidth) {
          windowWidth = window.innerWidth;
          tl.kill();
          textEl.text(textContent);
          splitText();
        }
      });
    });
  }, 700);
});

// nav hamburger toggle //
var navinit = function () {
  const toggleBtn = document.querySelector(".dp-menu-toggle"),
    backdrop = document.querySelector(".dp-menu-backdrop"),
    menuFill = document.querySelector(".dp-menu-textdrop"),
    menuContent = document.querySelector(".dp-menu-content"),
    menuBox = document.querySelector(".dp-menu-box"),
    menu = document.querySelector(".dp-menu");

  var opened = false;

  // Timeline for showing the menu

  var tlShow = gsap.timeline({ paused: true });
  tlShow.set(menuBox, { display: "block" }, 0);
  tlShow.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.4 }, 0);
  tlShow.fromTo(
    menuFill,
    { scaleX: 0 },
    { scaleX: 1, ease: "expo.out", duration: 1 },
    0
  );
  tlShow.fromTo(
    menuContent,
    { xPercent: 50 },
    { xPercent: 0, ease: "expo.out", duration: 1 },
    0
  );
  tlShow
    .fromTo(menuContent, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0.2)
    .reverse();

  // Timeline for hiding the menu
  // var tlHide = function () {
  //   var t = gsap.timeline({ paused: true });
  //   t.fromTo(backdrop, { opacity: 1 }, { opacity: 0, duration: 0.3 }, 0);
  //   t.fromTo(menuFill, { scaleX: 1 }, { scaleX: 0, duration: 0.3 }, 0);
  //   t.fromTo(menuContent, { xPercent: 0 }, { xPercent: 20, duration: 0.3 }, 0);
  //   t.fromTo(menuContent, { opacity: 1 }, { opacity: 0, duration: 0.1 }, 0);
  //   t.set(menuBox, { display: "none" });
  //   return t;
  // };

  // Toggle function
  var bindToggle = function () {
    toggleBtn.addEventListener("click", function () {
      toggle(); // Removed the "return." before toggle()
    });

    backdrop.addEventListener("click", function () {
      hide(); // Removed the "return." before hide()
    });
  };

  var toggle = function () {
    opened ? hide() : show();
  };

  // Show function
  var show = function () {
    menu.classList.add("-open");
    tlShow.timeScale(1).play();
    lenis.stop();
    opened = true;
  };

  // Hide function
  var hide = function () {
    menu.classList.remove("-open");
    tlShow.timeScale(1.5).reverse();
    lenis.start();
    opened = false;
  };

  bindToggle();
  console.log("navinit working");
};
navinit();

var reserveInit = function () {
  const toggleBtn = document.getElementById("dp-reserve-toggle"),
    backdrop = document.querySelector(".dp-reserve-backdrop"),
    reserveO = document.querySelector(".dp-reserve-open"),
    reservec = document.querySelector(".dp-reserve-close"),
    menuContent = document.querySelector(".dp-nav-top"),
    submit = document.querySelector(".dp-submit-button"),
    fieldItems = document.querySelectorAll(
      ".dp-input-t, .dp-form-title, .dp-form-subtitle, .dp-logo-reserve"
    ),
    menu = document.querySelector(".dp-nav");

  var opened = false;

  var tlShow = gsap.timeline({ reversed: true, paused: true });
  tlShow.set(backdrop, { display: "block" }, 0);
  tlShow.set(submit, { display: "flex" }, 0);
  // tlShow.set(botNavItems, { display: "none" }, 0);
  tlShow.fromTo(backdrop, { opacity: 0 }, { opacity: 1, duration: 0.5 }, 0);
  tlShow.fromTo(reserveO, { autoAlpha: 1 }, { autoAlpha: 0, duration: 0.2 }, 0);
  tlShow.fromTo(
    reservec,
    { autoAlpha: 0 },
    { autoAlpha: 1, duration: 0.3 },
    0.2
  );
  tlShow.fromTo(submit, { height: 0 }, { height: "70px", duration: 0.3 }, 0);
  tlShow.to(
    menuContent,
    { height: "auto", width: "750px", ease: "power4.out", duration: 1 },
    0
  );

  tlShow.fromTo(
    fieldItems,
    { opacity: 0, yPercent: 50 },
    {
      opacity: 1,
      yPercent: 0,
      duration: 0.3,
      stagger: { amount: 0.3 },
      ease: "power4.out"
    },
    0.15
  );

  var bindToggle = function () {
    toggleBtn.addEventListener("click", function () {
      toggle(); // Removed the "return." before toggle()
    });

    backdrop.addEventListener("click", function () {
      hide(); // Removed the "return." before hide()
    });
  };

  var toggle = function () {
    opened ? hide() : show();
  };

  // Show function
  var show = function () {
    menu.classList.add("-open");
    tlShow.reversed() ? tlShow.play() : tlShow.reverse();
    lenis.stop(); // Play tlShow when the button is clicked
    opened = true;
  };

  // Hide function
  var hide = function () {
    menu.classList.remove("-open");
    tlShow.reverse();
    lenis.start(); // Play tlHide when the button is clicked
    opened = false;
  };

  // Call the toggle function to bind the click event
  bindToggle();
  console.log("reserve nav init"); // Changed from toggle()
};
reserveInit();

document.addEventListener("DOMContentLoaded", function () {
  var eI = document.querySelectorAll(
    ".dp-gallery-item img, .dp-gallery-item video"
  );

  var tl = gsap.timeline();

  gsap.set(eI, { autoAlpha: 0 });
  tl.to(eI, {
    clipPath: "polygon(0px 0, 100% 0%, 100% 100%, 0px 100%)",
    autoAlpha: 1,
    stagger: { amount: 0.6, from: "random" },
    duration: 1
  });
});

// alert("Got to above FAQ");
(function () {
  try {
    let groups = gsap.utils.toArray(".faq-menu");
    let menus = gsap.utils.toArray(".dp-faq-item");
    let menuToggles = [];

    let activeMenu = null; // Keep track of the active menu

    if (groups.length > 0 && menus.length > 0) {
      menus.forEach((menu) => {
        let animation = createAnimation(menu);
        menuToggles.push(animation);

        menu.addEventListener("click", () => toggleMenu(animation));
      });
    }

    function toggleMenu(animation) {
      if (activeMenu !== animation) {
        if (activeMenu) {
          activeMenu.reverse(); // Close the previously open menu
        }
        animation.play(); // Open the clicked menu
        activeMenu = animation;
      } else {
        animation.reverse(); // Close the clicked menu
        activeMenu = null;
      }
    }

    function createAnimation(menu) {
      let element = menu.parentElement;
      let box = element.querySelector(".answer");
      let plusSign = element.querySelector(".plus");
      let cardBack = element.querySelector(".faq-item");
      let questionText = element.querySelector(".question");

      gsap.set(box, { height: "auto" });
      gsap.set(questionText, { marginLeft: "2vw" });

      let timeline = gsap
        .timeline({ paused: true })
        .from(box, {
          height: 0,
          duration: 0.5,
          ease: "power1.inOut"
        })
        .from(
          questionText,
          {
            marginLeft: 0,
            duration: 0.5,
            ease: "power4.inOut"
          },
          "<"
        )
        .to(
          plusSign,
          {
            rotate: "45deg",
            duration: 0.1,
            ease: "power1.inOut"
          },
          "<"
        )
        .reverse();

      return timeline;
    }
  } catch (error) {
    // Handle any errors that occur within the try block
    console.error("An error occurred:", error);
  }
})();

var gui = function () {
  var projectX = gsap.utils.toArray("[scroll-speed='100']"),
    projectY = gsap.utils.toArray("[scroll-speed='0']");

  projectX.forEach((project) => {
    var tR = project;
    var tl = gsap.timeline();

    tl.fromTo(
      project,
      {
        y: 100
      },
      {
        y: 0,
        duration: 1
      }
    );

    ScrollTrigger.create({
      trigger: tR,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.4,
      animation: tl
    });
  });

  projectY.forEach((project) => {
    var tR = project,
      tl = gsap.timeline();

    tl.fromTo(
      project,
      {
        y: -100
      },
      {
        y: 0,
        duration: 1
      }
    );

    ScrollTrigger.create({
      trigger: tR,
      start: "top bottom",
      end: "bottom top",
      scrub: 0.4,
      animation: tl
    });
  });
};
gui();

// alert("Got to above setupImage Gallery");
var setupImageGallery = () => {
  const projects = document.querySelectorAll(".dp-gallery-item"),
    imgViewContainer = document.querySelector(".img-modal .img-view"),
    closeImgBtn = document.querySelector(".img-modal"),
    closevideoBtn = document.querySelector(".video-modal"),
    modalName = document.querySelector(".modal-name"),
    modalSubheader = document.querySelector(".modal-subheader"),
    previewName = document.querySelector(".preview-name"),
    previewSubheader = document.querySelector(".preview-subheader"),
    initPreview = previewName.textContent,
    initPreviewSub = previewSubheader.textContent,
    videoViewContainer = document.querySelector(".video-modal .video-view"),
    tlvModal = gsap.timeline({ paused: true }),
    tlImgModal = gsap.timeline({ paused: true });

  function pauseVideo() {
    const videoElement = videoViewContainer.querySelector("video");
    if (videoElement && !videoElement.paused) {
      videoElement.pause();
    }
  }
  projects.forEach((project) => {
    const dataType = project.getAttribute("data-type");

    project.addEventListener("mouseover", () => {
      const name = project.querySelector(".name").textContent;
      const subheader = project.querySelector(".subheader").textContent;
      previewSubheader.textContent = name;
      previewName.textContent = subheader;
    });

    project.addEventListener("mouseleave", () => {
      previewName.textContent = initPreview;
      previewSubheader.textContent = initPreviewSub;
    });

    if (dataType === "image") {
      project.addEventListener("click", () => {
        const dataImg = project.getAttribute("data-img");
        imgViewContainer.innerHTML = `<img src="https://assets-global.website-files.com/6297c0caac98bd42cd4d5305/${dataImg}.jpeg" alt="" />`;
        const name = project.querySelector(".name").textContent;
        const subheader = project.querySelector(".subheader").textContent;
        modalName.textContent = name;
        modalSubheader.textContent = subheader;
        tlImgModal.reversed(!tlImgModal.reversed());
      });
    } else if (dataType === "player") {
      project.addEventListener("click", () => {
        const dataPlayer = project.getAttribute("data-player");
        videoViewContainer.innerHTML = `
        <video 
          src="https://d2jg36g42afwo9.cloudfront.net/${dataPlayer}" 
          alt=""
          autoplay
          playsinline
        ></video>`;
        const name = project.querySelector(".name").textContent;
        const subheader = project.querySelector(".subheader").textContent;
        modalName.textContent = name;
        modalSubheader.textContent = subheader;
        tlvModal.reversed(!tlvModal.reversed());
      });
    }
  });

  closeImgBtn.onclick = function (e) {
    tlImgModal.reversed(!tlImgModal.reversed());
  };

  closevideoBtn.onclick = function (e) {
    tlvModal.reversed(!tlvModal.reversed());
    pauseVideo();
  };

  function iModal() {
    tlImgModal.to(
      ".dp-gallery-item .name",
      1,
      {
        top: "30px",
        ease: "power4.inOut"
      },
      0
    );

    tlImgModal.to(
      ".img-preview-container",
      1,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        y: 25,
        ease: "power4.inOut"
      },
      0
    );

    tlImgModal.to(
      ".img-modal",
      0.5,
      {
        opacity: 1,
        ease: "none",
        pointerEvents: "auto"
      },
      0.5
    );

    tlImgModal.to(
      ".img-view",
      1,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        y: 25,
        ease: "power4.inOut"
      },
      0
    );

    tlImgModal.to(
      ".close-btn .m-btn",
      1,
      {
        top: "0",
        ease: "power4.inOut"
      },
      1
    );

    tlImgModal
      .to(
        ".modal-name",
        1,
        {
          top: "0",
          ease: "power4.inOut"
        },
        "<"
      )
      .reverse();
  }

  iModal();

  function vModal() {
    tlvModal.to(".dp-gallery-item .name", 1, {
      top: "30px",
      ease: "power4.inOut"
    });

    tlvModal.to(
      ".img-preview-container",
      1,
      {
        clipPath: "polygon(0 100%, 100% 100%, 100% 100%, 0 100%)",
        y: 25,
        ease: "power4.inOut"
      },
      "<"
    );

    tlvModal.to(".video-modal", 0.005, {
      opacity: 1,
      ease: "none",
      pointerEvents: "auto",
      delay: -0.125
    });

    tlvModal.to(
      ".video-view",
      1,
      {
        clipPath: "polygon(0 0, 100% 0, 100% 100%, 0 100%)",
        y: 25,
        ease: "power4.inOut"
      },
      "<"
    );

    tlvModal.to(
      ".close-btn .m-btn",
      1,
      {
        top: "0",
        ease: "power4.inOut"
      },
      "<"
    );

    tlvModal
      .to(
        ".modal-name",
        1,
        {
          top: "0",
          ease: "power4.inOut"
        },
        "<"
      )
      .reverse();
  }

  vModal();
};
setupImageGallery();

function socialMarquee() {
  const tR = document.querySelector(".dp-social-marquee");
  const trUp = document.querySelectorAll("[data-social='i']");
  const trDown = document.querySelector("[data-social='d']");

  const e = gsap.timeline();

  ScrollTrigger.create({
    trigger: tR,
    start: "top bottom",
    end: "bottom top",
    scrub: true,
    animation: e
  });

  e.fromTo(trUp, { yPercent: 0 }, { yPercent: -50, ease: "none" }, 0);
  e.fromTo(trDown, { yPercent: 0 }, { yPercent: 50, ease: "none" }, 0);

  return e;
}
socialMarquee();

(() => {
  var Sc = ScrollTrigger;
  var Qe = gsap;
  document.addEventListener("DOMContentLoaded", () => {
    document.querySelectorAll(".dp-btn").forEach((e) => {
      let t = Qe.timeline();

      t.from(e, {
        y: 16,
        opacity: 0
      }),
        Sc.create({
          trigger: e,
          start: "top 80%",
          end: "bottom 50%",
          animation: t,
          scrub: true
        });
    }),
      document.querySelectorAll(".faq-menu").forEach((e) => {
        let t = {
          scrollTrigger: {
            trigger: e,
            start: "top bottom"
          },
          y: 16,
          opacity: 0,
          duration: 0.4,
          delay: 0.1,
          ease: "power4.out"
        };
        Qe.from(e, t);
      }),
      document.querySelectorAll(".dp-line").forEach((e) => {
        let t = {
          scrollTrigger: {
            trigger: e,
            start: "top bottom"
          },
          width: "0%",
          duration: 2,
          delay: 0.1,
          ease: "power.inOut"
        };
        Qe.from(e, t);
      }),
      (out = () => {
        let r = document.querySelector(".dp-outro"),
          u = r.querySelector(".dp-outro-contain"),
          t = Qe.timeline();

        t.fromTo(
          u,
          {
            yPercent: -50
          },
          {
            yPercent: 0,
            duration: 1,
            ease: "linear"
          }
        ),
          Sc.create({
            trigger: r,
            start: "top bottom",
            end: "top top",
            scrub: !0,
            animation: t
          });
      });
    out();
  });
})();
