<script lang="ts" setup>
  const props = defineProps<{
		number: number
	}>();
	import { GameStore } from '~/stores/GameStore';
	import { storeToRefs } from 'pinia';
	const gameStore = GameStore();
	const {
		cells,
		winningLine,
		winner,
		currentPlayer
	} = storeToRefs(gameStore);
	const {
		addCell
	} = gameStore;

	const { isMobile } = useDevice();

	const player = computed(() => {
		return cells.value.find((cell: any) => {
			return cell.number === props.number;
		})?.player ?? null;
	});

	const cellClasses = computed(() => {
		return {
			'bg-orange-100': winningLine.value.includes(props.number),
			'pointer-events-none': !!winner.value || !currentPlayer.value,
			'hover': !isMobile
		}
	});
</script>

<template>
	<div
		@click="addCell(number)"
		:class="cellClasses"
		class="col-span-1 row-span-1 w-[80px] h-[80px] flex items-center justify-center shadow-cell text-[2.5rem] text-gray-500 rounded-reg cursor-pointer transition-reg"
	>
		<Player :player="player"/>
	</div>
</template>
