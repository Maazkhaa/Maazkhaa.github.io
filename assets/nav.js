  (function(){
    var toggle = document.getElementById('menuToggle');
    var drawer = document.getElementById('mobileDrawer');
    var backdrop = document.getElementById('drawerBackdrop');

    function openMenu(){
      toggle.classList.add('is-open');
      drawer.classList.add('is-open');
      backdrop.classList.add('is-open');
      toggle.setAttribute('aria-expanded','true');
      drawer.setAttribute('aria-hidden','false');
      document.body.style.overflow='hidden';
    }
    function closeMenu(){
      toggle.classList.remove('is-open');
      drawer.classList.remove('is-open');
      backdrop.classList.remove('is-open');
      toggle.setAttribute('aria-expanded','false');
      drawer.setAttribute('aria-hidden','true');
      document.body.style.overflow='';
    }
    toggle.addEventListener('click', function(){
      drawer.classList.contains('is-open') ? closeMenu() : openMenu();
    });
    backdrop.addEventListener('click', closeMenu);
    drawer.querySelectorAll('a').forEach(function(link){
      link.addEventListener('click', closeMenu);
    });
    document.addEventListener('keydown', function(e){
      if(e.key === 'Escape') closeMenu();
    });
    window.addEventListener('resize', function(){
      if(window.innerWidth > 920) closeMenu();
    });
  })();

// FAQ accordion (only runs if .faq-item elements exist on the page)
document.querySelectorAll('.faq-q').forEach(function(btn){
  btn.addEventListener('click', function(){
    var item = btn.closest('.faq-item');
    var wasOpen = item.classList.contains('is-open');
    item.parentElement.querySelectorAll('.faq-item').forEach(function(i){ i.classList.remove('is-open'); });
    if(!wasOpen) item.classList.add('is-open');
  });
});
