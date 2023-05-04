const prevButton = document.querySelector('.prev-button');
const nextButton = document.querySelector('.next-button');
const childDivs = document.querySelectorAll('.child');

let currentIdx = 0;
const numVisible = 4;

// show the first 4 child divs, hide the rest
for (let i = numVisible; i < childDivs.length; i++) {
  childDivs[i].classList.add('hidden');
}

prevButton.addEventListener('click', () => {
  if (currentIdx > 0) {
    childDivs[currentIdx + numVisible - 1].classList.add('hidden');
    childDivs[currentIdx - 1].classList.remove('hidden');
    currentIdx--;
  }
});

nextButton.addEventListener('click', () => {
  if (currentIdx < childDivs.length - numVisible) {
    childDivs[currentIdx].classList.add('hidden');
    childDivs[currentIdx + numVisible].classList.remove('hidden');
    currentIdx++;
  }
});
