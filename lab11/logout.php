<?php
session_start();
//setcookie("Username", "", -1);
unset($_SESSION['Username']);
header("Location: ".$_SERVER['HTTP_REFERER']);
?>