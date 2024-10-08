# Jeu du Killer

## Description
Ce projet est une application web pour gérer un jeu de "Killer" (aussi connu sous le nom d'Assassin). Les joueurs reçoivent des missions secrètes pour "éliminer" d'autres joueurs, créant ainsi une expérience de jeu immersive et amusante.

## Fonctionnalités

- Gestion des joueurs (ajout, suppression)
- Création et gestion de missions personnalisées
- Attribution automatique de missions aux joueurs
- Interface pour valider ou rejeter les tentatives d'élimination
- Tableau de bord administratif pour suivre le déroulement du jeu
- Système de points et classement des joueurs
- Historique des éliminations
- Podium des joueurs

## Technologies utilisées

- Vue.js 3
- TypeScript
- Pinia pour la gestion d'état
- Vue Router pour la navigation
- LocalStorage pour la persistance des données

## Installation

1. Clonez ce dépôt :
   ```
   git clone https://github.com/AlexandreGaultier/killer-game
   ```

2. Naviguez dans le dossier du projet :
   ```
   cd killer-game
   ```

3. Installez les dépendances :
   ```
   yarn
   ```

4. Lancez le serveur de développement :
   ```
   yarn dev
   ```

5. Ouvrez votre navigateur et accédez à `http://localhost:5173` (ou le port indiqué dans votre terminal).

## Structure du projet

- `src/`
  - `components/` : Composants Vue réutilisables
  - `views/` : Composants Vue pour chaque page
  - `stores/` : Stores Pinia pour la gestion d'état
  - `types/` : Définitions de types TypeScript
  - `data/` : Données statiques (missions par défaut, etc.)
  - `App.vue` : Composant racine de l'application
  - `main.ts` : Point d'entrée de l'application

## Utilisation

1. **Configuration initiale** : Ajoutez des joueurs et des missions dans la vue d'administration.
2. **Démarrage du jeu** : Cliquez sur "Commencer le jeu" pour attribuer les missions aux joueurs.
3. **Jeu en cours** : Les joueurs peuvent voir leurs missions actuelles et signaler les éliminations réussies.
4. **Administration** : Utilisez la vue d'administration pour valider les éliminations et gérer le déroulement du jeu.
5. **Podium** : Voir le podium des joueurs.

## Enjoy !