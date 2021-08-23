const moment = require('moment');

module.exports.datetimeToNumber = function(date) {
  const utcTime = moment(date).utc().format('HH:mm:ss');
  const timeNumber = parseInt(utcTime
      .split(':')
      .join('')
  );
  return timeNumber;
}