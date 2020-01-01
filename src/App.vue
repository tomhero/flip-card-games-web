<template>
  <div id="app">
    <!-- <img alt="Vue logo" src="./assets/logo.png"> -->
    <score-board :current-score="currentTry" :player-best-score="playerBest" :global-best-score="globalBest"></score-board>
    <game-board @player-has-change-score="setScore" @end-game="measurePlayerScore"></game-board>
  </div>
</template>

<script>
import ScoreBoard from './components/ScoreBoard'
import GameBoard from './components/GameBoard'

import { getGlobelHighestScore, sendPlayerHighScore } from './service/gameScoreService'

export default {
  name: 'app',
  data() {
    return {
      currentTry: 0,
      playerBest: undefined,
      globalBest: undefined
    }
  },
  components: {
    ScoreBoard,
    GameBoard
  },
  async beforeMount () {
    const { data }  = await getGlobelHighestScore()
    this.globalBest = data.globalHighscore
    
    const storedBestScore = localStorage.getItem('playerBestScore')
    if (!isNaN(storedBestScore) && storedBestScore >= data.globalHighscore) {
      this.playerBest = +storedBestScore
    }
  },
  methods: {
    setScore (clickAmount) {
      this.currentTry = clickAmount
    },
    async measurePlayerScore (finalScore) {
      if (!this.playerBest || this.playerBest === 0 || finalScore < this.playerBest) {
         localStorage.setItem('playerBestScore', finalScore)
         this.playerBest = finalScore
      }
      // TODO : send new score to API
      const responseJson = await sendPlayerHighScore(finalScore)
      this.globalBest = responseJson.globalHighscore
    }
  }
}
</script>

<style lang="scss">
// Import a Google Font
@import url('https://fonts.googleapis.com/css?family=Comfortaa|Open+Sans&display=swap');

#app {
  font-family: 'Comfortaa', cursive;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
}

@for $i from 1 through 20 {
  .bra-#{$i} {
    border-radius: #{$i + 2}px;
  }

  .mx-#{$i} {
    margin-left: #{$i + 2}px !important;
    margin-right: #{$i + 2}px !important;
  }

  .my-#{$i} {
    margin-top: #{$i + 2}px !important;
    margin-bottom: #{$i + 2}px !important;
  }

}
</style>
