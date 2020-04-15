import {target} from "./target";
import {team} from "../team";
import {metaTarget} from "./metaTarget";
export class virusTarget extends target {
    isTeamTarget:boolean;
    
constructor(target:metaTarget,team:team){
    super();
    }
}