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

// Contact form submission via Web3Forms (no page reload, no redirect)
document.querySelectorAll('.gap-assessment-form').forEach(function(form){
  var statusBox = form.querySelector('.form-status');
  var submitBtn = form.querySelector('.form-submit-btn');

  form.addEventListener('submit', async function(e){
    e.preventDefault();

    // Honeypot spam check - if this hidden field has a value, silently drop it
    var honeypot = form.querySelector('input[name="botcheck"]');
    if (honeypot && honeypot.value !== '') return;

    submitBtn.disabled = true;
    submitBtn.textContent = 'Sending…';
    statusBox.classList.remove('is-success', 'is-error');

    try {
      var formData = new FormData(form);
      var response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: { 'Accept': 'application/json' },
        body: formData
      });
      var result = await response.json();

      if (result.success) {
        statusBox.textContent = "Thanks — we've received your request and will get back to you within one business day.";
        statusBox.classList.add('is-success');
        form.reset();
      } else {
        statusBox.textContent = 'Something went wrong sending your request. Please call or email us directly instead.';
        statusBox.classList.add('is-error');
      }
    } catch (err) {
      statusBox.textContent = 'Something went wrong sending your request. Please call or email us directly instead.';
      statusBox.classList.add('is-error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = 'Request my free gap assessment';
    }
  });
});
