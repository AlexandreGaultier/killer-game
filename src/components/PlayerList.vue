<template>
  <div class="player-list">
    <h2>Liste des joueurs</h2>
    <div class="player-chips">
      <PlayerChip
        v-for="player in players"
        :key="player.id"
        :name="player.name"
        :isAlive="player.isAlive"
        :kills="player.kills"
        @click="removePlayer(player.id)"
      />
    </div>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useGameStore } from '../stores/gameStore'
import PlayerChip from './PlayerChip.vue'
import type { Player } from '../types'

export default defineComponent({
  name: 'PlayerList',
  components: { PlayerChip },
  setup() {
    const gameStore = useGameStore()

    const players = computed<Player[]>(() => gameStore.players)

    const removePlayer = (playerId: number): void => {
      gameStore.removePlayer(playerId)
    }

    return { 
      players, 
      removePlayer 
    }
  }
})
</script>

<style scoped>
.player-list {
  margin-bottom: 20px;
}

.player-chips {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}
</style>
