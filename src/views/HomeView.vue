<script setup>
import sweetalert from 'sweetalert'
import { db } from '../firebase'
import { doc, setDoc, collection, deleteDoc } from 'firebase/firestore';
import { ref, defineProps } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const categoryName = ref('')
const addCategory = async () => {
  const categoriesRef = doc(db, "categories", uuidv4());
  await setDoc(categoriesRef, {
    id: categoriesRef.id,
    categoryName: categoryName.value,
  }).then(() => {
    categoryName.value = ""
    sweetalert({
      text: 'Category was added successfully',
      icon: 'success',
    })
  }).catch(err => {
    console.log(err)
  })
}

const props = defineProps({
  categories: {
    type: Object
  },
  members: {
    type: Object
  },
})

const categoryCollectionRef = collection(db, "categories");
const deleteCategory = async (id) => {
  await deleteDoc(doc(categoryCollectionRef, id))
    .then(() => {
      sweetalert({
        text: 'Category was deleted successfully',
        icon: 'success',
      })
    }).catch(err => {
      console.log(err)
    })
}


</script>

<template>
  <main>
    <div class="container">

      <div class="row mt-5">

        <div class="col-3"></div>

        <div class="col-6">
          <div>
            <form @submit.prevent="addCategory">
              <div class="form-group">
                <label class="my-3 text-white fs-5">Add Category</label>
                <input v-model="categoryName" placeholder="Enter category name" type="text" class="form-control"
                  required>
              </div>
              <button type="submit" class="btn btn-outline-success mt-3 col-12">Add Category</button>
            </form>
          </div>
        </div>

        <div class="col-3"></div>

      </div>

      <div class="row">
        <h3 class="d-flex justify-content-center mt-5">All Categories</h3>
          <div class="categories col-lg-4 col-sm-6 mt-3 d-flex flex-column flex-md-row justify-content-between align-items-center"
            v-for="category in props.categories" :key="category.id">
            <div class="categoryText  my-2 my-md-0">
              <h5 class="text-white">{{ category.categoryName }}</h5>
            </div>
            <div class="categoryButtons text-md-end text-center d-flex flex-column">
              <router-link :to="{ name: 'categoryEdit', params: { id: category.id } }">
                <button type="button" class="btn btn-outline-success btn-sm my-2">Add Member</button>
              </router-link>
              <button @click.prevent="deleteCategory(category.id)" type="button"
                class="btn btn-outline-danger btn-sm">Delete Category</button>
            </div>
          </div>

      </div>

      <div class="row">
        <div class="col-12">
          <hr class="my-5">
        </div>
      </div>

      <div class="row">
        <h3 class="d-flex justify-content-center mb-4">All Friends</h3>
        <div
          class="categories d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-start col-lg-4 col-sm-6 mb-3"
          v-for="member in props.members" :key="member.id">
          <div class="categoryText text-center text-md-start ml-auto me-1 ms-md-5 my-2 my-md-0 d-flex flex-column ">
            <h4 class="fs-4 text-white">{{ member.memberName + ' ' + member.memberLastname }}</h4>
            <p class="fs-6">{{ member.categoryId }}</p>
          </div>
          <div class="categoryButtons text-end">
            <router-link
              :to="{ name: 'memberEdit', params: { id: member.id }, query: { name: member.memberName + ' ' + member.memberLastname } }">
              <button type="button" class="btn btn-success btn-sm">
                <i class='bx bx-plus'></i>
              </button>
            </router-link>
          </div>
        </div>
      </div>


    </div>

  </main>
</template>

<style scoped>
.container {
  margin-bottom: 150px;
}
</style>
