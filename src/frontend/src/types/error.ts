// Laravelのバリデーションエラーレスポンス形式
// 例: { shipping_postal_code: ["郵便番号を入力してください"], shipping_address: ["住所を入力してください"] }
export type ValidationErrors = Record<string, string[]>;
