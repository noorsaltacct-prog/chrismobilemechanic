const menuToggle = document.getElementById('menu-toggle');
const navlinks = document.getElementById('navlinks');
if (menuToggle && navlinks) {
  menuToggle.addEventListener('click', () => {
    const open = navlinks.classList.toggle('open');
    menuToggle.setAttribute('aria-expanded', String(open));
  });
}

const form = document.getElementById('lead-form');
const output = document.getElementById('output');
const copyBtn = document.getElementById('copy-btn');

function buildMessage(data) {
  return [
    'Hi, I found your mobile mechanic listing and would like to request service.',
    '',
    `Name: ${data.name || ''}`,
    `Best contact: ${data.contact || ''}`,
    `Vehicle / service needed: ${data.service || ''}`,
    `Location: ${data.location || ''}`,
    `Details: ${data.details || ''}`,
    '',
    'Please let me know your availability. Thank you.'
  ].join('\n');
}

if (form && output) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();
    const data = Object.fromEntries(new FormData(form).entries());
    output.value = buildMessage(data);
    output.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
  });
}

if (copyBtn && output) {
  copyBtn.addEventListener('click', async () => {
    if (!output.value.trim()) {
      output.value = 'Fill out the form and click "Generate Request Message" first.';
      return;
    }
    try {
      await navigator.clipboard.writeText(output.value);
      copyBtn.textContent = 'COPIED!';
      setTimeout(() => { copyBtn.textContent = 'COPY MESSAGE'; }, 1800);
    } catch (error) {
      copyBtn.textContent = 'COPY FAILED';
      setTimeout(() => { copyBtn.textContent = 'COPY MESSAGE'; }, 1800);
    }
  });
}
