<template>
  <section class="home-page ui-page ui-page--home">
    <div class="home-board ui-board scrollbar-hidden">
      <section class="hero-visual reveal-up">
        <img src="/hero.png" :alt="t('home.heroAlt')" class="hero-image" />
        <div class="hero-copy">
          <p>{{ t("home.badge") }}</p>
          <h1>{{ t("home.title") }}</h1>
        </div>
        <NuxtLink :to="localePath('/wishes/new')" class="hero-action interactive-lift">
          {{ t("home.ctaSubmit") }}
        </NuxtLink>
      </section>

      <section class="home-panel home-panel--overlap reveal-up reveal-delay-1">
        <h2>{{ t("home.clipsHeading") }}</h2>
        <div class="feature-grid">
          <article v-for="item in features" :key="item.title" class="feature-card hover-lift">
            <h3>{{ item.title }}</h3>
            <p>{{ item.description }}</p>
            <NuxtLink :to="item.to" class="mini-button interactive-lift">{{ item.action }}</NuxtLink>
          </article>
        </div>
      </section>

      <section class="home-panel about-panel reveal-up reveal-delay-2">
        <h2>{{ t("about.title") }}</h2>
        <p>{{ t("home.description") }}</p>
        <p>{{ t("about.description") }}</p>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
useI18nPageSeo({ pageKey: "home" });

const features = computed(() => [
  {
    title: t("news.title"),
    description: t("news.description"),
    action: t("home.ctaEvent"),
    to: localePath("/news"),
  },
  {
    title: t("clips.title"),
    description: t("clips.description"),
    action: t("clips.cardTitle"),
    to: localePath("/clips"),
  },
  {
    title: t("wishes.title"),
    description: t("wishes.description"),
    action: t("home.ctaBrowse"),
    to: localePath("/wishes"),
  },
]);
</script>

<style scoped lang="scss">
@reference "../assets/styles/tailwind.css";

.home-board {
  padding-bottom: 56px;
  background: transparent;
  box-shadow: none;
}

.hero-visual {
  position: relative;
  min-height: clamp(340px, 54vw, 560px);
  overflow: hidden;
  background: #ffffff;
  box-shadow: 0 24px 48px -24px rgb(var(--v-theme-on-surface) / 0.34);
}

.hero-image {
  width: 100%;
  height: 100%;
  min-height: inherit;
  display: block;
  object-fit: cover;
}

.hero-copy {
  position: absolute;
  inset: 32px 32px auto;
  text-align: center;
  color: #ffffff;
  text-shadow: 0 2px 14px rgb(var(--v-theme-on-surface) / 0.46);
}

.hero-copy p {
  margin: 0 0 6px;
  font-size: 15px;
  font-weight: 700;
  letter-spacing: 0;
}

.hero-copy h1 {
  margin: 0;
  font-size: clamp(26px, 4vw, 44px);
  font-weight: 900;
  letter-spacing: 0;
}

.hero-action {
  position: absolute;
  right: 18px;
  bottom: 18px;
  display: inline-flex;
  min-width: 74px;
  height: 38px;
  align-items: center;
  justify-content: center;
  background: rgb(var(--v-theme-secondary));
  color: #ffffff;
  font-size: 14px;
  font-weight: 700;
}

.home-panel {
  background: rgb(255 255 255 / 0.58);
  padding: clamp(28px, 5vw, 48px);
}

.home-panel--overlap {
  margin-top: -2px;
}

.home-panel h2 {
  margin: 0 0 28px;
  text-align: center;
  font-size: clamp(21px, 3vw, 30px);
  font-weight: 900;
  letter-spacing: 0;
}

.feature-grid {
  display: grid;
  grid-template-columns: repeat(3, minmax(0, 1fr));
  gap: 28px;
}

.feature-card {
  min-height: 218px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: space-between;
  padding: 26px 22px;
  border-radius: 8px;
  background: #ffffff;
  box-shadow: 0 18px 36px rgb(var(--v-theme-on-surface) / 0.12);
  text-align: center;
}

.feature-card h3 {
  margin: 0;
  color: #7698a3;
  font-size: 20px;
  font-weight: 900;
  letter-spacing: 0;
}

.feature-card p {
  margin: 16px 0 20px;
  color: #5a524d;
  font-size: 14px;
  line-height: 1.75;
}

.mini-button {
  display: inline-flex;
  min-width: 112px;
  height: 34px;
  align-items: center;
  justify-content: center;
  border-radius: 999px;
  background: #b23a34;
  color: #ffffff;
  font-size: 13px;
  font-weight: 700;
}

.about-panel {
  margin-top: -2px;
}

.about-panel p {
  max-width: 760px;
  margin: 0 auto 16px;
  color: #5a524d;
  font-size: 16px;
  line-height: 2;
}

@media (max-width: 760px) {
  .hero-copy {
    inset: 24px 18px auto;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }

  .home-panel {
    padding: 28px 18px;
  }
}
</style>
