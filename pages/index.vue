<template>
  <div class="app__container">
    <SideBarMenu />
    <InvestigationForm />
  </div>
</template>

<script setup>
import { provide, ref } from 'vue';
import InvestigationForm from '../components/InvestigationForm.vue';
import SideBarMenu from '../components/SideBarMenu.vue';

const isSidebarVisible = ref(false);
provide('isSidebarVisible', isSidebarVisible);

</script>

<style scoped>
.app__container {
  width: 100%;
  display: flex;
  height: 100vh;
}
</style>