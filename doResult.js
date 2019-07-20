document.addEventListener('DOMContentLoaded', function () {
  particleground(document.getElementById('all'), {
    dotColor: '#5cbdaa',
    lineColor: '#5cbdaa'
  });
  //var intro = document.getElementById('intro');
  //intro.style.marginTop = - intro.offsetHeight / 2 + 'px';
}, false);

var ones;
var tens;
var teens;

function convert_millions(num){
    if (num>=1000000){
        return convert_millions(Math.floor(num/1000000))+" million "+convert_thousands(num%1000000);
    }
    else {
        return convert_thousands(num);
    }
}

function convert_thousands(num){
    if (num>=1000){
        return convert_hundreds(Math.floor(num/1000))+" thousand "+convert_hundreds(num%1000);
    }
    else{
        return convert_hundreds(num);
    }
}

function convert_hundreds(num){
    if (num>99){
        return ones[Math.floor(num/100)]+" hundred "+convert_tens(num%100);
    }
    else{
        return convert_tens(num);
    }
}

function convert_tens(num){
    if (num<10) return ones[num];
    else if (num>=10 && num<20) return teens[num-10];
    else{
        return tens[Math.floor(num/10)]+" "+ones[num%10];
    }
}

function convert(num){
    if (num==0) return "zero";
    else return convert_millions(num);
}

function doResult() {
$.getJSON( "data.json", function( json ) {
	var inputValue = document.getElementById("translateInput").value;
	inputValue = inputValue.replace(/,/g, '');
	
	var resultElement = document.getElementById("resultInput");
	var returnValue = "";
	
	
//var tens=['','','twenty','thirty','forty','fifty','sixty','seventy','eighty','ninety'];
//var teens=['ten','eleven','twelve','thirteen','fourteen','fifteen','sixteen','seventeen','eighteen','nineteen'];
	
	//POPULATE ONES, TENS, TEENS
	ones = [''];
	for(i=1;i<=9;i++) {
		ones[i] = json[i];
	}
	tens = ['', ''];
	for(i=20;i<=90;i+10) {
		tens[i] = json[i];
	}
	teens = [];
	for(i=10;i<=19;i++) {
		teens[i] = json[i];
	}
	
	
	console.log(ones);
	throw new Error("my error message");
	
	//CHECK IF NUMBER?
	if(isNaN(inputValue)) {
		console.log("Not a number!")
		returnValue = "\"" + inputValue + "\" is not a number :(";
	} else {
		console.log(inputValue);
		

		
		console.log(convert(inputValue));
		
		//returnValue = inputValue;
	}
	
	resultElement.value = returnValue;
	resultElement.innerHTML = returnValue;
	
	


	});
}