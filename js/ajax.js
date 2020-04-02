/**
 * Get by ajax
 *
 * @param {String} url - The URL to which the request is sent
 * @param {String} data - Data to be sent to the server, contact name and value by '='
 * @param {Function} callback - A function to be called if the request succeeds
 *
 * @return {Promise} result
 */
function ajaxGet(url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    if (typeof data === 'object') {
      url = url + '?' + makeQuery(data);
    }

    xhr.open('get', url, true);
    xhr.send(null);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          try {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } catch (e) {
            resolve(xhr.responseText);
          }
        } else {
          reject(xhr);
        }
      }
    };
  });
}

function makeQuery(data) {
  const queryArr = [];
  for (const i in data) {
    queryArr.push(`${encodeURIComponent(i)}=${encodeURIComponent(data[i])}`);
  }
  return queryArr.join('&');
}



/**
 * Post by ajax
 *
 * @param {String} url - The URL to which the request is sent
 * @param {Object} data - Data to be sent to the server
 * @param {Function} callback - A function to be called if the request succeeds
 *
 * @return {Promise} result
 */
function ajaxPost(url, data) {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();

    xhr.open('post', url, true);
    xhr.setRequestHeader('Content-Type', 'application/x-www-form-urlencoded');
    xhr.send(data);

    xhr.onreadystatechange = function () {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          try {
            const res = JSON.parse(xhr.responseText);
            resolve(res);
          } catch (e) {
            resolve(xhr.responseText);
          }
        } else {
          reject(xhr);
        }
      }
    };
  });
}
