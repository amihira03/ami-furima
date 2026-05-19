import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import Tabs from "@mui/material/Tabs";
import Tab from "@mui/material/Tab";
import { useState } from "react";
import Grid from "@mui/material/Grid";
import Card from "@mui/material/Card";
import CardMedia from "@mui/material/CardMedia";
import CardContent from "@mui/material/CardContent";
import { useNavigate } from "react-router-dom";

const MyPage = () => {
    const navigate = useNavigate();
    const myItems = [
        { id: 1, name: "腕時計", image: "https://placehold.co/300x200" },
        { id: 2, name: "HDD", image: "https://placehold.co/300x200" },
        { id: 3, name: "革靴", image: "https://placehold.co/300x200" },
        { id: 4, name: "ノートPC", image: "https://placehold.co/300x200" },
        { id: 5, name: "マイク", image: "https://placehold.co/300x200" },
    ];
    const [tab, setTab] = useState(0);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
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
                {/* アイコン + ユーザー名 */}
                <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
                    <Avatar sx={{ width: 70, height: 70 }} />
                    <Typography
                        variant="h5"
                        sx={{ color: "white", fontWeight: "bold" }}
                    >
                        出品者A
                    </Typography>
                </Box>

                {/* プロフィールを編集ボタン */}
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
                {myItems.map((item) => (
                    <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.id}>
                        <Card
                            sx={{
                                background: "rgba(255,255,255,0.25)",
                                backdropFilter: "blur(5px)",
                                WebkitBackdropFilter: "blur(5px)",
                                border: "1px solid rgba(255,255,255,0.25)",
                                borderRadius: "20px",
                                boxShadow: "0 4px 30px rgba(0,0,0,0.1)",
                                cursor: "pointer",
                                transition: "transform 0.2s, box-shadow 0.2s",
                                "&:hover": {
                                    transform: "translateY(-4px)",
                                    boxShadow: "0 16px 40px rgba(0,0,0,0.2)",
                                },
                            }}
                        >
                            <CardMedia
                                component="img"
                                height="160"
                                image={item.image}
                                alt={item.name}
                                sx={{ borderRadius: "20px 20px 0 0" }}
                            />
                            <CardContent>
                                <Typography
                                    variant="body1"
                                    sx={{
                                        color: "#3d3d3d",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {item.name}
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
