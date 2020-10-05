<?php

session_start();

session_unset();
session_destroy();

$responseData = array('status' =>'OK');

echo json_encode($responseData);