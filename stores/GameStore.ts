import { defineStore } from 'pinia';
import { onMounted } from '@vue/runtime-core';

export const GameStore = defineStore('game', () => {

  const players = ['X','O'];
  const wins = [
    [1,2,3],
    [4,5,6],
    [7,8,9],
    [1,4,7],
    [2,5,8],
    [3,6,9],
    [1,5,9],
    [3,5,7]
  ];
  const currentPlayer: Ref<string|null> = ref(null);
  const winner: Ref<string|null> = ref(null);
  const noWinner: Ref<boolean> = ref(false);
  const cells: Ref<Array<{
    number: number,
    player: string
  }>> = ref([]);
  const winningLine: Ref<Array<number>> = ref([]);
  const scores: Ref<{ [key:string]: number }> = ref({
    X: 0,
    O: 0
  });

  const setPlayerScoreInLocalStorage = ({ player, score = 0 }: { player: string, score?: number }) => {
    localStorage.setItem(`TTT-${player}-Score`, String(score));
  }

  const getPlayerScoreFromLocalStorage = ({ player }: { player: string }) => {
    return localStorage.getItem(`TTT-${player}-Score`) ?? 0;
  }

  const initScores = () => {
    for (const player of players) {
      scores.value[player] = Number(getPlayerScoreFromLocalStorage({ player }));
    }
  }

  onMounted(() => {
    initScores();
  });

  const resetScores = () => {
    for (const player of players) {
      setPlayerScoreInLocalStorage({
        player
      });
    }
    initScores();
  }

  const checkWin = () => {
    const playerCells = cells.value.filter(({ number, player }: { number: number, player: string }) => {
      return player === currentPlayer.value;
    }).map(({ number, player }: { number: number, player: string }) => {
      return number;
    });
    const win = wins.find(w => {
      return w.every(cell => {
        return playerCells.includes(cell);
      })
    }) ?? null;
    if (win) {
      winningLine.value = win;
      winner.value = currentPlayer.value;
      // @ts-ignore
      scores.value[currentPlayer.value]++
      // localStorage.setItem(`TTT-${currentPlayer.value}-Score`, scores.value[currentPlayer.value]);
      setPlayerScoreInLocalStorage({
      // @ts-ignore
        player: currentPlayer.value,
      // @ts-ignore
        score: scores.value[currentPlayer.value]
      })
      currentPlayer.value = null;
    } else {
      if (cells.value.length === 9) {
        noWinner.value = true;
      }
    }
  }

  const addCell = (cell: number) => {
    const cellNotEmpty = cells.value.find(({ number, player }: { number: number, player: string }) => {
      return cell === number;
    });
    if (!currentPlayer.value || !!winner.value || !!cellNotEmpty) {
      return
    }
    cells.value.push({
      number: cell,
      player: currentPlayer.value ?? ''
    });
    checkWin();
    currentPlayer.value = currentPlayer.value === 'X' ? 'O' : 'X';
  }

  const firstPlayer = () => {
    currentPlayer.value = players[Math.floor(Math.random()*players.length)];
  }

  const startGame = () => {
    firstPlayer();
    cells.value = [];
    winningLine.value = [];
    winner.value = null;
  }

  return {
    currentPlayer,
    winner,
    noWinner,
    cells,
    winningLine,
    scores,
    resetScores,
    startGame,
    addCell,
    firstPlayer
  }

});
