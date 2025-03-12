const items = document.querySelectorAll(".accordion button");

function toggleAccordion() {
  const itemToggle = this.getAttribute("aria-expanded");

  items.forEach((item) => {
    item.setAttribute("aria-expanded", "false");
    item.nextElementSibling.style.maxHeight = null;
  });

  if (itemToggle == "false") {
    this.setAttribute("aria-expanded", "true");
    const content = this.nextElementSibling;
    content.style.maxHeight = content.scrollHeight + "px"; // Set max height to content's full height
  }
}

items.forEach((item) => item.addEventListener("click", toggleAccordion));
