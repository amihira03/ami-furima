import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";

// ダミーの商品データ（後でLaravelのAPIから取得する）
const items = [
    {
        id: 1,
        name: "腕時計",
        price: 15000,
        image: "https://placehold.co/300x200",
        liked: false,
    },
    {
        id: 2,
        name: "HDD",
        price: 8000,
        image: "https://placehold.co/300x200",
        liked: true,
    },
    {
        id: 3,
        name: "革靴",
        price: 12000,
        image: "https://placehold.co/300x200",
        liked: false,
    },
    {
        id: 4,
        name: "ノートPC",
        price: 45000,
        image: "https://placehold.co/300x200",
        liked: true,
    },
    {
        id: 5,
        name: "マイク",
        price: 5000,
        image: "https://placehold.co/300x200",
        liked: false,
    },
    {
        id: 6,
        name: "バッグ",
        price: 20000,
        image: "https://placehold.co/300x200",
        liked: false,
    },
];

const ItemList = () => {
    const [tab, setTab] = useState(0);
    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    const navigate = useNavigate();
    const displayItems = tab === 0 ? items : items.filter((item) => item.liked);
    return (
        // Box = ページ全体を包む箱
        <Box
            sx={{
                py: 6, // 上下のpadding（6 = 48px）
            }}
        >
            {/* Container = 中身を中央寄せにして最大幅を制限する箱 */}
            <Container>
                {/* タブ(商品一覧/マイリスト) */}
                <Tabs value={tab} onChange={handleTabChange}>
                    <Tab label="おすすめ" />
                    <Tab label="マイリスト" />
                </Tabs>

                {/* Grid = 商品を横に並べるレイアウト */}
                <Grid container spacing={3}>
                    {" "}
                    {/* spacing = カード間の隙間（3 = 24px） */}
                    {displayItems.map((item) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.id}>
                            {/* Card = 商品1枚のカード */}
                            <Card
                                onClick={() => navigate(`/item/${item.id}`)}
                                sx={{
                                    cursor: "pointer",
                                    background: "rgba(255, 255, 255, 0.25)",
                                    backdropFilter: "blur(5px)",
                                    WebkitBackdropFilter: "blur(5px)",
                                    border: "1px solid rgba(255, 255, 255, 0.25)",
                                    borderRadius: "20px",
                                    boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                                    transition:
                                        "transform 0.2s, box-shadow 0.2s",
                                    "&:hover": {
                                        transform: "translateY(-4px)",
                                        boxShadow:
                                            "0 16px 40px rgba(0, 0, 0, 0.2)",
                                    },
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="160" // 画像の高さ
                                    image={item.image}
                                    alt={item.name}
                                    sx={{ borderRadius: "20px 20px 0 0" }} // 上だけ角丸
                                />
                                {/* 商品名・価格 */}
                                <CardContent>
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "#3d3d3d",
                                            fontWeight: "bold", // 商品名：濃いグレー・太字
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "#5a5a5a",
                                            fontSize: "0.85rem",
                                        }}
                                    >
                                        {/* 価格：中グレー */}¥
                                        {item.price.toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
                    ))}
                </Grid>
            </Container>
        </Box>
    );
};

export default ItemList;
