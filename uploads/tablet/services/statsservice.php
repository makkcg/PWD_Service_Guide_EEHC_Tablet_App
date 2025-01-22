<?php
header('Content-Type: application/json; charset=utf-8');
// Allow CORS for testing purposes
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST");
header("Access-Control-Allow-Headers: Content-Type");

// Read raw JSON input
$rawInput = file_get_contents("php://input");
$decodedInput = json_decode($rawInput, true);

// Check for order in JSON payload
$order = $decodedInput['order'] ?? null;

// Validate the `order` parameter
if ($order === 17) {
    SaveStatistics($decodedInput);
    exit;
}

// Default response for invalid orders
echo json_encode([
    "status" => "error",
    "message" => "Invalid order number or missing payload."
]);
exit;

// Function to process statistics data
function SaveStatistics($input) {
    // Extract views data from the input
    $viewsData = $input['views'] ?? null;

    // Validate the views data
    if (!$viewsData || !is_array($viewsData)) {
        echo json_encode([
            "status" => "error",
            "message" => "Invalid or missing 'views' data."
        ]);
        return;
    }

    // Initialize response
    $response = [
        "status" => "success",
        "received" => []
    ];

    // Process each view object in the array
    foreach ($viewsData as $view) {
        $srid = $view['srid'] ?? null;
        $subsrid = $view['subsrid'] ?? null;
        $subsubsrid = $view['subsubsrid'] ?? null;
        $views = $view['views'] ?? null;
        $source = $view['source'] ?? null;

        // Validate required fields
        if (!$srid || !$views || !$source) {
            $response['received'][] = [
                "status" => "error",
                "message" => "Missing required fields.",
                "data" => $view
            ];
            continue;
        }

        // Simulate saving data to the database
        // Example query (uncomment and use in a real scenario):
        
        include "db_config.php";
        $sql = "INSERT INTO statistics (srid, subsrid, subsubsrid, views, source)
                VALUES ('$srid', '$subsrid', '$subsubsrid', '$views', '$source')";
        if (!mysqli_query($con, $sql)) {
            error_log("Database error: " . mysqli_error($con));
        }
        

        // Log the received data (simulating successful save)
        error_log("Processed stat: srid=$srid, subsrid=$subsrid, subsubsrid=$subsubsrid, views=$views, source=$source");

        // Add to response
        $response['received'][] = [
            "status" => "processed",
            "data" => $view
        ];
    }

    // Return response
    echo json_encode($response);
}
