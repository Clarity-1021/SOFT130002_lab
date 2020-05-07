function test(){
    // 第2题
    console.log("第2题:");
    testMail("1501862848", "7980sfadjk@fudan.ss");
    // 第3题
    console.log("第3题:");
    testRedundancy("Is is the iS is cost of of gasoline going up up");
    // 第4题
    console.log("第4题:");
    testKeyBoard("7_This_is_a_test", "_hs_s_a_es");
    // 第5题
    console.log("第5题:");
    testSpecialReverse("  hello  world!  ");
    // 第6题
    console.log("第6题:");
    twoSum([1,2,3,4,5,8], 5);
    // 第7题
    console.log("第7题:");
    lengthOfLongestSubstring("abbbcghfbbb");
}
test();


/*
1.
背景：
    每隔五秒运行一次函数直到某一整分钟停止，比如从20:55:45运行到20:56:00停止；
    或者运行10次，先到的为准。从1开始每过五秒，输入框内数值翻倍。初始值为1。
注意：
    你可以在函数 timeTest内部 和 timeTest外部 写代码使得该功能实现。
要求：
    ①要求使用JS闭包的方式使得计数实现局部私有，不可以在全局区域声明计数变量。
    ②使用console.log打印计数即可，到达一分钟提前停止也需要console.log相应的提示语句。
*/
let outerTestTime = testTime();
let int = setInterval(() => {
    outerTestTime();
},5000);
function testTime(){
    let mulTime = 0;
    return function innerTestTime () {
        let currentTime = new Date();
        let currentSecond = currentTime.getSeconds();
        if((currentSecond > 0) && (currentSecond < 5)){
            console.log("不会再继续了，已经到达1分钟了~");
            clearInterval(int);
            return ;
        }
        console.log(1 << mulTime++);
        if(currentSecond === 0) {
            console.log("不会再继续了，已经到达1分钟了~");
            clearInterval(int);
            return ;
        }
        if(mulTime > 10)
            clearInterval(int);
    }
}


/*
2.
要求：
    ①能够对传入的、移动手机电话（11位）、邮箱字符串（上网查找其要求）进行正则判定。
    ②使用console.log打印即可，例如，电话不符合要求但是邮箱符合要求，则console.log("The telephone is right and the mail is wrong!")。
    ③邮箱字符串的正则匹配的理解需写入lab文档。
    ④telephone与mail均是字符串。
*/
function testMail(telephone,mail) {
    let telFlag = /^1[3-9]\d{9}$/.test(telephone);
    let mailFlag = /^([\w-])+@([a-z/d])+((\.[a-z]{2,3}){1,2})$/.test(mail);
    let printStr = "The telephone is ";
    if(telFlag)
        printStr += "right";
    else
        printStr += "wrong";
    printStr += " and the mail is "
    if(mailFlag)
        printStr += "right!";
    else
        printStr += "wrong!";
    console.log(printStr);
}

// testMail("1501862848", "7980sfadjk@fudan.ss");

/*
3.
要求：
    ①输入一段全英文语句，要求使用正则表达式找到相邻的重复单词放入一个Set，如果集合中元素超过10个，则按照首字母顺序取前10个于集合。
    ②使用console.log打印即可，将该集合打印出来。
    ③例如：输入"Is is the iS is cost of of gasoline going up up"，输出：Set { 'Is is', 'iS is', 'of of', 'up up' }。
    ④对该函数中用的正则匹配的理解需写入lab文档。
    ⑤str为字符串。
*/
function testRedundancy(str) {
    let wordArray = str.split(" ");
    if(wordArray === null)
        return;

    let start = 0;
    let end = start;
    let firstSet = {};
    for (let i = 1; i < wordArray.length; i++){
        let reg = new RegExp(wordArray[start], "i");
        while ((i < wordArray.length) && reg.test(wordArray[i]))
            i++;
        end = i - 1;
        if(start === end){
            start++;
            end = start;
            continue ;
        }
        let char = wordArray[start].charAt(0).toLowerCase();
        let t = "";
        for (let j = start; j <= end; j++){
            t += wordArray[j];
            if(j !== end)
                t += " ";
        }
        if(!(firstSet.hasOwnProperty(char))){
            firstSet[char] = [];
        }
        firstSet[char].push(t);
        start = end + 1;
        end = start;
    }

    let newKey = Object.keys(firstSet).sort();

    let mySet = new Set();
    for(let i = 0; i < newKey.length; i++){
        for (let j = 0; j < firstSet[newKey[i]].length; j++){
            mySet.add(firstSet[newKey[i]][j]);
            if(mySet.size === 10){
                console.log(mySet);
                return ;
            }
        }
    }
    console.log(mySet);
    return mySet;
}
// testRedundancy("Is is the iS is cost of of gasoline going up up");
// testRedundancy("a a e e b b a a b B a A C c a a b b a a c a a c a a b b c C a a c c d d");
// testRedundancy("a a a a n b b c c d d o o k k k k k m n n n l l g G p P p s s k k w w");


/*
4.
背景：
    旧键盘上坏了几个键，于是在敲一段文字的时候，对应的字符就不会出现。
    现在给出应该输入的一段文字、以及实际被输入的文字，请你使用Set列出肯定坏掉的那些键。
    例如：输入7_This_is_a_test和_hs_s_a_es    输出：Set { '7', 'T', 'I' }
要求：
    ①需要使用Set。
    ②只能使用一次循环。
    ③使用console.log打印即可，将该集合打印出来。
    ④wantInput和actualInput为字符串。
注意：
    ①注意联系生活，并注意观察我给的上述例子。
*/
function testKeyBoard(wantInput, actualInput) {
    let mySet = new Set();
    let wi = 0;
    for (let ai = 0; ai < actualInput.length; ai++){
        let wChar = wantInput.charAt(wi).toUpperCase();
        let aChar = actualInput.charAt(ai).toUpperCase();
        while (wChar !== aChar){
            mySet.add(wChar);
            wi++;
            wChar = wantInput.charAt(wi).toUpperCase();
        }
        wi++;
    }
    console.log(mySet);
    return mySet;
}
// testKeyBoard("7_This_is_a_test", "_hs_s_a_es");
/*
5.
背景：
    给定一个输入英文语句字符串，反转该语句。例如the sky is blue变成blue is sky the。
要求：
    ①如果输入的字符串前后有空格，输出中应该去除前后空格。如果输入字符串中间出现连续的两个空格，输出应该变为一个。
    比如输入是“  hello  world!  ”，输出应该是“world! hello”。
    ②请使用Array。
    ③使用console.log打印即可，将该字符串打印出来。
    ④只能显式使用一次循环。
    ⑤str为字符串。
*/
function testSpecialReverse(str) {
    str = str.trim();
    let wordArray = str.split(/\s+/);
    let printStr = "";
    for (let i = wordArray.length - 1; i >= 0; i--){
        printStr += wordArray[i];
        if (i !== 0)
            printStr += " ";
    }
    console.log(printStr);
    return printStr;
}
// testSpecialReverse("  hello  world!  ");

/*
6.
背景：
    给定一个整数数组和一个值，找出相加为该值的两个元素下标并保存在一个数组中。
    例如给定 [2, 7, 11, 15]和9,
    打印结果为[0,1]
要求：
    ①使用Map。
    ②只能显式使用一次循环。
    ③使用console.log打印即可，将满足条件的数组打印出来。
    ④nums为数字数组，如[1,2,3,4],target为数字,如5，那么输出为
    [ 0, 3 ]
    [ 1, 2 ]
*/

function twoSum(nums, target) {
    let myMap = new Map();
    for(let i = 0 ; i < nums.length; i++){
        let key = target - nums[i];
        if(myMap.has(key)){
            let temp = [myMap.get(key), i]
            console.log(temp);
        }
        myMap.set(nums[i], i);
    }
}
// twoSum([1,2,3,4,5,8], 5);


/*
7.
背景：
    打印最长的包含不同字符串的子字符串长度。
要求：
    ①使用Map。
    ②例如：输入"abbbbb",输出2，输入"bbbbb",输出1；
    ③只能显式使用一次循环。
    ④使用console.log打印即可。
    ⑤str为字符串。
*/
function lengthOfLongestSubstring(str) {
    let myMap = new Map();
    let length = str.length;
    let result = 0;

    for(let l = 0, r = 0; r < str.length; r++){
        let char = str.charAt(r);
        if(myMap.has(char))
            l = Math.max(myMap.get(char), l);
        result = Math.max(result, r - l + 1);
        myMap.set(char, r + 1);
    }
    console.log(result);
}
// lengthOfLongestSubstring("abbbcghfbbb");

/*
8.
背景：
    该部分只是为了让你们自己动动手更好地感受不同继承方式。
要求：
    ①借助构造函数、原型链、和Object.create分别编写DevelopingCountry、PoorCountry、DevelopedCountry以实现对Country的继承，
    并在三者分别添加sayHi、saySad、sayHappy函数分别打印"Hi,i am a developing country."、"I am a sad poor country."、"I am a Happy developed country."
    ②请调用他们并打印相关语句即可。
*/
function Country() {
    this.name = "国家";
}

function DevelopingCountry() {
    Country.call(this);
    this.sayHi = function () {
        console.log("Hi,i am a developing country.");
    }
}
console.log("第8题:");
let a = new DevelopingCountry();
a.sayHi();
// console.log(a.name);

function PoorCountry(){}
PoorCountry.prototype = new Country()
PoorCountry.prototype.constructor = PoorCountry;
PoorCountry.prototype.saySad = function () {
    console.log("I am a sad poor country.");
}
let b = new PoorCountry();
b.saySad();
// console.log(b.name);

function DevelopedCountry() {
    Country.call(this);
    this.sayHappy = function () {
        console.log("I am a Happy developed country.");
    }
}
DevelopedCountry.prototype = Object.create(Country.prototype);
DevelopedCountry.prototype.constructor = DevelopedCountry;
let c = new DevelopedCountry();
c.sayHappy();
// console.log(c.name);
