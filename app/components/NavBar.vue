<template>
  <header class="site-header">
    <div class="header-layout layout-container">
        <NuxtLink
          :to="localePath('/')"
          class="brand-link"
        >
          <span class="brand-icon-frame">
            <img src="/icon.png" :alt="t('common.projectName')" class="brand-icon" width="1263" height="793" />
          </span>
        </NuxtLink>
      <nav class="header-nav" :aria-label="t('nav.home')">
        <NuxtLink
          v-for="link in pageLinks"
          :key="link.title"
          :to="link.to"
          class="header-nav-link"
          active-class="font-semibold text-primary-700"
        >
          {{ link.title }}
        </NuxtLink>
      </nav>

      <div class="header-actions">
        <div class="header-preferences">
          <button
            type="button"
            class="locale-pill"
            :class="{ 'is-en': locale === 'en' }"
            :aria-label="t('common.language')"
            :aria-pressed="locale === 'en'"
            @click="changeLocale(locale === 'en' ? 'zh' : 'en')"
          >
            <span class="locale-pill-thumb" aria-hidden="true" />
            <span
              class="locale-pill-item"
              :class="{ 'is-active': locale !== 'en' }"
            >
              ZH
            </span>
            <span
              class="locale-pill-item"
              :class="{ 'is-active': locale === 'en' }"
            >
              EN
            </span>
          </button>
          <button
            class="theme-button"
            type="button"
            :title="isDark ? t('common.themeLight') : t('common.themeDark')"
            :aria-label="isDark ? t('common.themeLight') : t('common.themeDark')"
            @click="changeTheme(isDark ? 'light' : 'dark')"
          >
            <VIcon
              :icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
              size="22"
            />
          </button>
        </div>

        <VBtn
          v-if="!user && !isCompact"
          @click="openDialog()"
          variant="text"
          class="px-2"
        >
          <img
            src="/favicon.ico"
            class="h-8 w-8 rounded-full object-cover"
            alt="avatar"
          />
          <template v-if="width >= 1280">
            <span class="ml-2 hidden sm:inline">{{ t("common.notLoggedIn") }}</span>
          </template>
        </VBtn>

        <VMenu v-if="user && !isCompact">
          <template #activator="{ props }">
            <VBtn v-bind="props" variant="text" class="px-2">
              <img
                :src="user.avatar || '/favicon.ico'"
                class="h-8 w-8 rounded-full object-cover"
                alt="avatar"
              />
              <template v-if="width >= 1280">
                <span class="account-name ml-2">{{ user.name }}</span>
              </template>
            </VBtn>
          </template>
          <VList density="compact">
            <VListItem :title="user.name" />
            <VDivider />
            <VListItem
              :to="localePath('/wishes/new')"
              :title="t('common.submitWish')"
            />
            <VListItem
              v-if="user.role !== 'user'"
              :to="localePath('/admin/contribute')"
              :title="t('common.manageWish')"
            />
            <VListItem
              v-if="user.role !== 'user'"
              :to="localePath('/admin/users')"
              :title="t('common.manageUsers')"
            />
            <VListItem
              :to="localePath('/user/account')"
              :title="t('common.account')"
            />
            <VDivider />
            <VListItem :title="t('common.logout')" @click="confirmLogout()" />
          </VList>
        </VMenu>

        <VMenu
          v-if="isCompact"
          v-model="drawer"
          location="bottom end"
          :close-on-content-click="false"
        >
          <template #activator="{ props }">
            <VBtn v-bind="props" variant="tonal" icon="mdi-menu" :aria-label="t('nav.home')">
              <VIcon icon="mdi-menu" />
            </VBtn>
          </template>
          <VList density="compact" min-width="260">
            <VListItem
              v-for="link in pageLinks"
              :key="link.title"
              :to="link.to"
              :title="link.title"
              @click="drawer = false"
            />
            <VDivider class="my-2" />
            <VListItem
              v-if="!user"
              :title="t('common.login')"
              @click="openDialog()"
            />
            <template v-else>
              <VListItem variant="text" class="px-2">
                <template #prepend>
                  <VListItemMedia>
                    <img
                      :src="user.avatar || '/favicon.ico'"
                      class="h-6 w-6 rounded-full object-cover"
                      alt="avatar"
                    />
                  </VListItemMedia>
                </template>

                <VListItemTitle>
                  {{ user.name }}
                </VListItemTitle>
              </VListItem>

              <VListItem
                :to="localePath('/wishes/new')"
                :title="t('common.submitWish')"
                @click="drawer = false"
              />
              <VListItem
                :to="localePath('/user/account')"
                :title="t('common.account')"
                @click="drawer = false"
              />
              <VListItem
                v-if="user.role !== 'user'"
                :to="localePath('/admin/contribute')"
                :title="t('common.manageWish')"
                @click="drawer = false"
              />
              <VListItem
                v-if="user.role !== 'user'"
                :to="localePath('/admin/users')"
                :title="t('common.manageUsers')"
                @click="drawer = false"
              />
              <VListItem :title="t('common.logout')" @click="confirmLogout()" />
            </template>
            <VDivider class="my-2" />
            <VListItem
              :title="isDark ? t('common.themeLight') : t('common.themeDark')"
              :prepend-icon="isDark ? 'mdi-white-balance-sunny' : 'mdi-weather-night'"
              @click="changeTheme(isDark ? 'light' : 'dark')"
            />
            <VListSubheader>{{ t("common.language") }}</VListSubheader>
            <VListItem
              v-for="item in localeItems"
              :key="`menu-${item.code}`"
              :title="item.label"
              :active="item.code === locale"
              @click="changeLocale(item.code)"
            />
          </VList>
        </VMenu>
      </div>
    </div>
  </header>
  <ClientOnly>
    <LoginDialog v-model="loginOpen" />
  </ClientOnly>
</template>

<script setup lang="ts">
const theme = useTheme();
const { width } = useDisplay();
const localePath = useLocalePath();
const { t, locale, locales, setLocale } = useI18n();
type LocaleCode = Parameters<typeof setLocale>[0];
type ThemeName = "light" | "dark";
const { user, loginOpen, drawer, logout, openDialog } = useLogin();
const themePreference = useCookie<string>("theme", { sameSite: "lax" });

const pageLinks = computed(() => [
  {
    to: { path: localePath("/"), hash: "#news" },
    title: t("nav.news"),
  },
  {
    to: localePath("/clips"),
    title: t("nav.clips"),
  },
  {
    to: localePath("/wishes"),
    title: t("nav.wishes"),
  },
  {
    to: localePath("/about"),
    title: t("nav.about"),
  },
]);

const isDark = computed(() => theme.global.name.value === "dark");
const isCompact = computed(() => width.value < 1200);

const normalizeTheme = (name: string | null | undefined): ThemeName =>
  name === "dark" ? "dark" : "light";

theme.global.name.value = normalizeTheme(themePreference.value);

const localeItems = computed(() =>
  locales.value.map((entry) => {
    const normalized = entry as { code: LocaleCode; name?: string };
    return {
      code: normalized.code,
      label: normalized.name || normalized.code.toUpperCase(),
    };
  }),
);

function changeTheme(name: ThemeName) {
  theme.global.name.value = name;
  themePreference.value = name;
}

async function changeLocale(code: LocaleCode) {
  if (code === locale.value) return;
  await setLocale(code);
  drawer.value = false;
}

async function confirmLogout() {
  if (!import.meta.client) return;
  drawer.value = false;
  await logout();
}
</script>

<style scoped lang="scss">
@reference "../assets/styles/tailwind.css";

.site-header {
  position: relative;
  z-index: 40;
}

.layout-container {
  box-sizing: border-box;
  width: min(100%, calc(var(--page-width, 1080px) + 2 * var(--page-inset, 24px)));
  margin-inline: auto;
  padding-inline: var(--page-inset, 24px);
}

.header-layout {
  display: grid;
  grid-template-columns: auto minmax(0, 1fr) auto;
  grid-template-rows: 40px;
  align-items: center;
  gap: 16px;
  height: 70px;
  padding-block: 15px;
}

.brand-link {
  position: relative;
  display: flex;
  align-items: center;
  height: 40px;
  gap: 12px;
  min-width: 0;
  color: rgb(var(--v-theme-on-surface));
  text-decoration: none;
}

.brand-icon-frame {
  display: flex;
  align-items: center;
  height: 64px;
  aspect-ratio: 1263 / 793;
  flex-shrink: 0;
}


.brand-name {
  max-width: 180px;
  min-width: 0;
  overflow-wrap: anywhere;
  font-size: 16px;
  font-weight: 800;
  line-height: 1.4;
  text-wrap: balance;
}

.header-nav {
  display: flex;
  justify-content: flex-start;
  gap: 4px;
  min-width: 0;
  padding-left: 20px;
}

.header-nav-link {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  min-height: 44px;
  padding: 10px 12px;
  border-radius: 999px;
  color: rgb(var(--v-theme-primary));
  font-size: 14px;
  white-space: nowrap;
  text-decoration: none;
  transition: background-color 0.2s ease;
}

.header-nav-link:hover {
  background: rgb(var(--v-theme-primary) / 0.08);
}

.header-actions,
.header-preferences {
  display: flex;
  align-items: center;
  gap: 8px;
}

.header-actions {
  justify-self: end;
}

.account-name {
  display: inline-block;
  max-width: 120px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}

.theme-button {
  display: grid;
  place-items: center;
  width: 44px;
  height: 44px;
  border-radius: 50%;
}

.brand-link:focus-visible,
.header-nav-link:focus-visible,
.theme-button:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary));
  outline-offset: 3px;
}

@media (max-width: 1199px) {
  .header-layout {
    grid-template-columns: minmax(0, 1fr) auto;
  }

  .header-nav {
    display: none;
  }
}

@media (max-width: 759px) {
  .header-preferences {
    display: none;
  }

  .brand-name {
    font-size: 14px;
  }
}

@media (max-width: 399px) {
  .brand-name {
    display: none;
  }
}

.locale-pill {
  position: relative;
  display: inline-flex;
  align-items: center;
  justify-content: space-between;
  padding: 4px;
  width: 124px;
  border-radius: 999px;
  border: 1px solid rgb(var(--v-theme-on-surface) / 0.14);
  background-color: rgb(var(--v-theme-on-surface) / 0.08);
  overflow: hidden;
  transition:
    border-color 0.24s ease,
    background-color 0.24s ease;
}

.locale-pill:hover {
  border-color: rgb(var(--v-theme-primary) / 0.4);
  background-color: rgb(var(--v-theme-on-surface) / 0.12);
}

.locale-pill:focus-visible {
  outline: 2px solid rgb(var(--v-theme-primary) / 0.55);
  outline-offset: 2px;
}

.locale-pill-thumb {
  position: absolute;
  top: 4px;
  left: 4px;
  width: calc(50% - 4px);
  height: calc(100% - 8px);
  border-radius: 999px;
  background-image: linear-gradient(
    135deg,
    rgb(var(--v-theme-primary)),
    color-mix(in srgb, rgb(var(--v-theme-primary)) 70%, white)
  );
  box-shadow: 0 6px 14px -8px rgb(var(--v-theme-primary) / 0.9);
  transform: translateX(0);
  transition: transform 0.28s cubic-bezier(0.22, 0.61, 0.36, 1);
  z-index: 0;
}

.locale-pill.is-en .locale-pill-thumb {
  transform: translateX(100%);
}

.locale-pill-item {
  position: relative;
  z-index: 1;
  flex: 1 1 50%;
  min-width: 54px;
  padding: 9px 14px;
  border-radius: 999px;
  text-align: center;
  font-size: 0.9rem;
  font-weight: 700;
  line-height: 1;
  color: rgb(var(--v-theme-on-surface) / 0.78);
  transition: color 0.22s ease;
}

.locale-pill-item.is-active {
  color: rgb(var(--v-theme-on-primary, 255 255 255));
}

@media (prefers-reduced-motion: reduce) {
  .locale-pill,
  .locale-pill-thumb,
  .locale-pill-item {
    transition: none !important;
  }
}
</style>
