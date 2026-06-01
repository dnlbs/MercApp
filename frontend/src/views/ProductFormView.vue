<template>
  <div class="form-container">
    <h1>{{ isEdit ? 'Editar Producto' : 'Nuevo Producto' }}</h1>
    
    <form @submit.prevent="submitForm" class="product-form">
      <div class="form-group">
        <label>Nombre *</label>
        <input type="text" v-model="form.name" required />
      </div>

      <div class="form-group">
        <label>Descripción</label>
        <textarea v-model="form.description" rows="3"></textarea>
      </div>

      <div class="form-group">
        <label>Precio *</label>
        <input type="number" v-model="form.price" step="0.01" min="0.01" required />
      </div>

      <div class="form-group">
        <label>URL de Imagen</label>
        <input type="url" v-model="form.imageUrl" placeholder="https://..." />
      </div>

      <div class="form-group">
        <label>Categoría *</label>
        <select v-model="form.categoryId" required>
          <option value="">Seleccionar categoría</option>
          <option v-for="cat in categories" :key="cat.id" :value="cat.id">
            {{ cat.name }}
          </option>
        </select>
      </div>

      <div class="form-group">
        <label>Stock *</label>
        <input type="number" v-model="form.stock" min="0" required />
      </div>

      <div class="form-buttons">
        <button type="submit" :disabled="loading" class="btn-save">
          {{ loading ? 'Guardando...' : 'Guardar Producto' }}
        </button>
        <router-link to="/" class="btn-cancel">Cancelar</router-link>
      </div>

      <div v-if="error" class="error-message">{{ error }}</div>
      <div v-if="success" class="success-message">Producto guardado con éxito!</div>
    </form>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()
const isEdit = computed(() => route.params.id)
const categories = ref([])
const loading = ref(false)
const error = ref(null)
const success = ref(false)

// URL base de la API
const API_URL = import.meta.env.VITE_API_URL

const form = ref({
  name: '',
  description: '',
  price: '',
  imageUrl: '',
  categoryId: '',
  stock: ''
})

const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/api/categories`)
    categories.value = await res.json()
  } catch (err) {
    console.error('Error cargando categorías')
  }
}

const fetchProduct = async () => {
  if (!isEdit.value) return
  try {
    const res = await fetch(`${API_URL}/api/products/${route.params.id}`)
    const product = await res.json()
    form.value = {
      name: product.name,
      description: product.description,
      price: product.price,
      imageUrl: product.image,
      categoryId: product.category,
      stock: product.stock
    }
  } catch (err) {
    error.value = 'Error cargando producto'
  }
}

const submitForm = async () => {
  loading.value = true
  error.value = null
  success.value = false

  const method = isEdit.value ? 'PUT' : 'POST'
  const url = isEdit.value 
    ? `${API_URL}/api/products/${route.params.id}`
    : `${API_URL}/api/products`

  // Convertir el payload para que coincida con el modelo del backend
  const payload = {
    name: form.value.name,
    description: form.value.description,
    price: parseFloat(form.value.price),
    image: form.value.imageUrl,
    category: form.value.categoryId,
    stock: parseInt(form.value.stock, 10)
  }

  try {
    const res = await fetch(url, {
      method,
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(payload)
    })

    if (!res.ok) throw new Error('Error al guardar')

    success.value = true
    setTimeout(() => {
      router.push('/')
    }, 1500)
  } catch (err) {
    error.value = err.message
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  fetchCategories()
  fetchProduct()
})
</script>

<style scoped>
.form-container {
  max-width: 600px;
  margin: 0 auto;
  padding: 40px 20px;
}

h1 {
  color: #333;
  margin-bottom: 30px;
}

.product-form {
  background: white;
  padding: 30px;
  border-radius: 10px;
  box-shadow: 0 2px 10px rgba(0,0,0,0.1);
}

.form-group {
  margin-bottom: 20px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: bold;
  color: #333;
}

.form-group input,
.form-group select,
.form-group textarea {
  width: 100%;
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  font-size: 16px;
}

.form-group textarea {
  resize: vertical;
}

.form-buttons {
  display: flex;
  gap: 15px;
  margin-top: 20px;
}

.btn-save {
  flex: 1;
  background: #42b983;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
}

.btn-save:hover {
  background: #359268;
}

.btn-save:disabled {
  background: #ccc;
  cursor: not-allowed;
}

.btn-cancel {
  flex: 1;
  text-align: center;
  background: #666;
  color: white;
  border: none;
  padding: 12px;
  font-size: 16px;
  border-radius: 5px;
  cursor: pointer;
  text-decoration: none;
}

.btn-cancel:hover {
  background: #555;
}

.error-message {
  margin-top: 15px;
  padding: 10px;
  background: #ffebee;
  color: #c62828;
  border-radius: 5px;
}

.success-message {
  margin-top: 15px;
  padding: 10px;
  background: #e8f5e9;
  color: #2e7d32;
  border-radius: 5px;
}
</style>