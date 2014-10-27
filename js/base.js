	
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
     */
	function ajaxPost(url, data, callback){
		var xhr = new XMLHttpRequest();

		xhr.open("post", url, true);
		xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
		xhr.send(data);

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