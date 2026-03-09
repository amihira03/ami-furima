@extends('layouts.app')

@section('css')
    <link rel="stylesheet" href="{{ asset('css/trades/show.css') }}">
@endsection

@section('content')
    <main class="trade">
        <div class="trade-layout">

            <aside class="trade-sidebar">
                <h2 class="trade-sidebar-title">その他の取引</h2>

                <div class="trade-sidebar-list">
                    @foreach ($otherTrades as $otherTrade)
                        <a class="trade-sidebar-item" href="{{ route('trades.show', $otherTrade) }}">
                            {{ $otherTrade->item->name }}
                        </a>
                    @endforeach
                </div>
            </aside>

            <section class="trade-main">
                <header class="trade-header">
                    <div class="trade-header-user">
                        @php
                            $partnerProfileImagePath = $partner->profile_image_path ?? null;
                            $partnerProfileImageUrl = $partnerProfileImagePath
                                ? \Illuminate\Support\Facades\Storage::url($partnerProfileImagePath)
                                : null;
                        @endphp

                        @if ($partnerProfileImageUrl)
                            <img class="trade-header-user-image" src="{{ $partnerProfileImageUrl }}"
                                alt="{{ $partner->name }}">
                        @else
                            <div class="trade-header-user-image"></div>
                        @endif

                        <h1 class="trade-header-title">「{{ $partner->name }}」さんとの取引画面</h1>
                    </div>

                    @if ($isBuyer && $purchase->buyer_completed_at === null)
                        <button class="trade-complete-button" type="button" data-evaluation-open>
                            取引を完了する
                        </button>
                    @endif
                </header>

                @if (session('error'))
                    <p class="trade-status-message trade-status-message--error">
                        {{ session('error') }}
                    </p>
                @endif

                <section class="trade-item">
                    <div class="trade-item-image-wrap">
                        @php
                            $image = $purchase->item->image_path ?? null;
                            $imageUrl = null;

                            if ($image) {
                                $imageUrl = str_starts_with($image, 'images/goods/')
                                    ? asset($image)
                                    : \Illuminate\Support\Facades\Storage::url($image);
                            }
                        @endphp

                        @if ($imageUrl)
                            <img class="trade-item-image" src="{{ $imageUrl }}" alt="{{ $purchase->item->name }}">
                        @else
                            <div class="trade-item-no-image">商品画像</div>
                        @endif
                    </div>

                    <div class="trade-item-body">
                        <p class="trade-item-name">{{ $purchase->item->name }}</p>
                        <p class="trade-item-price">¥{{ number_format($purchase->item->price) }}</p>
                    </div>
                </section>

                <section class="trade-messages">
                    @foreach ($purchase->messages as $message)
                        @php
                            $isOwnMessage = $message->user_id === auth()->id();
                        @endphp

                        <div class="trade-message {{ $isOwnMessage ? 'is-own' : '' }}">
                            <div class="trade-message-user">
                                @php
                                    $messageUserProfileImagePath = $message->user->profile_image_path ?? null;
                                    $messageUserProfileImageUrl = $messageUserProfileImagePath
                                        ? \Illuminate\Support\Facades\Storage::url($messageUserProfileImagePath)
                                        : null;
                                @endphp

                                @if ($messageUserProfileImageUrl)
                                    <img class="trade-message-user-image" src="{{ $messageUserProfileImageUrl }}"
                                        alt="{{ $message->user->name }}">
                                @else
                                    <div class="trade-message-user-image"></div>
                                @endif

                                <p class="trade-message-user-name">{{ $message->user->name }}</p>
                            </div>

                            <div class="trade-message-display" data-message-display>
                                <div class="trade-message-body">
                                    @if ($message->body)
                                        <p class="trade-message-text">{{ $message->body }}</p>
                                    @endif

                                    @if ($message->image_path)
                                        <img src="{{ \Illuminate\Support\Facades\Storage::url($message->image_path) }}"
                                            alt="取引メッセージ画像" class="trade-message-image">
                                    @endif
                                </div>

                                @if ($isOwnMessage)
                                    <div class="trade-message-actions">
                                        <button type="button" class="trade-message-action-button trade-message-edit-button"
                                            data-edit-toggle>
                                            編集
                                        </button>

                                        <form method="POST" action="{{ route('trades.messages.destroy', $message) }}"
                                            class="trade-message-delete-form">
                                            @csrf
                                            @method('DELETE')
                                            <button type="submit"
                                                class="trade-message-action-button trade-message-delete-button">削除</button>
                                        </form>
                                    </div>
                                @endif
                            </div>

                            @if ($isOwnMessage)
                                <form method="POST" action="{{ route('trades.messages.update', $message) }}"
                                    class="trade-message-edit-form is-hidden" data-edit-form>
                                    @csrf
                                    @method('PATCH')

                                    <textarea name="body" class="trade-message-edit-textarea">{{ $message->body }}</textarea>

                                    <div class="trade-message-edit-actions">
                                        <button type="submit" class="trade-message-edit-action-button">保存</button>
                                        <button type="button" class="trade-message-edit-action-button"
                                            data-edit-cancel>キャンセル</button>
                                    </div>
                                </form>
                            @endif
                        </div>
                    @endforeach
                </section>

                <form class="trade-form" action="{{ route('trades.messages.store', $purchase) }}" method="post"
                    enctype="multipart/form-data">
                    @csrf

                    @error('body')
                        <p class="trade-form-error">{{ $message }}</p>
                    @enderror

                    @error('image')
                        <p class="trade-form-error">{{ $message }}</p>
                    @enderror

                    <div class="trade-form-row">
                        <div class="trade-form-textarea-wrap">
                            <textarea name="body" class="trade-form-textarea" placeholder="取引メッセージを記入してください" data-trade-message-input>{{ old('body', session('trade_body_' . $purchase->id)) }}</textarea>
                        </div>

                        <label class="trade-image-label">
                            画像を追加
                            <input type="file" name="image" class="trade-file-input" accept=".jpeg,.jpg,.png"
                                data-trade-file-input>
                        </label>

                        <button type="submit" class="trade-submit-button">
                            <img src="{{ asset('images/icons/send-button.png') }}" alt="送信"
                                class="trade-submit-button-image">
                        </button>
                    </div>

                    <div class="trade-image-preview is-hidden" data-image-preview-wrap>
                        <p class="trade-image-preview-name" data-image-preview-name></p>
                        <img class="trade-image-preview-image" src="" alt="選択画像プレビュー" data-image-preview-image>
                    </div>
                </form>

                @php
                    $oldScore = old('score');
                    $shouldOpenEvaluationModal = $showSellerEvaluationModal || $errors->has('score');
                @endphp

                <div class="trade-modal-overlay {{ $shouldOpenEvaluationModal ? '' : 'is-hidden' }}" data-evaluation-modal>
                    <div class="trade-modal">
                        <p class="trade-modal-title">取引が完了しました。</p>

                        <form action="{{ route('trades.evaluations.store', $purchase) }}" method="POST">
                            @csrf

                            <p class="trade-modal-label">今回の取引相手はどうでしたか？</p>

                            <div class="trade-modal-stars" data-stars>
                                @for ($i = 1; $i <= 5; $i++)
                                    <button type="button"
                                        class="trade-modal-star {{ (int) $oldScore >= $i ? 'is-active' : '' }}" data-star
                                        data-score="{{ $i }}" aria-label="{{ $i }}星">
                                        ★
                                    </button>
                                @endfor
                            </div>

                            <input type="hidden" name="score" class="trade-modal-score-input"
                                value="{{ old('score', '') }}" data-score-input>

                            @error('score')
                                <p class="trade-modal-error">{{ $message }}</p>
                            @enderror

                            <div class="trade-modal-footer">
                                <button type="button" class="trade-modal-close" data-evaluation-close>
                                    閉じる
                                </button>

                                <button class="trade-modal-submit" type="submit">
                                    送信する
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            </section>
        </div>
    </main>
@endsection

@section('js')
    <script>
        document.addEventListener('DOMContentLoaded', () => {

            const messages = document.querySelectorAll('.trade-message');

            messages.forEach((message) => {
                const display = message.querySelector('[data-message-display]');
                const form = message.querySelector('[data-edit-form]');
                const editButton = message.querySelector('[data-edit-toggle]');
                const cancelButton = message.querySelector('[data-edit-cancel]');

                if (!display || !form || !editButton || !cancelButton) {
                    return;
                }

                editButton.addEventListener('click', () => {
                    display.classList.add('is-hidden');
                    form.classList.remove('is-hidden');
                });

                cancelButton.addEventListener('click', () => {
                    form.classList.add('is-hidden');
                    display.classList.remove('is-hidden');
                });
            });

            const textarea = document.querySelector('[data-trade-message-input]');

            if (textarea) {
                textarea.addEventListener('input', () => {
                    fetch("{{ route('trades.body.save', $purchase) }}", {
                        method: 'POST',
                        headers: {
                            'Content-Type': 'application/json',
                            'X-CSRF-TOKEN': '{{ csrf_token() }}',
                            'X-Requested-With': 'XMLHttpRequest'
                        },
                        body: JSON.stringify({
                            body: textarea.value
                        })
                    });
                });
            }

            const evaluationModal = document.querySelector('[data-evaluation-modal]');
            const evaluationOpenButton = document.querySelector('[data-evaluation-open]');
            const evaluationCloseButton = document.querySelector('[data-evaluation-close]');

            if (evaluationModal && evaluationOpenButton) {
                evaluationOpenButton.addEventListener('click', () => {
                    evaluationModal.classList.remove('is-hidden');
                });
            }

            if (evaluationModal && evaluationCloseButton) {
                evaluationCloseButton.addEventListener('click', () => {
                    evaluationModal.classList.add('is-hidden');
                });
            }

            const stars = document.querySelectorAll('[data-star]');
            const scoreInput = document.querySelector('[data-score-input]');

            if (stars.length && scoreInput) {
                const updateStars = (score) => {
                    stars.forEach((star) => {
                        const starScore = Number(star.dataset.score);
                        star.classList.toggle('is-active', starScore <= score);
                    });
                };

                const initialScore = Number(scoreInput.value);
                if (initialScore >= 1 && initialScore <= 5) {
                    updateStars(initialScore);
                }

                stars.forEach((star) => {
                    star.addEventListener('click', () => {
                        const score = Number(star.dataset.score);
                        scoreInput.value = score;
                        updateStars(score);
                    });
                });
            }

            const fileInput = document.querySelector('[data-trade-file-input]');
            const imagePreviewWrap = document.querySelector('[data-image-preview-wrap]');
            const imagePreviewName = document.querySelector('[data-image-preview-name]');
            const imagePreviewImage = document.querySelector('[data-image-preview-image]');

            if (fileInput && imagePreviewWrap && imagePreviewName && imagePreviewImage) {
                fileInput.addEventListener('change', () => {
                    const file = fileInput.files[0];

                    if (!file) {
                        imagePreviewWrap.classList.add('is-hidden');
                        imagePreviewName.textContent = '';
                        imagePreviewImage.src = '';
                        return;
                    }

                    imagePreviewName.textContent = file.name;

                    const reader = new FileReader();

                    reader.addEventListener('load', (event) => {
                        imagePreviewImage.src = event.target.result;
                        imagePreviewWrap.classList.remove('is-hidden');
                    });

                    reader.readAsDataURL(file);
                });
            }
        });
    </script>
@endsection
