    
    //lib
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


    //example

    /* ajaxGet */
    ajaxGet("do_load.php", data, doLoadBack);

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