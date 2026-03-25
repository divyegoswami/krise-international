function showFieldError(field, message) {
  const errorId = `${field.id}-error`;
  const errorEl = document.getElementById(errorId);

  if (errorEl) {
    errorEl.textContent = message;
  }

  field.setAttribute('aria-invalid', message ? 'true' : 'false');
}

function clearStatus(statusEl) {
  statusEl.className = '';
  statusEl.textContent = '';
}

function setStatus(statusEl, type, message) {
  statusEl.className = `status ${type}`;
  statusEl.textContent = message;
}

function validateEmail(value) {
  return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(value);
}

document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('inquiry-form');
  const statusEl = document.getElementById('form-status');
  if (!form || !statusEl) return;

  const requiredFields = [
    { id: 'full-name', label: 'Full Name' },
    { id: 'company-name', label: 'Company Name' },
    { id: 'country', label: 'Country' },
    { id: 'email', label: 'Email' },
    { id: 'product-interest', label: 'Product of Interest' },
    { id: 'message', label: 'Message / Specifications' }
  ];

  requiredFields.forEach(({ id }) => {
    const field = document.getElementById(id);
    if (!field) return;

    field.addEventListener('input', () => {
      showFieldError(field, '');
      clearStatus(statusEl);
    });
  });

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    clearStatus(statusEl);

    let hasError = false;

    requiredFields.forEach(({ id, label }) => {
      const field = document.getElementById(id);
      if (!field) return;

      const value = field.value.trim();
      if (!value) {
        showFieldError(field, `${label} is required.`);
        hasError = true;
        return;
      }

      if (id === 'email' && !validateEmail(value)) {
        showFieldError(field, 'Please enter a valid business email address.');
        hasError = true;
        return;
      }

      showFieldError(field, '');
    });

    if (hasError) {
      setStatus(statusEl, 'error', 'Please review the highlighted fields before submitting.');
      return;
    }

    setStatus(
      statusEl,
      'success',
      'Thank you. Your inquiry has been recorded. Our team will contact you shortly at the email provided.'
    );

    form.reset();

    requiredFields.forEach(({ id }) => {
      const field = document.getElementById(id);
      if (field) {
        showFieldError(field, '');
      }
    });
  });
});
