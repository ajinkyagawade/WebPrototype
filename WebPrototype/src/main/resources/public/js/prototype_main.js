/**
 * JavaScript code for web prototyping application
 */

$( document ).ready(function() {
    var x1, x2, y1, y2;
    var selection = false;
    var gMOUSEUP = false;
    var gMOUSEDOWN = false;

    sPos = $("#selection").position();

// events if left mousebutton is pressed
    $(document).mouseup(function () {
        gMOUSEUP = true;
        gMOUSEDOWN = false;
    });
    $(document).mousedown(function () {
        gMOUSEUP = false;
        gMOUSEDOWN = true;
    });

    $("#YDR-Frame").mousedown(function (e) {
        selection = true;
        x1 = e.pageX;
        y1 = e.pageY;
        $('#object1').remove();
    });

    $('#YDR-Frame').mousemove(function (e) {
        if (selection) {
            x2 = e.pageX;
            y2 = e.pageY;

            if (selection) {
                // Calculating the div selection rectangle
                var TOP = (y1 < y2) ? y1 : y2;
                var LEFT = (x1 < x2) ? x1 : x2;
                var WIDTH = (x1 < x2) ? x2 - x1 : x1 - x2;
                var HEIGHT = (y1 < y2) ? y2 - y1 : y1 - y2;

                $("#divDragable").css({
                    position: 'absolute',
                    border: '2px solid #564dff',
                    zIndex: 5000,
                   left: LEFT,
                    top: TOP,
                    width: WIDTH,
                   height: HEIGHT
                });

                $("#divDragable").show();
                $("#selection").show();

                $('#selection').html('( x1 : ' + x1 + ' )  ( x2 : ' + x2 + ' )  ( y1 : ' + y1 + '  )  ( y2 : ' + y2 + ' )' );
                $("#selectedImage").focus();
            }
        }
    });
//hide the selection div
    $('#YDR-Frame').mouseup(function () {
        selection = false;
        $("#divDragable").hide();
        getIt();
    });
    $("#YDR-Frame").mouseenter(function () {
        (gMOUSEDOWN) ? selection = true : selection = false;
    });
    $("#selection").mouseenter(function () {
        (gMOUSEDOWN) ? selection = true : selection = false;
    });
    $('#YDR-Frame').mouseleave(function () {
        selection = false;
    });

    $("#addEvent").click(function () {
        if(x1 != undefined) {
            var selectedItem = $("#selectedImage option:selected").text();
            name=$("#YDR-Frame img:first-child").attr("name");
            $("#listBox").append('<option value="['+name+',' + x1 + ' ,  ' + x2 + ' ,  ' + y1 + '  ,  ' + y2 + ' ,' + selectedItem + ']" >' +
                '[From: '+name+' to: ' + selectedItem + ']</option>');

            index=findWithAttr(imageSource, 'Key', selectedItem)
            if(index+1<=imageSource.length) {
                $("#targetImage").attr("src", imageSource[index].Source).attr("name", imageSource[index].Key);
                $("#lblImageName").text(imageSource[index].Key)
            }
        }
    })
    var jsonArray=[];
    $("#previewPrototype").click(function () {
        $("#navigator").hide();
        $("#divMain").hide( "slow" );
        $("#preview").show();

        jsonArray.length=0;
        $("#listBox > option").each(function() {
            if(this.value!="dragImage") {
                result=this.value.replace('[','').replace(']','').split(',');
                jsonArray.push(
                    {
                        "from":result[0],
                        "X1":result[1],
                        "X2":result[2],
                        "Y1":result[3],
                        "Y2":result[4],
                        "To":result[5]
                    }
                );
            }
        });
        if(jsonArray.length>0) {
            index = findWithAttr(imageSource, 'Key', jsonArray[0].from)

            $("#imagePreview").attr("src", imageSource[index].Source).attr("name", imageSource[index].Key);
        }
    });

    $( "#help" ).click(function() {
        $( "#helpmenu" ).slideToggle( "slide" );

    });
    $("#imagePreview").click(function(e){

        Ix=e.clientX;
        Iy=e.clientY;
        name=$("#imagePreview").attr("name");
        $.each(jsonArray,function(index,value){
            if(value.from==name)
            {
                if(Ix>=value.X1 && Ix<= value.X2 && Iy>= value.Y1 && Iy <= value.Y2)
                {
                    index=findWithAttr(imageSource, 'Key', value.To)
                    $("#imagePreview").attr( "src",imageSource[index].Source ).attr("name",imageSource[index].Key);
                    return;
                }
            }
        })

    })

    $("div .close").click(function () {
        $("#preview").hide();
        $("#divMain").show();
        $("#navigator").show();
    });

    $("#removeEvent").click(function () {
       
        if( $("#listBox option:selected").val()!= "dragImage") {
            $("#listBox option:selected").remove();
        }
    })
   
    $("#triangle-right").click(function(){

        name=$("#YDR-Frame img:first-child").attr("name");
        index=findWithAttr(imageSource, 'Key', name)//imageSource.indexOf(name)
        if(index+1<=imageSource.length)
        {
            $("#YDR-Frame img:first-child").attr( "src",imageSource[index+1].Source ).attr("name",imageSource[index+1].Key);
            $("#lblImageName").text(imageSource[index+1].Key)
        }
    });
    $("#triangle-left").click(function(){

        name=$("#YDR-Frame img:first-child").attr("name")
        index=findWithAttr(imageSource, 'Key', name)
        if(index-1>=0)
        {
            $("#YDR-Frame img:first-child").attr( "src",imageSource[index-1].Source ).attr("name",imageSource[index-1].Key);
            $("#lblImageName").text(imageSource[index-1].Key)
        }
    });
    function findWithAttr(array, attr, value) {
        for(var i = 0; i < array.length; i += 1) {
            if(array[i][attr] === value) {
                return i;
            }
        }
    }

    window.requestFileSystem  = window.requestFileSystem || window.webkitRequestFileSystem;

    window.requestFileSystem(window.TEMPORARY, 5*1024*1024, initFS, errorHandler);
    function initFS(fs){
    }

    function errorHandler(){
    }
    function loadImages() {
        if (imageSource.length != 0) {

            $("#selectedImage").empty();
            $.each(imageSource, function (key, value) {
                $("#selectedImage").append('<option value="' + value.Key + '"  >' + value.Key + '</option>');

            });
            $("#targetImage").attr("src",imageSource[0].Source).attr("name",imageSource[0].Key);
            $("#lblImageName").text(imageSource[0].Key)
            $("#"+imageSource[0].Key.replace(".","")).attr("class","slideSelector");

        }
    };

    $( "#selectedImage" ).change(function() {
        var item=$(this);
        $(".slideSelector").removeClass("slideSelector")
        $("#"+item.val().replace(".","")).attr("class","slideSelector");


       $("#listBoxImages").scrollTop($("#listBoxImages").scrollTop() + $("#"+item.val().replace(".","")).position().top);
    });

    var imageSource=[];
    var imageCount;
    $("#FileLocation").change(function(evt){

            var files = evt.target.files;
        imageCount=files.length;
        $("#listBoxImages").empty();
        for (var i = 0, f; f = files[i]; i++) {
            (function (file,i) {
                var reader = new FileReader();
                var name = file.name;
                reader.onload = function (e) {

                    imageSource.push({
                                    "Key":name,
                                   "Source": reader.result
                    });

                    $("#listBoxImages").append('<div id="'+ name.replace(".","") +'">' + name +
                        '<img src=' + reader.result + ' name="' + name + '" id="img1" width="250px" height="250px">' +
                        '</div>');
                    if(imageCount==imageSource.length){loadImages();} //Object.keys(imageSource)
                }
                reader.readAsDataURL(file);

            })(f,i);
        }


    });




    //Get the image from div
   $("#listBoxImages img").click(function()
   {
    alert(this.id)
   });

   function getIt() {
        var top=y1;
        var left=x1;
        var width=x2-x1;
        var height=y2-y1;
        var mydiv1 = $( "<div id='object1' style='border: 2px solid #564dff;width:"+width+"px;" +
                    "height:"+height+"px;position: absolute;" +
                        "top:"+top+"px; left:"+left+"px; '/>" )
        $("#YDR-Frame").append(mydiv1);
       
    }

    function matchPos(xmiddle, ymiddle) {
        if (x1 > x2) {
            myX1 = x2;
            myX2 = x1;
        } else {
            myX1 = x1;
            myX2 = x2;
        }
        if (y1 > y2) {
            myY1 = y2;
            myY2 = y1;
        } else {
            myY1 = y1;
            myY2 = y2;
        }
        if ((xmiddle > myX1) && (xmiddle < myX2)) {
            if ((ymiddle > myY1) && (ymiddle < myY2)) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }

    }

});