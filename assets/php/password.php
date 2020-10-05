<?php

session_start();
include_once './config/Database.php';

$database = new Database();
$db = $database->connect();

$returnData = array('status' => '', 'message' => '');

$newPass = $_POST['newPassword'];
$rePass = $_POST['rePass'];
$sessionVar = $_SESSION['user_login'];

if(!empty($newPass) && !empty($rePass))
{
    if($newPass !== $rePass)
    {
        $returnData['status'] = "invalid";
        $returnData['message'] = "Passwords doesn't match";
    }
    else
    {
        try {
            $query = "UPDATE individual SET password = :password WHERE qr_code = :qr_code";
            $stmt = $db->prepare($query);
            $stmt->bindParam(":password", $newPass);
            $stmt->bindParam(":qr_code", $sessionVar);
            $stmt->execute();   

            $returnData['status'] = "success";
            $returnData['message'] = "Successfully Updated";
        } catch (PDOException $error) {
            $returnData['status'] = "error";
            $returnData['message'] = $error->getMessage();
        }
    }
}
else
{
    $returnData['status'] = "fillup";
    $returnData['message'] = "Please fill-up";
}

echo json_encode($returnData);