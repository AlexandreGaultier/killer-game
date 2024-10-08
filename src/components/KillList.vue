<template>
  <div class="kill-list card">
    <h2>Récapitulatif des éliminations</h2>
    <table>
      <thead>
        <tr>
          <th>Tueur</th>
          <th>Victime</th>
          <th>Mission</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="kill in kills" :key="kill.killerId">
          <td><div class="player-chip">{{ getPlayerName(kill.killerId) }}</div></td>
          <td><div class="player-chip player-dead">{{ getPlayerName(kill.victimId) }}</div></td>
          <td>{{ getMissionDescription(kill.missionId) }}</td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

export default {
  setup() {
    const gameStore = useGameStore()
    const kills = computed(() => gameStore.kills)

    const getPlayerName = (id: number) => {
      const player = gameStore.players.find(p => p.id === id)
      return player ? player.name : 'Joueur inconnu'
    }

    const getMissionDescription = (id: number) => {
      const mission = gameStore.missions.find(m => m.id === id)
      return mission ? mission.description : 'Mission inconnue'
    }

    return { kills, getPlayerName, getMissionDescription }
  }
}
</script>

<style scoped>
.kill-list {
  margin-top: 20px;
}

table {
  width: 100%;
  border-collapse: collapse;
}

th, td {
  padding: 12px;
  text-align: left;
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
}

th {
  background-color: rgba(0, 0, 0, 0.2);
}

.player-chip {
  display: inline-block;
  background-color: rgba(113, 178, 128, 0.2);
  border: 1px solid rgba(113, 178, 128, 0.5);
  color: #ffffff;
  padding: 4px 8px;
  border-radius: 12px;
}

.player-dead {
  background-color: rgba(255, 99, 71, 0.2);
  border-color: rgba(255, 99, 71, 0.5);
  text-decoration: line-through;
}
</style>
