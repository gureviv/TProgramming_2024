import { Player } from '../players/playerClass';
import { Archer } from '../players/archerClass';
import { Wizard } from '../players/wizardClass';
import { Warrior } from '../players/warriorClass';

import { getRandom } from './getRandomNumber';

export class Game {
  _allWarriors: Warrior[];
  _allArchers: Archer[];
  _allWizards: Wizard[];
  constructor(allWarriors: Warrior[], allArchers: Archer[], AllWizards: Wizard[]) {
    this._allWarriors = allWarriors;
    this._allArchers = allArchers;
    this._allWizards = AllWizards;
  }
  public oneRound(Char1: Player, Char2: Player, numberOfRound: number): void {
    console.log(`Начался раунд ${numberOfRound}`);
    const whoIsFirst = getRandom(1, 2);

    if (whoIsFirst == 1) {
      Char1.getDamagedByPassive();
      Char2.getDamagedByPassive();
      Char1.attack(Char2);
      Char2.checkLiveStatus();
      Char2.attack(Char1);
      Char1.checkLiveStatus();
    } else {
      Char1.getDamagedByPassive();
      Char2.getDamagedByPassive();
      Char2.attack(Char1);
      Char1.checkLiveStatus();
      Char1.attack(Char2);
      Char2.checkLiveStatus();
    }
    console.log(Char1.playerRoundResults());
    console.log(Char2.playerRoundResults());
    console.log(`Закончился раунд ${numberOfRound}`);
  }
  public allRoundsOfFight(Char1: Player, Char2: Player): [Player, Player] {
    const oldHp1 = Char1._healthPoints;
    const oldHp2 = Char1._healthPoints;
    Char1._kdlist = [0,0];
    Char2._kdlist = [0,0];
    let numberOfRounds = 1;
    while (Char1._alive == true && Char2._alive == true) {
      this.oneRound(Char1, Char2, numberOfRounds);
      numberOfRounds++;
    }
    if (Char1._alive) {
      // return(Char1._name)
      Char1._healthPoints = oldHp1;
      return [Char1, Char2];
    } else {
      // return(Char2._name)
      Char2._healthPoints = oldHp2;
      return [Char2, Char1];
    }
  }

  public allGame() {
    let currentTour = [];
    let nextTour = [];
    let tourCounter = 0;
    let winner: Player;
    let loser: Player;
    for (let i = 0; i < this._allWarriors.length; i++) {
      currentTour.push(this._allWarriors[i]);
    }
    for (let i = 0; i < this._allArchers.length; i++) {
      currentTour.push(this._allArchers[i]);
    }
    for (let i = 0; i < this._allWizards.length; i++) {
      currentTour.push(this._allWizards[i]);
    }
    while (currentTour.length !== 1) {
      const Char1 = currentTour[getRandom(0, currentTour.length - 1)];
      const Char2 = currentTour[getRandom(0, currentTour.length - 1)];
      if (Char1 !== Char2) {
        [winner, loser] = this.allRoundsOfFight(Char1, Char2);
        nextTour.push(winner);
        currentTour = currentTour.filter(char => char !== loser);
        currentTour = currentTour.filter(char => char !== winner);
        // nextTour.push(winner);
      }
      if (currentTour.length === 0) {
        tourCounter++;
        console.log(`=======КОНЕЦ ${tourCounter} ТУРА=======`);
        currentTour = [...nextTour];
        nextTour = [];
      }
    }
    // console.log();
    // console.log('финальный бой!');
    console.log();
    // [winner, loser] = this.allRoundsOfFight(currentTour[0], nextTour[0]);
    console.log(`🏆Победителем битвы стал ${winner._rpgClass}, известный как ${winner._name}.🏆`);
  }
}
