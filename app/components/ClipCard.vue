<template>
  <VCard
    class="clip-card"
    elevation="0"
    rounded="xl"
  >
    <div class="relative">
      <iframe
        v-if="embedUrl"
        width="560"
        height="315"
        :src="embedUrl"
        title="YouTube video player"
        frameborder="0"
        loading="lazy"
        referrerpolicy="strict-origin-when-cross-origin"
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        allowfullscreen
        class="block w-full h-auto aspect-video border-0"
      />
    </div>


  </VCard>
</template>

<script setup lang="ts">
const props = defineProps<{
  thumb?: string;
  embedUrl?: string;
}>();
</script>

<style scoped>
.clip-card {
  min-width: 0;
  overflow: hidden;
  border: 1px solid rgb(var(--v-theme-on-surface) / 0.1);
  background: #111;
  box-shadow: 0 8px 20px rgb(var(--v-theme-on-surface) / 0.08);
  transition: box-shadow 0.2s ease, border-color 0.2s ease;
}

.clip-card:hover,
.clip-card:focus-within {
  border-color: #9886bd;
  box-shadow: 0 12px 28px rgb(var(--v-theme-on-surface) / 0.16);
}

@media (prefers-reduced-motion: reduce) {
  .clip-card {
    transition: none;
  }
}
</style>
