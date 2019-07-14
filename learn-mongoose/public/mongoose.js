// 사용자 조회
const getUser = () => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      const users = JSON.parse(xhr.responseText);
      console.log(users);
      const tbody = document.querySelector('#user-list tbody');
      tbody.innerHTML = '';
      users.map(user => {
        const row = document.createElement('tr');
        row.addEventListener('click', () => {
          getComment(user._id);
        });
        let td = document.createElement('td');
        td.textContent = user._id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.name;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.age;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = user.married ? 'married' : 'single';
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('GET', '/users');
  xhr.send();
}

// 댓글 조회
const getComment = (id) => {
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 200) {
      const comments = JSON.parse(xhr.responseText);
      console.log(comments);
      const tbody = document.querySelector('#comment-list tbody');
      tbody.innerHTML = '';
      comments.map(comment => {
        const row = document.createElement('tr');
        // Comment View Table
        let td = document.createElement('td');
        td.textContent = comment._id;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = comment.commenter.name;
        row.appendChild(td);
        td = document.createElement('td');
        td.textContent = comment.comment;
        row.appendChild(td);
        // Edit Button
        const editCommentButton = document.createElement('button');
        editCommentButton.textContent = 'Edit';
        editCommentButton.addEventListener('click', () => {
          const newComment = prompt('New comment:');
          if (!newComment) {
            return alert('No Comment!');
          }
          const xhr2 = new XMLHttpRequest();
          xhr2.onload = () => {
            if (xhr2.status == 200) {
              console.log(xhr2.responseText);
              getComment(id);
            } else {
              console.error(xhr2.responseText);
            }
          }
          xhr2.open('PATCH', '/comments/' + comment._id);
          xhr2.setRequestHeader('Content-Type', 'application/json');
          xhr2.send(JSON.stringify({ comment: newComment }));
        });
        // Delete Button
        const deleteCommentButton = document.createElement('button');
        deleteCommentButton.textContent = 'Delete';
        deleteCommentButton.addEventListener('click', () => {
          const xhr2 = new XMLHttpRequest();
          xhr2.onload = () => {
            if (xhr2.status == 200) {
              console.log(xhr2.responseText);
              getComment(id);
            } else {
              console.error(xhr2.responseText);
            }
          }
          xhr2.open('DELETE', '/comments/' + comment._id);
          xhr2.send();
        });
        td = document.createElement('td');
        td.appendChild(editCommentButton);
        row.appendChild(td);
        td = document.createElement('td');
        td.appendChild(deleteCommentButton);
        row.appendChild(td);
        tbody.appendChild(row);
      });
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('GET', '/comments/' + id);
  xhr.send();
}

// 사용자 이름 눌렀을 때 댓글 조회
document.querySelectorAll('#user-list tr').forEach(el => {
  el.addEventListener('click', () => {
    const id = el.querySelector('td').textContent;
    getComment(id); // 아직 구현 안 한 함수?
  });
});

// 사용자 등록
document.getElementById('user-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const name = e.target.username.value;
  const age = e.target.age.value;
  const married = e.target.married.checked;
  if (!name) return alert('No name.');
  if (!age) return alert('No age.');
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 201) {
      console.log(xhr.responseText);
      getUser();
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('POST', '/users');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ name: name, age: age, married: married }));
  e.target.username.value = '';
  e.target.age.value = '';
  e.target.married.checked = false;
});

// 댓글 등록
document.getElementById('comment-form').addEventListener('submit', (e) => {
  e.preventDefault();
  const id = e.target.userid.value;
  const comment = e.target.comment.value;
  if (!id) return alert('No id.');
  if (!comment) return alert('No comment.');
  const xhr = new XMLHttpRequest();
  xhr.onload = () => {
    if (xhr.status === 201) {
      console.log(xhr.responseText);
      getComment(id);
    } else {
      console.error(xhr.responseText);
    }
  };
  xhr.open('POST', '/comments');
  xhr.setRequestHeader('Content-Type', 'application/json');
  xhr.send(JSON.stringify({ id: id, comment: comment }));
  e.target.userid.value = '';
  e.target.comment.value = '';
});