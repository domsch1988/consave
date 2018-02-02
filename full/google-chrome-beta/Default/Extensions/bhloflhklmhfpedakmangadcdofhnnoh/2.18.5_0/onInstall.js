/**
 * This script runs on extension installation.
 * Tracking events for installing and suspending the extension.
 */

/**
 * Track events to google analytics.
 * @param  {event} event Extension event
 */
function analytics(event) {
  const manifest = chrome.runtime.getManifest();

  localStorage.setItem(event.reason, new Date());

  localStorage.setItem('analytics', JSON.stringify({
    eventCategory: event.reason,
    eventAction: manifest.version,
    eventLabel: event.previousVersion || 0
  }));
}

/**
 * On uninstall extension.
 */
function onSuspend() {
  analytics({
    reason: 'suspend'
  });
}

/**
 * Get a new image id.
 * @return {int} The new image id.
 */
function getImageId() {
  const imageIds = backgrounds.imageIds;
  return imageIds[Math.floor(Math.random() * imageIds.length)];
}

/**
 * Get the first random picture and store it in localStorage.
 * Caching the first call image.
 * @param {event} event The install event
 */
function onInit(event) {
  const request = new XMLHttpRequest();
  request.open(
    'GET',
    `https://www.gstatic.com/prettyearth/${getImageId()}.json`,
    true
  );

  request.onload = function() {
    if (this.status < 200 || this.status >= 400) {
      return;
    }

    this.response.timestamp = new Date().getTime();

    localStorage.setItem('image', this.response);
  };

  localStorage.removeItem('changesOverlayClosed');

  request.send();
  analytics(event);
}

/**
 * Add event listeners
 */
if (chrome.runtime && chrome.runtime.onInstalled) {
  chrome.runtime.onInstalled.addListener(onInit);
}
if (chrome.runtime && chrome.runtime.onSuspend) {
  chrome.runtime.onSuspend.addListener(onSuspend);
}
