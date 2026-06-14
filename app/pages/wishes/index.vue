<template>
  <section class="wishes-page ui-page ui-page--wishes">
    <div class="wishes-board ui-board reveal-up scrollbar-hidden">
      <header class="wishes-header">
        <div>
          <p class="ui-heading-title">{{ t("wishes.title") }}</p>
          <h1 class="ui-heading-subtitle">{{ t("wishes.description") }}</h1>
        </div>
        <NuxtLink :to="localePath('/wishes/new')" class="submit-button interactive-lift">
          {{ t("wishes.create") }}
        </NuxtLink>
      </header>

      <div
        v-if="displayedList.length"
        ref="masonryRef"
        class="masonry-board"
        :style="{ height: `${containerHeight}px` }"
      >
        <div
          v-for="(item, index) in displayedList"
          :key="item.id"
          :ref="(el) => setItemRef(el, index)"
          class="masonry-item"
          :style="itemStyles[index]"
        >
          <BlessingCard :item="item" />
        </div>
      </div>

      <div v-else-if="loadingMore" class="empty-state">Loading...</div>
      <div v-else class="wish-placeholder">
        <span>{{ t("wishes.description") }}</span>
      </div>

      <div
        v-if="hasMore"
        ref="loadMoreTrigger"
        class="h-2 w-full"
        aria-hidden="true"
      />
    </div>
  </section>
</template>

<script setup lang="ts">
type BoardItem = {
  id: number | string;
  displayName?: string;
  nickname?: string;
  category: string;
  message: string;
  assetUrl?: string | null;
  createdAt: string | Date;
};

type ListCursor = {
  createdAt: string;
  id: number | string;
};

type ListResponse = {
  items: BoardItem[];
  hasMore: boolean;
  nextCursor?: ListCursor | null;
};

const { t } = useI18n();
const localePath = useLocalePath();
useI18nPageSeo({ pageKey: "wishes" });

const PAGE_SIZE = 30;
const GAP = 16;
const MIN_ITEM_WIDTH = 300;

const displayedList = ref<BoardItem[]>([]);
const hasMore = ref(true);
const loadingMore = ref(false);
const nextCursor = ref<ListCursor | null>(null);

const masonryRef = ref<HTMLElement | null>(null);
const loadMoreTrigger = ref<HTMLElement | null>(null);
const itemRefs = ref<HTMLElement[]>([]);
const itemStyles = ref<Record<number, Record<string, string>>>({});
const containerHeight = ref(0);

let resizeObserver: ResizeObserver | null = null;
let loadMoreObserver: IntersectionObserver | null = null;
let relayoutTimer: ReturnType<typeof setTimeout> | null = null;

function createListQuery(reset: boolean) {
  return {
    limit: PAGE_SIZE,
    cursorCreatedAt: !reset ? nextCursor.value?.createdAt : undefined,
    cursorId: !reset ? nextCursor.value?.id : undefined,
  };
}

async function fetchBatch(reset = false) {
  if (!reset && loadingMore.value) return;
  if (!reset && !hasMore.value) return;

  loadingMore.value = true;

  try {
    const res = await $fetch<ListResponse>("/api/public/list", {
      query: createListQuery(reset),
    });

    const rows = res.items ?? [];
    displayedList.value = reset ? rows : displayedList.value.concat(rows);
    hasMore.value = Boolean(res.hasMore);
    nextCursor.value = res.nextCursor ?? null;
  } finally {
    loadingMore.value = false;
  }
}

function loadMore() {
  void fetchBatch(false);
}

function setItemRef(el: any, index: number) {
  if (el instanceof HTMLElement) {
    itemRefs.value[index] = el;
  }
}

function layoutMasonry() {
  const container = masonryRef.value;
  const items = itemRefs.value.filter(Boolean);

  if (!container || !items.length) {
    containerHeight.value = 0;
    return;
  }

  const containerWidth = container.clientWidth;
  const columnCount = Math.max(
    1,
    Math.floor((containerWidth + GAP) / (MIN_ITEM_WIDTH + GAP)),
  );
  const itemWidth =
    columnCount === 1
      ? containerWidth
      : (containerWidth - GAP * (columnCount - 1)) / columnCount;
  const columnHeights = new Array<number>(columnCount).fill(0);
  const nextStyles: Record<number, Record<string, string>> = {};

  items.forEach((el, index) => {
    el.style.width = `${itemWidth}px`;

    const height = el.offsetHeight;
    let targetColumn = 0;

    for (let i = 1; i < columnCount; i += 1) {
      if (columnHeights[i]! < columnHeights[targetColumn]!) {
        targetColumn = i;
      }
    }

    const left = targetColumn * (itemWidth + GAP);
    const top = columnHeights[targetColumn];

    nextStyles[index] = {
      width: `${itemWidth}px`,
      transform: `translate(${left}px, ${top}px)`,
    };

    columnHeights[targetColumn]! += height + GAP;
  });

  itemStyles.value = nextStyles;
  containerHeight.value = Math.max(...columnHeights, 0);
}

function scheduleLayout() {
  if (relayoutTimer) clearTimeout(relayoutTimer);

  relayoutTimer = setTimeout(async () => {
    await nextTick();
    layoutMasonry();
  }, 30);
}

function observeLoadMoreTrigger() {
  loadMoreObserver?.disconnect();

  if (loadMoreTrigger.value && hasMore.value) {
    loadMoreObserver?.observe(loadMoreTrigger.value);
  }
}

onMounted(async () => {
  await fetchBatch(true);
  await nextTick();

  if (masonryRef.value) {
    resizeObserver = new ResizeObserver(scheduleLayout);
    resizeObserver.observe(masonryRef.value);
  }

  loadMoreObserver = new IntersectionObserver(
    (entries) => {
      if (entries.some((entry) => entry.isIntersecting)) {
        loadMore();
      }
    },
    { root: null, rootMargin: "120px 0px", threshold: 0 },
  );

  window.addEventListener("resize", scheduleLayout);
  layoutMasonry();
  observeLoadMoreTrigger();
});

watch(
  () => [displayedList.value.length, hasMore.value],
  async () => {
    itemRefs.value = [];
    await nextTick();
    scheduleLayout();
    observeLoadMoreTrigger();
  },
);

onBeforeUnmount(() => {
  resizeObserver?.disconnect();
  loadMoreObserver?.disconnect();
  window.removeEventListener("resize", scheduleLayout);

  if (relayoutTimer) clearTimeout(relayoutTimer);
});
</script>

<style scoped lang="scss">
@reference "../../assets/styles/tailwind.css";

.wishes-board {
  padding: 36px clamp(18px, 4vw, 44px) 44px;
}

.wishes-header {
  display: flex;
  align-items: start;
  justify-content: space-between;
  gap: 18px;
  margin-bottom: 34px;
  text-align: center;
}

.wishes-header > div {
  flex: 1;
}

.submit-button {
  display: inline-flex;
  min-width: 96px;
  height: 38px;
  align-items: center;
  justify-content: center;
  background: #8b55ff;
  color: #ffffff;
  font-size: 14px;
  font-weight: 800;
}

.masonry-board {
  position: relative;
  width: 100%;
}

.masonry-item {
  position: absolute;
  transition:
    transform 0.3s ease,
    width 0.3s ease;
}

.wish-placeholder,
.empty-state {
  min-height: 520px;
  display: grid;
  place-items: start;
  padding: 42px;
  border-radius: 8px;
  background: rgb(255 255 255 / 0.18);
  color: #5a524d;
  font-weight: 800;
}

@media (max-width: 640px) {
  .wishes-header {
    flex-direction: column;
    align-items: stretch;
    text-align: left;
  }
}
</style>
