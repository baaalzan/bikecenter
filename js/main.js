document.addEventListener('DOMContentLoaded', function() {
  // Footer year
  var yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // Slider
  var slides = document.querySelectorAll('.slide');
  var dotsContainer = document.getElementById('slideDots');
  var current = 0;

  slides.forEach(function(s, i){
    var dot = document.createElement('div');
    dot.className = 'slide-dot' + (i===0? ' active':'');
    dot.dataset.index = i;
    dotsContainer.appendChild(dot);
    dot.addEventListener('click', function(){ goTo(i); });
  });

  function show(i){
    slides.forEach(function(s){ s.classList.remove('active'); });
    slides[i].classList.add('active');
    var dots = document.querySelectorAll('.slide-dot');
    dots.forEach(function(d){ d.classList.remove('active'); });
    dots[i].classList.add('active');
  }

  function goTo(i){
    current = (i + slides.length) % slides.length;
    show(current);
  }

  document.querySelector('.slide-next').addEventListener('click', function(){ goTo(current+1); });
  document.querySelector('.slide-prev').addEventListener('click', function(){ goTo(current-1); });

  var sliderInterval = setInterval(function(){ goTo(current+1); }, 5000);
  var sliderEl = document.getElementById('slider');
  sliderEl.addEventListener('mouseenter', function(){ clearInterval(sliderInterval); });
  sliderEl.addEventListener('mouseleave', function(){ sliderInterval = setInterval(function(){ goTo(current+1); }, 5000); });

  // Hamburger toggle
  var hamburger = document.querySelector('.hamburger');
  var menu = document.querySelector('.menu');
  hamburger.addEventListener('click', function(){
    if(menu.classList.contains('mobile')){
      menu.classList.remove('mobile');
      this.textContent = '☰';
      // fecha todos dropdowns abertos
      document.querySelectorAll('.menu-item.open').forEach(function(item){
        item.classList.remove('open');
      });
    } else {
      menu.classList.add('mobile');
      this.textContent = '✕';
    }
  });

  // Mobile dropdown toggles
  document.querySelectorAll('.menu-item.has-dropdown > a').forEach(function(a){
    a.addEventListener('click', function(e){
      if(window.innerWidth <= 900){
        e.preventDefault();
        var parent = this.parentElement;

        // Fecha outros dropdowns abertos
        document.querySelectorAll('.menu-item.open').forEach(function(item){
          if(item !== parent) item.classList.remove('open');
        });

        parent.classList.toggle('open');
      }
    });
  });

  // Search demo
  var searchBtn = document.querySelector('.search .search-btn');
  if(searchBtn) searchBtn.addEventListener('click', function(){
    var q = document.querySelector('.search input').value.trim();
    if(q) alert('Busca por: ' + q + '\n(Demo)');
  });

  // Form demo
  window.handleForm = function(e){
    e.preventDefault();
    var data = new FormData(document.getElementById('contactForm'));
    alert('Obrigado, ' + (data.get('name')||'') + '! Mensagem (demo).');
    document.getElementById('contactForm').reset();
    return false;
  }
});
