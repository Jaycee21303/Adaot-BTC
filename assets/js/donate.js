// Lightning donation QR generator and clipboard helper

document.addEventListener('DOMContentLoaded', () => {
    const invoiceElement = document.getElementById('invoice-text');
    const qrCanvas = document.getElementById('lightning-qr');
    const copyButton = document.getElementById('copy-invoice');

    if (!invoiceElement || !qrCanvas) return;

    const invoiceText = invoiceElement.textContent.trim();

    try {
        new QRious({ element: qrCanvas, value: invoiceText, size: 256, level: 'H' });
    } catch (e) {
        console.error('QR generation failed', e);
    }

    if (copyButton) {
        copyButton.addEventListener('click', async () => {
            try {
                await navigator.clipboard.writeText(invoiceText);
                copyButton.textContent = 'Copied!';
                copyButton.setAttribute('aria-live', 'polite');
                setTimeout(() => {
                    copyButton.textContent = 'Copy';
                    copyButton.removeAttribute('aria-live');
                }, 2500);
            } catch (err) {
                copyButton.textContent = 'Copy failed';
                setTimeout(() => (copyButton.textContent = 'Copy'), 2500);
            }
        });
    }
});
