<?php

namespace App\Mail;

use App\Models\Purchase;
use Illuminate\Bus\Queueable;
use Illuminate\Mail\Mailable;
use Illuminate\Queue\SerializesModels;

class TradeCompletedNotification extends Mailable
{
    use Queueable, SerializesModels;

    public function __construct(
        public Purchase $purchase
    ) {}

    public function build()
    {
        return $this->subject('取引完了のお知らせ')
            ->view('emails.trade-completed-notification');
    }
}
