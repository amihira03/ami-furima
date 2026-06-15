import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import CardMedia from "@mui/material/CardMedia";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import { useNavigate, useSearchParams } from "react-router-dom";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from "react";
import axiosInstance from "../lib/axios";

type Item = {
    id: number;
    name: string;
    price: number;
    image_path: string;
    purchase: { id: number } | null;
};

const ItemList = () => {
    const [tab, setTab] = useState(0);
    const [items, setItems] = useState<Item[]>([]);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        if (newValue === 1 && !isLoggedIn) {
            navigate("/login");
            return;
        }
        setTab(newValue);
    };
    const navigate = useNavigate();
    const isLoggedIn = !!localStorage.getItem("token");

    const [searchParams] = useSearchParams();

    const keyword = searchParams.get("keyword") || "";

    useEffect(() => {
        const url = tab === 1 ? "/my-likes" : "/items";

        axiosInstance
            .get(url, { params: { keyword } })
            .then((response) => {
                setItems(response.data);
            })
            .catch((error) => {
                console.error("取得失敗", error);
            });
    }, [tab, keyword]);

    return (
        <Box sx={{ py: 6 }}>
            <Container>
                <Tabs
                    value={tab}
                    onChange={handleTabChange}
                    sx={{
                        mb: 4,
                        "& .MuiTab-root": {
                            color: "rgba(255,255,255,0.6)",
                            fontWeight: "bold",
                            fontSize: "1.1rem",
                        },
                        "& .Mui-selected": {
                            color: "white !important",
                        },
                        "& .MuiTabs-indicator": {
                            backgroundColor: "white",
                            height: "3px",
                        },
                    }}
                >
                    <Tab label="おすすめ" />
                    <Tab label="マイリスト" />
                </Tabs>

{items.length === 0 ? (
    <Typography
        sx={{ color: "white", textAlign: "center", mt: 4 }}
    >
        該当する商品はありません
    </Typography>
) : (
    <Grid container spacing={3}>
        {items.map((item) => (
            <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.id}>
                            <Card
                                onClick={() => navigate(`/item/${item.id}`)}
                                sx={{
                                    cursor: "pointer",
                                    position: "relative", // 子要素を重ねるための基準点
                                    border: "1px solid rgba(255, 255, 255, 0.25)",
                                    borderRadius: "20px",
                                    overflow: "hidden",
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
                                    height="250"
                                    image={
                                        item.image_path.startsWith("images/")
                                            ? `http://localhost/${item.image_path}`
                                            : `http://localhost/storage/${item.image_path}`
                                    }
                                    alt={item.name}
                                    sx={{ width: "100%", objectFit: "cover" }}
                                />
                                {item.purchase && (
                                    <Box
                                        sx={{
                                            position: "absolute",
                                            inset: 0,
                                            background: "rgba(0,0,0,0.5)",
                                            display: "flex",
                                            alignItems: "center",
                                            justifyContent: "center",
                                        }}
                                    >
                                        <Typography
                                            sx={{
                                                color: "white",
                                                fontWeight: "bold",
                                                fontSize: "1.5rem",
                                                letterSpacing: "0.1em",
                                            }}
                                        >
                                            Sold
                                        </Typography>
                                    </Box>
                                )}
                                <CardContent
                                    sx={{
                                        position: "absolute", // 画像の上に重ねる
                                        bottom: 0,
                                        left: 0,
                                        right: 0,
                                        background: "rgba(255, 255, 255, 0.15)",
                                        backdropFilter: "blur(10px)",
                                        WebkitBackdropFilter: "blur(10px)",
                                        py: 1,
                                        px: 3,
                                        "&:last-child": {
                                            pb: 1,
                                        },
                                    }}
                                >
                                    <Typography
                                        variant="body1"
                                        sx={{
                                            color: "rgba(0, 0, 0, 0.7)",
                                            fontWeight: "bold",
                                        }}
                                    >
                                        {item.name}
                                    </Typography>
                                    <Typography
                                        sx={{
                                            color: "rgba(0, 0, 0, 0.7)",
                                            fontSize: "0.85rem",
                                        }}
                                    >
                                        ¥{item.price.toLocaleString()}
                                    </Typography>
                                </CardContent>
                            </Card>
                        </Grid>
        ))}
    </Grid>
)}
            </Container>
        </Box>
    );
};

export default ItemList;
