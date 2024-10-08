export interface Player {
    id: number
    name: string
    isAlive: boolean
    kills: number
  }
  
  export interface Mission {
    id: number
    description: string
  }
  
  export interface Assignment {
    id: number
    playerId: number
    targetId: number
    missionId: number
    completed: boolean
  }
  
  export interface Kill {
    killerId: number
    victimId: number
    missionId: number
    failureMessage?: string
  }