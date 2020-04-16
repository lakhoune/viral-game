import {role} from "./role";
import {researchTarget} from "../targetData/researchTarget";
import {player} from "./player";

export class researcher extends role {
    matrix:researchTarget[];
    
constructor(player:player,targets:researchTarget[]){
    super(player);
    this.matrix=targets;
    }
}