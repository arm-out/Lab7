// router.js

export const router = {};

const body = document.querySelector('body');
const header = document.querySelector('h1');

/**
 * Changes the "page" (state) that your SPA app is currently set to
 */
router.setState = function(state) {

  if (state.location == 'homepage') {
    header.innerHTML = 'Journal Entries';
    body.setAttribute('class', '');
    history.pushState(state, '', location.origin);
  }
  else if (state.location == 'settings') {
    header.innerHTML = 'Settings';
    body.setAttribute('class', 'settings');
    history.pushState(state, '', "#settings");
  }
  else {
    header.innerHTML = `Entry ${state.entryNum}`;
    body.setAttribute('class', 'single-entry');

    let entry = document.createElement('entry-page');
    entry.entry = document.getElementById('entry ' + String(state.entryNum)).entry;
    body.removeChild(document.getElementsByTagName('entry-page')[0]);
    body.appendChild(entry);
    
    history.pushState(state, '', '#entry' + state.entryNum);
  }
}
