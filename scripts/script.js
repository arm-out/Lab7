// script.js

import { router } from './router.js'; // Router imported so you can use it to manipulate your SPA app here
const setState = router.setState;

// Make sure you register your service worker here too

document.addEventListener('DOMContentLoaded', () => {
  let entryCount = 1;

  fetch('https://cse110lab6.herokuapp.com/entries')
    .then(response => response.json())
    .then(entries => {
      entries.forEach(entry => {
        let newPost = document.createElement('journal-entry');
        newPost.entry = entry;
        newPost.num = entryCount;
        newPost.id = 'entry ' + String(entryCount);

        newPost.addEventListener('click',() => {
          setState({location: 'entry', entryNum: newPost.num});
        });

        document.querySelector('main').appendChild(newPost);
        entryCount++;
      });
    });
  registerSW();
});
 
document.querySelector('header img').addEventListener('click', () => {
  setState({location: 'settings'});
});

document.querySelector('header h1').addEventListener('click', () => {
    setState({location: 'homepage'});
});

window.addEventListener('popstate', (event) => {
  setState(event.state);
});

const registerSW = () => {
  if ('serviceWorker' in navigator) {
    window.addEventListener('load', (event) => {
        navigator.serviceWorker.register('./../sw.js')
          .then((registration) => {
            console.log('sw registration complete: ' + registration.scope);
          },
          (err) => {
            console.error('sw registration failed: ' + err);
          });
    });
  }
}