/**
 * VROOM.PT - Protection Script
 * Deterrent for content theft and image saving.
 */

export function initProtection() {
  console.log('VROOM: Protection system initialized.');

  // 1. Disable Right-Click on the entire document
  document.addEventListener('contextmenu', (e) => {
    e.preventDefault();
    return false;
  });

  // 2. Disable Image Dragging
  document.addEventListener('dragstart', (e) => {
    if (e.target.tagName === 'IMG') {
      e.preventDefault();
      return false;
    }
  });

  // 3. Disable common keyboard shortcuts for saving/inspecting
  document.addEventListener('keydown', (e) => {
    // Ctrl+S (Save)
    if ((e.ctrlKey || e.metaKey) && e.key === 's') {
      e.preventDefault();
    }
    // Ctrl+U (View Source)
    if ((e.ctrlKey || e.metaKey) && e.key === 'u') {
      e.preventDefault();
    }
    // F12 (DevTools)
    if (e.key === 'F12') {
      e.preventDefault();
    }
    // Ctrl+Shift+I (DevTools)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'i') {
      e.preventDefault();
    }
    // Ctrl+Shift+C (Inspect)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'c') {
      e.preventDefault();
    }
    // Ctrl+Shift+J (Console)
    if ((e.ctrlKey || e.metaKey) && e.shiftKey && e.key === 'j') {
      e.preventDefault();
    }
  });

  // 4. Protection against Print Screen (deterrent only)
  // We can't really block Print Screen, but we can clear clipboard or show a message if they try to print
  window.addEventListener('keyup', (e) => {
    if (e.key === 'PrintScreen') {
      navigator.clipboard.writeText('');
      // No alert in iframe
    }
  });
}
