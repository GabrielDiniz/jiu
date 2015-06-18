<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Pragma, Cache-Control');

$db = mysql_connect('localhost','root','ak47')or die("Database error"); 

mysql_select_db('jiu', $db) or die(mysql_error());

$result = mysql_query("set names 'utf8'"); 
$query = "SELECT * from categorias";

$result = mysql_query($query)or die(mysql_error()); 

$cats=array();

while($row = mysql_fetch_row($result)){
	$cats[(int)$row[0]] = $row[1];
}

$result = mysql_query("set names 'utf8'"); 
$query = "SELECT * from videos";

$result = mysql_query($query)or die(mysql_error()); 

$videos=array();

while($row = mysql_fetch_row($result)){
	$videos[$row[0]] = explode(',', $row[1]);
}

echo json_encode(array('categorias'=>$cats,'videos'=>$videos,'inicio'=>array(6,4,9,12,8,7,5,31,14,34)));