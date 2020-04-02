/**
 * ---------------------
 * util
 * ---------------------
 */
function isArray(obj) {
	return Array.isArray(obj);
}
function isFunction(obj) {
	return typeof obj === 'function';
}
function _isString(obj) {
	return typeof obj === 'string';
}

/**
 * ---------------------
 * class
 * ---------------------
 */
Element.prototype.hasClass = function(name){
	return this.className.match(new RegExp('\\b'+name+'(\\s|$)','g'));
};
Element.prototype.addClass = function(name){
	if(this.classList == undefined){
		if(!this.hasClass(name)){
			this.className = this.className+' '+name;  
		}
	}else{
		this.classList.add(name);
	}
};
Element.prototype.removeClass = function(name){
	if(this.classList == undefined){
		this.className = this.className.replace(new RegExp('\\b'+name+'(\\s|$)','g'),"");  
	}else{
		this.classList.remove(name);
	}
};
Element.prototype.toggleClass = function(name){
	if(this.hasClass(name)){
		this.removeClass(name);
	}else{
		this.addClass(name);
	}
};


/**
 * ---------------------
 * ajax
 * ---------------------
 */

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

    xhr.onreadystatechange = function() {
      if (xhr.readyState === 4) {
        if ((xhr.status >= 200 && xhr.status < 300) || xhr.status === 304) {
          resolve(xhr.responseText);
        } else {
          reject(xhr);
        }
      }
    };
  });
}


/**
 * Get by ajax
 *
 * @param {String} url - The URL to which the request is sent
 * @param {String} data - Data to be sent to the server, contact name and value by '='
 * @param {Function} callback - A function to be called if the request succeeds
 *
 * @todo Make data to be an Object not a String
 */
function ajaxGet(url, data, callback){
	var xhr = new XMLHttpRequest();

	url = url + "?" + data;

	xhr.open("get", url, true);
	xhr.send(null);

	xhr.onreadystatechange = function(){
		if(xhr.readyState == 4){
			if((xhr.status>=200 && xhr.status<300) || xhr.status == 304){
				callback(xhr.responseText);
			}else{
				console.log("failed: " + xhr.status);
			}
		}
	};
}

// @example
// ajaxGet("do_load.php", data, doLoadBack);
function doLoadBack(back_data){
	var json_obj = JSON.parse(back_data),
		new_piece = "";
	if(json_obj.length == 0){
		prompts[cur].innerHTML = "没有更多了";
	}else{
		json_obj.forEach(function(item){
			new_piece += "<section class='piece close'><div class='cnt'>" + item.cnt + "</div><div class='meta'><span class='zan' data-pieceid='" + item.id + "'>赞(<span class='num'>" + item.zan + "</span>)</span><time>" + item.create_date + "</time></div></section>";
		});
		prompts[cur].insertAdjacentHTML("beforebegin", new_piece);
		handlePiece(cur);
		prompts[cur].innerHTML = "";
	}
}


/**
 * ---------------------
 * style
 * ---------------------
 */

/**
 * Get the cumputed style of a element
 *
 * @param {Element} ele - The element of which you want get the cumputed style
 * @param {String} attr - The name of a style
 * @return {String} The cumputed style of a element
 */
function getStyle(ele, attr){
	if(window.getComputedStyle){
		return getComputedStyle(ele)[attr];
	}else{
		return ele.currentStyle[attr];
	}
}


/**
 * ---------------------
 * router
 * ---------------------
 */

/*
 * Get params of the current url
 * @return {Object} The param of the current url
 */
function getQuery(){
	
	var args = {};

	if(location.search.length <= 0){
		return args;
	}

	var items = location.search.substring(1).split('&');  // 去掉问号后分组

	for(var i = items.length - 1; i >= 0; i--){
		var item = items[i].split('='),
			name = decodeURIComponent(item[0]),
			value = decodeURIComponent(item[1]);

		if(name.length){
			args[name] = value;
		}
	}

	return args;
}

/**
 * simple selector
 * 简单的标签选择器
 * 
 * @param  {Element}	ele 		父元素
 * @param  {String}		tagName 	目标元素标签
 * @param  {String}		className 	目标元素样式
 * @return {Element}				目标元素，没有返回 undefined
 */
function simpleQuery(ele, tagName, className) {
	var reg = new RegExp('\\b'+className+'(\\s|$)','g'),
		elesByTagName = ele.getElementsByTagName(tagName)

	for (var i = 0, len = elesByTagName.length; i < len; i++) {
		if (elesByTagName[i].className.match(reg)) {
			return elesByTagName[i]
		}
	}
}

/**
 * simple selector
 * @param  {String} selector
 * @return {Element}
 */
function $(selector) {
	return document.querySelector(selector)
}
function $$(selector) {
	return Array.prototype.slice.call(document.querySelectorAll(selector));
}

/**
 * 版本比较函数
 *
 * 比较两个版本号的大小。
 * 版本号必须为“两点三数”，如 `1.2.3`。
 * 返回值为 －1、0、1，分别代表前者比后者小、相同、大。
 * 
 * @param  {String} v1 - 版本号
 * @param  {String} v2 - 版本号
 * @return {Number}    - 比较结果
 *
 * @example
 * // returns -1
 * version2numbers('1.2.13', '1.3.1');
 */
function versionCompare(v1, v2) {

	var res = 0;

	v1_numbers = version2numbers(v1);
	v2_numbers = version2numbers(v2);

	// 先比较第一个数字
	res = v1_numbers[0] - v2_numbers[0];

	if (res === 0) {
		// 如果第一个数字相同再比较第二个数字
		res = v1_numbers[1] - v2_numbers[1];
	}

	/**
	 * 结果格式化
	 *
	 * 小于0 -> -1
	 * 大于0 -> 1
	 */
	if (res > 0) {
		res = 1;
	}

	if (res < 0) {
		res = -1;
	}

	return res;

	/**
	 * 版本号转为两个数字
	 * @param  {String} ver - 版本号
	 * @return {Array}      - 包含两个数字的数组
	 *
	 * @example
	 * // returns [1.2, 3]
	 * version2numbers('1.2.3');
	 */
	function version2numbers(ver) {
		
		var numbers = [],
			// 获取第二个点的位置
			lastPointIndex = ver.lastIndexOf('.');
			
    	// 第一个数字
    	numbers.push(+ver.substring(0, lastPointIndex));
    	// 第二个数字
    	numbers.push(+ver.substring(lastPointIndex + 1));

        return numbers;
	}
}


/**
 * 1位数字前缀补0
 * @param {Number} num - 待格式化的数字
 * @return {String}    - 格式化后的字符串
 */
function addPreZero(num) {
    var str = num.toString();

    if (str.length < 2) {
        str = '0' + str;
    }
    
    return str;
}