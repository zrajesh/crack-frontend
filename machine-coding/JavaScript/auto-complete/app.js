let searchList = [
  {
    title:
      "The industrious ants carried crumbs ten times their size back to their hidden colony.",
  },
  {
    title:
      "With a mischievous glint in her eye, the little girl dipped her toes into the cool, inviting puddle.",
  },
  {
    title:
      "The aroma of freshly baked bread wafted from the bakery window, tempting passersby.",
  },
  {
    title:
      "Lost in the labyrinthine library, he wandered among towering shelves stacked with forgotten knowledge.",
  },
  {
    title:
      "The astronaut gazed in awe at the Earth, a blue marble suspended in the vast emptiness of space.",
  },
  {
    title:
      "Determined to win the race, the cheetah sprinted across the savanna, a blur of tawny fur.",
  },
  {
    title:
      "Raindrops pattered a gentle rhythm on the windowpane, creating a cozy atmosphere inside.",
  },
  {
    title:
      "The flickering candlelight cast dancing shadows on the walls of the ancient castle.",
  },
  {
    title:
      "The wise old owl hooted from his perch, his amber eyes surveying the moonlit forest.",
  },
  {
    title:
      "Filled with anticipation, the children tore open the brightly wrapped presents.",
  },
];

const suggesstionsContainer = document.querySelector(".suggesstion-container");
const inputField = document.querySelector(".input-field");

inputField.addEventListener("input", filterSearchList);

function filterSearchList() {
  const inputValue = inputField.value;
  console.log(inputValue);
  if (!inputValue) {
    showSuggesstions([]);
    return;
  }
  const suggesstionList = searchList.filter((search) =>
    search.title.toLocaleLowerCase().includes(inputValue.toLocaleLowerCase())
  );
  console.log(suggesstionList);
  showSuggesstions(suggesstionList);
}

function showSuggesstions(suggesstionList) {
  suggesstionsContainer.textContent = "";
  suggesstionList?.map((suggesstion) => {
    const paragraph = document.createElement("p");
    paragraph.textContent = suggesstion.title;
    suggesstionsContainer.appendChild(paragraph);
  });
}
