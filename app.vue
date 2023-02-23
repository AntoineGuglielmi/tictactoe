<script lang="ts" setup>
	import { GameStore } from '~/stores/GameStore';
	import { storeToRefs } from 'pinia';
	const gameStore = GameStore();
	const {
		currentPlayer,
	} = storeToRefs(gameStore);
	const {
		startGame
	} = gameStore;

	const buttonText = computed(() => {
		if (!currentPlayer.value) {
			return 'Start';
		}
		return 'Restart';
	});

	const {
		isMobile
	} = useDevice();

	console.log({
		isMobile
	});

	const computedClasses = computed(() => {
		return {
			'shadow-container': !isMobile
		}
	});
</script>

<template>
  <div class="min-h-screen flex items-center justify-center">
		<div
			class="flex flex-col items-center gap-[1.5rem] p-[3rem] rounded-reg"
			:class="computedClasses"
		>

			<h1 class="text-[2rem]">TicTacToe</h1>
			<Prompter />
			<Board />
			<Scores />
			<Button
				@click.prevent="startGame"
			>{{ buttonText }}</Button>

		</div>
  </div>
</template>
