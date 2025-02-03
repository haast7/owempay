<head>
    <!-- ... outros elementos do head ... -->
    <link rel="stylesheet" href="styles.css">
    <script src="js/header.js"></script>
</head> 

<script>
document.addEventListener('DOMContentLoaded', function() {
    // Carrega o header em todas as páginas
    fetch('header.html')
        .then(response => response.text())
        .then(data => {
            document.body.insertAdjacentHTML('afterbegin', data);
            
            // Marca o menu ativo
            const currentPage = window.location.pathname.split('/').pop();
            const menuItems = document.querySelectorAll('.nav-item');
            
            menuItems.forEach(item => {
                if (item.getAttribute('href') === currentPage) {
                    item.classList.add('active');
                }
            });
        });
});
</script> 

<header class="header">
  <div class="container">
    <nav class="nav">
      <div class="nav-brand">
        <a href="/">
          <img src="logo.png" alt="OweenPay" class="nav-logo">
        </a>
      </div>
      <div class="nav-menu">
        <a href="/" class="nav-item">Home</a>
        <a href="/calculadora" class="nav-item">Calculadora</a>
        <a href="/mdr" class="nav-item">Configurar MDR</a>
        <a href="/exportar" class="nav-item">Exportar</a>
      </div>
    </nav>
  </div>
</header> 

:root {
    --primary: #0047FF;
    --primary-hover: #0035C5;
    --text: #333333;
    --background: #FFFFFF;
    --header-height: 64px;
}

* {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}

body {
    font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu, Cantarell, sans-serif;
    min-height: 100vh;
}

.header {
    background: var(--background);
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    position: sticky;
    top: 0;
    z-index: 1000;
}

.container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 0 1rem;
}

.nav {
    display: flex;
    align-items: center;
    justify-content: space-between;
    height: var(--header-height);
}

.nav-brand {
    display: flex;
    align-items: center;
}

.nav-logo {
    height: 24px;
    width: auto;
}

.nav-menu {
    display: flex;
    gap: 1rem;
    align-items: center;
}

.nav-item {
    text-decoration: none;
    color: var(--text);
    font-size: 0.875rem;
    padding: 0.5rem 1rem;
    border-radius: 6px;
    transition: all 0.2s ease;
}

.nav-item:hover {
    background: rgba(0, 71, 255, 0.1);
    color: var(--primary);
}

.nav-item.active {
    background: var(--primary);
    color: white;
}

/* Adiciona espaço para o conteúdo */
main {
    padding: 2rem 1rem;
} 