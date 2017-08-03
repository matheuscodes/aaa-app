export default class Round {
  constructor(data){
    this.ends = data.ends;
    this.index = data.index;
    this.order = data.index + 1;
  }
}
