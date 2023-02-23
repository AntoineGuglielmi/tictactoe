<script lang="ts" setup>
  const props = defineProps<{
		player: string|null
	}>();
</script>

<template>
	<Icon v-if="player === 'X'" name="akar-icons:cross" />
	<Icon v-else-if="player === 'O'" name="akar-icons:circle" />
</template>
