/**
 * Define Global Variables
 *
 */

const sections = document.getElementsByTagName("section");
const nav = document.querySelector("#navbar__list");
/**
 * End Global Variables
 * Start Helper Functions
 *
 */

function insertNavLink(navLinkName, sectionId) {
  const htmlTextToAdd = `<li><a href="#${sectionId}" class="menu__link">${navLinkName}</a></li>`;
  nav.insertAdjacentHTML("beforeend", htmlTextToAdd);
}

function isTopSectionInViewport(el) {
  const rect = el.getBoundingClientRect();
  return (
    rect.top >= 0 &&
    rect.top <=
      0.4 * (window.innerHeight || document.documentElement.clientHeight)
  );
}

function getElementOffset(el) {
  const rect = el.getBoundingClientRect();
  return {
    top: rect.top + window.pageYOffset,
    left: rect.left + window.pageXOffset
  };
}

/**
 * End Helper Functions
 * Begin Main Functions
 *
 */

// build the nav
function buildNav(sections) {
  for (const section of sections) {
    let navLinkName = section.getAttribute("data-nav");
    let sectionId = section.getAttribute("id");
    insertNavLink(navLinkName, sectionId);
  }
}

// Add class 'active' to section when near top of viewport
function setSectionIntoViewActive(sections) {
  for (const section of sections) {
    const activeLink = document.querySelector(
      `a[href="#${section.getAttribute("id")}"]`
    );
    if (isTopSectionInViewport(section)) {
      section.classList.add("active");
      activeLink.classList.add("menu__link--active");
    } else {
      section.classList.remove("active");
      activeLink.classList.remove("menu__link--active");
    }
  }
}

function smoothScroll(el) {
  window.scrollTo({
    top: getElementOffset(el).top - nav.offsetHeight,
    left: getElementOffset(el).left,
    behavior: "smooth"
  });
}

/**
 * End Main Functions
 * Begin Events
 *
 */

document.addEventListener("DOMContentLoaded", function() {
  buildNav(sections);

  nav.addEventListener("click", function(e) {
    if (e.target.nodeName === "A") {
      e.preventDefault();
      const activeSection = document.querySelector(
        `section[id = ${e.target.getAttribute("href").slice(1)}]`
      );
      smoothScroll(activeSection);
    }
  });

  // Set sections as active
  setTimeout(
    window.addEventListener("scroll", function() {
      setSectionIntoViewActive(sections);
    }),
    2000
  );
});
