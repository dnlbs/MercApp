<template>
  <div>
    <header class="header">
      <div class="logo">
        <h1>🍓 Frambuesa</h1>
        <p class="slogan">Regalos y desayunos sorpresa con amor</p>
      </div>
      <div class="cart-icon">
        <router-link to="/cart">
          🛒 Carrito
          <span v-if="cartStore.totalItems > 0" class="cart-badge">
            {{ cartStore.totalItems }}
          </span>
        </router-link>
      </div>
    </header>
    
    <nav>
      <router-link to="/">🏠 Inicio</router-link>
      <router-link to="/cart">🛒 Carrito</router-link>
      <router-link to="/about">🍓 Frambuesa</router-link>
      <router-link to="/new" class="btn-new">➕ Nuevo Producto</router-link>
    </nav>
    
    <main>
      <router-view />
    </main>
    
    <footer class="footer">
      <p>&copy; 2026 Frambuesa - Regalos y desayunos sorpresa | Hecho con ❤️ para sorprender</p>
    </footer>
  </div>
</template>

<script setup>
import { useCartStore } from './stores/cart'

const cartStore = useCartStore()
</script>

<style>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box;
}

body {
  font-family: 'Segoe UI', Tahoma, Geneva, Verdana, sans-serif;
  background: #f5f5f0;
}

.header {
  background: #2d4a2c;
  color: white;
  padding: 20px;
  display: flex;
  justify-content: space-between;
  align-items: center;
}

.logo h1 {
  font-size: 28px;
  margin-bottom: 5px;
}

.slogan {
  font-size: 14px;
  opacity: 0.9;
  font-style: italic;
}

.cart-icon a {
  color: white;
  text-decoration: none;
  font-size: 18px;
  background: rgba(255,255,255,0.2);
  padding: 10px 20px;
  border-radius: 25px;
  display: flex;
  align-items: center;
  gap: 8px;
}

.cart-badge {
  background: #e8a87c;
  color: white;
  border-radius: 50%;
  padding: 2px 8px;
  font-size: 12px;
}

nav {
  background: white;
  padding: 15px 20px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.1);
  display: flex;
  gap: 20px;
  flex-wrap: wrap;
}

nav a {
  color: #333;
  text-decoration: none;
  font-size: 16px;
  padding: 8px 16px;
  border-radius: 25px;
  transition: all 0.3s;
}

nav a:hover {
  background: #2d4a2c;
  color: white;
}

.btn-new {
  background: #e8a87c;
  color: white !important;
}

.btn-new:hover {
  background: #d4916a !important;
}

main {
  min-height: calc(100vh - 200px);
  padding: 20px;
}

.footer {
  background: #2d4a2c;
  color: white;
  text-align: center;
  padding: 20px;
  margin-top: 40px;
}

@media (max-width: 768px) {
  .header {
    flex-direction: column;
    text-align: center;
    gap: 15px;
  }
  
  nav {
    justify-content: center;
  }
}
</style>