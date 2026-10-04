const THEME_KEY = 'bora-tema';
let darkMode = false;

try {
  darkMode = localStorage.getItem(THEME_KEY) === 'escuro';
}
catch {
  darkMode = false;
}

document.body.classList.toggle('dark-mode', darkMode);

const themeCheckbox = document.getElementById('dark-mode');

if (themeCheckbox) {
  themeCheckbox.checked = darkMode;
  const themeStatus = document.getElementById('theme-status');

  themeCheckbox.addEventListener('change', () => {
    document.body.classList.toggle('dark-mode', themeCheckbox.checked);

    try {
      localStorage.setItem(THEME_KEY, themeCheckbox.checked ? 'escuro' : 'claro');
      themeStatus.textContent = '';
    }
    catch {
      themeStatus.textContent = 'O tema foi aplicado, mas não foi possível salvar a escolha neste navegador.';
    }
  });
}
