// PARALLAX
function animateOnFade(sectionClass, scrollValue) {
  const parallax = document.querySelector(`.${sectionClass}`);
  let scrollPosition = window.pageYOffset;
  parallax.style.backgroundPosition =
    "50%" + scrollPosition * scrollValue + "%";
}

/**
 * SCROLL TO VISUAL EFECT
 *
 */

function animateOnScroll(
  className,
  scrPosition,
  activeClass,
  reversible = false
) {
  let card = document.querySelectorAll(`.${className}`);

  card.forEach((cur) => {
    let cardPosition = cur.getBoundingClientRect().top;
    let screenPosition = window.innerHeight;

    if (cardPosition <= screenPosition * scrPosition) {
      cur.classList.add(`${activeClass}`);
    } else if (cardPosition >= screenPosition && reversible) {
      cur.classList.remove(`${activeClass}`);
    }
  });
}

// ADD EVENT TO CALL SCROLL FUNCTION
window.addEventListener("scroll", () => {
  //Section parallax
  animateOnScroll("card", 0.6, "card--active");
  animateOnScroll("container__img-box", 0.35, "container__img-box--active");

  animateOnScroll("container__text-box", 0.5, "container__text-box--active");

  // Background parallax
  animateOnFade("section-story", 2);
  animateOnFade("section-features", 0.06);
});

/**
 * REUSABLE TAB
 */

//for home page tab

const home = {
  logo: "icon-btn",
  content: "tab-box__content--container",
  logoActive: "icon-btn--active",
  contentActive: "active",
};

//global tab
function tabBox(logo, content, logoActive, contentActive) {
  let logoSelector = document.querySelectorAll(`.${logo}`);
  let contentSelector = document.querySelectorAll(`.${content}`);

  for (let i = 0; i < logoSelector.length; i++) {
    logoSelector[i].addEventListener("click", function () {
      for (let j = 0; j < contentSelector.length; j++) {
        contentSelector[j].className = content;
      }
      document.getElementById(
        this.dataset.id
      ).className = `${content} ${contentActive}`;

      for (let i = 0; i < logoSelector.length; i++) {
        logoSelector[i].className = logo;
      }

      this.className = `${logo} ${logoActive}`;
    });
  }
}

tabBox(home.logo, home.content, home.logoActive, home.contentActive);

/** testimonial slider */
const slider = document.querySelector(".story__slider");
const leftArr = document.querySelector(".icon--left");
const rightArr = document.querySelector(".icon--right");
const navParent = document.querySelector(".dot-list");

let section = document.querySelectorAll(".story__section");
let sliderIndex = 0;

function setIndex() {
  document
    .querySelector(".story__dot .dot-item--active")
    .classList.remove("dot-item--active");
  slider.style.transform = "translate(" + sliderIndex * -25 + "%)";
}

document.querySelectorAll(".dot-item").forEach((el, i) => {
  el.addEventListener("click", () => {
    sliderIndex = i;

    setIndex();
    el.classList.add("dot-item--active");
  });
});

leftArr.addEventListener("click", () => {
  sliderIndex = sliderIndex > 0 ? sliderIndex - 1 : 0;

  setIndex();
  navParent.children[sliderIndex].classList.add("dot-item--active");
});

rightArr.addEventListener("click", () => {
  sliderIndex =
    sliderIndex < section.length - 1 ? sliderIndex + 1 : section.length - 1;

  setIndex();
  navParent.children[sliderIndex].classList.add("dot-item--active");
});
