<script lang="ts" setup>
	import { GameStore } from '~/stores/GameStore';
</script>

<template>
	<div class="grid grid-cols-3 grid-rows-3 gap-[0.5rem]">
		<Cell
			v-for="(cell, index) in 9"
			:key="index"
			:number="index+1"
		/>
	</div>
</template>
