import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Grid from "@mui/material/Grid";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import Chip from "@mui/material/Chip";
import Divider from "@mui/material/Divider";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutlineOutlined";
import { useNavigate } from "react-router-dom";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";

// ダミーデータ（後でLaravelのAPIから取得する）
const item = {
    id: 1,
    name: "腕時計",
    brand: "Rolax",
    price: 15000,
    description: "スタイリッシュなデザインのメンズ腕時計",
    categories: ["ファッション", "メンズ"],
    condition: "良好",
    likes: 0,
    comments: 0,
    image: "https://placehold.co/600x400",
};

const ItemDetail = () => {
    const navigate = useNavigate();
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
                        src={item.image}
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
                            background: "rgba(255,255,255,0.25)", // すりガラスの色
                            backdropFilter: "blur(10px)", // ぼかし
                            WebkitBackdropFilter: "blur(10px)", // Safari用
                            border: "1px solid rgba(255,255,255,0.3)",
                            borderRadius: "20px",
                            p: 4, // 内側のpadding
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
                        <Typography
                            sx={{ color: "#5a5a5a", mb: 2, fontSize: "0.9rem" }}
                        >
                            {item.brand}
                        </Typography>

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
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 0.5,
                                }}
                            >
                                <FavoriteBorderIcon sx={{ color: "#5a5a5a" }} />
                                <Typography sx={{ color: "#5a5a5a" }}>
                                    {item.likes}
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
                                    {item.comments}
                                </Typography>
                            </Box>
                        </Box>

                        {/* 購入ボタン */}
                        <Button
                            fullWidth // 横幅いっぱい
                            variant="contained" // 背景あり
                            sx={{
                                mb: 3,
                                py: 1.5,
                                borderRadius: "20px",
                                background:
                                    "linear-gradient(45deg, #fdb8c4, #b3c6fd)",
                                color: "white",
                                fontWeight: "bold",
                                fontSize: "1rem",
                                boxShadow: "none",
                                "&:hover": {
                                    background:
                                        "linear-gradient(45deg, #f9a0b0, #9db5f9)",
                                    boxShadow: "0 4px 20px rgba(0,0,0,0.15)",
                                },
                            }}
                        >
                            購入手続きへ
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
                                        key={category}
                                        label={category}
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
                                {item.condition}
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
                    コメント（{item.comments}）
                </Typography>
                <Typography
                    sx={{ color: "#5a5a5a", fontSize: "0.85rem", mb: 1 }}
                >
                    ※ コメントを投稿するにはログインが必要です
                </Typography>
                <Typography sx={{ color: "#5a5a5a" }}>
                    コメントはまだありません
                </Typography>
            </Box>
        </Container>
    );
};

export default ItemDetail;
