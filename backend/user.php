<?php
/*
error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");

$db_conn = mysqli_connect("localhost", "root", "", "fontdatabase");
if ($db_conn == false) {
        die("Couldn't connect to database" . mysqli_connect_errno());
}
$method = $_SERVER['REQUEST_METHOD'];
// echo 'testing------'.$method;die;
switch ($method) {
        case 'GET':
                $allfont = mysqli_query($db_conn, "SELECT * FROM font_files");
                if (mysqli_num_rows($allfont) > 0) {
                        while ($row = mysqli_fetch_array($allfont)) {
                                $json_array['font_files'][] = array("id" => $row["id"], "fontName" => $row["font_name"], "fontFile" => $row["font_data"]);
                        }
                        echo json_encode($json_array['font_files']);
                        return;
                } else {
                        echo json_encode(["return" => 'Please check the data']);
                        return;
                }
                break;

                case 'POST':
                        $userpostdata = json_decode(file_get_contents("php://input"));
                
                        if (isset($userpostdata->id) && isset($userpostdata->fontFileName) && isset($userpostdata->fontFile)) {
                            $fontId = $userpostdata->id;
                            $fontName = $userpostdata->fontFileName;
                            $fontFile = $userpostdata->fontFile;
                
                            
                            $stmt = mysqli_prepare($db_conn, "INSERT INTO font_files (id, font_name, font_data) VALUES (?, ?, ?)");
                
                            // Bind the parameters
                            mysqli_stmt_bind_param($stmt, "sss", $fontId, $fontName, $fontFile);
                
                            // Execute the 
                            if (mysqli_stmt_execute($stmt)) {
                                echo json_encode(["success" => 'font added successfully']);
                            } else {
                                echo json_encode(["error" => 'Failed to add font']);
                            }
                
                            // Close 
                            mysqli_stmt_close($stmt);
                        } else {
                            echo json_encode(["error" => "Invalid data format"]);
                        }
                
                        break; 
                }
                */

error_reporting(E_ALL);
ini_set('display_errors', 1);
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Headers: *");
header("Access-Control-Allow-Methods: *");
header("Content-Type: application/json"); // Set Content-Type header to JSON

$db_conn = mysqli_connect("localhost", "root", "", "fontdatabase");
if ($db_conn == false) {
    die("Couldn't connect to the database" . mysqli_connect_errno());
}

$method = $_SERVER['REQUEST_METHOD'];

switch ($method) {
    case 'GET':
        $allfont = mysqli_query($db_conn, "SELECT * FROM font_files");
        if (mysqli_num_rows($allfont) > 0) {
            $font_files = array();
            while ($row = mysqli_fetch_assoc($allfont)) {
                $font_files[] = $row;
            }
            echo json_encode(["font_files" => $font_files]);
        } else {
            echo json_encode(["error" => 'No fonts found']);
        }
        break;

    case 'POST':
        $userpostdata = json_decode(file_get_contents("php://input"));

        if (isset($userpostdata->fontFileName)) {
            $fontName = mysqli_real_escape_string($db_conn, $userpostdata->fontFileName);
            $fontFile = '';

            $stmt = mysqli_prepare($db_conn, "INSERT INTO font_files (font_name, font_data) VALUES (?, ?)");

            mysqli_stmt_bind_param($stmt, "ss", $fontName, $fontFile);

            if (mysqli_stmt_execute($stmt)) {
                echo json_encode(["success" => 'Font added successfully']);
            } else {
                echo json_encode(["error" => 'Failed to add font']);
            }

            mysqli_stmt_close($stmt);
        } else {
            echo json_encode(["error" => "Invalid data format"]);
        }

        break;

        case 'DELETE':
            
            $idToDelete = $_GET['id'];
    
            if (isset($idToDelete)) {
                $idToDelete = mysqli_real_escape_string($db_conn, $idToDelete);
    
                $stmt = mysqli_prepare($db_conn, "DELETE FROM font_files WHERE id = ?");
                mysqli_stmt_bind_param($stmt, "i", $idToDelete);
    
                if (mysqli_stmt_execute($stmt)) {
                    echo json_encode(["success" => 'Font deleted successfully']);
                } else {
                    echo json_encode(["error" => 'Failed to delete font']);
                }
    
                mysqli_stmt_close($stmt);
            } else {
                echo json_encode(["error" => "Invalid data format"]);
            }
    
            break;
}
