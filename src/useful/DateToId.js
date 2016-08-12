const hour = 1000*60*60

module.exports = function(date){
  return (date.getTime()/hour % 10000)
}
