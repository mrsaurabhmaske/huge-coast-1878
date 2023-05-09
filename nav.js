function scrollToRecommend() {
    document.querySelector('#destinationsrecommended').scrollIntoView({ behavior: 'smooth' });
    
  }

  function scrollTofoot() {
    document.querySelector('#footer').scrollIntoView({ behavior: 'smooth' });
  }
  function scrollTopart5() {
    document.querySelector('#part5').scrollIntoView({ behavior: 'smooth' });
  }
  
    

// !trail code!this works

const hamburger = document.querySelector('.hamburger');
const mainMenu = document.querySelector('.mainMenu');
const menuButtons = mainMenu.querySelectorAll('button');

document.querySelectorAll
hamburger.addEventListener('click', () => {
  
  hamburger.classList.toggle('active');
  
  mainMenu.classList.toggle('active');
}) ;


menuButtons.forEach(button => {
  button.addEventListener('click', () => {
    hamburger.classList.remove('active');
    mainMenu.classList.remove('active');
  });
});