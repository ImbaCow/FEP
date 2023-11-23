var string = '  Hello,    World !    ';

function last1(str){
	if (str.length){
		return str[str.length - 1];
	};
	return '';
};
function last2(str){
	var ch = '';
	for(i = 0; i < str.length; i++){
		ch = str[i];
	};
	return ch;
};

console.log(last1(string));
console.log(last2(string));

function noLast1(str){
	return str.slice(0, str.length - 1);
};
function noLast2(str){
	return str.replace(/.$/, '');
};

console.log(noLast1(string));
console.log(noLast2(string));

function reverse1(str){
	var newStr = '';
	for(i = str.length - 1; i >= 0; i--){
		newStr += str[i];
	};
	return newStr;
};
function reverse2(str){
	var newStr = '';
	if (str.length > 0){
		newStr = last1(str) + reverse2(noLast1(str));
	};
	return newStr;
};
function reverse3(str){
	return str.split('').reverse().join('');
};

console.log(reverse1(string));
console.log(reverse2(string));
console.log(reverse3(string));

function spaces1(str){
	return str.replace(/\s+/g, ' ').replace(/(^\s)|(\s$)/g, '');
};
function spaces2(str){
	var newStr = [];
	for(i = 0; i < str.split(' ').length; i++){
		if (str.split(' ')[i].length){
			newStr.push(str.split(' ')[i]);
		};
	};
	return newStr.join(' ');
};

console.log(spaces1(string));
console.log(spaces2(string));