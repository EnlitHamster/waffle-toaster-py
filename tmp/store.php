<?php
// This will be the backbone of the app, as it is where the inforamtion is saved and sotred.
// So, first of all: let's check whether the necessary information is present:

if (!empty($_REQUEST["root"]) && !empty($_REQUEST["action"])) {
    // Possible actions for the data storing:
    // [1] Creating a new board
    // [2] Adding new components to a board
    // [3] Updating a board with new information
    $root = $_REQUEST["root"];
    $action = $_REQUEST["action"];

    // 1
    if ($action == "create") {
        // The structure of the information is as follows:
        // root is the representation of the new main board being created, which means
        // it has the name, size of the board, background information
        if (!empty($root["name"]) && !empty($root["size"]) && !empty($root["bg"]) && !empty($root["bg"]["type"])) {
            create_board($root, "../db/" . $root["name"] . "/");
            echo json_encode(array("name" => $root["name"]));
        } else err_ajax("Parameters are missing.");
    }
    // 2
    else if ($action == "add") {
        // Here we are going to set different operations given the type of the
        // object being added:
        // [1] Normal card (straight-forward)
        // [2] Board
        // [3] Diagram

        // First, control if type is set
        if (!empty($root["type"]) && !empty($root["name"]) && !empty($root["object"])) {
            // Standard data prep.
            $type = $root["type"];
            $name = $root["name"];
            $object = $root["object"];
            $object["type"] = $type;
            $main_file = "../db/$name/main.json";
            $board = json_decode(file_get_contents($main_file));

            // 2
            if ($type == "board" && !empty($root["opt"]["existing"])) {
                $existing = $root["opt"]["existing"];
                if ($existing == "false") create_board($object, "../db/$name/" . $object["name"] . "/");
                $board["name"] = $name . "." . $board["name"];
            }
            // 3
            else if ($type == "diagram") {
                // To-Do: Implement diagram storing
            } else err_ajax("Unrecognised object type.");

            // Adding object to json file
            array_push($board["contents"], $root["object"]);
            $json_board = json_encode($board, JSON_PRETTY_PRINT);
            file_put_contents($main_file, $json_board);
        } else err_ajax("Parameters are missing.");
    } else err_ajax("Unrecognised action.");
} else err_ajax("No root or action defined.");

function create_board($root, $dir) {
    $name = $root["name"];
    mkdir($dir, 0777, true);
    $json_file = fopen($dir . "main.json", "w");
    fwrite($json_file, json_encode($root, JSON_PRETTY_PRINT));
    fclose($json_file);
}

function err_ajax($message) {
    error_log($message);
    die($message);
}
?>
