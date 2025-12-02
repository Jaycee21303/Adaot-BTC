// Accessible tooltip toggle for info icons
// Converts hover-only tooltips into keyboard and screen-reader friendly helpers

document.addEventListener('DOMContentLoaded', () => {
    const infoButtons = document.querySelectorAll('[data-tooltip-target]');

    infoButtons.forEach((button) => {
        const tooltipId = button.getAttribute('data-tooltip-target');
        const tooltip = tooltipId ? document.getElementById(tooltipId) : null;

        if (!tooltip) return;

        const showTooltip = () => {
            tooltip.classList.add('visible');
            button.setAttribute('aria-expanded', 'true');
        };

        const hideTooltip = () => {
            tooltip.classList.remove('visible');
            button.setAttribute('aria-expanded', 'false');
        };

        button.addEventListener('mouseenter', showTooltip);
        button.addEventListener('focus', showTooltip);
        button.addEventListener('mouseleave', hideTooltip);
        button.addEventListener('blur', hideTooltip);
    });
});
