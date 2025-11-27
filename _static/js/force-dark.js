(function(){
  try {
    // Force Furo to dark mode only
    var b = document.body;
    // Set explicit dark theme and remove auto/light
    b.setAttribute('data-theme', 'dark');
    // Persist setting so theme toggle (if present) sticks to dark
    try { localStorage.setItem('furo-theme', 'dark'); } catch(e){}
    // Remove any theme toggle UI if present
    var toggles = document.querySelectorAll('.theme-toggle');
    toggles.forEach(function(t){ t.style.display = 'none'; });
  } catch(e) { /* noop */ }
})();
