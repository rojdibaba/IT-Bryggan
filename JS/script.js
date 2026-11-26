document.addEventListener('DOMContentLoaded', () => {

    document.addEventListener('click', (event) => {
        
        const trigger = event.target.closest('[data-js-action]');
        
        // Om användaren klickade någon annanstans än på våra knappar, gör ingenting
        if (!trigger) return; 

        const action = trigger.getAttribute('data-js-action');
        const targetId = trigger.getAttribute('data-js-target');

        // Logik för att ÖPPNA modalen
        if (action === 'open-modal') {
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.showModal(); 
                document.body.style.overflow = 'hidden'; 
            }
        }

        // Logik för att STÄNGA modalen
        if (action === 'close-modal') {
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.close();
                document.body.style.overflow = ''; 
            }
        }

        // Logik för att FÄLLA UT / DÖLJA kundomdömen på referenser.html
        if (action === 'expand-case') {
            const detailsId = trigger.getAttribute('aria-controls');
            const detailsBox = document.getElementById(detailsId);

            if (detailsBox) {
                const isExpanded = trigger.getAttribute('aria-expanded') === 'true';
                detailsBox.hidden = isExpanded;
                trigger.setAttribute('aria-expanded', String(!isExpanded));
                trigger.textContent = isExpanded ? 'Läs hela kundomdömet' : 'Dölj kundomdömet';
            }
        }
    });

    // Stänger modalen om användaren klickar utanför rutan
    const modals = document.querySelectorAll('.project-modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            const rect = modal.getBoundingClientRect();
            const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
              && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
            
            if (!isInDialog) {
                modal.close();
                document.body.style.overflow = '';
            }
        });
    });

    // KONTAKTMETOD (TELEFON / E-POST)
    const contactRadios = document.querySelectorAll('input[name="contact_method"]');
    const phoneFieldset = document.querySelector('[data-js-target="phone-fieldset"]');
    const phoneInput = document.getElementById('phone');

    if (contactRadios.length > 0 && phoneFieldset && phoneInput) {
        contactRadios.forEach((radio) => {
            radio.addEventListener('change', () => {
                if (radio.value === 'Telefon' && radio.checked) {
                    phoneFieldset.hidden = false;
                    phoneInput.required = true;
                    phoneInput.focus();
                } else if (radio.value === 'E-post' && radio.checked) {
                    phoneFieldset.hidden = true;
                    phoneInput.required = false;
                    phoneInput.value = '';
                }
            });
        });
    }

    // FORMULÄRVALIDERING PÅ KONTAKTSIDAN
    const contactForm = document.querySelector('[data-js-action="validate-form"]');
    const feedbackElement = document.querySelector('[data-js-target="form-feedback"]');

    if (contactForm && feedbackElement) {
        contactForm.addEventListener('submit', (event) => {
            const nameInput = document.getElementById('name');
            const emailInput = document.getElementById('email');
            const messageInput = document.getElementById('message');
            const selectedMethod = document.querySelector('input[name="contact_method"]:checked');

            let errorMessage = '';

            if (!nameInput.value.trim()) {
                errorMessage = 'Du måste fylla i ditt namn.';
            } else if (!emailInput.value.trim() || !emailInput.value.includes('@')) {
                errorMessage = 'Vänligen ange en giltig e-postadress.';
            } else if (selectedMethod && selectedMethod.value === 'Telefon' && (!phoneInput || !phoneInput.value.trim())) {
                errorMessage = 'Du har valt telefonkontakt och måste ange ett telefonnummer.';
            } else if (messageInput.value.trim().length < 10) {
                errorMessage = 'Meddelandet måste vara minst 10 tecken långt.';
            }

            if (errorMessage !== '') {
                event.preventDefault();
                feedbackElement.textContent = errorMessage;
            } else {
                feedbackElement.textContent = '';
            }
        });
    }
});