$(function() {
    $('#signin').submit(function(event){
   		if(!this.checkValidity())
    	{
  			event.preventDefault();
			return false;
		} else {
			event.preventDefault();
    		$.ajax({
    			url :$( '#signin' ).attr( 'action' ),
    			data :  JSON.stringify($('#signin').serializeObject()),
    			type : "POST",
    			contentType : "application/json",
    			success: function(result) {
    				if(JSON.parse(result).success == "true") {
    					location.href = "/home/"+JSON.parse(result).username;
    					console.log(result);
    				}else {
    					alert("Incorrect login details");
    				}
    			},
    			failure : function(result) {
    			console.log(result);	
    			}
    		});
    	}
    });
});



$.fn.serializeObject = function()
{
    var obj = {};
    var arr = this.serializeArray();
    $.each(arr, function() {
        if (obj[this.name] !== undefined) {
            if (!obj[this.name].push) {
                obj[this.name] = [obj[this.name]];
            }
            obj[this.name].push(this.value || '');
        } else {
            obj[this.name] = this.value || '';
        }
    });
    return obj;
};


$(function() {
    $('#signup').submit(function(event) {
    	if(!this.checkValidity())
    		{
  				event.preventDefault();
				return false;
			} else {
				event.preventDefault();
    			$.ajax({
    				url : $( '#signup' ).attr( 'action' ),
    				data :  JSON.stringify($('#signup').serializeObject()),
    				type : "POST",
    				contentType : "application/json",
    				success: function(result) {
    					location.href = "/welcome";
    				},
    				failure : function(result) {
    					console.log(result);
    					alert("Error, try later");
    				}
    			}).error(function(status, result, xhr){
    				alert(JSON.parse(status.responseText).message);
    			});
    		}  
    	});
});





