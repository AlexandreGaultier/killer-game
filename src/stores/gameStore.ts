import { defineStore } from 'pinia'
import { Player, Mission, Assignment, Kill } from '../types'
import defaultMissions from '../data/default-missions.json'

const defaultPlayers = [
  { name: "Alex", isAlive: true, kills: 0 },
  { name: "Eline", isAlive: true, kills: 0 },
  { name: "Corentin", isAlive: true, kills: 0 },
  { name: "Maxime", isAlive: true, kills: 0 },
  { name: "Félix", isAlive: true, kills: 0 }
]

export const useGameStore = defineStore('game', {
  state: () => ({
    players: [] as Player[],
    missions: [] as Mission[],
    assignments: [] as Assignment[],
    kills: [] as Kill[],
  }),
  actions: {
    addPlayer(name: string) {
      const id = Math.max(0, ...this.players.map(p => p.id)) + 1
      this.players.push({ id, name, isAlive: true, kills: 0 })
      this.saveToLocalStorage()
    },

    removePlayer(playerId: number) {
      this.players = this.players.filter(p => p.id !== playerId)
      this.assignments = this.assignments.filter(a => a.playerId !== playerId && a.targetId !== playerId)
      this.saveToLocalStorage()
    },

    addMission(description: string) {
      const id = Math.max(0, ...this.missions.map(m => m.id)) + 1
      this.missions.push({ id, description })
      this.saveToLocalStorage()
    },

    deleteMission(missionId: number) {
      this.missions = this.missions.filter(m => m.id !== missionId)
      this.saveToLocalStorage()
    },

    assignMissions() {
      if (this.missions.length === 0) {
        console.warn("Aucune mission n'est disponible. Chargement des missions par défaut.")
        this.loadDefaultMissions()
      }

      const alivePlayers = this.players.filter(p => p.isAlive)
      const shuffledPlayers = [...alivePlayers].sort(() => Math.random() - 0.5)
      
      this.assignments = shuffledPlayers.map((player, index) => {
        const target = shuffledPlayers[(index + 1) % shuffledPlayers.length]
        const mission = this.missions[Math.floor(Math.random() * this.missions.length)]
        return {
          id: index,
          playerId: player.id,
          targetId: target.id,
          missionId: mission.id,
          completed: false
        }
      })
      
      this.saveToLocalStorage()
    },

    completeKill(assignmentId: number) {
      const assignment = this.assignments.find(a => a.id === assignmentId)
      if (!assignment) return

      const killer = this.players.find(p => p.id === assignment.playerId)
      const victim = this.players.find(p => p.id === assignment.targetId)
      
      if (!killer || !victim) return

      // Marquer la victime comme morte
      victim.isAlive = false
      killer.kills++

      // Enregistrer le kill
      this.kills.push({ 
        killerId: killer.id, 
        victimId: victim.id, 
        missionId: assignment.missionId 
      })

      // Trouver l'assignation de la victime
      const victimAssignment = this.assignments.find(a => a.playerId === victim.id)

      // Supprimer l'assignation actuelle et toutes les assignations de la victime
      this.assignments = this.assignments.filter(a => a.id !== assignment.id && a.playerId !== victim.id)

      this.saveToLocalStorage()

      // Créer une nouvelle assignation pour le tueur
      if (victimAssignment) {
        this.assignments.push({
          id: Math.max(0, ...this.assignments.map(a => a.id)) + 1,
          playerId: killer.id,
          targetId: victimAssignment.targetId,
          missionId: this.getRandomMissionId(),
          completed: false
        })
      }

      this.saveToLocalStorage()
    },

    rejectMission(assignmentId: number) {
      const assignment: Assignment | undefined = this.assignments.find(a => a.id === assignmentId)
      if (!assignment) return

      // Créer une nouvelle assignation avec la même cible mais une nouvelle mission
      const newAssignment = {
        id: Math.max(0, ...this.assignments.map(a => a.id)) + 1,
        playerId: assignment.playerId,
        targetId: assignment.targetId,
        missionId: this.getRandomMissionId(),
        completed: false
      }

      this.saveToLocalStorage()

      // Remplacer l'ancienne assignation par la nouvelle
      this.assignments = this.assignments.map(a => 
        a.id === assignmentId ? newAssignment : a
      )

      this.saveToLocalStorage()
    },

    getRandomMissionId() {
      return this.missions[Math.floor(Math.random() * this.missions.length)].id
    },

    loadDefaultMissions() {
      this.missions = defaultMissions.missions.map((mission, index) => ({
        id: index + 1,
        description: mission.description
      }))
      this.saveToLocalStorage()
    },

    loadDefaultPlayers() {
      this.players = defaultPlayers.map((player, index) => ({
        id: index + 1,
        ...player
      }))
      this.saveToLocalStorage()
    },

    resetGame() {
      this.loadDefaultPlayers()
      this.loadDefaultMissions()
      this.assignments = []
      this.kills = []
      this.saveToLocalStorage()
    },

    saveToLocalStorage() {
      localStorage.setItem('killerGame', JSON.stringify({
        players: this.players,
        missions: this.missions,
        assignments: this.assignments,
        kills: this.kills,
      }))
    },

    loadFromLocalStorage() {
      const data = localStorage.getItem('killerGame')
      if (data) {
        const parsed = JSON.parse(data)
        this.players = parsed.players
        this.missions = parsed.missions
        this.assignments = parsed.assignments
        this.kills = parsed.kills
      } else {
        this.loadDefaultMissions()
        this.loadDefaultPlayers()
      }
    },
  },
  getters: {
    alivePlayers: (state) => state.players.filter(p => p.isAlive),
    topKillers: (state) => {
      return [...state.players].sort((a, b) => b.kills - a.kills).slice(0, 3)
    },
    pendingAssignments: (state) => state.assignments.filter(a => state.players.find(p => p.id === a.playerId)?.isAlive),
  }
})