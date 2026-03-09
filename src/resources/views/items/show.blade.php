@extends('layouts.app')

@section('css')
    <link rel="stylesheet" href="{{ asset('css/items/show.css') }}">
@endsection

@section('content')
    <main class="items-show">
        <div class="items-show-inner">

            <section class="items-show-left">
                <div class="items-show-image-wrap {{ $item->purchase ? 'is-sold' : '' }}">
                    @php
                        $image = $item->image_path ?? null;
                        $imageUrl = null;

                        if ($image) {
                            $imageUrl = str_starts_with($image, 'images/goods/')
                                ? asset($image)
                                : \Illuminate\Support\Facades\Storage::url($image);
                        }
                    @endphp

                    @if ($imageUrl)
                        <img class="items-show-image" src="{{ $imageUrl }}" alt="{{ $item->name }}">
                    @else
                        <div class="items-show-no-image">商品画像</div>
                    @endif
                    @if ($item->purchase)
                        <span class="items-show-sold">Sold</span>
                    @endif
                </div>
            </section>

            <section class="items-show-right">
                <h1 class="items-show-name">{{ $item->name }}</h1>

                @if (!empty($item->brand_name))
                    <p class="items-show-brand">{{ $item->brand_name }}</p>
                @endif

                <p class="items-show-price">¥{{ number_format($item->price) }}</p>

                <div class="items-show-count">
                    @auth
                        <form method="POST" action="{{ route('items.like', ['item_id' => $item->id]) }}">
                            @csrf
                            <button type="submit" class="items-show-like-button">
                                <img class="items-show-icon"
                                    src="{{ asset($isLiked ? 'images/icons/heart-liked.png' : 'images/icons/heart-default.png') }}"
                                    alt="いいね">
                            </button>
                        </form>
                    @else
                        <a href="/login" class="items-show-like-button">
                            <img class="items-show-icon" src="{{ asset('images/icons/heart-default.png') }}"
                                alt="いいね（ログインが必要です）">
                        </a>
                    @endauth
                    <span class="items-show-count-number">{{ $item->likes_count }}</span>
                </div>

                <div class="items-show-count">
                    <img class="items-show-icon" src="{{ asset('images/icons/comment.png') }}" alt="コメント">
                    <span class="items-show-count-number">{{ $item->comments_count }}</span>
                </div>

                <div class="items-show-actions">
                    @if ($item->purchase)
                        <button class="items-show-purchase-button" type="button" disabled>売り切れました</button>
                    @elseif (auth()->check() && $item->user_id === auth()->id())
                        <button class="items-show-purchase-button" type="button" disabled>自分の商品です</button>
                    @else
                        <a class="items-show-purchase-button" href="/purchase/{{ $item->id }}">購入手続きへ</a>
                    @endif
                </div>

                <section class="items-show-section">
                    <h2 class="items-show-section-title">商品説明</h2>
                    <p class="items-show-description">{{ $item->description }}</p>
                </section>

                <section class="items-show-section">
                    <h2 class="items-show-section-title">商品の情報</h2>

                    <div class="items-show-meta">
                        <p class="items-show-meta-title">カテゴリ</p>
                        <div class="items-show-categories">
                            @foreach ($item->categories as $category)
                                <span class="items-show-category">{{ $category->name }}</span>
                            @endforeach
                        </div>
                    </div>

                    <div class="items-show-meta">
                        <p class="items-show-meta-title">商品の状態</p>
                        <p class="items-show-condition">{{ $item->condition->name }}</p>
                    </div>
                </section>

                <section class="items-show-section">
                    <h2 class="items-show-section-title">コメント（{{ $item->comments_count }}）</h2>

                    @auth
                        <form method="POST" action="{{ route('items.comment.store', ['item_id' => $item->id]) }}" novalidate>
                            @csrf

                            <div class="items-show-comment-form">
                                <textarea name="body" rows="4" placeholder="商品へのコメント" class="items-show-comment-form-textarea">{{ old('body') }}</textarea>

                                @error('body')
                                    <p class="items-show-error">{{ $message }}</p>
                                @enderror
                            </div>

                            <button type="submit" class="items-show-comment-submit">
                                コメントを送信する
                            </button>
                        </form>
                    @else
                        <p class="items-show-login-note">
                            ※ コメントを投稿するにはログインが必要です
                        </p>
                    @endauth

                    <div class="items-show-comments">
                        @forelse ($item->comments as $comment)
                            <div class="items-show-comment">
                                <p class="items-show-comment-user">{{ $comment->user->name }}</p>
                                <p class="items-show-comment-body">{{ $comment->body }}</p>
                            </div>
                        @empty
                            <p class="items-show-no-comments">コメントはまだありません</p>
                        @endforelse
                    </div>
                </section>

            </section>

        </div>
    </main>
@endsection
