document.addEventListener('DOMContentLoaded', function() {
  const toggleBtn = document.getElementById('toggleBtn');
  const extensionState = document.getElementById('extensionState');

  chrome.storage.sync.get('extensionEnabled', function(data) {
    const enabled = data.extensionEnabled !== false; // Default to true if not set

    if (enabled) {
      toggleBtn.textContent = 'Toggle Off';
      extensionState.textContent = 'State: Enabled';
    } else {
      toggleBtn.textContent = 'Toggle On';
      extensionState.textContent = 'State: Disabled';
    }

    toggleBtn.addEventListener('click', function() {
      const newEnabledState = !enabled;
      chrome.storage.sync.set({ extensionEnabled: newEnabledState });

      if (newEnabledState) {
        toggleBtn.textContent = 'Toggle Off';
        extensionState.textContent = 'State: Enabled';
      } else {
        toggleBtn.textContent = 'Toggle On';
        extensionState.textContent = 'State: Disabled';
      }
    });
  });
});
