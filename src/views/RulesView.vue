<template>
    <div class="rules-view">
      <div class="header">
        <h1>Règles du jeu</h1>
        <router-link to="/" class="add-players-button">Ajouter des joueurs</router-link>
      </div>
      <section class="admin-rules">
          <h2>Pour l'administrateur</h2>
        <p>
          En tant qu'administrateur, vous êtes le maître du jeu. Votre rôle est de gérer le déroulement de la partie,
          d'attribuer les missions et les cibles aux joueurs, et de valider ou refuser les éliminations.
        </p>
        <ol>
          <li>Créez la liste des joueurs et des missions possibles.</li>
          <li>Lancez la partie pour attribuer aléatoirement les missions et les cibles.</li>
          <li>Lorsqu'un joueur vous le demande, donnez-lui sa mission et sa cible.</li>
          <li>Quand un joueur prétend avoir accompli sa mission, vérifiez et validez ou refusez l'élimination.</li>
          <li>Continuez jusqu'à ce qu'il ne reste qu'un seul joueur.</li>
        </ol>
      </section>
  
      <section class="player-rules">
        <h2>Pour les joueurs</h2>
        <p>
          Votre objectif est d'éliminer le plus de cibles possible en accomplissant les missions qui vous ont été assignées, tout en évitant
          d'être éliminé par le joueur qui vous a pour cible. Soyez discret, rusé et amusez-vous !
        </p>
        <ol>
          <li>Demandez à l'administrateur votre mission et votre cible.</li>
          <li>Trouvez votre cible et accomplissez votre mission de manière discrète.</li>
          <li>Une fois la mission accomplie, informez l'administrateur pour qu'il valide l'élimination.</li>
          <li>Si l'élimination est validée, vous recevrez une nouvelle cible et une nouvelle mission.</li>
          <li>Répétez les étapes 1 à 4 jusqu'à ce que vous soyez le dernier joueur en lice ou que vous soyez éliminé.</li>
        </ol>
      </section>
  
      <div class="important-note">
        <h3>Note importante</h3>
        <p>
          N'oubliez pas : l'amusement et le fair-play sont les règles les plus importantes ! Respectez les consignes de
          sécurité et les limites fixées par l'administrateur. Bonne chance à tous les joueurs !
        </p>
      </div>
  
      <div class="bottom-button-container">
        <router-link to="/" class="add-players-button">Ajouter des joueurs</router-link>
      </div>
    </div>
  </template>
  
  <script lang="ts">
  import { defineComponent } from 'vue'
  
  export default defineComponent({
    name: 'RulesView'
  })
  </script>
  
  <style scoped>
  .rules-view {
    max-width: 800px;
    margin: 0 auto;
    padding: 20px;
    background-color: rgba(0, 0, 0, 0.6);
    border-radius: 10px;
    color: #fff;
  }
  
  .header {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-bottom: 20px;
  }
  
  h1, h2, h3 {
    color: var(--accent-blue);
  }
  
  .add-players-button {
    font-size: 1em;
    padding: 10px 20px;
    background-color: var(--accent-blue);
    color: var(--text-color);
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.3s ease;
    text-decoration: none;
    display: inline-block;
  }
  
  .add-players-button:hover {
    background-color: rgba(var(--accent-blue-rgb), 0.6);
  }
  
  section {
    margin-bottom: 30px;
  }
  
  ol {
    padding-left: 0;
    list-style-type: none;
    counter-reset: item;
  }
  
  li {
    margin-bottom: 15px;
    display: flex;
    align-items: flex-start;
  }
  
  li::before {
    counter-increment: item;
    content: counter(item);
    background-color: var(--accent-blue);
    color: var(--text-color);
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: 0.9em;
    font-weight: bold;
    padding: 5px;
    margin-right: 10px;
    flex-shrink: 0;
  }
  
  .important-note {
    background-color: rgba(255, 255, 255, 0.1);
    padding: 15px;
    border-radius: 5px;
    margin-top: 30px;
  }
  
  .bottom-button-container {
    display: flex;
    justify-content: center;
    margin-top: 30px;
  }
  
  @media (max-width: 768px) {
    .rules-view {
      padding: 15px;
    }
  
    .header {
      flex-direction: column;
      align-items: flex-start;
    }
  
    h1 {
      font-size: 1.8em;
      margin-bottom: 10px;
    }
  
    .add-players-button {
      font-size: 0.9em;
      padding: 8px 16px;
    }
  
    h2 {
      font-size: 1.5em;
    }
  
    li::before {
      width: 20px;
      height: 20px;
      font-size: 0.8em;
    }
  }
  </style>