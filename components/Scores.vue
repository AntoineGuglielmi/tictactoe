<script lang="ts" setup>
import { GameStore } from '~/stores/GameStore';
import { storeToRefs } from 'pinia';
const gameStore = GameStore();

const {
	scores,
} = storeToRefs(gameStore);

const {
	resetScores
} = gameStore;

const displayResetScoreButton = computed(() => {
	return Object.values(scores.value).reduce((cum, item) => {
		return cum + item;
	}, 0) > 0;
});
</script>

<template>
	<div class="grid grid-cols-3 gap-[1rem] w-full">
		<div
			v-for="(score, player, index) in scores"
			:key="index"
			class="col-span-1 grid grid-cols-2 flex items-center justify-center bg-orange-50 rounded-reg overflow-hidden"
		>

			<div
				class="flex items-center justify-center bg-orange-100 self-stretch"
			>
				<Player
					:player="player"
				/>
			</div>
			<div
				class="flex items-center justify-center"
			>
				{{ score }}
			</div>

		</div>
		<div class="col-span-1 text-center flex items-center justify-center">
			<Button @click.prevent="resetScores"><Icon name="akar-icons:arrow-clockwise"/></Button>
		</div>
	</div>
</template>
