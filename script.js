// Lesson 12: DOM Manipulation and Event Handling

// 1. Toggle the navigation menu when the menu button is clicked.
const menuToggle = document.querySelector('#menu-toggle');
const mainNav = document.querySelector('#main-nav');

menuToggle.addEventListener('click', () => {
    // Add the "open" class if closed, or remove it if already open.
    const menuIsOpen = mainNav.classList.toggle('open');

    // Keep the accessibility state in sync with the menu's visibility.
    menuToggle.setAttribute('aria-expanded', String(menuIsOpen));
    menuToggle.textContent = menuIsOpen ? 'Close menu ✕' : 'Menu ☰';
});

// Close the menu after a navigation link is selected.
mainNav.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', () => {
        mainNav.classList.remove('open');
        menuToggle.setAttribute('aria-expanded', 'false');
        menuToggle.textContent = 'Menu ☰';
    });
});

// 2. Update the message character count on every input event.
const messageField = document.querySelector('#message');
const characterCount = document.querySelector('#character-count');

function updateCharacterCount() {
    const numberOfCharacters = messageField.value.length;
    characterCount.textContent = `${numberOfCharacters} character${numberOfCharacters === 1 ? '' : 's'}`;
}

messageField.addEventListener('input', updateCharacterCount);

// Set the correct count if the browser restores a previously typed message.
updateCharacterCount();
