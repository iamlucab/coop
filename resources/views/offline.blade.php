<!DOCTYPE html>
<html lang="en" data-bs-theme="light">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>Amigos 98 Community - Offline</title>
    <meta name="theme-color" content="#008000">
    <link rel="icon" type="image/png" href="{{ asset('storage/icons/favicon-96x96.png') }}" sizes="96x96" />
    <link rel="icon" type="image/svg+xml" href="{{ asset('storage/icons/favicon.ico') }}" />
    <link rel="shortcut icon" href="{{ asset('storage/icons/favicon.ico') }}" />
    <link rel="apple-touch-icon" sizes="180x180" href="{{ asset('storage/icons/apple-touch-icon.png') }}" />
    <link rel="manifest" href="{{ asset('site.webmanifest') }}" />
    
    <!-- Bootstrap + Icons -->
    <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
    <link href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css" rel="stylesheet">
    
    <!-- Google Fonts -->
    <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@300;400;500;600;700&display=swap" rel="stylesheet">
    
    <style>
        :root,
        [data-bs-theme="light"] {
            --bs-body-bg: #f8f8f8;
            --bs-body-color: #333333;
            --primary-green: #008000;
            --secondary-green: #e8f4e8;
            --accent-color: #008000;
            --light-bg: #ffffff;
            --dark-text: #333333;
            --darker-green: #006600;
            --light-green: #4CAF50;
        }

        [data-bs-theme="dark"] {
            --bs-body-bg: #121212;
            --bs-body-color: #ffffff;
            --primary-green: #008000;
            --secondary-green: #1a1a1a;
            --accent-color: #008000;
            --light-bg: #1a1a1a;
            --dark-text: #ffffff;
            --darker-green: #006600;
            --light-green: #4CAF50;
        }

        body {
            font-family: 'Poppins', sans-serif;
            background: linear-gradient(135deg, var(--bs-body-bg) 0%, var(--secondary-green) 100%);
            color: var(--bs-body-color);
            transition: all 0.3s ease;
            min-height: 100vh;
            display: flex;
            align-items: center;
            justify-content: center;
            padding: 1rem;
        }

        .offline-container {
            max-width: 500px;
            text-align: center;
            padding: 1.5rem;
            background: var(--light-bg);
            border-radius: 20px;
            box-shadow: 0 8px 25px rgba(0, 128, 0, 0.3);
            margin: 1rem;
        }

        [data-bs-theme="dark"] .offline-container {
            background: rgba(255, 255, 255, 0.1);
            border: 1px solid rgba(255, 255, 255, 0.2);
        }

        .logo-container {
            background: linear-gradient(135deg, var(--primary-green) 0%, var(--darker-green) 100%);
            border-radius: 50%;
            width: 80px;
            height: 80px;
            display: flex;
            align-items: center;
            justify-content: center;
            margin: 0 auto 1rem;
            box-shadow: 0 8px 25px rgba(0, 128, 0, 0.3);
        }

        .logo-text {
            color: white;
            font-size: 2rem;
            font-weight: 700;
        }

        .btn-primary {
            background: linear-gradient(135deg, var(--primary-green) 0%, var(--darker-green) 100%);
            border: none;
            box-shadow: 0 4px 15px rgba(0, 128, 0, 0.3);
        }

        .btn-primary:hover {
            background: linear-gradient(135deg, var(--darker-green) 0%, var(--primary-green) 100%);
            transform: translateY(-2px);
            box-shadow: 0 6px 20px rgba(0, 128, 0, 0.4);
        }

        .btn-outline-primary {
            border: 2px solid var(--primary-green);
            color: var(--primary-green);
        }

        .btn-outline-primary:hover {
            background: var(--primary-green);
            color: white;
        }

        /* Mobile Responsive Adjustments */
        @media (max-width: 576px) {
            .offline-container {
                padding: 1rem;
                margin: 0.5rem;
            }
            
            h2 {
                font-size: 1.3rem !important;
            }
            
            p {
                font-size: 0.9rem !important;
            }
            
            .btn {
                font-size: 0.9rem !important;
                padding: 10px 15px !important;
                min-height: 44px !important;
            }
        }
    </style>
</head>
<body>
    <div class="offline-container">
        <div class="logo-container">
            <img src="{{ asset('storage/icons/ebili-logo.png') }}" alt="Amigos 98 Community Logo" style="width: 60px; height: 60px; object-fit: contain;">
        </div>
        
        <h2 class="mb-3 fw-bold" style="color: var(--primary-green); font-size: 1.5rem;">You're Offline</h2>
        <p class="mb-4" style="font-size: 1rem;">It seems you're currently offline. Please check your internet connection and try again.</p>
        
        <div class="d-flex flex-column gap-3">
            <button class="btn btn-primary btn-lg" onclick="window.location.reload()" style="min-height: 48px; font-size: 1.1rem;">
                <i class="bi bi-arrow-clockwise me-2"></i>Retry Connection
            </button>
            <a href="{{ url('/') }}" class="btn btn-outline-primary btn-lg" style="min-height: 48px; font-size: 1.1rem;">
                <i class="bi bi-house me-2"></i>Go Home
            </a>
        </div>
        
        <div class="mt-4">
            <p class="small text-muted mb-0" style="font-size: 0.85rem;">
                <i class="bi bi-info-circle me-1"></i>When you're back online, this app will work normally again.
            </p>
        </div>
    </div>

    <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</body>
</html>