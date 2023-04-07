<?php

$ns = "^".$_GET["h"];
$con = mysqli_connect("localhost", "root", "", "student");
$q = "select name from info where name regexp '$ns'";
$result = $mysqli_query($con, $q);

while ($row = mysqli_fetch_row($result)) {
    print("$row[0] <br>");
}
mysqli_close($con);

?>
