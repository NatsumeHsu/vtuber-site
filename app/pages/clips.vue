<template>
  <section class="clips-page ui-page ui-page--clips">
    <div class="clips-board ui-board reveal-up scrollbar-hidden">
      <header class="section-heading">
        <p class="ui-heading-title">{{ t("clips.title") }}</p>
        <h1 class="ui-heading-subtitle">{{ t("clips.description") }}</h1>
      </header>

      <div class="chip-row" aria-label="clip filters">
        <span v-for="chip in chips" :key="chip">{{ chip }}</span>
      </div>

      <div class="video-grid">
        <ClipCard
          v-for="clip in clips"
          :key="clip.title"
          :title="clip.title"
          :thumb="clip.thumb"
        />
      </div>

      <section class="comic-section">
        <h2 class="ui-heading-title">{{ t("home.clipsHeading") }}</h2>
        <div class="tweet-grid">
          <article v-for="item in comics" :key="item" class="tweet-card hover-lift">
            <div class="tweet-avatar" />
            <div>
              <strong>{{ t("common.projectName") }}</strong>
              <p>{{ item }}</p>
            </div>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
useI18nPageSeo({ pageKey: "clips" });

const chips = ["#KeyArt", "#Shorts", "#Cosplay", "#Illustration"];
const clips = computed(() => [
  {
    title: t("home.clip1"),
    thumb: "/hero.png",
  },
  {
    title: t("home.clip2"),
    thumb: "/hero.png",
  },
  {
    title: t("home.clip3"),
    thumb: "/hero.png",
  },
]);
const comics = computed(() => [
  t("home.clip1"),
  t("home.clip2"),
  t("home.clip3"),
]);
</script>

<style scoped lang="scss">
@reference "../assets/styles/tailwind.css";

.clips-board {
  padding: 42px clamp(20px, 5vw, 56px) 52px;
}

.section-heading {
  text-align: center;
}

.chip-row {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 12px;
  margin: 28px 0 30px;
}

.chip-row span {
  min-width: 82px;
  border-radius: 999px;
  padding: 7px 14px;
  background: #ffffff;
  color: #9886bd;
  text-align: center;
  font-size: 13px;
  font-weight: 800;
  transition:
    transform 0.2s ease,
    box-shadow 0.2s ease;
}

.chip-row span:hover {
  transform: translateY(-1px);
  box-shadow: 0 12px 24px -16px rgb(var(--v-theme-on-surface) / 0.34);
}

.video-grid,
.tweet-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 22px;
}

.comic-section {
  margin-top: 42px;
  text-align: center;
}

.tweet-card {
  min-height: 146px;
  display: flex;
  gap: 12px;
  padding: 16px;
  border-radius: 8px;
  background: #ffffff;
  text-align: left;
}

.tweet-avatar {
  width: 36px;
  height: 36px;
  flex: 0 0 auto;
  border-radius: 999px;
  background: #d9d9d9;
}

.tweet-card strong {
  display: block;
  margin-bottom: 8px;
  font-size: 13px;
}

.tweet-card p {
  margin: 0;
  color: #5a524d;
  font-size: 13px;
  line-height: 1.6;
}

@media (max-width: 820px) {
  .video-grid,
  .tweet-grid {
    grid-template-columns: 1fr;
  }
}
</style>
