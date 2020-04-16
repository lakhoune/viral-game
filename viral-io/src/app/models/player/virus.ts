import {role} from "./role";
import {virusTarget} from "../targetData/virusTarget";
import {player} from "./player";
export class virus extends role {
    matrix:virusTarget[];
    
constructor(player:player,targets:virusTarget[]){
    super(player);
    this.matrix=targets;
    }
}