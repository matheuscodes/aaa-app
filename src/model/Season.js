import moment from 'moment';

export default class Season {

    constructor(season) {

      if(typeof season !== 'undefined'){
        Object.keys(season).forEach(key => this[key] = season[key], this);
        this.start = new Date(season.start);
        this.end = new Date(season.end);
      }

      if(!Array.isArray(this.goals)){
        this.goals = [];
      }

      if(typeof this.max === 'undefined'){
        this.max = 1;
      }

    }

    changeWeekPlan(index, count){
      if(typeof this.goals[index] === 'undefined'){
        this.goals[index] = {}
      }
      this.goals[index].arrowCount = parseInt(count) || 0;
      if(this.goals[index].arrowCount > this.max){
        this.max = this.goals[index].arrowCount;
      }
    }

    changeWeekTargetShare(index, count){
      if(typeof this.goals[index] === 'undefined'){
        this.goals[index] = {}
      }
      this.goals[index].targetShare = parseInt(count) || 0;
      if(this.goals[index].targetShare > this.max){
        this.max = this.goals[index].targetShare;
      }
    }

    updateWeeks() {
      if (typeof this.start !== 'undefined' &&
          typeof this.end !== 'undefined') {
        const weeks = {};
        const dateStart = moment(this.start).startOf('isoWeek');
        const dateEnd = moment(this.end).startOf('isoWeek');
        for (let i = moment(dateStart); i <= dateEnd; i.add(1,'weeks')) {
          const week1 = moment(i).isoWeek();
          weeks[week1] = {week: week1, arrowCount: 0, targetShare: 0};
          if (typeof this.id !== 'undefined') {
            weeks[week1].seasonId = this.id;
          }
        }
        this.goals.forEach((value) => {
          if (typeof weeks[value.week] !== 'undefined') {
            weeks[value.week] = value;
          }
        });
        this.goals = [];
        for (let i = moment(dateStart); i <= dateEnd; i.add(1,'weeks')) {
          const week2 = moment(i).isoWeek();
          this.goals.push(weeks[week2]);
        }
      }
    }
}
