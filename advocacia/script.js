document.addEventListener('DOMContentLoaded', () => {
    function showBlockedActionAlert() { alert('Ação bloqueada para proteger o conteúdo.'); }
    document.addEventListener('contextmenu', (e) => { e.preventDefault(); showBlockedActionAlert(); });
    document.addEventListener('keydown', (e) => {
        if (e.key === 'F12' || (e.ctrlKey && ['c', 'u', 's'].includes(e.key.toLowerCase()))) {
            e.preventDefault();
            showBlockedActionAlert();
        }
        if (e.key === 'PrintScreen') { navigator.clipboard.writeText(''); showBlockedActionAlert(); }
    });
    document.addEventListener('copy', (e) => { e.preventDefault(); showBlockedActionAlert(); });
});