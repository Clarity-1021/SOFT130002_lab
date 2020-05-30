<html>
<head>
    <title>Exercise 1</title>
</head>
<body>
<h1>Regular HTML section (outside &lt;?php ... ?&gt; tags)</h1>
<p>You can type regular HTML here and it will show up</p>

<h1>PHP section (inside &lt;?php ... ?&gt; tags)</h1>
<?php
//this is a php comment IN tags (will not appear)
 $d = date("M dS, Y");
 $d = date("l，M dS ，Y G:i:s");
 echo "This page was generated: " . $d . "<hr/>";

$remaining = 365 - date("z");

$year = date("Y");
if($year % 100 != 0){
    if($year % 4 == 0){
        $remaining++;
    }
}
else{
    if($year % 400 == 0){
        $remaining++;
    }
}
//$date = date("M dS, Y");
//echo "This page was generated: " . $date . "<hr/>";
 echo "There are ". $remaining . " days left in the year";
echo "<br>"; //notice we must echo tags in php.

?>
</body>
</html>