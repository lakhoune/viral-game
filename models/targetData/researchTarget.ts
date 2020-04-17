import { target } from "./target";
//import {Team} from "../Team";
import { metaTarget } from "./metaTarget";

export class researchTarget extends target {
  vacc: boolean;

  constructor(word: string) {
    super(word);
  }
}
