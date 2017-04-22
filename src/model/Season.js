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

    }

    changeWeekPlan(index, count){
      if(typeof this.goals[index] === 'undefined'){
        this.goals[index] = {}
      }
      this.goals[index].arrowCount = count;
    }

    changeWeekTargetShare(index, count){
      if(typeof this.goals[index] === 'undefined'){
        this.goals[index] = {}
      }
      this.goals[index].targetShare = count;
    }


    updateWeeks() {
      if (typeof this.start !== 'undefined' &&
          typeof this.end !== 'undefined') {
        const oneWeek = 7 * 24 * 60 * 60 * 1000;
        const oneDay = oneWeek / 7;
        const weeks = {};
        const weekStart = this.start.getTime();
        const weekEnd = this.end.getTime();
        const stop = weekEnd + oneDay;
        for (let i = weekStart; i < stop; i += oneWeek) {
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
        for (let j = weekStart; j < stop; j += oneWeek) {
          var week2 = moment(j).isoWeek();
          this.goals.push(weeks[week2]);
        }
      }
    }
}
