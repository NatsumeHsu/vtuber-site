<template>
  <section class="flow-page ui-page ui-page--flow">
    <div class="flow-board ui-board reveal-up scrollbar-hidden">
      <h1>{{ t("news.timelineTitle") }}</h1>
      <ol>
        <li v-for="step in flowSteps" :key="step">
          <span>{{ step }}</span>
        </li>
      </ol>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
useI18nPageSeo({ pageKey: "news" });

const flowSteps = computed(() => [
  t("news.step1"),
  t("news.step2"),
  t("news.step3"),
  t("news.step4"),
  t("news.step5"),
  t("news.step6"),
]);
</script>

<style scoped lang="scss">
@reference "../assets/styles/tailwind.css";

.flow-board {
  display: grid;
  align-content: start;
  justify-items: center;
  gap: 54px;
  padding: 48px 24px;
  text-align: center;
}

.flow-board h1 {
  margin: 0;
  font-size: clamp(24px, 4vw, 34px);
  font-weight: 900;
  letter-spacing: 0;
}

.flow-board ol {
  width: min(520px, 100%);
  display: grid;
  gap: 44px;
  margin: 0;
  padding: 0;
  list-style: none;
}

.flow-board li {
  font-size: clamp(18px, 3vw, 24px);
  font-weight: 900;
  transition: transform 0.28s cubic-bezier(0.22, 1, 0.36, 1);
}

.flow-board li:hover {
  transform: translateY(-2px);
}

@media (max-width: 700px) {
  .flow-board {
    gap: 38px;
  }

  .flow-board ol {
    gap: 34px;
  }
}
</style>
