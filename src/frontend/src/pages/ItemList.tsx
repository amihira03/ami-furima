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
import { useState, useEffect } from "react"; // useEffect を追加
import axiosInstance from "../lib/axios"; // 共通設定を import

// APIから取得するデータの型定義
type Item = {
    id: number;
    name: string;
    price: number;
    image_path: string;
};

const ItemList = () => {
    const [tab, setTab] = useState(0);
    const [items, setItems] = useState<Item[]>([]); // APIから取得したデータを入れる箱

    // ページ表示時にAPIを呼び出す
    useEffect(() => {
        axiosInstance
            .get("/items")
            .then((response) => {
                setItems(response.data); // 取得したデータをitemsにセット
            })
            .catch((error) => {
                console.error("取得失敗", error);
            });
    }, []);

    const handleTabChange = (_: React.SyntheticEvent, newValue: number) => {
        setTab(newValue);
    };
    const navigate = useNavigate();

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

                <Grid container spacing={3}>
                    {items.map((item) => (
                        <Grid size={{ xs: 6, sm: 4, md: 3 }} key={item.id}>
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
                                    height="160"
                                    image={`http://localhost/${item.image_path}`}
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
                                    <Typography
                                        sx={{
                                            color: "#5a5a5a",
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
        </Box>
    );
};

export default ItemList;
