// Bloqueia clique direito
document.addEventListener('contextmenu', e => e.preventDefault());

// Bloqueia teclas de atalho e print
document.onkeydown = function (e) {
  if (e.ctrlKey && ['u', 's', 'c', 'p'].includes(e.key.toLowerCase())) return false;
  if (['F12', 'PrintScreen'].includes(e.key)) {
    document.body.style.filter = 'blur(10px)';
    setTimeout(() => document.body.style.filter = 'none', 2000);
    return false;
  }
};

// Bloqueia seleção e arrastar
document.addEventListener('selectstart', e => e.preventDefault());
document.addEventListener('dragstart', e => e.preventDefault());
