<?php

// Keep API responses as clean JSON, even if internal warnings occur.
ini_set('display_errors', '0');

// CORS headers (for Angular / frontend apps)
header("Access-Control-Allow-Origin: *");
header("Access-Control-Allow-Methods: POST, OPTIONS");
header("Access-Control-Allow-Headers: Content-Type");
header("Content-Type: application/json; charset=utf-8");

// ------------------------------------------------------------
// WICHTIG:
// Deine eigene Adresse in Zeile 18 setzen!
// ------------------------------------------------------------

// >>> DEINE EMAIL HIER EINTRAGEN <<<
$siteEmail = "maik.pankow@gmx.de";

switch ($_SERVER['REQUEST_METHOD']) {

    case 'OPTIONS':
        // Preflight request
        http_response_code(200);
        exit;

    case 'POST':
        $contentType = $_SERVER['CONTENT_TYPE'] ?? '';
        $isJsonRequest = stripos($contentType, 'application/json') !== false;
        $redirectBase = '../index.html';

        // Support both JSON requests and normal form submissions.
        if ($isJsonRequest) {
            $json = file_get_contents('php://input');
            $params = json_decode($json, true);

        // Saubere JSON-Fehlerprüfung
        if (json_last_error() !== JSON_ERROR_NONE) {
            if ($isJsonRequest) {
                http_response_code(400);
                echo json_encode(['success' => false, 'error' => 'Invalid JSON']);
            } else {
                header('Location: ' . $redirectBase . '?mail=invalid-json#contact');
            }
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
            } else {
                header('Location: ' . $redirectBase . '?mail=invalid-data#contact');
            }
            exit;
        }

        // Sanitize content
        $safeName = htmlspecialchars($name, ENT_QUOTES, 'UTF-8');
        $safeEmail = htmlspecialchars($email, ENT_QUOTES, 'UTF-8');
        $safeMessage = nl2br(htmlspecialchars($userMessage, ENT_QUOTES, 'UTF-8'));

        // Empfängeradresse (nutzt die oben definierte Mail)
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
        $headers[] = 'Return-Path: ' . $siteEmail; 

        // Send mail and capture warnings (e.g. SMTP not configured on XAMPP).
        $mailWarning = '';
        set_error_handler(function ($severity, $message) use (&$mailWarning) {
            $mailWarning = $message;
            return true;
        });

        $success = mail(
            $recipient,
            $subject,
            $mailBody,
            implode("\r\n", $headers),
            '-f ' . $siteEmail 
        );

        restore_error_handler();

        if ($success) {
            if ($isJsonRequest) {
                echo json_encode(['success' => true]);
            } else {
                header('Location: ' . $redirectBase . '?mail=success#contact');
            }
        } else {
            $errorMessage = 'Mail delivery failed';
            if ($mailWarning !== '') {
                $errorMessage = 'Mail delivery failed: SMTP is not configured on the server.';
            }

            if ($isJsonRequest) {
                http_response_code(500);
                echo json_encode(['success' => false, 'error' => $errorMessage]);
            } else {
                header('Location: ' . $redirectBase . '?mail=failed#contact');
            }
        }

        break;

    default:
        http_response_code(405);
        echo json_encode(['success' => false, 'error' => 'Method not allowed']);
        exit;
}
?>