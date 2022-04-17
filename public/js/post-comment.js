const postCommentFormHandler = async (event) => {
    event.preventDefault();
  
    const entryId = document.querySelector('#entry-id').textContent;
    const newComment = document.querySelector('#new-comment-input').value;
  
    if (newComment) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ newComment, entryId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert(response.statusText);
      }
    }
  };


document
.querySelector('.new-comment-form')
.addEventListener('submit', postCommentFormHandler);