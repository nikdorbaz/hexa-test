document.addEventListener("DOMContentLoaded", function(event) { 
  var sliderNav = document.getElementById('slider-nav'),
    slider = document.getElementById('slider');

  initSlider(slider, sliderNav);
});

function initSlider(slider, nav) {

  if ( !slider || !nav ) {
    return;
  }

  var count = slider.childElementCount,
    title = document.getElementById('slider-title'),
    price = document.getElementById('slider-price'),
    navLeft = nav.getElementsByClassName('slider-nav_left')[0],
    navRight = nav.getElementsByClassName('slider-nav_right')[0],
    navDots = nav.getElementsByClassName('slider-nav_dots')[0],
    active = 0,
    ACTIVECLASS = 'slider-nav_dots-active';

  nav.onclick = function(e) {

    if ( navRight.contains(e.target) ){
      if ( active !== count - 1 ) { active++ }
    }

    if ( navLeft.contains(e.target) ){
      if ( active !== 0 ) {active--} 
    }

    if ( navDots.contains(e.target) && e.target.dataset.slide ){
      active = parseInt(e.target.dataset.slide);
    }

    if ( slider.children[active].dataset.price ) {

      price.classList.add('changed');
      price.children[1].textContent = slider.children[active].dataset.price;

      setTimeout(function(){
        price.classList.remove('changed');
      }, 500);
    }

    if ( slider.children[active].dataset.title ) {

      title.classList.add('changed');
      title.children[0].textContent = slider.children[active].dataset.title;

      setTimeout(function(){
        title.classList.remove('changed');
      }, 500);

    }

    for ( var i = 0; i < navDots.children.length; i++ ){
      if ( i != active ) {
        navDots.children[i].classList.remove(ACTIVECLASS);
      }
    }
    slider.style.marginLeft = - window.innerWidth * active + 'px';
    navDots.children[active].classList.add(ACTIVECLASS);

  } 
}