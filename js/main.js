/* =========================================================
   EthioSync — Global site behavior (header, theme, mobile nav,
   homepage search/filter, footer year)
   ========================================================= */
(function(){
  "use strict";

  /* ---------- Theme toggle (persisted) ---------- */
  function initTheme(){
    var saved = localStorage.getItem('nt-theme');
    var root = document.documentElement;
    if(saved === 'dark'){ root.setAttribute('data-theme','dark'); }
    var toggles = document.querySelectorAll('.theme-toggle');
    function sync(){
      var isDark = root.getAttribute('data-theme') === 'dark';
      toggles.forEach(function(btn){
        btn.innerHTML = isDark ? '<i class="fa-solid fa-sun"></i>' : '<i class="fa-solid fa-moon"></i>';
        var isAm = document.documentElement.lang === 'am';
        btn.setAttribute('aria-label', isAm ? (isDark ? 'ወደ ብሩህ ገጽታ ይቀይሩ' : 'ወደ ጨለማ ገጽታ ይቀይሩ') : (isDark ? 'Switch to light mode' : 'Switch to dark mode'));
      });
    }
    toggles.forEach(function(btn){
      btn.addEventListener('click', function(){
        var isDark = root.getAttribute('data-theme') === 'dark';
        if(isDark){ root.removeAttribute('data-theme'); localStorage.setItem('nt-theme','light'); }
        else{ root.setAttribute('data-theme','dark'); localStorage.setItem('nt-theme','dark'); }
        sync();
      });
    });
    sync();
  }

  /* ---------- Mobile nav ---------- */
  function initMobileNav(){
    var toggle = document.querySelector('.nav-toggle');
    var nav = document.querySelector('.mobile-nav');
    if(!toggle || !nav) return;
    toggle.setAttribute('aria-expanded','false');
    toggle.addEventListener('click', function(){
      nav.classList.toggle('open');
      var open = nav.classList.contains('open');
      toggle.setAttribute('aria-expanded', String(open));
      toggle.setAttribute('aria-label', open ? 'Close menu' : 'Open menu');
      toggle.innerHTML = open ? '<i class="fa-solid fa-xmark"></i>' : '<i class="fa-solid fa-bars"></i>';
    });
    nav.querySelectorAll('a').forEach(function(a){
      a.addEventListener('click', function(e){
        if(a.classList.contains('nav-drop-btn')){ e.preventDefault(); return; } /* keep drawer open for submenu toggle */
        nav.classList.remove('open'); toggle.setAttribute('aria-expanded','false'); toggle.setAttribute('aria-label','Open menu'); toggle.innerHTML='<i class="fa-solid fa-bars"></i>';
      });
    });
  }

  document.addEventListener('ethiosync:languagechange', function(){ document.querySelectorAll('.theme-toggle').length && initThemeLabelsOnly(); });
  function initThemeLabelsOnly(){
    var isDark=document.documentElement.getAttribute('data-theme')==='dark',isAm=document.documentElement.lang==='am';
    document.querySelectorAll('.theme-toggle').forEach(function(btn){btn.setAttribute('aria-label',isAm?(isDark?'ወደ ብሩህ ገጽታ ይቀይሩ':'ወደ ጨለማ ገጽታ ይቀይሩ'):(isDark?'Switch to light mode':'Switch to dark mode'));});
  }

  /* ---------- Footer year ---------- */
  function initFooterYear(){
    var el = document.getElementById('footer-year');
    if(el) el.textContent = new Date().getFullYear();
  }

  /* ---------- Toast helper (global) ---------- */
  window.NT = window.NT || {};
  window.NT.toast = function(msg, icon){
    var el = document.querySelector('.toast');
    if(!el){
      el = document.createElement('div');
      el.className = 'toast';
      document.body.appendChild(el);
    }
    el.innerHTML = (icon || '<i class="fa-solid fa-circle-check"></i>') + ' <span></span>';
    el.querySelector('span').textContent = msg;
    el.classList.add('show');
    clearTimeout(window.__ntToastTimer);
    window.__ntToastTimer = setTimeout(function(){ el.classList.remove('show'); }, 2200);
  };

  window.NT.copyText = function(text, successMsg){
    if(navigator.clipboard && navigator.clipboard.writeText){
      navigator.clipboard.writeText(text).then(function(){
        window.NT.toast(successMsg || 'Copied to clipboard');
      }).catch(function(){ fallbackCopy(text, successMsg); });
    } else {
      fallbackCopy(text, successMsg);
    }
  };
  function fallbackCopy(text, successMsg){
    var ta = document.createElement('textarea');
    ta.value = text; ta.style.position='fixed'; ta.style.opacity='0';
    document.body.appendChild(ta); ta.select();
    try{ document.execCommand('copy'); window.NT.toast(successMsg || 'Copied to clipboard'); }catch(e){}
    document.body.removeChild(ta);
  }

  window.NT.downloadText = function(filename, content, mime){
    var blob = new Blob([content], {type: mime || 'text/plain'});
    var url = URL.createObjectURL(blob);
    var a = document.createElement('a');
    a.href = url; a.download = filename;
    document.body.appendChild(a); a.click();
    document.body.removeChild(a);
    setTimeout(function(){ URL.revokeObjectURL(url); }, 1000);
  };

  /* ---------- Homepage: search + category filter ---------- */
  function initHomeSearch(){
    var searchInputs = document.querySelectorAll('[data-tool-search]');
    var cards = document.querySelectorAll('.tool-card');
    var chips = document.querySelectorAll('.chip[data-cat]');
    var noResults = document.querySelector('.no-results');
    if(!cards.length) return;

    var activeCat = 'all';

    function applyFilter(){
      var q = (searchInputs[0] ? searchInputs[0].value : '').trim().toLowerCase();
      var visibleCount = 0;
      cards.forEach(function(card){
        var cat = card.getAttribute('data-cat') || '';
        var name = (card.getAttribute('data-name') || '').toLowerCase();
        var desc = (card.getAttribute('data-desc') || '').toLowerCase();
        var matchCat = (activeCat === 'all') || (cat === activeCat);
        var matchQuery = !q || name.indexOf(q) !== -1 || desc.indexOf(q) !== -1;
        var show = matchCat && matchQuery;
        card.style.display = show ? '' : 'none';
        if(show) visibleCount++;
      });
      if(noResults) noResults.style.display = visibleCount === 0 ? 'block' : 'none';
    }

    searchInputs.forEach(function(inp){
      inp.addEventListener('input', applyFilter);
      var form = inp.closest('form');
      if(form) form.addEventListener('submit', function(e){ e.preventDefault(); applyFilter(); });
    });

    chips.forEach(function(chip){
      chip.addEventListener('click', function(){
        chips.forEach(function(c){ c.classList.remove('active'); });
        chip.classList.add('active');
        activeCat = chip.getAttribute('data-cat');
        applyFilter();
      });
    });

    // Support deep-linking from nav (e.g. index.html#cat-developer)
    var hash = window.location.hash.replace('#','');
    if(hash.indexOf('cat-') === 0){
      var wantedCat = hash.replace('cat-','');
      var target = document.querySelector('.chip[data-cat="' + wantedCat + '"]');
      if(target){
        chips.forEach(function(c){ c.classList.remove('active'); });
        target.classList.add('active');
        activeCat = wantedCat;
        setTimeout(function(){
          document.getElementById('all-tools').scrollIntoView({behavior:'smooth'});
        }, 100);
      }
    }

    applyFilter();
  }

  document.addEventListener('DOMContentLoaded', function(){
    initTheme();
    initMobileNav();
    initFooterYear();
    initHomeSearch();
  });
})();

/* ---------- All Tools dropdown (desktop + mobile) ---------- */
(function(){
  function closeAll(){ document.querySelectorAll('.nav-item.open,.m-nav-item.open').forEach(function(el){ el.classList.remove('open'); }); }
  document.querySelectorAll('.nav-drop-btn').forEach(function(btn){
    btn.addEventListener('click', function(e){
      e.preventDefault();
      var item = btn.closest('.nav-item,.m-nav-item');
      var wasOpen = item.classList.contains('open');
      closeAll();
      if(!wasOpen) item.classList.add('open');
    });
  });
  document.addEventListener('click', function(e){
    if(!e.target.closest('.nav-item,.m-nav-item')) closeAll();
  });
})();

/* Re-apply category filter when hash changes (dropdown links) */
window.addEventListener('hashchange', function(){
  var hash = window.location.hash.replace('#','');
  if(hash.indexOf('cat-') === 0){
    var wantedCat = hash.replace('cat-','');
    var target = document.querySelector('.chip[data-cat="' + wantedCat + '"]');
    if(target) target.click();
  }
});
