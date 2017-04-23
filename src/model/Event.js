export default class Event {

    constructor(event) {

      if(typeof event !== 'undefined'){
        Object.keys(event).forEach(key => this[key] = event[key], this);
        this.date = new Date(event.date);
      }

    }

    get eventName(){
      if(typeof this.name !== 'undefined'){
        return this.name;
      } else {
        return this.series.name;
      }
    }
}
