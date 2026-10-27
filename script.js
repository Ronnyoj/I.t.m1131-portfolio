const menuToggle = document.querySelector('#menu-toggle');
const mainNav = document.querySelector('#main-nav');

menuToggle.addEventListener('click', () => {
    const menuIsOpen = mainNav.classList.toggle('open');

    menuToggle.setAttribute('aria-expanded', String(menuIsOpen));
    menuToggle.textContent = menuIsOpen ? 'Close menu ✕' : 'Menu ☰';
});


mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = 'Menu ☰';
    });
});


const messageField = document.querySelector('#message');
const characterCount = document.querySelector('#character-count');

function updateCharacterCount() {
    const numberOfCharacters = messageField.value.length;
    characterCount.textContent = `${numberOfCharacters} character${numberOfCharacters === 1 ? '' : 's'}`;
}

messageField.addEventListener('input', updateCharacterCount);

updateCharacterCount();
