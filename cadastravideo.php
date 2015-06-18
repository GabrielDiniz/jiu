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
?>

<html>
<head>
	<meta charset="utf-8"/>
</head>
<body>
	<form method="post" action="savevideo.php">
		<input name="id"> <br>
		<?php
		foreach ($cats as $key => $value) {
			echo "<input type='checkbox' name='cats[]'  value='{$key}'/> {$value} <br>";
		}
		?>
		<input type="submit" value="Salvar">
	</form>

</body>
</html>