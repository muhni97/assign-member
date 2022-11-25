<script setup>
import router from '@/router'
import sweetalert from 'sweetalert'
import { db } from '../../firebase'
import {
  doc, updateDoc, getDoc, deleteField
} from 'firebase/firestore';
import { ref, defineProps, onMounted } from 'vue';
import { useRoute } from 'vue-router';

const route = useRoute()
const categoryRouteId = route.params.id


const categoryName = ref('')
const categoryId = ref('')
const memberId = ref('')


const props = defineProps({
  categories: {
    type: Object
  },
  members: {
    type: Object
  },
})

const saveCategory = async () => {
  const membersRef = doc(db, "members", memberId);
  await updateDoc(membersRef, {
    id: membersRef.id,
    categoryId: categoryName.value,
  })
    .then(() => {
      sweetalert({
        text: 'Category was updated successfully',
        icon: 'success',
      })
      router.push('/categories/:id')
    }).catch(err => {
      console.log(err)
    })
}

onMounted(async () => {
  const categoriesRef = doc(db, "categories", categoryRouteId);
  const querySnapshot = await getDoc(categoriesRef)
  categoryName.value = querySnapshot.data().categoryName

  const membersRef = doc(db, "members", memberId);
  const querySnapshotMember = await getDoc(membersRef)
  categoryId.value = querySnapshotMember.data().categoryId
});

const removeMember = async (id) => {
 const membersCollectionRef = doc(db, "members", id);
  await updateDoc(membersCollectionRef, {
    categoryId: "There isn't a Category"
  })
 .then(() => {
 sweetalert({
      text: 'Member was removed successfully',
      icon: 'success',
    })
  }).catch(err => {
    console.log(err)
  })
}


const searchedMembers = onMounted(() => {
  return props.members.filter(member => {
    return member.categoryId
      .split(" ")
      .every((v) => categoryName.value.includes(v))
  });
});
const nonMatchesMembers = onMounted(() => {
  return props.members.filter(member => {
    return member.categoryId
      .toLowerCase()
      .indexOf(categoryName.value.toLowerCase()) <= -1
  });
});
</script>

<template>
  <main>
    <div class="container">
      <div class="row">
        <div class="col-12 text-center">
          <h3 class="pt-5">Add Friends</h3>
        </div>
      </div>
      <div class="row">
        <div class="col-3"></div>

        <div class="col-6">
          <form @submit.prevent="saveCategory">
            <div class="form-group">
              <label class="my-3 text-white fs-5">Category Name</label>
              <input v-model="categoryName" type="text" class="form-control" disabled required>
            </div>
            <!-- <div class="form-group">
              <label class="my-3 text-white fs-5">Select Friend</label>
              <select v-model="memberId" class="form-select" required>
                <option value="" disabled>Please Choose Friend</option>
                <option v-for="member in nonMatchesMembers()" :key="member.id"
                  :value="member.id">
                  {{ member.memberName + ' ' + member.memberLastname }}
                </option>
              </select>
            </div>
            <button type="submit" class="btn btn-outline-success mt-3 col-12">Save</button> -->
          </form>
        </div>

        <div class="col-3"></div>
      </div>

      <div class="row">
        <div class="header mt-5 text-center">
          <h4>{{`${nonMatchesMembers().length > 1 ? 'You can add these friends' : nonMatchesMembers().length === 1 ? 'You can add this friend' : 'All friends is in this category'}`}}</h4>
        </div>
        <div
          class="categories mt-5 d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-start col-lg-4 col-sm-6"
          v-for="member in nonMatchesMembers()" :key="member.id">
          <div class="categoryText text-center text-md-start ml-auto me-1 ms-md-5 my-2 my-md-0 d-flex flex-column ">
            <h4 class="fs-4 text-white">{{ member.memberName + ' ' + member.memberLastname }}</h4>
            <p class="fs-6">{{ member.categoryId }}</p>
          </div>
          <div class="categoryButtons text-end">
            <router-link :to="{ name: 'memberEdit', params: { id: member.id } }">
              <button type="button" class="btn btn-success btn-sm me-2 my-2">
                <i class='bx bx-plus'></i>
              </button>
            </router-link>
          </div>
        </div>
      </div>

      <div class="row">
        <div class="col-12">
          <hr>
        </div>
      </div>

      <div class="row">
        <div class="header mt-5 text-center">
          <h4>{{`${searchedMembers().length > 1 ? 'You have friends' : searchedMembers().length === 1 ? 'You have a friend' : 'There is no friend'}`}}</h4>
        </div>
        <div
          class="categories mt-5 d-flex flex-column flex-md-row justify-content-between align-items-center align-items-md-start col-lg-4 col-sm-6"
          v-for="member in searchedMembers()" :key="member.id">
          <div class="categoryText text-center text-md-start ml-auto me-1 ms-md-5 my-2 my-md-0 d-flex flex-column ">
            <h4 class="fs-4 text-white">{{ member.memberName + ' ' + member.memberLastname }}</h4>
            <p class="fs-6">{{ member.categoryId }}</p>
          </div>
          <div class="categoryButtons text-end">
            <router-link :to="{ name: 'memberEdit', params: { id: member.id } }">
              <button @click.prevent="removeMember(member.id)"  type="button" class="btn btn-danger btn-sm me-2 my-2">
                Remove
              </button>
            </router-link>
          </div>
        </div>
      </div>

    </div>
  </main>
</template>

<style scoped>
.container{
  margin-bottom: 150px;
}
</style>
