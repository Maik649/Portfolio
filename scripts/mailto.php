<?php

// Keep API responses as clean JSON, even if internal warnings occur.
ini_set('display_errors', '0');

// CORS headers (for JSON/API clients)
header('Access-Control-Allow-Origin: *');
header('Access-Control-Allow-Methods: POST, OPTIONS');
header('Access-Control-Allow-Headers: Content-Type');

// Target mailbox
$siteEmail = "info@maikpankow.de";
$redirectBase = '../index.html#hero-section';

/**
 * Redirects the browser form flow back to the contact section with status.
 *
 * @param string $status
 * @param string $redirectBasePath
 * @return void
 */
function redirectWithMailStatus($status, $redirectBasePath)
{
    header('Location: ' . $redirectBasePath . '?mail=' . rawurlencode($status) . '#contact');
    exit;
}

switch ($_SERVER['REQUEST_METHOD']) {

    case 'OPTIONS':
        http_response_code(200);
        exit;

    case 'POST':
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        $isJsonRequest = stripos($contentType, 'application/json') !== false;

        if ($isJsonRequest) {
            header('Content-Type: application/json; charset=utf-8');
        }

        // Support both JSON requests and normal form submissions.
        if ($isJsonRequest) {
            $json = file_get_contents('php://input');
            $params = json_decode($json, true);

            if (json_last_error() !== JSON_ERROR_NONE) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
                exit;
            }

            $email = $params['email'] ?? '';
            $name = $params['name'] ?? '';
            $userMessage = $params['message'] ?? '';
        } else {
            $email = $_POST['email'] ?? '';
            $name = $_POST['name'] ?? '';
            $userMessage = $_POST['message'] ?? '';
        }

        // Basic validation
        if (!filter_var($email, FILTER_VALIDATE_EMAIL) || empty($name) || empty($userMessage)) {
            if ($isJsonRequest) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid input data']);
                exit;
            } else {
                redirectWithMailStatus('invalid-data', $redirectBase);
            }
        }

        // Sanitize content
        $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
        $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
        $safeMessage = nl2br(htmlspecialchars($userMessage, ENT_QUOTES, 'UTF-8'));

        $recipient = $siteEmail;
        $subject = 'Contact Form Portfolio';

        $mailBody = "
            <strong>Name:</strong> {$safeName}<br>
            <strong>Email:</strong> {$safeEmail}<br><br>
            <strong>Message:</strong><br>
            {$safeMessage}
        ";

        // Mail headers
        $headers = [];
        $headers[] = 'MIME-Version: 1.0';
        $headers[] = 'Content-type: text/html; charset=utf-8';
        $headers[] = 'From: Website Kontakt <' . $siteEmail . '>';
        $headers[] = 'Reply-To: ' . $email;
        $headerString = implode("\r\n", $headers);

        $success = mail($recipient, $subject, $mailBody, $headerString);

        if ($success) {
            if ($isJsonRequest) {
                echo json_encode(['success' => true]);
                exit;
            } else {
                redirectWithMailStatus('success', $redirectBase);
            }
        } else {
            if ($isJsonRequest) {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => 'Mail delivery failed']);
                exit;
            } else {
                redirectWithMailStatus('failed', $redirectBase);
            }
        }

        break;

    default:
        header('Content-Type: application/json; charset=utf-8');
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit;
}
?>