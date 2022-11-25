<script setup>
import sweetalert from 'sweetalert'
import { db } from '../../firebase'
import { doc, setDoc, deleteDoc, collection  } from 'firebase/firestore';
import { ref, defineProps } from 'vue';
import { v4 as uuidv4 } from 'uuid';

const memberName = ref('')
const memberLastname = ref('')
const categoryId = ref('');

const addMember = async () => {
  const membersRef = doc(db, "members", uuidv4());
  await setDoc(membersRef, {
    id: membersRef.id,
    categoryId: categoryId.value,
    memberName: memberName.value,
    memberLastname: memberLastname.value,
  }).then(() => {
    categoryId.value = ""
    memberName.value = ""
    memberLastname.value = ""
    sweetalert({
      text: 'Member was added successfully',
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

const membersCollectionRef = collection(db, "members");
const deleteMember = async (id) => {
 await deleteDoc(doc(membersCollectionRef, id))
 .then(() => {
 sweetalert({
      text: 'Member was deleted successfully',
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
      <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-5">Add Member</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-3"></div>

        <div class="col-6">
          <form @submit.prevent="addMember">
            <div class="form-group">
              <label class="my-3 text-white fs-5">Select Category</label>
              <select v-model="categoryId" class="form-select" required>
                <option value="" disabled>Please Choose Category</option>
                <option v-for="category in props.categories" :key="category.id" :value="category.categoryName">
                  {{ category.categoryName }}
                </option>
              </select>
            </div>
            <div class="form-group">
              <label>Name</label>
              <input v-model="memberName" type="text" class="form-control" required>
            </div>
            <div class="form-group">
              <label>Lastname</label>
              <input v-model="memberLastname" type="text" class="form-control" required>
            </div>
            <button type="submit" class="btn btn-outline-success mt-3 col-12">Add Member</button>
          </form>
        </div>

        <div class="col-3"></div>
      </div>

      <div class="row">

        <div class="col-3"></div>
        <div class="col-6">

          <div class="categories mt-5 d-flex flex-column flex-md-row justify-content-between align-items-center"
            v-for="member in props.members" :key="member.id">
            <div class="categoryText text-center text-md-start me-4 my-2 my-md-0">
              <h4 class="fs-4 text-white">{{ member.memberName + ' ' + member.memberLastname }}</h4>
              <p class="fs-6">{{ member.categoryId }}</p>
            </div>
            <div class="categoryButtons text-end">
              <router-link :to="{name : 'memberEdit', params: {id : member.id}}">
                <button type="button" class="btn btn-outline-warning me-2 my-2">Edit</button>
              </router-link>
              <button @click.prevent="deleteMember(member.id)" type="button" class="btn btn-outline-danger">Delete</button>
            </div>
          </div>

        </div>
        <div class="col-3"></div>

      </div>

    </div>
  </main>
</template>
