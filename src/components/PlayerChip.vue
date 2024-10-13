<template>
    <div 
      class="player-chip" 
      :class="{ 'player-dead': !isAlive }"
      @click="$emit('click')"
    >
      {{ name }}
      <span class="kill-count" v-if="kills > 0">{{ kills }}</span>
    </div>
  </template>
  
  <script lang="ts">
  export default {
    props: {
      name: {
        type: String,
        required: true
      },
      isAlive: {
        type: Boolean,
        default: true
      },
      kills: {
        type: Number,
        default: 0
      }
    },
    emits: ['click']
  }
  </script>
  
  <style scoped>
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
    background-color: rgba(209, 102, 102, 0.2);
    border: 1px solid rgb(209, 102, 102, 0.5);
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