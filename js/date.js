/**
 * 日期转 yyyy-mm-dd 字符串
 * @param {Date | Timestamp} date 日期
 * @return {String} yyyy-mm-dd
 *
 * @example new Date() => 2018-05-16
 */
function format2YMD(date) {
  if (typeof date === 'number') {
    date = new Date(date);
  }
  if (date instanceof Date) {
    return format(date.getFullYear(), date.getMonth(), date.getDate());
  }
}

function format(year, month, day) {
  month += 1;
  if (month < 10) {
    month = `0${month}`;
  }
  if (day < 10) {
    day = `0${day}`;
  }
  return `${year}-${month}-${day}`;
}