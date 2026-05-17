<template>
  <div class="about">
    <div class="hero">
      <h1>🍓 Frambuesa</h1>
      <p class="tagline">Regalos y desayunos sorpresa con amor</p>
    </div>

    <div class="content">
      <div class="section">
        <h2>📖 Nuestra Historia</h2>
        <p>
          Frambuesa nació con la idea de hacer más dulces los momentos especiales.
          Creemos que un regalo bien pensado puede transformar un día común en un 
          recuerdo inolvidable. Por eso, cada uno de nuestros productos está 
          cuidadosamente seleccionado y presentado con el cariño que mereces.
        </p>
      </div>

      <div class="section">
        <h2>💎 Lo que nos inspira</h2>
        <div class="values">
          <div class="value-card">
            <h3>🍓 Sorpresa</h3>
            <p>Cada entrega es una experiencia única</p>
          </div>
          <div class="value-card">
            <h3>❤️ Amor</h3>
            <p>Ponemos corazón en cada detalle</p>
          </div>
          <div class="value-card">
            <h3>🎁 Calidad</h3>
            <p>Productos seleccionados con esmero</p>
          </div>
        </div>
      </div>

      <div class="section">
        <h2>📞 Contáctanos</h2>
        <p>📧 Email: hola@frambuesa.cl</p>
        <p>📱 WhatsApp: +56 9 1234 5678</p>
        <p>📍 Región Metropolitana, Chile</p>
        <p>🌐 Envíos a todo Chile</p>
      </div>
    </div>
  </div>
</template>

<style>
.about {
  max-width: 1000px;
  margin: 0 auto;
  padding: 40px 20px;
}

.hero {
  text-align: center;
  background: linear-gradient(135deg, #2d4a2c 0%, #1e331d 100%);
  color: white;
  padding: 60px 20px;
  border-radius: 20px;
  margin-bottom: 40px;
}

.hero h1 {
  font-size: 48px;
  margin-bottom: 15px;
}

.tagline {
  font-size: 20px;
  opacity: 0.95;
}

.section {
  margin-bottom: 40px;
  background: white;
  padding: 30px;
  border-radius: 15px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.05);
}

.section h2 {
  color: #2d4a2c;
  margin-bottom: 20px;
  border-left: 4px solid #e8a87c;
  padding-left: 15px;
}

.values {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));
  gap: 20px;
  margin-top: 20px;
}

.value-card {
  background: #fff5eb;
  padding: 20px;
  border-radius: 10px;
  text-align: center;
}

.value-card h3 {
  color: #2d4a2c;
  margin-bottom: 10px;
}

@media (max-width: 768px) {
  .hero h1 {
    font-size: 32px;
  }
}
</style>