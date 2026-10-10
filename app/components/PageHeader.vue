<template>
  <header class="page-header ui-section-header">
    <div v-if="$slots.avatar" class="page-header-avatar"><slot name="avatar" /></div>
    <span v-else class="page-header-mark ui-heading-mark" aria-hidden="true"><VIcon :icon="icon" size="26" /></span>
    <p v-if="badge" class="page-header-badge">{{ badge }}</p>
    <h1 class="ui-heading-title">{{ title }}</h1>
    <p v-if="description" class="ui-heading-subtitle">{{ description }}</p>
    <div v-if="$slots.actions" class="page-header-actions"><slot name="actions" /></div>
  </header>
</template>
<script setup lang="ts">
withDefaults(defineProps<{ title: string; description?: string; icon?: string; badge?: string }>(), { icon: "mdi-information-outline" });
</script>
<style scoped lang="scss">
.page-header {
  border: 1px solid rgb(118 152 163 / 0.2);
  background: linear-gradient(120deg, rgb(118 152 163 / 0.16), rgb(152 134 189 / 0.1));
  color: rgb(var(--v-theme-on-surface));
}
.page-header-mark {
  color: #fff;
  background: #7698a3;
  box-shadow: 0 6px 18px rgb(118 152 163 / 0.25);
}
.page-header .ui-heading-title { overflow-wrap: anywhere; }
.page-header .ui-heading-subtitle {
  font-family: var(--font-story);
  font-weight: 400;
  line-height: 1.8;
  overflow-wrap: anywhere;
}
.page-header-avatar { display: flex; justify-content: center; margin-bottom: 14px; }
.page-header-badge { margin: 0 0 8px; font-size: 12px; color: rgb(var(--v-theme-on-surface) / 0.65); }
.page-header-actions {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  align-items: center;
  gap: 12px;
  margin-top: 20px;
}
</style>
