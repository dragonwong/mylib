/**
 * 日期转 yyyy-mm-dd 字符串
 * @param {Date | Timestamp} date 日期
 * @return {String} yyyy-mm-dd
 *
 * @example new Date() => 2018-05-16
 */
function formatDate(date) {
  const year = date.getFullYear();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}
function formatTime(date) {
  return `${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`;
}

function format(date, {
  needFullTime = true,
} = {}) {
  let res = '';
  if (typeof date === 'number') {
    date = new Date(date);
  }
  if (date instanceof Date) {
    res = `${formatDate(date)}`;
    if (needFullTime) {
      res = `${res} ${formatTime(date)}`;
    }
  } else {
    console.error('no date');
  }
  return res;
}

module.exports = {
  format,
};
