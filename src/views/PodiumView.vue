<template>
  <div v-if="hasKills" class="podium-view">
    <h1>Résultats du jeu</h1>
    <div class="podium">
      <div 
        v-for="(player, index) in topThree" 
        :key="player.id" 
        :class="['podium-step', `place-${index + 1}`]"
      >
        <div class="player-info">
          <h2>{{ player.name }}</h2>
          <p class="kills">{{ player.kills }} kills</p>
        </div>
      </div>
    </div>
    <div v-if="otherPlayers.length > 0" class="other-players">
      <h3>Autres joueurs</h3>
      <div class="player-chips">
        <div 
          v-for="player in otherPlayers" 
          :key="player.id" 
          class="player-chip"
        >
          {{ player.name }} ({{ player.kills }})
        </div>
      </div>
    </div>
    <div v-if="winner" class="winner-kills">
      <h3>Kills du gagnant</h3>
      <ul class="kill-list">
        <li v-for="kill in winnerKills" :key="kill.killerId">
          <span class="victim">{{ getPlayerName(kill.victimId) }}</span>
          <span class="mission">{{ getMissionDescription(kill.missionId) }}</span>
        </li>
      </ul>
    </div>
  </div>
  <div v-else class="no-kills-message">
    <h2>Pas encore de résultats</h2>
    <p>Le jeu n'a pas encore commencé ou aucun kill n'a été enregistré.</p>
  </div>
</template>

<script lang="ts">
import { computed, defineComponent } from 'vue'
import { useGameStore } from '../stores/gameStore'
// import type { Player, Kill } from '../types'

export default defineComponent({
  name: 'PodiumView',
  setup() {
    const gameStore = useGameStore()

    const hasKills = computed(() => gameStore.kills.length > 0)

    const sortedPlayers = computed(() => 
      [...gameStore.players].sort((a, b) => b.kills - a.kills)
    )

    const topThree = computed(() => sortedPlayers.value.slice(0, 3))
    const otherPlayers = computed(() => sortedPlayers.value.slice(3))
    const winner = computed(() => topThree.value[0])

    const winnerKills = computed(() => 
      winner.value ? gameStore.kills.filter(kill => kill.killerId === winner.value.id) : []
    )

    const getPlayerName = (playerId: number): string => 
      gameStore.players.find(p => p.id === playerId)?.name ?? 'Joueur inconnu'

    const getMissionDescription = (missionId: number): string => 
      gameStore.missions.find(m => m.id === missionId)?.description ?? 'Mission inconnue'

    return {
      hasKills,
      topThree,
      otherPlayers,
      winner,
      winnerKills,
      getPlayerName,
      getMissionDescription,
    }
  }
})
</script>

<style scoped>
.podium-view {
  text-align: center;
  max-width: 1200px;
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
  background: linear-gradient(to bottom, rgba(255,255,255,0.2), rgba(255,255,255,0.1));
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  display: flex;
  flex-direction: column;
  justify-content: flex-end;
  transition: all 0.3s ease;
  box-shadow: 0 0 15px rgba(255, 255, 255, 0.1);
}

.podium-step:hover {
  transform: translateY(-10px);
  box-shadow: 0 0 20px rgba(255, 255, 255, 0.2);
}

.place-1 { 
  height: 100%; 
  background: linear-gradient(to bottom, rgba(255, 215, 0, 1), rgba(255, 215, 0, 0.6));
}
.place-2 { 
  height: 80%; 
  background: linear-gradient(to bottom, rgba(192, 192, 192, 1), rgba(192, 192, 192, 0.6));
}
.place-3 { 
  height: 60%; 
  background: linear-gradient(to bottom, rgba(205, 127, 50, 1), rgba(205, 127, 50, 0.6));
}

.player-info {
  padding: 20px;
  border-top-left-radius: 10px;
  border-top-right-radius: 10px;
  text-shadow: 0 0 5px rgba(255, 255, 255, 0.5);
}

.player-info h2 {
  margin: 0;
  font-size: 1.5em;
  color: #fff;
  text-shadow: 0 0 15px rgb(201, 201, 201);
}

.kills {
  font-size: 1.2em;
  color: #fff;
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
  flex-direction: column;  /* Changé de row à column */
  align-items: flex-start; /* Aligne les éléments à gauche */
  transition: all 0.3s ease;
}

.kill-list li:hover {
  background-color: rgba(255, 255, 255, 0.1);
  transform: scale(1.02);
}

.victim {
  font-weight: bold;
  color: var(--accent-red);  /* Utilisation de la nouvelle variable de couleur */
  margin-bottom: 5px;  /* Ajoute un espace sous le nom de la victime */
}

.mission {
  font-style: italic;
  color: #fff;
}

.no-kills-message {
  text-align: center;
  padding: 40px;
  background-color: rgba(0, 0, 0, 0.6);
  border-radius: 10px;
  box-shadow: 0 0 20px rgba(0, 0, 0, 0.5);
}

@media (max-width: 768px) {
  .podium-view {
    padding: 5px;
  }

  h1 {
    font-size: 1.8em;
  }

  .podium {
    flex-direction: column-reverse;
    height: auto;
    margin-bottom: 20px;
  }

  .podium-step {
    width: 100%;
    height: auto !important;
    margin: 10px 0;
    border-radius: 10px;
  }

  .place-1 { order: 2; }
  .place-2 { order: 1; }
  .place-3 { order: 0; }

  .player-info {
    padding: 15px;
    border-radius: 10px;
  }

  .player-info h2 {
    font-size: 1.2em;
  }

  .kills {
    font-size: 1em;
  }

  .other-players {
    margin-top: 20px;
  }

  .player-chips {
    flex-direction: column;
    align-items: center;
  }

  .player-chip {
    width: 80%;
    margin-bottom: 10px;
  }

  .winner-kills {
    margin-top: 20px;
  }

  .victim {
    margin-bottom: 5px;
  }

  .mission {
    font-size: 0.9em;
  }
}
</style>