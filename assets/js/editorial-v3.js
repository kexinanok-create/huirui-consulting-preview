(function(){
 'use strict';
 if(window.ICONS)window.ICONS.injectAll();
 var toggle=document.getElementById('navToggle'),menu=document.getElementById('mobileMenu');
 function closeMenu(){menu.hidden=true;toggle.setAttribute('aria-expanded','false');toggle.setAttribute('aria-label','打开菜单');}
 toggle.addEventListener('click',function(){menu.hidden=!menu.hidden;toggle.setAttribute('aria-expanded',String(!menu.hidden));toggle.setAttribute('aria-label',menu.hidden?'打开菜单':'关闭菜单');});
 menu.querySelectorAll('a').forEach(function(a){a.addEventListener('click',closeMenu);});
 document.addEventListener('keydown',function(e){if(e.key==='Escape'&&!menu.hidden){closeMenu();toggle.focus();}});
 document.addEventListener('click',function(e){if(!menu.hidden&&!e.target.closest('.site-nav'))closeMenu();});
 var desktopMedia=window.matchMedia('(min-width:768px)');
 desktopMedia.addEventListener('change',function(e){if(e.matches)closeMenu();});
 var reduced=window.matchMedia('(prefers-reduced-motion:reduce)');
 if('IntersectionObserver' in window&&!reduced.matches){
  document.documentElement.classList.add('js-motion');
  var revealObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){entry.target.classList.add('is-visible');revealObserver.unobserve(entry.target);}});},{threshold:.06,rootMargin:'0px 0px -20px 0px'});
  document.querySelectorAll('.reveal').forEach(function(el){revealObserver.observe(el);});
 }
 if('IntersectionObserver' in window){
  var navigation=document.querySelectorAll('.desktop-nav a');
  var sectionObserver=new IntersectionObserver(function(entries){entries.forEach(function(entry){if(entry.isIntersecting){navigation.forEach(function(a){var active=a.getAttribute('href')==='#'+entry.target.id;a.classList.toggle('active',active);if(active)a.setAttribute('aria-current','location');else a.removeAttribute('aria-current');});}});},{rootMargin:'-20% 0px -55% 0px',threshold:0});
  document.querySelectorAll('main>section[id]').forEach(function(el){sectionObserver.observe(el);});
 }
 var dialog=document.getElementById('wechatDialog');
 document.querySelectorAll('[data-open-wechat]').forEach(function(button){button.addEventListener('click',function(){if(!dialog.open)dialog.showModal();});});
 dialog.querySelector('.dialog-close').addEventListener('click',function(){dialog.close();});
 dialog.addEventListener('click',function(e){var r=dialog.getBoundingClientRect();if(e.target===dialog&&(e.clientX<r.left||e.clientX>r.right||e.clientY<r.top||e.clientY>r.bottom))dialog.close();});
 var topButton=document.getElementById('backToTop'),scheduled=false;
 function updateScroll(){topButton.hidden=window.scrollY<window.innerHeight;scheduled=false;}
 window.addEventListener('scroll',function(){if(!scheduled){scheduled=true;requestAnimationFrame(updateScroll);}},{passive:true});
 topButton.addEventListener('click',function(){window.scrollTo({top:0,behavior:reduced.matches?'instant':'smooth'});});
 updateScroll();
})();
