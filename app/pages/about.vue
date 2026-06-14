<template>
  <section class="team-page ui-page ui-page--team">
    <div class="team-board ui-board reveal-up scrollbar-hidden">
      <header class="team-header">
        <p class="ui-heading-title">{{ t("about.title") }}</p>
        <h1 class="ui-heading-subtitle">{{ t("about.description") }}</h1>
      </header>

      <section v-for="group in groups" :key="group.title" class="team-group">
        <h2>{{ group.title }}</h2>
        <div class="member-grid">
          <article v-for="member in group.members" :key="member.name" class="member-card hover-lift">
            <div class="avatar" />
            <strong>{{ member.name }}</strong>
            <span>{{ member.role }}</span>
          </article>
        </div>
      </section>
    </div>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
useI18nPageSeo({ pageKey: "about" });

const groups = [
  {
    title: "Planning Team",
    members: [
      { name: "Member 01", role: "Lead" },
      { name: "Member 02", role: "Sub Lead" },
      { name: "Member 03", role: "Copy" },
      { name: "Member 04", role: "Art" },
      { name: "Member 05", role: "Design" },
      { name: "Member 06", role: "Edit" },
      { name: "Member 07", role: "Promo" },
      { name: "Member 08", role: "Tech" },
    ],
  },
  {
    title: "Event Team",
    members: [
      { name: "Member 09", role: "Host" },
      { name: "Member 10", role: "Stage" },
      { name: "Member 11", role: "Support" },
      { name: "Member 12", role: "Assist" },
    ],
  },
];
</script>

<style scoped lang="scss">
@reference "../assets/styles/tailwind.css";

.team-board {
  padding: 36px clamp(18px, 4vw, 44px) 48px;
}

.team-header {
  margin-bottom: 30px;
  text-align: center;
}

.team-header h1 {
  max-width: 760px;
  margin-inline: auto;
  line-height: 1.8;
}

.team-group {
  margin-top: 28px;
  text-align: center;
}

.team-group h2 {
  margin: 0 0 20px;
  color: #5a524d;
  font-size: 15px;
  font-weight: 800;
}

.member-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 22px;
}

.member-card {
  min-height: 152px;
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 9px;
  border-radius: 8px;
  background: rgb(255 255 255 / 0.82);
  box-shadow: 0 14px 28px rgb(var(--v-theme-on-surface) / 0.1);
}

.avatar {
  width: 68px;
  height: 68px;
  border-radius: 999px;
  background: #d9d9d9;
}

.member-card strong {
  color: #7698a3;
  font-size: 14px;
}

.member-card span {
  color: #b23a34;
  font-size: 12px;
  font-weight: 800;
}

@media (max-width: 860px) {
  .member-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
  }
}

@media (max-width: 520px) {
  .member-grid {
    grid-template-columns: 1fr;
  }
}
</style>
