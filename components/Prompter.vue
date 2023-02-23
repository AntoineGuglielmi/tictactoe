<script lang="ts" setup>
import { GameStore } from '~/stores/GameStore';
import { storeToRefs } from 'pinia';
const gameStore = GameStore();
const {
	currentPlayer,
	winner,
	noWinner
} = storeToRefs(gameStore);
</script>

<template>
  <p v-if="noWinner">It's a draw!</p>
  <p v-else-if="winner">And the winner is <Player class="relative bottom-[1px]" :player="winner"/>!</p>
  <p v-else-if="currentPlayer">Playing: <Player class="relative bottom-[1px]" :player="currentPlayer"/></p>
  <p v-else>Let's play <Icon name="akar-icons:face-wink"/></p>
</template>
