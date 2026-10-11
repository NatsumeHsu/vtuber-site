<template>
  <section class="home-page ui-page ui-page--home">
    <div class="home-board ui-board scrollbar-hidden">
      <section class="hero-visual reveal-up" aria-labelledby="hero-title">
        <div class="hero-artwork">
          <img
            src="/hero.png"
            :alt="t('home.heroAlt')"
            class="hero-image"
            fetchpriority="high"
          />
        </div>
        <div class="hero-content">
          <div class="hero-copy">
            <div class="hero-top-row">
              <p class="hero-badge">{{ t("home.badge") }}</p>
              <div class="hero-actions">
                <a
                  href="#news"
                  class="hero-action interactive-lift"
                  @click.prevent="scrollToNews"
                >
                  <span>{{ t("home.ctaLightbox") }}</span>
                  <VIcon icon="mdi-chevron-down" size="20" aria-hidden="true" />
                </a>
                <NuxtLink
                  :to="localePath('/wishes/new')"
                  class="hero-action interactive-lift"
                >
                  <span>{{ t("home.ctaSubmit") }}</span>
                  <VIcon icon="mdi-arrow-right" size="20" aria-hidden="true" />
                </NuxtLink>
                <a
                  href="https://drive.google.com/drive/u/1/folders/1tSvIp0OLLOD_1UQ6ZrxC2ultfu2thm8Z"
                  target="_blank"
                  rel="noopener noreferrer"
                  class="hero-action interactive-lift"
                >
                  <span>{{ t("home.ctaDrive") }}</span>
                  <VIcon icon="mdi-open-in-new" size="20" aria-hidden="true" />
                </a>
              </div>
            </div>
            <h1 id="hero-title">{{ t("home.title") }}</h1>
            <p class="hero-description">{{ t("home.description") }}</p>
          </div>

        </div>
      </section>

      <NewsDisplay class="home-panel reveal-up" />
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
const localePath = useLocalePath();
useI18nPageSeo({ pageKey: "home" });

function scrollToNews() {
  document.getElementById("news")?.scrollIntoView({
    behavior: window.matchMedia("(prefers-reduced-motion: reduce)").matches
      ? "auto"
      : "smooth",
    block: "start",
  });
}

const features = computed(() => [
  {
    title: t("news.title"),
    description: t("news.description"),
    action: t("home.ctaEvent"),
    to: { path: localePath("/"), hash: "#news" },
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
  padding-bottom: 0;
  border: 0;
  background: transparent;
  box-shadow: none;
}

.hero-visual {
  overflow: hidden;
  border: 1px solid rgb(153 107 79 / 0.16);
  border-radius: var(--panel-radius);
  background: #fff8ee;
  box-shadow: 0 20px 48px -28px rgb(72 43 30 / 0.35);
}

.hero-artwork {
  position: relative;
  background: #e8d8bf;
}

.hero-artwork::after {
  content: "";
  position: absolute;
  inset: auto 0 0;
  height: 48px;
  background: linear-gradient(transparent, rgb(77 43 25 / 0.12));
  pointer-events: none;
}

.hero-image {
  display: block;
  width: 100%;
  height: auto;
}

.hero-content {
  display: flex;
  align-items: center;
  gap: 32px;
  padding: clamp(24px, 4vw, 40px);
  background: linear-gradient(120deg, #fffaf2, #f5e9da);
}

.hero-copy {
  flex: 1;
  min-width: 0;
  color: #49352d;
}

.hero-top-row {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  justify-content: space-between;
  gap: 16px 24px;
  margin-bottom: 20px;
}

.hero-badge {
  display: inline-flex;
  margin: 0;
  padding: 6px 12px;
  border: 1px solid rgb(153 107 79 / 0.2);
  border-radius: 999px;
  color: #8b5d43;
  background: rgb(255 255 255 / 0.65);
  font-size: 11px;
  font-weight: 700;
  line-height: 1.6;
  letter-spacing: 0.1em;
  overflow-wrap: anywhere;
}

.hero-copy h1 {
  font-family: var(--font-story);
  margin: 0;
  font-size: clamp(24px, 3vw, 36px);
  font-weight: 400;
  line-height: 1.45;
  text-wrap: balance;
}

.hero-description {
  font-family: var(--font-story);
  max-width: 620px;
  margin: 14px 0 0;
  color: #796357;
  font-size: 15px;
  line-height: 1.9;
}

.hero-actions {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 12px;
}

.hero-action {
  display: inline-flex;
  flex-shrink: 0;
  align-items: center;
  justify-content: center;
  gap: 12px;
  min-height: 48px;
  padding: 12px 24px;
  border-radius: 999px;
  background: #9b4436;
  box-shadow: 0 8px 20px rgb(155 68 54 / 0.18);
  color: #ffffff;
  font-size: 15px;
  font-weight: 700;
  text-decoration: none;
}

.hero-action:focus-visible {
  outline: 3px solid #9b4436;
  outline-offset: 4px;
}

.home-panel {
  margin-top: var(--section-gap);
  border: 1px solid rgb(var(--v-theme-on-surface) / 0.08);
  border-radius: var(--panel-radius);
  background: rgb(var(--v-theme-surface) / 0.92);
  padding: var(--board-inset);
}

.home-panel--overlap {
  margin-top: -2px;
}

.home-panel h2 {
  margin: 0 0 28px;
  text-align: center;
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 400;
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
  font-weight: 400;
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
  .hero-content {
    flex-direction: column;
    align-items: stretch;
  }

  .hero-copy {
    inset: 24px 18px auto;
  }

  .feature-grid {
    grid-template-columns: 1fr;
  }
}
</style>
