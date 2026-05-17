<template>
  <div>
    <h1>MercApp - Prueba</h1>
    <nav>
      <router-link to="/">Inicio</router-link>
      <router-link to="/cart">Carrito</router-link>
      <router-link to="/about">Acerca de</router-link>
    </nav>
    <router-view />
  </div>
</template>

<style>
nav {
  padding: 20px;
  background: #42b983;
}
nav a {
  color: white;
  margin: 0 10px;
  text-decoration: none;
}
</style>