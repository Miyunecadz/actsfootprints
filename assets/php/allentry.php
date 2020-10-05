<?php
session_start();
include_once './config/Database.php';

$database = new Database();
$db = $database->connect();

$returnData = array('status' => '', 'message' => '');

$sessionVar = $_SESSION['user_login'];


try{
    $query= "SELECT entry_date, visited FROM entry 
            WHERE first_name = (SELECT first_name FROM person WHERE qr_code = :qr_code) 
            AND last_name = (SELECT last_name FROM person WHERE qr_code = :qr_code)
            ";

    $stmt = $db->prepare($query);
    $stmt->bindParam(':qr_code', $sessionVar);
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
                    'entry_date' => $entry_date,
                    'visited' => $visited
                );

                array_push($data_arr,$data_item);
            }
            $returnData['status'] = "success";
            $returnData['message'] = $data_arr;
        }
        else
        {
            $returnData['status'] = "fail";
            $returnData['message'] = "No Entry";
            //$returnData['message'] = $num;
        }
    }

}catch(PDOException $error){
    $returnData['status'] = "error";
    $returnData['message'] = $error->getMessage();
}

echo json_encode($returnData);
