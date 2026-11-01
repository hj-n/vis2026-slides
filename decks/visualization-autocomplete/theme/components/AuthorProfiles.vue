<script setup>
import { computed } from 'vue'
import { useSlideContext } from '@slidev/client'

const { $slidev } = useSlideContext()

const props = defineProps({
  authors: {
    type: Array,
    default: () => [],
  },
  layout: {
    type: String,
    validator: value => ['row', 'grid', 'stack'].includes(value),
  },
  columns: {
    type: [Number, String],
  },
  imageSize: {
    type: [Number, String],
  },
  cardWidth: {
    type: [Number, String],
  },
  gap: {
    type: [Number, String],
  },
  marginTop: {
    type: [Number, String],
  },
  align: {
    type: String,
    validator: value => ['left', 'center', 'right'].includes(value),
  },
  outerAlign: {
    type: String,
    validator: value => ['left', 'center', 'right'].includes(value),
  },
  innerAlign: {
    type: String,
    validator: value => ['left', 'center', 'right'].includes(value),
  },
  nameSize: {
    type: [Number, String],
  },
  affiliationSize: {
    type: [Number, String],
  },
})

const themeDefaults = computed(() => $slidev.themeConfigs?.authorProfiles ?? {})

const resolvedLayout = computed(() =>
  props.layout ?? themeDefaults.value.layout ?? 'row')

const legacyAlign = computed(() =>
  props.align ?? themeDefaults.value.align)

const resolvedOuterAlign = computed(() =>
  props.outerAlign
  ?? themeDefaults.value.outerAlign
  ?? legacyAlign.value
  ?? 'center')

const resolvedInnerAlign = computed(() =>
  props.innerAlign
  ?? themeDefaults.value.innerAlign
  ?? legacyAlign.value
  ?? 'center')

const resolvedImageSize = computed(() =>
  props.imageSize ?? themeDefaults.value.imageSize ?? '150px')

const resolvedCardWidth = computed(() =>
  props.cardWidth ?? themeDefaults.value.cardWidth ?? '220px')

const resolvedGap = computed(() =>
  props.gap ?? themeDefaults.value.gap ?? '36px')

const resolvedMarginTop = computed(() =>
  props.marginTop ?? themeDefaults.value.marginTop ?? '0px')

const resolvedNameSize = computed(() =>
  props.nameSize ?? themeDefaults.value.nameSize ?? '18px')

const resolvedAffiliationSize = computed(() =>
  props.affiliationSize ?? themeDefaults.value.affiliationSize ?? '13px')

const asCssUnit = (value) => {
  if (typeof value === 'number')
    return `${value}px`
  return String(value)
}

const resolvedColumns = computed(() => {
  const requested = Number(props.columns ?? themeDefaults.value.columns)
  if (Number.isFinite(requested) && requested > 0)
    return Math.floor(requested)
  if (resolvedLayout.value === 'stack')
    return 1
  return Math.min(Math.max(props.authors.length, 1), 4)
})

const componentStyle = computed(() => ({
  '--author-columns': resolvedColumns.value,
  '--author-count': Math.max(props.authors.length, 1),
  '--author-image-size': asCssUnit(resolvedImageSize.value),
  '--author-card-width': asCssUnit(resolvedCardWidth.value),
  '--author-gap': asCssUnit(resolvedGap.value),
  '--author-margin-top': asCssUnit(resolvedMarginTop.value),
  '--author-name-size': asCssUnit(resolvedNameSize.value),
  '--author-affiliation-size': asCssUnit(resolvedAffiliationSize.value),
  '--author-text-align': resolvedInnerAlign.value,
}))

const plainName = (name = '') => String(name)
  .replace(/<\/?(?:b|strong)>/gi, '')

const nameParts = (name = '') => {
  let bold = false
  return String(name)
    .split(/(<\/?(?:b|strong)>)/gi)
    .reduce((parts, token) => {
      if (/^<(?:b|strong)>$/i.test(token)) {
        bold = true
      }
      else if (/^<\/(?:b|strong)>$/i.test(token)) {
        bold = false
      }
      else if (token) {
        parts.push({ text: token, bold })
      }
      return parts
    }, [])
}

const initials = (name = '') => plainName(name)
  .trim()
  .split(/\s+/)
  .map(part => part[0])
  .join('')
  .slice(0, 2)
  .toUpperCase()

const affiliations = author => Array.isArray(author.affiliation)
  ? author.affiliation
  : [author.affiliation].filter(Boolean)

const resolveAssetUrl = (source = '') => source.startsWith('/')
  ? `${import.meta.env.BASE_URL}${source.slice(1)}`
  : source
</script>

<template>
  <div
    v-if="authors.length"
    class="author-profiles"
    :data-layout="resolvedLayout"
    :data-outer-align="resolvedOuterAlign"
    :data-inner-align="resolvedInnerAlign"
    :style="componentStyle"
  >
    <article
      v-for="(author, index) in authors"
      :key="author.id ?? author.name ?? index"
      class="author-profile"
    >
      <div class="author-photo">
        <img
          v-if="author.image"
          :src="resolveAssetUrl(author.image)"
          :alt="author.alt ?? `${plainName(author.name) || 'Author'} profile photo`"
          :style="{ objectPosition: author.position ?? '50% 50%' }"
        >
        <span v-else aria-hidden="true">{{ initials(author.name) }}</span>
      </div>

      <div class="author-meta">
        <div v-if="author.name" class="author-name">
          <template
            v-for="(part, partIndex) in nameParts(author.name)"
            :key="partIndex"
          >
            <strong v-if="part.bold">{{ part.text }}</strong>
            <span v-else>{{ part.text }}</span>
          </template>
        </div>
        <div
          v-for="(item, affiliationIndex) in affiliations(author)"
          :key="affiliationIndex"
          class="author-affiliation"
        >
          {{ item }}
        </div>
      </div>
    </article>
  </div>
</template>

<style scoped>
.author-profiles {
  width: 100%;
  margin-top: var(--author-margin-top);
  color: #111;
}

.author-profiles[data-layout='row'] {
  display: flex;
  align-items: flex-start;
  justify-content: center;
  gap: var(--author-gap);
}

.author-profiles[data-layout='row'][data-outer-align='left'] {
  justify-content: flex-start;
}

.author-profiles[data-layout='row'][data-outer-align='right'] {
  justify-content: flex-end;
}

.author-profiles[data-layout='row'] .author-profile {
  width: var(--author-card-width);
  flex: 0 1 var(--author-card-width);
}

.author-profiles[data-layout='grid'] {
  display: grid;
  grid-template-columns: repeat(var(--author-columns), var(--author-card-width));
  justify-content: center;
  gap: var(--author-gap);
}

.author-profiles[data-layout='grid'][data-outer-align='left'] {
  justify-content: start;
}

.author-profiles[data-layout='grid'][data-outer-align='right'] {
  justify-content: end;
}

.author-profiles[data-layout='grid'] .author-profile {
  width: var(--author-card-width);
  min-width: 0;
}

.author-profiles[data-layout='stack'] {
  display: grid;
  max-width: 700px;
  margin-inline: auto;
  gap: var(--author-gap);
}

.author-profiles[data-layout='stack'][data-outer-align='left'] {
  margin-inline: 0 auto;
}

.author-profiles[data-layout='stack'][data-outer-align='right'] {
  margin-inline: auto 0;
}

.author-profile {
  display: flex;
  min-width: 0;
  align-items: center;
  flex-direction: column;
  text-align: var(--author-text-align);
}

.author-profiles[data-inner-align='left'] .author-profile {
  align-items: flex-start;
}

.author-profiles[data-inner-align='right'] .author-profile {
  align-items: flex-end;
}

.author-profiles[data-layout='stack'] .author-profile {
  display: grid;
  grid-template-columns: min(var(--author-image-size), 88px) minmax(0, 1fr);
  gap: 22px;
  text-align: var(--author-text-align);
}

.author-profiles[data-layout='stack'][data-inner-align='center'] .author-meta {
  justify-self: center;
}

.author-profiles[data-layout='stack'][data-inner-align='right'] .author-meta {
  justify-self: end;
}

.author-photo {
  display: grid;
  overflow: hidden;
  width: var(--author-image-size);
  height: var(--author-image-size);
  flex: 0 0 var(--author-image-size);
  place-items: center;
  border-radius: 50%;
  background: #f2f2f2;
  color: #777;
  font-size: calc(var(--author-image-size) * 0.24);
  font-weight: 600;
}

.author-profiles[data-layout='grid'] .author-photo {
  max-width: 100%;
  max-height: 100%;
  margin-inline: auto;
}

.author-profiles[data-layout='grid'][data-inner-align='left'] .author-photo {
  margin-inline: 0 auto;
}

.author-profiles[data-layout='grid'][data-inner-align='right'] .author-photo {
  margin-inline: auto 0;
}

.author-profiles[data-layout='stack'] .author-photo {
  width: min(var(--author-image-size), 88px);
  height: min(var(--author-image-size), 88px);
}

.author-photo img {
  width: 100%;
  height: 100%;
  object-fit: cover;
}

.author-meta {
  min-width: 0;
  margin-top: 15px;
}

.author-profiles[data-layout='stack'] .author-meta {
  margin-top: 0;
}

.author-name {
  overflow-wrap: anywhere;
  font-size: var(--author-name-size);
  font-weight: 400;
  line-height: 1.2;
}

.author-name strong {
  font-weight: 600;
}

.author-affiliation {
  margin-top: 4px;
  overflow-wrap: anywhere;
  font-size: var(--author-affiliation-size);
  font-weight: 400;
  line-height: 1.3;
}
</style>
