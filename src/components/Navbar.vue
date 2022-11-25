<template>
  <nav>
    <RouterLink to="/">Home</RouterLink>
  </nav>
</template>

<script>
export default {

}
</script>

<style scoped>
nav {
  font-size: 16px;
  margin-top: 2rem;
}

nav a.router-link-exact-active {
  color: #fff;
}

nav a.router-link-exact-active:hover {
  background-color: transparent;
}

nav a {
  display: inline-block;
  padding: 0 1rem;
  border-left: 1px solid var(--color-border);
}
nav a:hover{
  color: #fff;
}

nav a:first-of-type {
  border: 0;
}

@media (min-width: 1024px) {

  nav {
    text-align: center;
    margin-left: -1rem;
    font-size: 1rem;

    padding: 1rem 0;
    margin-top: 1rem;
  }
}
</style>