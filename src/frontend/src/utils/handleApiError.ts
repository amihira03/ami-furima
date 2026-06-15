import axios from "axios";
import type { ValidationErrors } from "../types/error";

/**
 * axiosのエラーから、Laravelのバリデーションエラー(422)を抽出する
 * 422以外のエラー（500など）の場合は空オブジェクトを返す
 */
export const extractValidationErrors = (err: unknown): ValidationErrors => {
    if (axios.isAxiosError(err) && err.response?.status === 422) {
        return err.response.data.errors as ValidationErrors;
    }
    return {};
};
