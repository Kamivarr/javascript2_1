(function() {
  const example = document.getElementById('example');
  const cw1 = document.getElementById('cw1');
  const cw2 = document.getElementById('cw2');
  const cw3 = document.getElementById('cw3');
  const answer = document.getElementById('answer');

  function showLoading() {
    const loadingDiv = document.createElement('div');
    loadingDiv.id = 'loading-popup';
    loadingDiv.style.position = 'fixed';
    loadingDiv.style.top = '0';
    loadingDiv.style.left = '0';
    loadingDiv.style.width = '100vw';
    loadingDiv.style.height = '100vh';
    loadingDiv.style.backgroundColor = 'rgba(0, 0, 0, 0.5)';
    loadingDiv.style.color = 'white';
    loadingDiv.style.display = 'flex';
    loadingDiv.style.justifyContent = 'center';
    loadingDiv.style.alignItems = 'center';
    loadingDiv.style.fontSize = '2em';
    loadingDiv.style.zIndex = '1000';
    loadingDiv.textContent = 'Loading…';
    document.body.appendChild(loadingDiv);
    return loadingDiv;
  }

  example.addEventListener("click", function() {
    fetch('https://jsonplaceholder.typicode.com/posts')
      .then(response => response.json())
      .then(array => {
        console.log(array);
        answer.innerHTML = JSON.stringify(array);
      });
  });

  cw1.addEventListener("click", async function() {
    const loadingPopup = showLoading();

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts');
      const posts = await response.json();

      // Logowanie wszystkich postów do konsoli
      console.log(posts);

      // Logowanie tytułu pierwszego posta (dla sprawdzenia)
      if (posts.length > 0) {
        console.log(posts[0].title);
      }

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
    } finally {
      loadingPopup.remove();
    }
  });

  cw2.addEventListener("click", async function() {
    const loadingPopup = showLoading();

    try {
      const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
      const post = await response.json();

      // Logowanie pojedynczego posta
      console.log(post);

      // Logowanie tytułu i body
      console.log(post.title);
      console.log(post.body);

      answer.innerHTML = `
        <div class="post">
          <h3>${post.title}</h3>
          <p>${post.body}</p>
        </div>
      `;
    } catch (error) {
      answer.textContent = 'Wystąpił błąd podczas pobierania posta.';
      console.error(error);
    } finally {
      loadingPopup.remove();
    }
  });

  cw3.addEventListener("click", async function() {
    const loadingPopup = showLoading();

    try {
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

      // Logowanie odpowiedzi serwera po utworzeniu posta
      console.log(result);

      answer.textContent = `Dodano nowy post o ID = ${result.id}`;
    } catch (error) {
      answer.textContent = "Wystąpił błąd podczas dodawania posta.";
      console.error(error);
    } finally {
      loadingPopup.remove();
    }
  });
})();
