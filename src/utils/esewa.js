// src/utils/esewa.js

// This function dynamically creates and submits a form to redirect the user to eSewa.
export const postToEsewa = (params) => {
  const form = document.createElement('form');
  form.setAttribute('method', 'POST');
  // Use eSewa's UAT (User Acceptance Testing) URL for development
  form.setAttribute('action', 'https://uat.esewa.com.np/epay/main');

  for (const key in params) {
    const hiddenField = document.createElement('input');
    hiddenField.setAttribute('type', 'hidden');
    hiddenField.setAttribute('name', key);
    hiddenField.setAttribute('value', params[key]);
    form.appendChild(hiddenField);
  }

  document.body.appendChild(form);
  form.submit();
};
