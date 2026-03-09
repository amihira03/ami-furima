@extends('layouts.app')

@section('css')
    <link rel="stylesheet" href="{{ asset('css/items/index.css') }}">
@endsection

@section('content')
    <main class="items-index">

        <div class="items-index-tabs">
            <a href="/{{ request('keyword') ? '?keyword=' . urlencode(request('keyword')) : '' }}"
                class="items-index-tab {{ request('tab') !== 'mylist' ? 'is-active' : '' }}">
                おすすめ
            </a>

            <a href="/?tab=mylist{{ request('keyword') ? '&keyword=' . urlencode(request('keyword')) : '' }}"
                class="items-index-tab {{ request('tab') === 'mylist' ? 'is-active' : '' }}">
                マイリスト
            </a>
        </div>

        <div class="items-index-grid">
            @forelse($items as $item)
                <a class="items-index-card" href="/item/{{ $item->id }}">
                    <div class="items-index-image-wrap {{ $item->purchase ? 'is-sold' : '' }}">

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
                            <img class="items-index-image" src="{{ $imageUrl }}" alt="{{ $item->name }}">
                        @else
                            <div class="items-index-no-image">No Image</div>
                        @endif

                        @if ($item->purchase)
                            <span class="items-index-sold">Sold</span>
                        @endif
                    </div>

                    <p class="items-index-name">{{ $item->name }}</p>
                </a>
            @empty
                @if (!(auth()->guest() && request('tab') === 'mylist'))
                    <p class="items-index-empty">該当商品はありません。</p>
                @endif
            @endforelse
        </div>

    </main>
@endsection
