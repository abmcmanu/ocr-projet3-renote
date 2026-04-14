<!DOCTYPE html>
<html lang="{{ str_replace('_', '-', app()->getLocale()) }}" class="dark">

<head>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <title>Renote</title>
    @viteReactRefresh
    @vite(['resources/css/app.css', 'resources/js/app.jsx'])
</head>

<body class="min-h-screen bg-white dark:bg-zinc-800 text-zinc-900 dark:text-zinc-100 antialiased">
    <div id="app"></div>
</body>

</html>