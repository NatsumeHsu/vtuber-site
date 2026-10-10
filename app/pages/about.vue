<template>
  <section class="team-page ui-page ui-page--team">
    <div class="team-board ui-board ui-content-board reveal-up scrollbar-hidden">
      <div class="team-content scrollbar-hidden">
      <PageHeader :title="t('about.title')" :description="t('about.description')" icon="mdi-account-group-outline" />

      <section v-for="group in groups" :key="group.titleKey" class="team-group" :class="{ 'team-group--compact': group.members.length <= 2 }">
        <header class="group-heading">
          <span class="group-line" aria-hidden="true" />
          <h2>{{ t(group.titleKey) }}</h2>
          <span class="group-line" aria-hidden="true" />
        </header>
        <div class="member-grid">
          <component
            :is="member.link ? 'a' : 'article'"
            v-for="member in group.members"
            :key="member.name"
            class="member-card"
            :class="{ 'hover-lift': member.link }"
            :href="member.link || undefined"
            :target="member.link ? '_blank' : undefined"
            :rel="member.link ? 'noopener noreferrer' : undefined"
          >
            <img
              :src="member.icon"
              :alt="member.name"
              class="avatar"
              width="68"
              height="68"
              loading="lazy"
              referrerpolicy="no-referrer"
            />
            <span>{{ member.name }}</span>
            <VIcon v-if="member.link" class="member-link-icon" icon="mdi-arrow-top-right" size="16" aria-hidden="true" />
          </component>
        </div>
      </section>
      </div>
    </div>
      <section class="team-thanks">
        <header class="group-heading">
          <span class="group-line" aria-hidden="true" />
          <h2>{{ t('about.group.title.thanks') }}</h2>
          <span class="group-line" aria-hidden="true" />
        </header>
        <div class="donate-marquee" tabindex="0" :aria-label="t('about.group.title.thanks')">
          <div class="donate-track" :style="{ '--marquee-duration': `${Math.max(30, donate.length * 3)}s` }">
            <ul v-for="copy in 2" :key="copy" class="donate-list" :aria-hidden="copy === 2 ? 'true' : undefined">
              <li v-for="(name, index) in donate" :key="index">{{ name }}</li>
            </ul>
          </div>
        </div>
      </section>
  </section>
</template>

<script setup lang="ts">
const { t } = useI18n();
useI18nPageSeo({ pageKey: "about" });
const groups = [
  {
    titleKey: "about.group.title.lead",
    members: [
      {
        name: "波拉",
        icon: "/polarvillager.png",
        link: "https://x.com/polarvillager",
      },
    ],
  },
  {
    titleKey: "about.group.title.deputy",
    members: [
      {
        name: "人生信徒",
        icon: "/arthur890910.png",
        link: "https://x.com/arthur890910",
      },
      {
        name: "九條夏目",
        icon: "https://pbs.twimg.com/profile_images/2106750850039439360/XTqOO5PE_400x400.jpg",
        link: "https://x.com/_natsume0304",
      },
    ],
  },
  {
    titleKey: "about.group.title.planning",
    members: [
      {
        name: "夏樹Natsuki",
        icon: "https://drive.google.com/thumbnail?id=1W_rzBovjK2F9bikDnH66RHv8sQYxWtlr&sz=w200",
        link: "https://x.com/Takizawa_0920",
      },
      {
        name: "小亞",
        icon: "https://drive.google.com/thumbnail?id=1fDLgPKPPi8AayvakVh2he3SzQWxwTlfk&sz=w200",
        link: "https://x.com/shinikonotDD",
      },
      {
        name: "月白",
        icon: "https://drive.google.com/thumbnail?id=1ccIgE0HX3dGc7IhYpNSXbpilaKeoTlHx&sz=w200",
        link: "https://x.com/aboibb47dlw4cki",
      },
      {
        name: "暗夜影",
        icon: "https://drive.google.com/thumbnail?id=1HLBsAFV4ynbLUIMoZRLE20tMQLcWuimu&sz=w200",
        link: "",
      },
      {
        name: "YUKI",
        icon: "https://drive.google.com/thumbnail?id=1U4MsopS19rKYzU5PO5_uQKT_9RritPj7&sz=w200",
        link: "https://x.com/OAO_Sakura",
      },
      {
        name: "凜玥",
        icon: "https://drive.google.com/thumbnail?id=1qKQYA3CIs5L4D-D02WS4vKqArGr_zdHQ&sz=w200",
        link: "https://x.com/L1nnYueh_",
      },
      {
        name: "孫寶",
        icon: "https://drive.google.com/thumbnail?id=1C8Vr7CaeUaSWyEqEOAAXG2q7rPFRvCCQ&sz=w200",
        link: "https://x.com/krit27846187",
      },
      {
        name: "雞腿",
        icon: "https://drive.google.com/thumbnail?id=1yenHACC4aNhUReVD6zlJISMulhOALGLh&sz=w200",
        link: "https://x.com/zero__0829",
      },
      {
        name: "茶杯",
        icon: "https://drive.google.com/thumbnail?id=1LUMYW38kJva8-ZTh3I46-KbSM0qju0Ok&sz=w200",
        link: "",
      },
      {
        name: "小恩",
        icon: "https://drive.google.com/thumbnail?id=1sDm7iaEWjC8xLdK1CNvfFYZI1lvCKjfL&sz=w200",
        link: "",
      },
      {
        name: "小龍湯包",
        icon: "https://drive.google.com/thumbnail?id=182-whpdV0cf8pVWXpxJSqrJ-014rfl0t&sz=w200",
        link: "https://x.com/erxiao43150",
      },
      {
        name: "冰鯊鯊",
        icon: "https://drive.google.com/thumbnail?id=1con2-DysgZChs8CfTxm2B4a9-6v8Yq_z&sz=w200",
        link: "",
      },
      {
        name: "鳳梨或ㄈㄌ",
        icon: "https://drive.google.com/thumbnail?id=1MJPLcbAOXX7hbhQ8TgPMdHgh2RYJCRNd&sz=w200",
        link: "https://x.com/tei_ks242227",
      },
      {
        name: "Emi-欸米",
        icon: "https://drive.google.com/thumbnail?id=1Bx17I7BAK0y6-rEVC-e-vLA38_LyzuYH&sz=w200",
        link: "https://x.com/ReZeroEmiliaOSU",
      },
      {
        name: "飛御",
        icon: "https://drive.google.com/thumbnail?id=1lSsIlaDwkf1At0LnQhP-5HkMDWFu4L_p&sz=w200",
        link: "https://x.com/UioJoe9291",
      },
      {
        name: "鳶梟",
        icon: "https://drive.google.com/thumbnail?id=1hD0Rgh8gyRB9gkGmcLSy323cFXH1VftB&sz=w200",
        link: "",
      },
      {
        name: "秋月",
        icon: "https://drive.google.com/thumbnail?id=1FYe455ljdgBW2n57TcFFSZiDfPeHEuEY&sz=w200",
        link: "https://x.com/akikazeryusei",
      },
      {
        name: "佈滿星光的花",
        icon: "https://drive.google.com/thumbnail?id=1k9AShIwMOnQywgOIMgSSAwDXHyDyWQq5&sz=w200",
        link: "",
      },
      {
        name: "亦晴",
        icon: "https://drive.google.com/thumbnail?id=14NwyT2d5z3yHZLB5D8GTOfMzQRP1U2gA&sz=w200",
        link: "",
      },
      {
        name: "雪狼snowwolf",
        icon: "https://drive.google.com/thumbnail?id=1H_gBQUemPn6OiQXi1cy5wNSqbBN5tSjX&sz=w200",
        link: "",
      },
      {
        name: "雪狼",
        icon: "https://drive.google.com/thumbnail?id=1S4QgzCFU3M-v_799WYL46GKwXpUkFehk&sz=w200",
        link: "https://x.com/chnshn29755444",
      },
    ],
  },
];

const donate = [
  "夏暉",
  "Jerry",
  "納茲呦",
  "哥吉拉的宵夜",
  "杏仁壽司",
  "寶特瓶",
  "樂叻",
  "雪澄",
  "明明子",
  "方舟駭客",
  "無峰",
  "嘟嘟",
  "口牙口合",
  "Demiti",
  "kyle",
  "STV",
  "ski",
  "雪狼snowwolf",
  "白貓貓兒",
  "Sgun",
  "粥粥",
  "呆呆是阿龜",
  "傑斯斯",
  "耀空",
  "只是路過而已",
  "木子",
  "羽楠",
  "冰淇淋",
  "洛璇",
  "微夜",
  "justin炳勝",
  "夏洛特",
  "貳柒",
  "羽羽",
  "yue",
  "九斑",
  "夜星",
  "神旂",
  "貳柒",
  "珍珠冬瓜茶",
  "一毛三の菜鴿",
  "羽翼つばさ",
  "江鳥先生",
  "cloud",
  "梅吉克海螺",
  "葡萄鼬",
  "夜銃",
  "托比",
  "哇系黑輪",
  "羊Shang泉",
  "羊駝",
  "Taco",
  "黃彥綸",
  "泰迪",
  "咖灰",
  "麵茶",
  "亦晴",
  "wei在蛋夕",
  "夜影",
  "ああ傑",
  "雪鳥",
  "Ken",
  "微波爐",
  "林大佩",
  "Kgii",
  "西格碼",
  "瑪莉的小天地",
  "Winters溫特斯",
  "白冰黑貓",
  "科技",
  "雨月",
  "土撥鼠",
  "楊肥肥",
  "Ramen_ARIS",
  "ski",
  "味增丸",
  "布拉德特羅爾71",
  "凱開",
  "雪怪",
  "白光",
  "今天有點小淚",
  "蠟燭",
  "波拉",
  "夏目",
  "新若 Ruo"
]

</script>

<style scoped lang="scss">

.team-page {
  display: flex;
  flex-direction: column;
  gap: 16px;
  padding-bottom: 4;
}

.team-board {
  flex: 1;
  min-height: 0;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  padding-bottom: var(--board-inset);
}

.team-content {
  flex: 1;
  min-height: 0;
  overflow-y: auto;
  padding-bottom: var(--section-gap);
}

.team-thanks {
  width: min(100%, var(--page-width));
  margin-inline: auto;
  flex-shrink: 0;
  border-top: 1px solid rgb(var(--v-theme-on-surface) / 0.08);
}

.team-thanks .group-heading {
  margin-bottom: 8px;
}

.team-group {
  margin-top: var(--section-gap);
}

.donate-marquee {
  overflow: hidden;

}

.donate-marquee:focus-visible {
  outline: 2px solid #7698a3;
  outline-offset: 4px;
}

.donate-track {
  display: flex;
  width: max-content;
  animation: donate-scroll var(--marquee-duration) linear infinite;
}

.donate-marquee:hover .donate-track,
.donate-marquee:focus-within .donate-track {
  animation-play-state: paused;
}

.donate-list {
  display: flex;
  flex-shrink: 0;
  align-items: center;
  gap: 32px;
  margin: 0;
  padding: 0 32px 0 0;
  list-style: none;
  color: rgb(var(--v-theme-on-surface));
  font-size: 18px;
  line-height: 1.6;
}

.donate-list li {
  white-space: nowrap;
}

@keyframes donate-scroll {
  to {
    transform: translateX(-50%);
  }
}

.group-heading {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 12px;
  margin-bottom: 22px;
}

.group-heading h2 {
  margin: 0;
  color: rgb(var(--v-theme-on-surface));
  font-size: 24px;
  font-weight: 400;
}

.group-line {
  flex: 1;
  max-width: 100px;
  height: 1px;
  background: rgb(118 152 163 / 0.3);
}

.group-count {
  padding: 3px 9px;
  border-radius: 999px;
  background: rgb(118 152 163 / 0.14);
  color: rgb(var(--v-theme-on-surface) / 0.7);
  font-size: 12px;
  font-variant-numeric: tabular-nums;
}

.member-grid {
  display: grid;
  grid-template-columns: repeat(4, minmax(0, 1fr));
  gap: 18px;
}

.team-group--compact .member-grid {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
}

.team-group--compact .member-card {
  flex: 0 1 220px;
  min-height: 186px;
  background: linear-gradient(150deg, rgb(118 152 163 / 0.1), rgb(var(--v-theme-surface) / 0.96));
}

.member-card {
  position: relative;
  min-width: 0;
  min-height: 168px;
  padding: 24px 14px 20px;
  display: grid;
  justify-items: center;
  align-content: center;
  gap: 14px;
  border: 1px solid rgb(var(--v-theme-on-surface) / 0.08);
  border-radius: 18px;
  background: rgb(var(--v-theme-surface) / 0.92);
  box-shadow: 0 6px 18px rgb(var(--v-theme-on-surface) / 0.04);
  text-align: center;
  text-decoration: none;
}

.avatar {
  width: 76px;
  height: 76px;
  object-fit: cover;
  border-radius: 50%;
  background: rgb(118 152 163 / 0.14);
  outline: 1px solid rgb(118 152 163 / 0.22);
  outline-offset: 4px;
}

.team-group--compact .avatar {
  width: 88px;
  height: 88px;
}

.member-card > span {
  color: #000;
  -webkit-text-stroke: 2px #fff;
  paint-order: stroke fill;
  font-size: 18px;
  line-height: 1.6;
  overflow-wrap: anywhere;
}

.member-link-icon {
  position: absolute;
  top: 12px;
  right: 12px;
  color: #7698a3;
}

a.member-card:focus-visible {
  outline: 3px solid #7698a3;
  outline-offset: 4px;
}

@media (max-width: 1000px) {
  .member-grid {
    grid-template-columns: repeat(3, minmax(0, 1fr));
  }
}

@media (max-width: 760px) {
  .member-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 12px;
  }


  .team-group--compact .member-card {
    flex-basis: calc((100% - 12px) / 2);
  }
}

@media (max-width: 360px) {
  .member-grid {
    grid-template-columns: 1fr;
  }

  .team-group--compact .member-card {
    flex-basis: 100%;
  }
}

@media (prefers-reduced-motion: reduce) {
  .donate-marquee {
    overflow-x: auto;
  }

  .donate-track {
    animation: none;
  }

  .donate-list[aria-hidden="true"] {
    display: none;
  }

  .member-card {
    transition: none;
  }
}
</style>
