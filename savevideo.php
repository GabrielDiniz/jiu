<?php 
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Headers: Pragma, Cache-Control');

$db = mysql_connect('localhost','root','ak47')or die("Database error"); 

mysql_select_db('jiu', $db) or die(mysql_error());

$result = mysql_query("set names 'utf8'"); 
$cats = implode(',', $_POST['cats']);
$query = "insert into videos values ('{$_POST['id']}','$cats')";

$result = mysql_query($query)or die(mysql_error()); 

header('Location: cadastravideo.php');