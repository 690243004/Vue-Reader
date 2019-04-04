function ajax(obj){
	console.log(obj.method+obj.url)
	//obj method , url , data
	var ajax
    if(XMLHttpRequest){
        ajax = new XMLHttpRequest();
    }else{
        ajax = ActiveXObject('Microsoft.XMLHTTP')
    }

    var formatStr = "?"
    if(obj.method==='get'&&obj.data){
    	//拼串
    	for(var key in obj.data){
    			formatStr+=key;
    			formatStr+='=';
    			formatStr+=data.key;
    			formatStr+='&';
    		}
		formatStr = formatStr.slice(0,-1);
		data = null;
		url = url+formatStr;
    }
    //调用open方法
    ajax.open(obj.method,obj.url,true)
    if(obj.method=='post'){
    	ajax.setRequestHeader("Content-type","application/x-www-form-urlencoded")
    }
    ajax.send(obj.data)
    ajax.onreadystatechange = function(){
    	if(ajax.readyState===4&&ajax.status===200){
    		obj.callback(ajax.responseText)
    	}
    }
}