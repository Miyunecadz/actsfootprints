<?php
session_start();
include_once './config/Database.php';

$database = new Database();
$db = $database->connect();

$returnData = array('status' => '', 'message' => '');
$sessionVar = $_SESSION['user_login'];

try{
    $query = 'SELECT is_flagged FROM person WHERE qr_code = :qr_code';
    $stmt = $db->prepare($query);
    $stmt->bindParam(':qr_code',$sessionVar);
    $stmt->execute();

    if($result = $stmt)
    {
        $num = $result->rowCount();

        if($num > 0)
        {
            $data_arr = array();

            while($row = $result->fetch(PDO::FETCH_ASSOC))
            {
                extract($row);

                $data_item = array(
                    'is_flagged' => $is_flagged
                );

                array_push($data_arr,$data_item);
            }
            $returnData['status'] = "success";
            $returnData['message'] = $data_arr;
        }
        else
        {
            $returnData['status'] = "fail";
            $returnData['message'] = "Unable";
            //$returnData['message'] = $num;
        }
    }

}catch(PDOException $error){
    $returnData['status'] = "error";
    $returnData['message'] = $error->getMessage();
}

echo json_encode($returnData);