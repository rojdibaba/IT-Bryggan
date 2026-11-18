// Vänta tills hela HTML-dokumentet har laddats
document.addEventListener('DOMContentLoaded', () => {

    // Lyssna efter alla klick på hela sidan (Event Delegation)
    document.addEventListener('click', (event) => {
        
        // Hitta närmaste klickade element som har ett data-js-action-attribut
        const trigger = event.target.closest('[data-js-action]');
        
        // Om användaren klickade någon annanstans än på våra knappar, gör ingenting
        if (!trigger) return; 

        // Hämta värdena från krokarna vi satte i HTML-filen
        const action = trigger.getAttribute('data-js-action');
        const targetId = trigger.getAttribute('data-js-target');

        // Logik för att ÖPPNA modalen
        if (action === 'open-modal') {
            const modal = document.getElementById(targetId);
            if (modal) {
                // .showModal() är en inbyggd funktion för <dialog> som automatiskt lägger sig överst och mörkar bakgrunden
                modal.showModal(); 
                
                // Lås bakgrunden så man inte kan skrolla upp och ner medan fönstret är öppet
                document.body.style.overflow = 'hidden'; 
            }
        }

        // Logik för att STÄNGA modalen
        if (action === 'close-modal') {
            const modal = document.getElementById(targetId);
            if (modal) {
                modal.close(); // .close() är också inbyggt!
                
                // Lås upp skrollningen på sidan igen
                document.body.style.overflow = ''; 
            }
        }
    });

    // BONUS/PROFFSTIPS: Stäng modalen om användaren klickar utanför rutan (på den mörka bakgrunden)
    const modals = document.querySelectorAll('.project-modal');
    modals.forEach(modal => {
        modal.addEventListener('click', (event) => {
            // Kollar om muspekarens position är utanför själva innehållsrutan
            const rect = modal.getBoundingClientRect();
            const isInDialog = (rect.top <= event.clientY && event.clientY <= rect.top + rect.height
              && rect.left <= event.clientX && event.clientX <= rect.left + rect.width);
            
            if (!isInDialog) {
                modal.close();
                document.body.style.overflow = '';
            }
        });
    });

});