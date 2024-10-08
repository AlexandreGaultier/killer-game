<template>
  <div class="podium-view">
    <h1>Résultats du jeu</h1>
    <div class="podium">
      <div v-for="(player, index) in topThree" :key="player.id" :class="['podium-step', `place-${index + 1}`]">
        <div class="player-info">
          <h2>{{ player.name }}</h2>
          <p class="kills">{{ player.kills }} kills</p>
        </div>
      </div>
    </div>
    <div class="other-players" v-if="otherPlayers.length > 0">
      <h3>Autres joueurs</h3>
      <div class="player-chips">
        <div v-for="player in otherPlayers" :key="player.id" class="player-chip">
          {{ player.name }} ({{ player.kills }})
        </div>
      </div>
    </div>
    <div class="winner-kills" v-if="topThree.length > 0">
      <h3>Kills du gagnant</h3>
      <ul class="kill-list">
        <li v-for="kill in getPlayerKills(topThree[0].id)" :key="kill.killerId">
          <span class="victim">{{ getPlayerName(kill.victimId) }}</span>
          <span class="mission">{{ getMissionDescription(kill.missionId) }}</span>
        </li>
      </ul>
    </div>
  </div>
</template>

<script lang="ts">
import { computed } from 'vue'
import { useGameStore } from '../stores/gameStore'

export default {
  setup() {
    const gameStore = useGameStore()

    const topThree = computed(() => {
      return [...gameStore.players]
        .sort((a, b) => b.kills - a.kills)
        .slice(0, 3)
    })

    const otherPlayers = computed(() => {
      return [...gameStore.players]
        .sort((a, b) => b.kills - a.kills)
        .slice(3)
    })

    const getPlayerKills = (playerId: number) => {
      return gameStore.kills.filter(kill => kill.killerId === playerId)
    }

    const getMissionDescription = (missionId: number) => {
      const mission = gameStore.missions.find(m => m.id === missionId)
      return mission ? mission.description : 'Mission inconnue'
    }

    const getPlayerName = (playerId: number) => {
      const player = gameStore.players.find(p => p.id === playerId)
      return player ? player.name : 'Joueur inconnu'
    }

    return {
      topThree,
      otherPlayers,
      getPlayerKills,
      getMissionDescription,
      getPlayerName,
    }
  }
}
</script>

<style scoped>
.podium-view {
  text-align: center;
  max-width: 800px;
  margin: 0 auto;
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

.podium {
  display: flex;
  justify-content: center;
  align-items: flex-end;
  height: 300px;
  margin-bottom: 40px;
}

.podium-step {
  width: 30%;
  margin: 0 10px;
  background: linear-gradient(to bottom, rgba(255,255,255,0.1), rgba(255,255,255,0.05));
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.3s ease;
}

.podium-step:hover {
  transform: translateY(-10px);
}

.place-1 { height: 100%; background-color: rgba(255, 215, 0, 0.3); }
.place-2 { height: 80%; background-color: rgba(192, 192, 192, 0.3); }
.place-3 { height: 60%; background-color: rgba(205, 127, 50, 0.3); }

.player-info {
  padding: 20px;
  background-color: rgba(0, 0, 0, 0.7);
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
}

.player-info h2 {
  margin: 0;
  font-size: 1.5em;
  color: #fff;
}

.kills {
  font-size: 1.2em;
  color: #ffd700;
}

.other-players {
  margin-top: 40px;
}

.player-chips {
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  gap: 10px;
  margin-top: 20px;
}

.player-chip {
  background-color: rgba(255, 255, 255, 0.1);
  border-radius: 20px;
  padding: 5px 15px;
  font-size: 0.9em;
  transition: all 0.3s ease;
}

.player-chip:hover {
  background-color: rgba(255, 255, 255, 0.2);
  transform: scale(1.05);
}

.winner-kills {
  margin-top: 40px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 10px;
  padding: 20px;
}

.kill-list {
  list-style-type: none;
  padding: 0;
  text-align: left;
}

.kill-list li {
  margin-bottom: 10px;
  padding: 10px;
  background-color: rgba(255, 255, 255, 0.05);
  border-radius: 5px;
  display: flex;
  justify-content: space-between;
  align-items: center;
  transition: all 0.3s ease;
}

.kill-list li:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.02);
}

.victim {
  font-weight: bold;
  color: #ff4136;
}

.mission {
  font-style: italic;
  color: #7fdbff;
}
</style>