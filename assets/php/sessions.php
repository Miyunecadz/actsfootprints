<?php

session_start();


$sessionVar = isset($_SESSION['user_login']);


if($sessionVar === null || $sessionVar == null)
{
    echo json_encode(
        array("response"=> "null")
    );   
}
else{
    echo json_encode(
        array("response"=> $sessionVar)
    );
}