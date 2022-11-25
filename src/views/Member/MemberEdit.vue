<script setup>
import router from '@/router'
import sweetalert from 'sweetalert'
import { db } from '../../firebase'
import {
  doc, updateDoc, getDoc,
} from 'firebase/firestore';
import { ref, defineProps, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const categoryId = ref('');

const route = useRoute()
const memberId = route.params.id



const saveMember = async () => {
  const membersRef = doc(db, "members", memberId);
  await updateDoc(membersRef, {
    id: membersRef.id,
    categoryId: categoryId.value,
  }).then(() => {
    sweetalert({
      text: 'Category was updated successfully',
      icon: 'success',
    })
    router.go(-1)
  }).catch(err => {
    console.log(err)
  })
}

const props = defineProps({
  categories: {
    type: Object
  }
})

onMounted(async () => {
  const membersRef = doc(db, "members", memberId);
  const querySnapshot = await getDoc(membersRef)
  categoryId.value = querySnapshot.data().categoryId
});

</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-5">Add Category</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-3"></div>

        <div class="col-6">
          <form @submit.prevent="saveMember">
            <div class="form-group">
              <label class="my-3 text-white fs-5">Select Category</label>
              <select v-model="categoryId" class="form-select" aria-label="Default select example" required>
                <option value="" disabled>Please Choose Category</option>
                <option v-for="category in props.categories" :key="category.id" :value="category.categoryName">
                  {{ category.categoryName }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-outline-success mt-3 col-12">Save Member</button>
          </form>
        </div>

        <div class="col-3"></div>
      </div>

    </div>
  </main>
</template>
