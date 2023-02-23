<script lang="ts" setup>
const { isMobile } = useDevice();

const buttonClasses = computed(() => {
	return {
		'hover': !isMobile
	}
});
</script>

<template>
	<button
		class="bg-orange-100 rounded-reg px-[1rem] py-[0.5rem] transition-reg"
		:class="buttonClasses"
	><slot /></button>
</template>
