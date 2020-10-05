<?php

class Database
{
    // For Deployment
    // private $host = "localhost";
    // private $db_name = "southern_tracing_covid";
    // private $username = "southern_covidtracing";
    // private $password = "namra370h55v!";

    // For Development
    private $host = "localhost";
    private $db_name = "tracing_covid";
    private $username = "root";
    private $password = "";
    private $conn;

    public function connect()
    {
        $this->conn = null;

        try
        {
            $this->conn = new PDO('mysql:host='. $this->host . ';dbname='. $this->db_name, $this->username, $this->password);
            $this->conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
        }
        catch(PDOException $e)
        {
            echo 'Connection Error: '. $e->getMessage();
        }
        return $this->conn;
    }

    public function disconnect()
    {
        $this->conn = null;
    }
}

?>