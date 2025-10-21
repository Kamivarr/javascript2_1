(function() {
  const example = document.getElementById('example')
  const cw1 = document.getElementById('cw1')
  const cw2 = document.getElementById('cw2')
  const cw3 = document.getElementById('cw3')
  const answer = document.getElementById('answer')

  example.addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array)
        answer.innerHTML = JSON.stringify(array);
      })
  })

  cw1.addEventListener("click", async function() {
    try {
      answer.textContent = "Loading…";

      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();

      // Symulacja opóźnienia
      await new Promise(resolve => setTimeout(resolve, 1000));

      const htmlList = posts.map(post => `
        <li class="post">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </li>
      `).join('');

      answer.innerHTML = `<ul>${htmlList}</ul>`;
    } catch (error) {
      answer.textContent = 'Wystąpił błąd podczas pobierania danych.';
      console.error(error);
    }
  });


  cw2.addEventListener("click", async function() {
    try {
      answer.textContent = "Loading…";

      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const post = await response.json();

      answer.innerHTML = `
        <div class="post">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `;
    } catch (error) {
      answer.textContent = 'Wystąpił błąd podczas pobierania posta.';
      console.error(error);
    }
  });


  cw3.addEventListener("click", async function() {
    try {
      answer.textContent = "Processing…";

      const response = await fetch('https://jsonplaceholder.typicode.com/posts', {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          title: "Nowy post",
          body: "To jest przykładowa treść nowego posta.",
          userId: 1
        })
      });

      const result = await response.json();

      answer.textContent = `Dodano nowy post o ID = ${result.id}`;
    } catch (error) {
      answer.textContent = "Wystąpił błąd podczas dodawania posta.";
      console.error(error);
    }
  });


})();
