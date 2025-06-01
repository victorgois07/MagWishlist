<template>
  <div class="layout">
    <header class="header">
      <nav>
        <router-link to="/">Home</router-link>
      </nav>
    </header>

    <main class="main">
      <slot></slot>
    </main>

    <footer class="footer">
      <p>&copy; {{ new Date().getFullYear() }} MagWishlist</p>
    </footer>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'DefaultLayout',
})
</script>

<style scoped>
.layout {
  min-height: 100vh;
  display: flex;
  flex-direction: column;
}

.header {
  padding: 1rem;
  background-color: #2c3e50;
  color: white;
}

.header nav {
  max-width: 1200px;
  margin: 0 auto;
}

.header a {
  color: white;
  text-decoration: none;
}

.main {
  flex: 1;
  padding: 2rem;
  max-width: 1200px;
  margin: 0 auto;
  width: 100%;
}

.footer {
  padding: 1rem;
  background-color: #f8f9fa;
  text-align: center;
  color: #666;
}
</style>
