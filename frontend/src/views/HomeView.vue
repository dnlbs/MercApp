<template>
  <div class="home">
    <h1>Catálogo de Productos</h1>
    
    <div class="filters">
      <input 
        type="text" 
        v-model="searchTerm" 
        placeholder="Buscar productos..."
        class="search-input"
      />
      
      <select v-model="selectedCategory" class="category-select">
        <option value="">Todas las categorías</option>
        <option v-for="cat in categories" :key="cat.id" :value="cat.id">
          {{ cat.name }}
        </option>
      </select>
    </div>

    <div v-if="loading" class="loading">Cargando productos...</div>
    <div v-else-if="error" class="error">{{ error }}</div>
    <div v-else class="products-grid">
      <ProductCard 
        v-for="product in filteredProducts" 
        :key="product.id"
        :product="product"
        @add-to-cart="addToCart"
      />
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import ProductCard from '../components/ProductCard.vue'
import { useCartStore } from '../stores/cart'

const cartStore = useCartStore()
const products = ref([])
const categories = ref([])
const loading = ref(false)
const error = ref(null)
const searchTerm = ref('')
const selectedCategory = ref('')

// URL base de la API (desde variable de entorno)
const API_URL = import.meta.env.VITE_API_URL

const fetchProducts = async () => {
  loading.value = true
  try {
    const res = await fetch(`${API_URL}/api/products`)
    if (!res.ok) throw new Error('Error en la respuesta del servidor')
    products.value = await res.json()
  } catch (err) {
    console.error(err)
    error.value = 'Error al cargar productos. ¿El backend está corriendo?'
  } finally {
    loading.value = false
  }
}

const fetchCategories = async () => {
  try {
    const res = await fetch(`${API_URL}/api/categories`)
    if (!res.ok) throw new Error('Error al cargar categorías')
    categories.value = await res.json()
  } catch (err) {
    console.error('Error cargando categorías', err)
  }
}

const filteredProducts = computed(() => {
  let result = products.value
  
  if (searchTerm.value) {
    result = result.filter(p => 
      p.name.toLowerCase().includes(searchTerm.value.toLowerCase())
    )
  }
  
  if (selectedCategory.value) {
    // Nota: en MongoDB el campo se llama "category" (no "categoryId")
    result = result.filter(p => p.category === selectedCategory.value)
  }
  
  return result
})

const addToCart = (product) => {
  cartStore.addToCart(product)
}

onMounted(() => {
  fetchProducts()
  fetchCategories()
})
</script>

<style scoped>
.home {
  padding: 20px;
  max-width: 1200px;
  margin: 0 auto;
}

h1 {
  color: #333;
  margin-bottom: 20px;
}

.filters {
  display: flex;
  gap: 15px;
  margin-bottom: 30px;
}

.search-input, .category-select {
  padding: 10px;
  font-size: 16px;
  border: 1px solid #ddd;
  border-radius: 5px;
}

.search-input {
  flex: 1;
}

.products-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(250px, 1fr));
  gap: 20px;
}

.loading, .error {
  text-align: center;
  padding: 50px;
  font-size: 18px;
}

.error {
  color: red;
}
</style>