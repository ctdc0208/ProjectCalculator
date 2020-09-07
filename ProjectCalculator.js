var is_Number=!1,
    is_Decimal=!1,
    is_Operator=!1,
    is_Constant=!1,
    is_Executed=!1,Value="",
    aValue="",Operator="",
    a,b,r,t,Value_1_set=!1,
    Value_1=0,
    Operator_1=0,
    Value_2_set=!1,
    Value_2=0,
    Operator_2=0;

function displayValue(c){
  document.calculator.display.value=c
}

function enterValue(c){
  if(!("Not a Number"==document.calculator.display.value||is_Constant||"."==c&&is_Decimal))
      {document.calculator.clearButton.value="CE";if(is_Operator||is_Executed||is_Constant)resetFlags(),
      "."==c?(Value="0.",is_Decimal=!0):Value=c;
      else if(resetFlags(),"."==c&&""==document.calculator.display.value)Value="0.",is_Decimal=!0;
      else if(Value="0"==document.calculator.display.value&&"."!=c?c:Value+c,TestDecimal=""+Value,"."==c||-1!=TestDecimal.indexOf("."))is_Decimal=!0;is_Number=!0;displayValue(Value)}}

function display_backspace(){
  Value=Value.substring(0,Value.length-1);displayValue(Value)
}

function enterOperator(c){
  ""!=document.calculator.display.value&&"Not a Number"
  !=document.calculator.display.value&&(Operator=c,is_Operator&&Value_1_set&&!Value_2_set?Operator_1=Operator:Value_1_set&&!Value_2_set?
    (Value_2=document.calculator.display.value,Operator_2=Operator,Value_2_set=!0,execute(),displayValue(aValue)):
    (resetValues(),Value_1=document.calculator.display.value,Operator_1=Operator,Value_1_set=!0,resetFlags(),is_Operator=!0))
}

function execute(){
  val_1=parseFloat(Value_1);
  val_2=parseFloat(Value_2);
  Oper=Operator_1;ans="";
  "+"==Oper?ans=val_1+val_2:
  "-"==Oper?ans=val_1-val_2:
  "*"==Oper?ans=val_1*val_2:
  "/"==Oper&&(ans=0==val_2?"Not a Number":val_1/val_2);Value=ans;
  "Not a Number"==ans?(resetValues(),resetFlags(),aValue=ans):
  (Operator=Operator_2,aValue=10<decimalPlaces(ans)?parseFloat(Math.round10(ans,-10)):
  parseFloat(ans),"="==Operator_2?(resetValues(),resetFlags(),is_Executed=!0):
  (resetValues(),Value_1=ans,Operator_1=Operator,
    Value_1_set=!0,resetFlags(),is_Operator=!0))
}

function display_clear(){
  "AC"==document.calculator.clearButton.value||
  ""==document.calculator.display.value||
  "Not a Number"==document.calculator.display.value||
  "CE"==document.calculator.clearButton.value&&is_Constant&&!Value_1_set?(resetFlags(),resetValues(),
  Operator=Value="",
  displayValue(Value),document.calculator.clearButton.value="AC"):
  "CE"==document.calculator.clearButton.value&&(document.calculator.clearButton.value="AC",is_Operator||
  (Value="",displayValue(Value)))
}

function resetFlags(){
  is_Executed=is_Method=is_Constant=is_Operator=is_Decimal=is_Number=!1
}

function resetValues(){
  Operator_2=Operator_1=Value_2=Value_1="";Value_2_set=Value_1_set=!1
}

function decimalPlaces(c){
  return(c=(""+c).match(/(?:\.(\d+))?(?:[eE]([+-]?\d+))?$/))?Math.max(0,(c[1]?c[1].length:0)-(c[2]?+c[2]:0)):0
}

function decimalAdjust(c,d,e){
  if("undefined"===typeof e||0===+e)
  return Math[c](d);d=+d;e=+e;
  if(isNaN(d)||"number"!==typeof e||0!==e%1)
  return NaN;if(0>d)
  return-decimalAdjust(c,-d,e);
  d=d.toString().split("e");
  d=Math[c](+(d[0]+"e"+(d[1]?+d[1]-e:-e)));
  d=d.toString().split("e");
  return+(d[0]+"e"+(d[1]?+d[1]+e:e))
}

Math.round10||(Math.round10=function(c,d){
  return decimalAdjust("round",c,d)});

Math.floor10||(Math.floor10=function(c,d){
  return decimalAdjust("floor",c,d)});

Math.ceil10||(Math.ceil10=function(c,d){
  return decimalAdjust("ceil",c,d)});
  window.addEventListener("keydown",checkKeyPressed,!1);



function checkKeyPressed(c){
  switch(c.keyCode){case 108:case 110:case 194:case 190:enterValue(".");
  break;
  case 48:case 96:enterValue("0");break;
  case 49:case 97:enterValue("1");break;
  case 50:case 98:enterValue("2");break;
  case 51:case 99:enterValue("3");break;
  case 52:case 100:enterValue("4");break;
  case 53:case 101:enterValue("5");break;
  case 54:case 102:enterValue("6");break;
  case 55:case 103:enterValue("7");break;
  case 56:if(c.shiftKey){enterOperator("*");
  break}case 104:enterValue("8");break;
  case 57:case 105:enterValue("9");
    break;
    case 107:enterOperator("+");
    break;
    case 109:case 189:case 173:enterOperator("-");
    break;
    case 106:case 170:enterOperator("*");
    break;
    case 111:case 191:enterOperator("/");
    break;
    case 187:if(c.shiftKey){enterOperator("+");
    break}
    case 13:case 61:
    if(c.shiftKey){enterOperator("+");break}enterOperator("=");
    break;
    case 27:case 46:case 12:display_clear();
    break;
    case 8:display_backspace()}c.preventDefault()};
