<?php include "dbinfo.inc";

if (!empty($_REQUEST["action"])) {
    // Possible actions:
    // [1] login
    // [2] fetch uploaded images
    $action = $_REQUEST["action"];

    // 1
    if ($action == "login" && !empty($_REQUEST["usr"]) && !empty($_REQUEST["pwd"])) {
        // Check in the database if the unique key exists
        $usr = $_REQUEST["usr"];
        $pwd = $_REQUEST["pwd"];
        $conn = mysqli_connect(DB_SERVER, DB_USERNAME, DB_PASSWORD);
        if (mysqli_connect_errno()) err_ajax("Unable to connect to database").
        $db = mysqli_select_db($conn, DB_DATABASE);
        $query = "SELECT * FROM `wt`.`waffles` WHERE `username`='$usr' AND `password`='$pwd'"; //  WHERE `username`='$usr' AND `password`='$pwd'
        $result = mysqli_query($conn, $query);
        if (!$result || mysqli_num_rows($result) == 0) err_ajax("Wrong id.");
    } else err_ajax("Missing id.");
} else err_ajax("No action defined.");

function err_ajax($message) {
    error_log($message);
    header("HTTP/1.1 401 Unauthorized Error");
    die($message);
}

?>
