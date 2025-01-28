var igC = function () {
  try {
    const tR = document.querySelector(".dp-social-marquee");
    const trUp = document.querySelectorAll("[data-social='i']");
    const trDown = document.querySelector("[data-social='d");

    const e = gsap.timeline();

    ScrollTrigger.create({
      trigger: tR,
      start: "top bottom",
      end: "bottom top",
      scrub: true,
      animation: e,
    });

    e.fromTo(trUp, { yPercent: 100 }, { yPercent: -100, ease: "none" });
    e.fromTo(trDown, { yPercent: -100 }, { yPercent: 100, ease: "none" });
  } catch (error) {
    // Handle the error (e.g., log it)
    console.error("An error occurred:", error);
    return; // Exit the function to prevent further execution
  }

  // Your other code here (if needed)
};

// Add ScrollTrigger markers for debugging if available
try {
  gsap.registerPlugin(ScrollTrigger);
  ScrollTrigger.create({
    trigger: ".dp-social-marquee",
    start: "top bottom",
    end: "bottom top",
    markers: true, // This enables the markers
  });
} catch (error) {
  // Handle the error (e.g., log it)
  console.error("An error occurred:", error);
  // Continue with other code or gracefully degrade
}
