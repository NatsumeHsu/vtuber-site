<template>
  <section class="clips-page ui-page ui-page--clips">
    <div class="clips-board ui-board ui-content-board reveal-up scrollbar-hidden">
      <PageHeader :title="t('clips.title')" :description="t('clips.description')" icon="mdi-play" />

      <section v-for="clip in clips" :key="clip.name" class="creator-section">
        <header class="creator-heading">
          <h2>{{ clip.name }}</h2>
          <span class="creator-line" aria-hidden="true" />
          <VIcon icon="mdi-youtube" size="22" class="creator-icon" aria-hidden="true" />
        </header>
        <div class="video-grid">
          <ClipCard
            v-for="(url, index) in clip.urls"
            :key="`${url}-${index}`"
            :embed-url="url"
          />
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
useI18nPageSeo({ pageKey: "clips" });

type ClipGroup = {
  name: string;
  urls: string[];
};

const clips: ClipGroup[] = [
    {
    name: "序境",
    urls: [
      "https://www.youtube.com/embed/7FC8CCf3qL4?controls=0",
      "https://www.youtube.com/embed/RQvHl4yVSaU?controls=0",
      "https://www.youtube.com/embed/y4gGaSWrAVU?controls=0",
      "https://www.youtube.com/embed/H7FsA0Jj58k?controls=0",
      "https://www.youtube.com/embed/pZm6mq48yuM?controls=0",
      "https://www.youtube.com/embed/mfbWtyZ1ygQ?controls=0",
    ],
  },
  {
    name: "実Hitomi",
    urls: [
      "https://www.youtube.com/embed/i5v-jUIBA0Q?controls=0",
      "https://www.youtube.com/embed/S9uDP-8d93A?controls=0",
      "https://www.youtube.com/embed/AJaKfbG-f10?controls=0",
    ],
  },
  {
    name: "煦Hiyori",
    urls: [
      "https://www.youtube.com/embed/5Qo-twPTXBc?controls=0",
      "https://www.youtube.com/embed/wCv306mB38c?controls=0",
      "https://www.youtube.com/embed/8QE0GjR9xSI?controls=0",
    ],
  },
  {
    name: "幸Sachi",
    urls: [
      "https://www.youtube.com/embed/RHEaWC1gKqo?controls=0",
      "https://www.youtube.com/embed/xBEiJ9_0SEo?controls=0",
      "https://www.youtube.com/embed/lJhoGkq-jgk?controls=0",
    ],
  },
  {
    name: "雪koyuki",
    urls: [
      "https://www.youtube.com/embed/bCptlDoAze8?controls=0",
      "https://www.youtube.com/embed/ah3mi9W76dc?controls=0",
      "https://www.youtube.com/embed/h-P1ND8doHQ?controls=0",
    ],
  },
];
</script>

<style scoped lang="scss">
.clips-page {
  color: #000;
}

.clips-page :deep(.ui-heading-title) {
  color: #000;
}





.creator-section {
  margin-top: var(--section-gap);
  padding: clamp(16px, 2.5vw, 26px);
  border: 1px solid rgb(var(--v-theme-on-surface) / 0.08);
  border-radius: 22px;
  background: rgb(var(--v-theme-surface) / 0.8);
  box-shadow: 0 8px 28px rgb(var(--v-theme-on-surface) / 0.04);
}

.creator-heading {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 22px;
}

.creator-number {
  display: grid;
  place-items: center;
  flex: 0 0 38px;
  height: 38px;
  border-radius: 12px;
  background: rgb(152 134 189 / 0.14);
  color: rgb(0 0 0 / 0.7);
  font-size: 13px;
  font-weight: 800;
  font-variant-numeric: tabular-nums;
}

.creator-heading h2 {
  min-width: 0;
  margin: 0;
  color: #000;
  font-size: clamp(18px, 2vw, 22px);
  font-weight: 400;
  overflow-wrap: anywhere;
}

.creator-line {
  flex: 1;
  height: 1px;
  background: linear-gradient(90deg, rgb(152 134 189 / 0.35), transparent);
}

.creator-icon {
  color: #9886bd;
}

.video-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 18px;
}

@media (max-width: 1100px) {
  .video-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 640px) {


  .creator-heading {
    gap: 10px;
    margin-bottom: 16px;
  }

  .video-grid {
    grid-template-columns: 1fr;
    gap: 14px;
  }
}
</style>
