<script setup lang="ts">
import { Authenticator } from "@aws-amplify/ui-vue";
import "@aws-amplify/ui-vue/styles.css";
</script>

<template>
  <main>
    <authenticator>
        <VitePwaManifest />
        <NuxtPage />
    </authenticator>
  </main>
</template>
Ï