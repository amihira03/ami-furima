<!doctype html>
<html lang="ja">

<head>
    <meta charset="UTF-8" />
    <meta http-equiv="X-UA-Compatible" content="IE=edge" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>COACHTECH furima</title>
    <link rel="preconnect" href="https://fonts.googleapis.com">
    <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
    <link
        href="https://fonts.googleapis.com/css2?family=Inter:ital,opsz,wght@0,14..32,100..900;1,14..32,100..900&display=swap"
        rel="stylesheet">
    <link rel="stylesheet" href="{{ asset('css/sanitize.css') }}" />
    <link rel="stylesheet" href="{{ asset('css/layouts/app.css') }}" />
    @yield('css')
</head>

<body>
    <header class="site-header">
        <div class="site-header-inner">
            <a class="site-header-logo-link" href="/">
                <img class="site-header-logo" src="{{ asset('images/logo.png') }}" alt="COACHTECH">
            </a>

            @php
                $hideHeaderNav = request()->is('login', 'register', 'email/verify-notice');
            @endphp

            @if (!$hideHeaderNav)
                <form action="/" method="GET" class="site-header-search">
                    @if (request('tab') === 'mylist')
                        <input type="hidden" name="tab" value="mylist">
                    @endif

                    <input class="site-header-search-input" type="text" name="keyword"
                        value="{{ request('keyword') }}" placeholder="なにをお探しですか？">
                </form>

                <nav class="site-header-nav">
                    @guest
                        <a href="/login" class="site-header-link">ログイン</a>
                    @endguest

                    @auth
                        <form method="POST" action="{{ route('logout') }}" class="site-header-logout">
                            @csrf
                            <button type="submit" class="site-header-logout-button">ログアウト</button>
                        </form>
                    @endauth

                    <a href="/mypage" class="site-header-link">マイページ</a>
                    <a href="/sell" class="site-header-sell-button">出品</a>
                </nav>
            @endif
        </div>
    </header>

    @yield('content')
    @yield('js')
</body>

</html>
