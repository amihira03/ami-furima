@extends('layouts.app')

@section('css')
    <link rel="stylesheet" href="{{ asset('css/mypage/index.css') }}">
@endsection

@section('content')
    @php
        $user = auth()->user();

        $activePage = request('page', 'sell');
        $isSell = $activePage === 'sell';
        $isBuy = $activePage === 'buy';
        $isTrade = $activePage === 'trade';

        $profileImagePath = $user->profile_image_path ?? null;
        $profileImageUrl = $profileImagePath ? \Illuminate\Support\Facades\Storage::url($profileImagePath) : null;
    @endphp

    <main class="mypage">
        <div class="mypage-inner">

            <section class="mypage-profile">
                <div class="mypage-profile-image">
                    @if ($profileImageUrl)
                        <img class="mypage-profile-image-src" src="{{ $profileImageUrl }}" alt="プロフィール画像">
                    @endif
                </div>

                <div class="mypage-profile-info">
                    <p class="mypage-profile-name">{{ $user->name }}</p>

                    @php
                        $rating = $user->rating_average;
                    @endphp

                    @if ($rating !== null)
                        <div class="mypage-profile-rating">
                            @for ($i = 1; $i <= 5; $i++)
                                <span class="mypage-profile-star {{ $i <= $rating ? 'is-active' : '' }}">★</span>
                            @endfor
                        </div>
                    @endif
                </div>

                <a class="mypage-profile-edit" href="{{ route('profile.edit') }}">
                    プロフィールを編集
                </a>
            </section>

            <nav class="mypage-tabs">
                <a href="{{ url('/mypage?page=sell') }}" class="mypage-tab {{ $isSell ? 'is-active' : '' }}">
                    出品した商品
                </a>

                <a href="{{ url('/mypage?page=buy') }}" class="mypage-tab {{ $isBuy ? 'is-active' : '' }}">
                    購入した商品
                </a>

                <a href="{{ url('/mypage?page=trade') }}" class="mypage-tab {{ $isTrade ? 'is-active' : '' }}">
                    取引中の商品
                    @if (!empty($totalUnreadCount))
                        <span class="mypage-tab-badge">{{ $totalUnreadCount }}</span>
                    @endif
                </a>
            </nav>

            <section class="mypage-list">
                @if ($isBuy)
                    <div class="mypage-grid">
                        @forelse ($buyItems as $item)
                            @php
                                $image = $item->image_path ?? null;
                                $imageUrl = null;

                                if ($image) {
                                    $imageUrl = str_starts_with($image, 'images/goods/')
                                        ? asset($image)
                                        : \Illuminate\Support\Facades\Storage::url($image);
                                }
                            @endphp

                            <a class="mypage-card" href="{{ url('/item/' . $item->id) }}">
                                <div class="mypage-card-image-wrap">
                                    @if ($imageUrl)
                                        <img class="mypage-card-image" src="{{ $imageUrl }}"
                                            alt="{{ $item->name }}">
                                    @else
                                        <div class="mypage-card-no-image">商品画像</div>
                                    @endif
                                </div>

                                <p class="mypage-card-name">{{ $item->name }}</p>
                            </a>
                        @empty
                            <p class="mypage-empty">購入した商品はありません。</p>
                        @endforelse
                    </div>
                @elseif ($isTrade)
                    <div class="mypage-grid">
                        @forelse ($tradingPurchases as $purchase)
                            @php
                                $item = $purchase->item;
                                $image = $item->image_path ?? null;
                                $imageUrl = null;

                                if ($image) {
                                    $imageUrl = str_starts_with($image, 'images/goods/')
                                        ? asset($image)
                                        : \Illuminate\Support\Facades\Storage::url($image);
                                }
                            @endphp

                            <a class="mypage-card" href="{{ route('trades.show', $purchase) }}">
                                <div class="mypage-card-image-wrap">
                                    @if (!empty($purchase->unread_count))
                                        <span class="mypage-notification-badge">{{ $purchase->unread_count }}</span>
                                    @endif

                                    @if ($imageUrl)
                                        <img class="mypage-card-image" src="{{ $imageUrl }}"
                                            alt="{{ $item->name }}">
                                    @else
                                        <div class="mypage-card-no-image">商品画像</div>
                                    @endif
                                </div>

                                <p class="mypage-card-name">{{ $item->name }}</p>
                            </a>
                        @empty
                            <p class="mypage-empty">取引中の商品はありません。</p>
                        @endforelse
                    </div>
                @else
                    <div class="mypage-grid">
                        @forelse ($sellItems as $item)
                            @php
                                $image = $item->image_path ?? null;
                                $imageUrl = null;

                                if ($image) {
                                    $imageUrl = str_starts_with($image, 'images/goods/')
                                        ? asset($image)
                                        : \Illuminate\Support\Facades\Storage::url($image);
                                }

                                $isSold = !empty($item->purchase);
                            @endphp

                            <a class="mypage-card" href="{{ url('/item/' . $item->id) }}">
                                <div class="mypage-card-image-wrap {{ $isSold ? 'is-sold' : '' }}">
                                    @if ($imageUrl)
                                        <img class="mypage-card-image" src="{{ $imageUrl }}"
                                            alt="{{ $item->name }}">
                                    @else
                                        <div class="mypage-card-no-image">商品画像</div>
                                    @endif

                                    @if ($isSold)
                                        <span class="mypage-sold">Sold</span>
                                    @endif
                                </div>

                                <p class="mypage-card-name">{{ $item->name }}</p>
                            </a>
                        @empty
                            <p class="mypage-empty">出品した商品はありません。</p>
                        @endforelse
                    </div>
                @endif
            </section>

        </div>
    </main>
@endsection
