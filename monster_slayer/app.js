new Vue({
  el: '#app',
  data: {
    playerHealth: 0,
    monsterHealth: 0,
    gameIsRunning: false,
    playerTurn: false,
    turns: [],
  },
  methods: {
    startGame: function() {
      this.gameIsRunning = true;
      this.playerTurn = true;
      this.playerHealth = 100;
      this.monsterHealth = 100;
      this.turns = [];
      this.turns.unshift({
        isPlayer: false,
        text: 'I am The Monster! Fight me!'
      });
    },

    regularAttack: function() {
        this.playerTurn = false;
        var damage = this.calculateDamage(3,10);
        this.monsterHealth -= damage;
        this.turns.unshift({
          isPlayer: true,
          text: 'Player hits Monster for ' + damage
        });
        if (this.checkWin()) {
          return;
        }
        this.monsterAttacks();
    },

    specialAttack: function() {
      this.playerTurn = false;
      var damage = this.calculateDamage(10,20);
      this.monsterHealth -= damage;
      this.turns.unshift({
        isPlayer: true,
        text: 'Player hits Monster hard for ' + damage
      });
      if (this.checkWin()) {
        return;
      }
      this.monsterAttacks();
    },

    usePotion: function() {
      this.playerTurn = false;
      if (this.playerHealth <= 90){
        this.playerHealth += 10;
      }
      else {
        this.playerHealth = 100;
      }
      this.turns.unshift({
        isPlayer: true,
        text: 'Player uses Potion and recovers 10 HP'
      });
      this.monsterAttacks();
    },

    runAway: function() {
      this.playerTurn = false;
      this.gameIsRunning = false;
    },

    monsterAttacks: function() {
      var vm = this;
      setTimeout(function(){
        var damage = vm.calculateDamage(5,12);

        vm.turns.unshift({
          isPlayer: false,
          text: 'Monster hits Player for ' + damage
        });

        vm.playerHealth -= damage;

        vm.checkWin();

        setTimeout(function(){
          vm.playerTurn = true;
        }, 1500);

      } , 1500);


    },

    calculateDamage: function(minimum, maximum) {
      return Math.max(Math.floor(Math.random() * maximum) + 1, minimum)
    },

    checkWin: function() {
      if (this.monsterHealth <= 0) {
        if (confirm('You won! New game?')) {
          this.startGame();
        }
        else {
          this.gameIsRunning = false;
        }
        return true;
      }
      else if (this.playerHealth <= 0) {
        if (confirm('You lost! New game?')) {
          this.startGame();
        }
        else{
          this.gameIsRunning = false;
        }
        return false;
      }
    },
  }
});
