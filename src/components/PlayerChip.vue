<template>
  <div 
    class="player-chip" 
    :class="{ 'player-dead': !isAlive, 'no-click': !canDelete }"
    @click="canDelete && $emit('click')"
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
    },
    canDelete: {
      type: Boolean,
      default: true
    }
  },
  emits: ['click']
}
</script>

<style scoped>
.player-chip {
  background-color: rgba(var(--accent-blue-rgb), 0.2);
  border: 1px solid rgba(var(--accent-blue-rgb), 0.5);
  color: var(--text-color);
  padding: 8px 16px;
  border-radius: 20px;
  display: inline-flex;
  align-items: center;
  transition: all 0.3s ease;
  cursor: pointer;
}

.player-chip:hover {
  background-color: rgba(var(--accent-red-rgb), 0.2);
  border: 1px solid rgba(var(--accent-red-rgb), 0.5);
  transform: translateY(-2px);
}

.player-dead {
  background-color: rgba(var(--accent-red-rgb), 0.2);
  border-color: rgba(var(--accent-red-rgb), 0.5);
  text-decoration: line-through;
  opacity: 0.7;
}

.kill-count {
  background-color: rgba(var(--text-color-rgb), 0.2);
  color: var(--text-color);
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

.no-click {
  cursor: default;
}

.no-click:hover {
  background-color: rgba(var(--primary-color-rgb), 0.2);
  border: 1px solid rgba(var(--primary-color-rgb), 0.5);
  transform: none;
}
</style>
