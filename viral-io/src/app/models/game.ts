import {team} from "./team";
import {round} from "./round/round";
import {score} from "./round/score";
export class game {
    globalScore:score;
    rounds:round[];//type missing
    DNA:team;
    RNA:team;
    
constructor(capacity:number,team_1:team,team_2:team){
        //create capacity/2 rounds and push them to this.rounds
        //1st team to this.DNA
        //2nd team to this.RNA
    }
}
