/* 
!hamberger
*/
document.querySelector('nav button.hamburger').addEventListener('click', function() {
    document.querySelector('nav ul.menu').classList.toggle('active');
  });