<template>
  <div
    tabindex="0"
    role="button"
    class="btn btn-ghost btn-square"
    @click="handleLogout"
    title="Logout"
  >
    <!-- SVGアイコン -->
    <svg 
      class="w-5 h-5" 
      fill="none" 
      stroke="currentColor" 
      viewBox="0 0 24 24"
    >
      <path 
        stroke-linecap="round" 
        stroke-linejoin="round" 
        stroke-width="2" 
        d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
      />
    </svg>
  </div>
</template>

<script lang="ts" setup>
import { signOut } from 'aws-amplify/auth';

const handleLogout = async () => {
  try {
    await signOut();
    console.log('Signed out successfully');
  } catch (error) {
    console.error('Error signing out:', error);
  }
};
</script>