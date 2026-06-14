import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState, useEffect } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";
import axiosInstance from "../lib/axios";

type User = {
    id: number;
    name: string;
};

type Item = {
    id: number;
    name: string;
    image_path: string;
    price: number;
};

type Purchase = {
    id: number;
    item: {
        id: number;
        name: string;
        price: number;
        image_path: string;
    };
};

const MyPage = () => {
    const navigate = useNavigate();
    const [tab, setTab] = useState(0);
    const [user, setUser] = useState<User | null>(null);
    const [myItems, setMyItems] = useState<Item[]>([]);
    const [myPurchases, setMyPurchases] = useState<Purchase[]>([]);
    const [myTrades, setMyTrades] = useState<Purchase[]>([]);

    useEffect(() => {
        axiosInstance.get("/user").then((response) => {
            setUser(response.data);
        });

        axiosInstance.get("/my-items").then((response) => {
            setMyItems(response.data);
        });

        axiosInstance.get("/my-purchases").then((response) => {
            setMyPurchases(response.data);
        });

        axiosInstance.get("/my-trades").then((response) => {
            setMyTrades(response.data);
        });
    }, []);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };

    // タブに応じて表示するデータを切り替える
    const displayItems =
        tab === 0
            ? myItems
            : tab === 1
              ? myPurchases.map((p) => p.item)
              : myTrades.map((p) => p.item);

    return (
        <Container sx={{ py: 6 }}>
            {/* ユーザー情報エリア */}
            <Box
                sx={{
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "space-between",
                    mb: 4,
                }}
            >
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ width: 70, height: 70 }} />
                    <Typography
                        variant="h5"
                        sx={{ color: "white", fontWeight: "bold" }}
                    >
                        {user ? user.name : ""}
                    </Typography>
                </Box>

                <Button
                    variant="outlined"
                    onClick={() => navigate("/profile")}
                    sx={{
                        color: "white",
                        borderColor: "white",
                        borderRadius: "20px",
                        "&:hover": {
                            background: "rgba(255,255,255,0.2)",
                            borderColor: "white",
                        },
                    }}
                >
                    プロフィールを編集
                </Button>
            </Box>

            {/* タブ */}
            <Tabs
                value={tab}
                onChange={handleTabChange}
                sx={{
                    mb: 4,
                    "& .MuiTab-root": {
                        color: "rgba(255,255,255,0.6)",
                        fontWeight: "bold",
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
                <Tab label="出品した商品" />
                <Tab label="購入した商品" />
                <Tab label="取引中の商品" />
            </Tabs>

            {/* 商品グリッド */}
            <Grid container spacing={3}>
                {displayItems.map((item) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.id}>
                        <Card
                            onClick={() => {
                                if (tab === 2) {
                                    const purchase = myTrades.find(
                                        (p) => p.item.id === item.id,
                                    );
                                    navigate(`/trade/${purchase?.id}`);
                                } else {
                                    navigate(`/item/${item.id}`);
                                }
                            }}
                            sx={{
                                cursor: "pointer",
                                position: "relative",
                                border: "1px solid rgba(255, 255, 255, 0.25)",
                                borderRadius: "20px",
                                overflow: "hidden",
                                boxShadow: "0 4px 30px rgba(0, 0, 0, 0.1)",
                                transition: "transform 0.2s, box-shadow 0.2s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 16px 40px rgba(0, 0, 0, 0.2)",
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
                            <CardContent
                                sx={{
                                    position: "absolute",
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
        </Container>
    );
};

export default MyPage;
