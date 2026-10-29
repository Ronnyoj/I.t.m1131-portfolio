'use strict';

// Mobile navigation menu
const menuToggle = document.querySelector('#menu-toggle');
const mainNav = document.querySelector('#main-nav');

if (menuToggle && mainNav) {
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
}

// Load course modules from JSON using fetch() (AJAX-style page update).
const modulesList = document.querySelector('#modules-list');
const modulesStatus = document.querySelector('#modules-status');

async function loadModules() {
  if (!modulesList || !modulesStatus) return;

  modulesStatus.textContent = 'Loading course modules…';
  modulesStatus.className = 'status-message';

  try {
    const response = await fetch('modules.json');

    // fetch() does not reject automatically for HTTP errors such as 404.
    if (!response.ok) {
      throw new Error(`The server returned ${response.status} ${response.statusText}.`);
    }

    const modules = await response.json();

    if (!Array.isArray(modules)) {
      throw new Error('The JSON file should contain a list of course modules.');
    }

    modulesList.replaceChildren();

    if (modules.length === 0) {
      modulesStatus.textContent = 'No course modules have been added yet.';
      modulesStatus.className = 'status-message';
      return;
    }

    modules.forEach((module) => {
      if (
        typeof module.name !== 'string' ||
        module.name.trim() === '' ||
        !Number.isFinite(Number(module.hours)) ||
        Number(module.hours) < 0
      ) {
        throw new Error('Each module needs a name and a valid, non-negative hours value.');
      }

      const item = document.createElement('li');
      item.className = 'module-item';

      const name = document.createElement('strong');
      name.textContent = module.name;

      const hours = document.createElement('span');
      hours.className = 'module-hours';
      hours.textContent = `${Number(module.hours)} study hour${Number(module.hours) === 1 ? '' : 's'}`;

      item.append(name, hours);
      modulesList.append(item);
    });

    modulesStatus.textContent = `Loaded ${modules.length} course module${modules.length === 1 ? '' : 's'} successfully.`;
    modulesStatus.className = 'status-message success';
  } catch (error) {
    modulesList.replaceChildren();
    modulesStatus.textContent =
      `Could not load course modules. Check that modules.json exists, contains valid JSON, and that you are running this site through a local web server. Details: ${error.message}`;
    modulesStatus.className = 'status-message error';
  }
}

loadModules();

// Live character count and simple client-side contact form feedback.
const messageField = document.querySelector('#message');
const characterCount = document.querySelector('#character-count');
const contactForm = document.querySelector('#contact-form');
const formStatus = document.querySelector('#form-status');

function updateCharacterCount() {
  if (!messageField || !characterCount) return;

  const numberOfCharacters = messageField.value.length;
  characterCount.textContent =
    `${numberOfCharacters} character${numberOfCharacters === 1 ? '' : 's'}`;
}

if (messageField && characterCount) {
  messageField.addEventListener('input', updateCharacterCount);
  updateCharacterCount();
}

if (contactForm && formStatus) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();

    if (!contactForm.reportValidity()) return;

    formStatus.textContent =
      'Your form passed the browser checks. This demo does not send messages to an email address.';
    formStatus.className = 'status-message success';
    contactForm.reset();
    updateCharacterCount();
  });
}
