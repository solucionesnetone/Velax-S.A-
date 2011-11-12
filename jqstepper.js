/**
 * Numeric Stepper
 * ------------------------------------------------
 *
 * Copyright 2007 Ca Phun Ung
 *	
 * This software is licensed under the CC-GNU LGPL
 * http://creativecommons.org/licenses/LGPL/2.1/
 * 
 * Version 0.1
 *
 */

/**
 * Numeric Stepper Class.
 */
var NumericStepper = {	
	register : function(name, minValue, maxValue, stepSize){
		this.minValue = minValue;
		this.maxValue = maxValue;
		this.stepSize = stepSize;
		var elements = getElementsByClassName(document, "*", name);
		for (var i=0; i<elements.length; i++){
			var textbox = elements[i].getElementsByTagName('input')[0];
			if (textbox){
				if (textbox.value == undefined || textbox.value == '' || isNaN(textbox.value)) 
					textbox.value = 0;			
				textbox.onkeypress = function(e){
					if(window.event){
						keynum = e.keyCode; // IE
					} else if(e.which){
						keynum = e.which; // Netscape/Firefox/Opera
					}
					keychar = String.fromCharCode(keynum);
					numcheck = /[0-9\-]/;
					if (keynum==8)
						return true;
					else
						return numcheck.test(keychar);
				};
				textbox.onblur = function(){
					if (parseInt(this.value) < NumericStepper.minValue)
						this.value = NumericStepper.minValue;
					if (parseInt(this.value) >NumericStepper. maxValue)
						this.value = NumericStepper.maxValue;
				};
				var buttons = elements[i].getElementsByTagName('button');
				if (buttons[0]){
					this.addButtonEvent(buttons[0], textbox, this.stepUp);
				}
				if (buttons[1])
					this.addButtonEvent(buttons[1], textbox, this.stepDown);
			}
		}
	}	
  ,addButtonEvent:function(o,textbox, func){
    o.textbox = textbox;
		// convert button type to button to prevent form submission onclick
		if (o.getAttribute("type")=="submit"){
			o.removeAttribute("type"); // IE fix
			o.setAttribute("type","button");
		}
    o.onclick = func;
	}
  ,stepUp:function(){
    NumericStepper.stepper(this.textbox, NumericStepper.stepSize);
  }
  ,stepDown:function(){
    NumericStepper.stepper(this.textbox, -NumericStepper.stepSize);
  }
	,stepper:function(textbox, val){
    if (textbox == undefined) 
      return false;
    if (val == undefined || isNaN(val)) 
      val = 1;
    if (textbox.value == undefined || textbox.value == '' || isNaN(textbox.value)) 
      textbox.value = 0;
    textbox.value = parseInt(textbox.value) + parseInt(val);
    if (parseInt(textbox.value) < NumericStepper.minValue)
      textbox.value = NumericStepper.minValue;
    if (parseInt(textbox.value) >NumericStepper. maxValue)
      textbox.value = NumericStepper.maxValue;
  }
}

/**
  getElementsByClassName - returns an array of elements selected by their class name.
  @author Jonathan Snook <http://www.snook.ca/jonathan>
  @add-ons Robert Nyman <http://www.robertnyman.com>
*/
function getElementsByClassName(oElm, strTagName, strClassName){
  var arrElements = (strTagName == "*" && oElm.all)? oElm.all : oElm.getElementsByTagName(strTagName);
  var arrReturnElements = new Array();
  strClassName = strClassName.replace(/-/g, "\-");
  var oRegExp = new RegExp("(^|\s)" + strClassName + "(\s|$)");
  var oElement;
  for(var i=0; i<arrElements.length; i++){
    oElement = arrElements[i];
    if(oRegExp.test(oElement.className)){
      arrReturnElements.push(oElement);
    }
  }
  return (arrReturnElements)
}

function initNumericStepper(){
	var myNumericStepper = NumericStepper.register("numeric-stepper", 0, 100, 1);
}

/**
 * addEvent - simple window.onload event loader.
 */
function addEvent(o, evt, f){
	var r = false;
  if (o.addEventListener){
    o.addEventListener(evt, f, false);
		r = true;
  }
  else if (o.attachEvent)
  	r = o.attachEvent("on"+evt, f);
  return r;
}
addEvent(window, "load", initNumericStepper);