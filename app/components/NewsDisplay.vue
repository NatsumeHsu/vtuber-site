<template>
  <section id="news" class="news-display" aria-labelledby="news-title">
    <h2 id="news-title">{{ t("news.displayTitle") }}</h2>
    <div class="news-grid">
      <section class="image-section" aria-labelledby="location-map-title">
        <h3 id="location-map-title">{{ t("news.locationMapTitle") }}</h3>
        <img src="/indicate.png" :alt="t('news.locationMapTitle')" loading="lazy" decoding="async" />
      </section>
      <section class="image-section" aria-labelledby="lightbox-photo-title">
        <h3 id="lightbox-photo-title">{{ t("news.lightboxPhotoTitle") }}</h3>
        <img src="/photo.png" :alt="t('news.lightboxPhotoTitle')" loading="lazy" decoding="async" />
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
</script>

<style scoped lang="scss">
.news-display {
  scroll-margin-top: 100px;
  text-align: center;
}

.news-display h2 {
  margin: 0 0 28px;
  font-size: clamp(26px, 3vw, 34px);
  font-weight: 400;
}

.news-grid {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  align-items: start;
  gap: 28px;
}

.image-section {
  display: grid;
  gap: 20px;
  min-width: 0;
}

.image-section h3 {
  margin: 0;
  font-size: clamp(18px, 2.5vw, 24px);
  font-weight: 400;
}

.image-section img {
  display: block;
  width: 100%;
  aspect-ratio: 612 / 432;
  object-fit: cover;
  object-position: center top;
  border-radius: 16px;
}

@media (max-width: 760px) {
  .news-grid {
    grid-template-columns: 1fr;
    gap: 32px;
  }

  .image-section {
    gap: 16px;
  }
}
</style>
