<script setup>
import { RouterLink, RouterView } from 'vue-router'
import Logo from './components/Logo.vue'
import Navbar from './components/Navbar.vue';
import { ref, onMounted} from "vue";
import { db } from './firebase'
import {
  onSnapshot,
  collection,
  orderBy,
  query, 
} from "firebase/firestore";

const categories = ref([])

onMounted( () => {
  const categoriesRef = collection(db, "categories");
  const categoriesQurey= query(categoriesRef, orderBy("categoryName"));
  onSnapshot(categoriesQurey, (querySnapshot) => {
    const categoriesData = [];
    querySnapshot.forEach((doc) => {
      const datas = {
        categoryName: doc.data().categoryName,
        id: doc.data().id,
      };
      categoriesData.push(datas);
    });
    categories.value = categoriesData;
  });
})

const members = ref([])

onMounted(() => {
  const membersRef = collection(db, "members");
  const membersQuery= query(membersRef, orderBy("categoryId"));
  onSnapshot(membersQuery, (querySnapshot) => {
    const membersData = [];
    querySnapshot.forEach((doc) => {
      const datas = {
        categoryId: doc.data().categoryId,
        memberName: doc.data().memberName,
        memberLastname: doc.data().memberLastname,
        id: doc.data().id,
      };
      membersData.push(datas);
    });
    members.value = membersData;
  });
})

</script>

<template>
  <header>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <Logo />
          <Navbar />
        </div>
      </div>
    </div>
  </header>
  <router-view :categories="categories" :members="members" />
</template>

<style>

</style>
