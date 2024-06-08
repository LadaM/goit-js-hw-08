import throttle from 'lodash.throttle';

// Select the form and its elements
const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageTextarea = form.querySelector('textarea[name="message"]');

const FORM_STATE_STORAGE_KEY = 'feedback-form-state';

const loadFormData = () => {
  const savedData = localStorage.getItem(FORM_STATE_STORAGE_KEY);
  if (savedData) {
    const formData = JSON.parse(savedData);
    console.log('Loaded FormData:', formData);
    if (formData.email) emailInput.value = formData.email;
    if (formData.message) messageTextarea.value = formData.message;
  }
};
document.addEventListener('DOMContentLoaded', loadFormData);

const saveFormData = throttle(() => {
  const formDataObj = {
    email: emailInput.value,
    message: messageTextarea.value,
  };
  localStorage.setItem(FORM_STATE_STORAGE_KEY, JSON.stringify(formDataObj));
}, 500);

emailInput.addEventListener('input', saveFormData);
messageTextarea.addEventListener('input', saveFormData);

form.addEventListener('submit', (event) => {
  event.preventDefault();

  const formData = new FormData(form);
  const formDataObj = Array.from(formData.entries()).reduce((acc, [key, value]) => {
    acc[key] = value;
    return acc;
  }, {});
  console.log('Form submitted:', formDataObj);

  localStorage.removeItem(FORM_STATE_STORAGE_KEY);
  form.reset();
});

