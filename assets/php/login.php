<?php

session_start();
include_once './config/Database.php';

$database = new Database();
$db = $database->connect();

$returnData = array('status' => '', 'message' => '');

$username = $_POST['uname'];
$password = $_POST['pass'];

if(!empty($username) && !empty($password))
{
    try {
        $query = "SELECT * FROM individual WHERE qr_code = :qr_code AND password = :password";
        $stmt = $db->prepare($query);
        $stmt->bindParam(':qr_code',$username);
        $stmt->bindParam(':password',$password);
        $stmt->execute();

        $count = $stmt->rowCount();

        if($count>0)
        {
            $_SESSION['user_login'] = $username;
            $returnData['status'] = "success";
            //$returnData['message'] = $username;
        }
        else
        {
            $returnData['status'] = "invalid";
            $returnData['message'] = "Invalid Username or Password";
        }

    } catch (PDOException $error) {
        $returnData['status'] = "error";
        $returnData['message'] = $error->getMessage();
    }
}
else
{
    $returnData['status'] = "fillup";
}

echo json_encode($returnData);
