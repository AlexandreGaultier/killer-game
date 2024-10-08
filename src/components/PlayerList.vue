<template>
  <div class="player-list">
    <h2>Liste des joueurs</h2>
    <div class="player-chips">
      <div 
        v-for="player in players" 
        :key="player.id" 
        class="player-chip" 
        :class="{ 'player-dead': !player.isAlive }"
        @click="removePlayer(player.id)"
      >
        {{ player.name }}
        <span class="kill-count" v-if="player.kills > 0">{{ player.kills }}</span>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

export default {
  setup() {
    const gameStore = useGameStore()
    const players = computed(() => gameStore.players)

    const removePlayer = (playerId: number) => {
      gameStore.removePlayer(playerId)
    }

    return { players, removePlayer }
  }
}
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

.player-chip {
  background-color: rgba(113, 178, 128, 0.2);
  border: 1px solid rgba(113, 178, 128, 0.5);
  color: #ffffff;
  padding: 8px 16px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.player-chip:hover {
  background-color: rgba(113, 178, 128, 0.3);
  transform: translateY(-2px);
}

.player-dead {
  background-color: rgba(255, 99, 71, 0.2);
  border-color: rgba(255, 99, 71, 0.5);
  text-decoration: line-through;
  opacity: 0.7;
}

.kill-count {
  background-color: rgba(255, 255, 255, 0.2);
  color: #ffffff;
  border-radius: 50%;
  width: 24px;
  height: 24px;
  display: inline-flex;
  justify-content: center;
  align-items: center;
  font-size: 1em;
  font-weight: bold;
  margin-left: 8px;
}
</style>
