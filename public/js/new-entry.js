const createEntryFormHandler = async (event) => {
    event.preventDefault();
  
    const entryTitle = document.querySelector('#title-input').value;
    const entryBody = document.querySelector('#body-input').value;
  
    if (entryTitle && entryBody) {
      const response = await fetch('/api/entries', {
        method: 'POST',
        body: JSON.stringify({ entryTitle, entryBody }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert(response.statusText);
      }
    }
  };


document
.querySelector('.new-entry-form')
.addEventListener('submit', createEntryFormHandler);