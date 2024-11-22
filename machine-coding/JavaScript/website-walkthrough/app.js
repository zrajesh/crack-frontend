// highlight section
// popover with next and previous button to move steps
// scroll to element if not in viewport to highlight

const steps = ["3", "header", "8", "12", "footer", "5"];
let index = 0;

// helper function
const highlight = (id) => {
  // remove the existing highlighted elements
  document.getElementById("lb-highlight")?.remove();
  document.getElementById("lb-popover")?.remove();

  // get the element with the ID
  const element = document.getElementById(id);

  // get the element dimension
  const elementDimension = element.getBoundingClientRect();

  // highlight the element
  highlightHelper(elementDimension);

  // add the popover with navigation button
  popover(elementDimension);
};

const highlightHelper = (elementDimension) => {
  // calculate the css poisition
  // where the highlighter will be placed
  let top = elementDimension.top + window.scrollY;
  let left = elementDimension.left + window.scrollX;
  let width = elementDimension.width;
  let height = elementDimension.height;

  // create a new element with an id
  // and add a style to it
  const ele = document.createElement("div");
  ele.id = "lb-highlight";
  ele.style = `
    position: absolute;
    top: ${top - 4}px;
    left: ${left - 4}px;
    width: ${width}px;
    height: ${height}px;
    transition: border .2s ease;
  `;

  // append the element to the parent
  document.getElementById("wrapper").appendChild(ele);

  // add the border style late to take an effect
  setTimeout(() => {
    ele.style.border = "4px solid #000";
  }, 0);
};

const popover = (elementDimension) => {
  // calculate the css poisition
  // where the highlighter will be placed
  let bottom = elementDimension.bottom + window.scrollY;
  let left = elementDimension.left + window.scrollX;
  let right = elementDimension.right;

  // create a new element with an id
  // and add a style to it
  const ele = document.createElement("div");
  ele.id = "lb-popover";
  ele.style = `
    position: absolute;
    top: ${bottom + 5}px;
    left: ${(left + right) / 2 - 50}px;
    background: #fff;
    width: 100px;
    height: 100px;
  `;

  // add the navigation button
  ele.appendChild(navigationButton());

  // apend to the parent of the element
  document.getElementById("wrapper").appendChild(ele);
};

const navigationButton = () => {
  // create the next button with click event listener
  const nextButton = document.createElement("button");
  nextButton.textContent = "next";
  nextButton.addEventListener("click", function () {
    // move the next step
    if (index < steps.length - 1) {
      highlight(steps[++index]);
    }
  });

  // create the previous button with click event listener
  const prevButton = document.createElement("button");
  prevButton.textContent = "prev";
  prevButton.addEventListener("click", function () {
    // move the prev step
    if (index > 0) {
      highlight(steps[--index]);
    }
  });

  // create a fragment and these two buttons to it
  const fragment = document.createDocumentFragment();
  fragment.appendChild(prevButton);
  fragment.appendChild(nextButton);

  return fragment;
};

// helper function to scroll to element smoothly
const scrollTo = (element) => {
  const eleTop = element.offsetTop;
  window.scrollTo({ top: eleTop, behavior: "smooth" });
};

// initiate first step
highlight(steps[index]);
