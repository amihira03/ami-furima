import Box from "@mui/material/Box";
import TextField from "@mui/material/TextField";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useNavigate, useParams } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import { useState, useEffect } from "react";
import axiosInstance from "../lib/axios";
import { extractValidationErrors } from "../utils/handleApiError";
import type { ValidationErrors } from "../types/error";

type Item = {
    id: number;
    name: string;
    brand_name: string | null;
    price: number;
    description: string;
    image_path: string;
    condition: { name: string } | null;
    categories: { id: number; name: string }[];
    likes_count: number;
    comments_count: number;
    comments: Comment[];
    purchase: { id: number } | null;
    liked_by_user: boolean;
};

type Comment = {
    id: number;
    body: string;
    user: {
        id: number;
        name: string;
    };
};

const ItemDetail = () => {
    const { id } = useParams();
    const navigate = useNavigate();
    const [item, setItem] = useState<Item | null>(null);
    const [newComment, setNewComment] = useState("");
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>(
        {},
    );
    const isLoggedIn = !!localStorage.getItem("token");

    const handleAddComment = async () => {
        setValidationErrors({});
        try {
            const response = await axiosInstance.post(`/items/${id}/comments`, {
                body: newComment,
            });

            setItem((prev) =>
                prev
                    ? {
                          ...prev,
                          comments: [...prev.comments, response.data],
                          comments_count: prev.comments_count + 1,
                      }
                    : prev,
            );
            setNewComment("");
        } catch (err) {
            const errors = extractValidationErrors(err);
            setValidationErrors(errors);
        }
    };

    const handleToggleLike = async () => {
        if (!isLoggedIn) {
            navigate("/login");
            return;
        }

        const response = await axiosInstance.post(`/items/${id}/like`);

        setItem((prev) =>
            prev
                ? {
                      ...prev,
                      liked_by_user: response.data.liked,
                      likes_count: response.data.likes_count,
                  }
                : prev,
        );
    };

    useEffect(() => {
        axiosInstance
            .get(`/items/${id}`)
            .then((response) => {
                setItem(response.data);
            })
            .catch(() => {
                navigate("/");
            });
    }, [id]);

    if (!item) return null;

    return (
        <Container sx={{ py: 6 }}>
            {/* 戻るボタン */}
            <Button
                onClick={() => navigate("/")}
                variant="outlined"
                startIcon={<ArrowBackIcon />}
                sx={{
                    color: "white",
                    borderColor: "white",
                    borderRadius: "20px",
                    mb: 3,
                    px: 3,
                    "&:hover": {
                        background: "rgba(255,255,255,0.2)",
                        borderColor: "white",
                        color: "white",
                    },
                }}
            >
                一覧に戻る
            </Button>

            <Grid container spacing={4}>
                {/* 左側：商品画像 */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        component="img"
                        src={
                            item.image_path.startsWith("images/")
                                ? `http://localhost/${item.image_path}`
                                : `http://localhost/storage/${item.image_path}`
                        }
                        alt={item.name}
                        sx={{
                            width: "100%",
                            borderRadius: "20px",
                            boxShadow: "0 8px 32px rgba(0,0,0,0.15)",
                        }}
                    />
                </Grid>

                {/* 右側：商品情報 */}
                <Grid size={{ xs: 12, md: 6 }}>
                    <Box
                        sx={{
                            background: "rgba(255,255,255,0.25)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            borderRadius: "20px",
                            p: 4,
                        }}
                    >
                        {/* 商品名 */}
                        <Typography
                            variant="h5"
                            sx={{ fontWeight: "bold", color: "#3d3d3d", mb: 1 }}
                        >
                            {item.name}
                        </Typography>

                        {/* ブランド名 */}
                        {item.brand_name && (
                            <Typography
                                sx={{
                                    color: "#5a5a5a",
                                    mb: 2,
                                    fontSize: "0.9rem",
                                }}
                            >
                                {item.brand_name}
                            </Typography>
                        )}

                        {/* 価格 */}
                        <Typography
                            variant="h4"
                            sx={{ fontWeight: "bold", color: "#3d3d3d", mb: 2 }}
                        >
                            ¥{item.price.toLocaleString()}
                        </Typography>

                        {/* いいね・コメント数 */}
                        <Box sx={{ display: "flex", gap: 3, mb: 3 }}>
                            <Box
                                onClick={handleToggleLike}
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                    cursor: "pointer",
                                }}
                            >
                                {item.liked_by_user ? (
                                    <FavoriteIcon sx={{ color: "#f25d7a" }} />
                                ) : (
                                    <FavoriteBorderIcon
                                        sx={{ color: "#5a5a5a" }}
                                    />
                                )}
                                <Typography sx={{ color: "#5a5a5a" }}>
                                    {item.likes_count}
                                </Typography>
                            </Box>
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                }}
                            >
                                <ChatBubbleOutlineIcon
                                    sx={{ color: "#5a5a5a" }}
                                />
                                <Typography sx={{ color: "#5a5a5a" }}>
                                    {item.comments_count}
                                </Typography>
                            </Box>
                        </Box>

                        {/* 購入ボタン */}
                        <Button
                            fullWidth
                            variant="contained"
                            disabled={!!item.purchase}
                            onClick={() => navigate(`/purchase/${item.id}`)}
                            sx={{
                                mb: 3,
                                py: 1.5,
                                borderRadius: "20px",
                                background: item.purchase
                                    ? "rgba(0,0,0,0.3)"
                                    : "linear-gradient(45deg, #fdb8c4, #b3c6fd)",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                boxShadow: "none",
                                "&.Mui-disabled": {
                                    background: "rgba(0,0,0,0.3)",
                                    color: "white",
                                },
                                "&:hover": {
                                    background: item.purchase
                                        ? "rgba(0,0,0,0.3)"
                                        : "linear-gradient(45deg, #f9a0b0, #9db5f9)",
                                    boxShadow: item.purchase
                                        ? "none"
                                        : "0 4px 20px rgba(0,0,0,0.15)",
                                },
                            }}
                        >
                            {item.purchase ? "売り切れました" : "購入手続きへ"}
                        </Button>

                        <Divider
                            sx={{ mb: 3, borderColor: "rgba(255,255,255,0.5)" }}
                        />

                        {/* 商品説明 */}
                        <Typography
                            sx={{ fontWeight: "bold", color: "#3d3d3d", mb: 1 }}
                        >
                            商品説明
                        </Typography>
                        <Typography sx={{ color: "#5a5a5a", mb: 3 }}>
                            {item.description}
                        </Typography>

                        <Divider
                            sx={{ mb: 3, borderColor: "rgba(255,255,255,0.5)" }}
                        />

                        {/* 商品情報 */}
                        <Typography
                            sx={{ fontWeight: "bold", color: "#3d3d3d", mb: 2 }}
                        >
                            商品の情報
                        </Typography>

                        {/* カテゴリ */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 2,
                            }}
                        >
                            <Typography
                                sx={{ color: "#5a5a5a", minWidth: "80px" }}
                            >
                                カテゴリ
                            </Typography>
                            <Box sx={{ display: "flex", gap: 1 }}>
                                {item.categories.map((category) => (
                                    <Chip
                                        key={category.id}
                                        label={category.name}
                                        size="small"
                                        sx={{
                                            background: "rgba(255,255,255,0.4)",
                                            color: "#3d3d3d",
                                        }}
                                    />
                                ))}
                            </Box>
                        </Box>

                        {/* 商品の状態 */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                            }}
                        >
                            <Typography
                                sx={{ color: "#5a5a5a", minWidth: "80px" }}
                            >
                                商品の状態
                            </Typography>
                            <Typography sx={{ color: "#3d3d3d" }}>
                                {item.condition?.name}
                            </Typography>
                        </Box>
                    </Box>
                </Grid>
            </Grid>

            {/* コメントセクション */}
            <Box
                sx={{
                    mt: 4,
                    background: "rgba(255,255,255,0.25)",
                    backdropFilter: "blur(10px)",
                    WebkitBackdropFilter: "blur(10px)",
                    border: "1px solid rgba(255,255,255,0.3)",
                    borderRadius: "20px",
                    p: 4,
                }}
            >
                <Typography
                    sx={{ fontWeight: "bold", color: "#3d3d3d", mb: 2 }}
                >
                    コメント（{item.comments_count}）
                </Typography>

                {/* コメント一覧 */}
                {item.comments.length > 0 ? (
                    item.comments.map((comment) => (
                        <Box key={comment.id} sx={{ mb: 2 }}>
                            <Typography
                                sx={{
                                    color: "#5a5a5a",
                                    fontSize: "0.8rem",
                                    mb: 0.5,
                                }}
                            >
                                {comment.user.name}
                            </Typography>
                            <Typography sx={{ color: "#3d3d3d" }}>
                                {comment.body}
                            </Typography>
                        </Box>
                    ))
                ) : (
                    <Typography sx={{ color: "#5a5a5a" }}>
                        コメントはまだありません
                    </Typography>
                )}

                {/* コメント投稿フォーム */}
                {isLoggedIn ? (
                    <Box sx={{ display: "flex", gap: 2, mt: 3 }}>
                        <TextField
                            fullWidth
                            placeholder="コメントを入力"
                            value={newComment}
                            onChange={(e) => setNewComment(e.target.value)}
                            error={!!validationErrors.body}
                            helperText={validationErrors.body?.[0]}
                            sx={{
                                "& .MuiOutlinedInput-root": {
                                    "&.Mui-focused fieldset": {
                                        borderColor: "rgba(255,255,255,0.5)",
                                    },
                                },
                            }}
                        />
                        <Button
                            variant="contained"
                            onClick={handleAddComment}
                            sx={{
                                borderRadius: "20px",
                                background:
                                    "linear-gradient(45deg, #fdb8c4, #b3c6fd)",
                                color: "white",
                                boxShadow: "none",
                                whiteSpace: "nowrap",
                                "&:hover": {
                                    background:
                                        "linear-gradient(45deg, #f9a0b0, #9db5f9)",
                                },
                            }}
                        >
                            コメントする
                        </Button>
                    </Box>
                ) : (
                    <Typography
                        sx={{ color: "#5a5a5a", fontSize: "0.85rem", mt: 2 }}
                    >
                        ※ コメントを投稿するにはログインが必要です
                    </Typography>
                )}
            </Box>
        </Container>
    );
};

export default ItemDetail;
