/*
 * Get params of the current url
 * @return {Object} The param of the current url
 */
function getQuery() {
  let data;

  if (location.search.length > 0) {
    data = {};

    const items = location.search.substring(1).split('&'); // 去掉问号后分组

    for (let i = items.length - 1; i >= 0; i--) {
      const item = items[i].split('=');
      const name = decodeURIComponent(item[0]);
      const value = decodeURIComponent(item[1]);

      if (name.length) {
        data[name] = value;
      }
    }
  }

  return data;
}

function makeQuery(data) {
  const queryArr = [];
  for (const i in data) {
    queryArr.push(`${encodeURIComponent(i)}=${encodeURIComponent(data[i])}`);
  }
  return queryArr.join('&');
}