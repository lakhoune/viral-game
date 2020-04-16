import {target} from "./target";
import {team} from "../team";
export class metaTarget extends target {
    team:team;
    
constructor(word:string, team:team){
    super(word);
    }
}