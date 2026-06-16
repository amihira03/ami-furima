import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useState, useEffect } from "react";
import { Link, useParams } from "react-router-dom";
import Modal from "@mui/material/Modal";
import axiosInstance from "../lib/axios";
import { extractValidationErrors } from "../utils/handleApiError";
import { getImageUrl } from "../utils/getImageUrl";
import type { ValidationErrors } from "../types/error";

type User = {
    id: number;
    name: string;
};

type Item = {
    id: number;
    name: string;
    price: number;
    image_path: string;
};

type TradeMessage = {
    id: number;
    user_id: number;
    body: string;
    user: User;
};

type Purchase = {
    id: number;
    item: Item;
    messages: TradeMessage[];
};

type OtherTrade = {
    id: number;
    item: Item;
    latest_message_at: string;
};

const Trade = () => {
    const { id } = useParams();

    const [modalOpen, setModalOpen] = useState(false);
    const [score, setScore] = useState(0);
    const [evaluationErrors, setEvaluationErrors] = useState<ValidationErrors>(
        {},
    );

    const [purchase, setPurchase] = useState<Purchase | null>(null);
    const [otherTrades, setOtherTrades] = useState<OtherTrade[]>([]);
    const [partner, setPartner] = useState<User | null>(null);
    const [currentUserId, setCurrentUserId] = useState<number | null>(null);
    const [newMessage, setNewMessage] = useState("");
    const [messageErrors, setMessageErrors] = useState<ValidationErrors>({});

    useEffect(() => {
        axiosInstance.get(`/purchases/${id}`).then((response) => {
            setPurchase(response.data.purchase);
            setPartner(response.data.partner);
            setOtherTrades(response.data.other_trades);
        });

        axiosInstance.get("/user").then((response) => {
            setCurrentUserId(response.data.id);
        });
    }, [id]);

    const handleSendMessage = async () => {
        setMessageErrors({});
        try {
            const response = await axiosInstance.post(
                `/purchases/${id}/messages`,
                { body: newMessage },
            );

            setPurchase((prev) =>
                prev
                    ? { ...prev, messages: [...prev.messages, response.data] }
                    : prev,
            );
            setNewMessage("");
        } catch (err) {
            const errors = extractValidationErrors(err);
            setMessageErrors(errors);
        }
    };

    if (!purchase) return null;

    // 取引を完了する
    const handleCompleteTrade = async () => {
        await axiosInstance.post(`/purchases/${id}/complete`);
        setModalOpen(true);
    };

    // 評価を送信する
    const handleSubmitEvaluation = async () => {
        setEvaluationErrors({});
        try {
            await axiosInstance.post(`/purchases/${id}/evaluate`, { score });
            setModalOpen(false);
        } catch (err) {
            const errors = extractValidationErrors(err);
            setEvaluationErrors(errors);
        }
    };

    const imageUrl = getImageUrl(purchase.item.image_path);

    return (
        <Container sx={{ py: 6 }}>
            <Grid container spacing={4}>
                {/* 左側：サイドバー */}
                <Grid size={{ xs: 12, md: 3 }}>
                    <Box
                        sx={{
                            background: "rgba(255,255,255,0.25)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            borderRadius: "20px",
                            p: 3,
                        }}
                    >
                        <Typography
                            variant="h6"
                            sx={{ color: "#3d3d3d", fontWeight: "bold", mb: 2 }}
                        >
                            その他の取引
                        </Typography>

                        {otherTrades.length === 0 && (
                            <Typography
                                sx={{ color: "#5a5a5a", fontSize: "0.85rem" }}
                            >
                                現在、他の取引はありません
                            </Typography>
                        )}

                        {otherTrades.map((trade) => {
                            const imageUrl = getImageUrl(trade.item.image_path);

                            return (
                                <Box
                                    key={trade.id}
                                    component={Link}
                                    to={`/trade/${trade.id}`}
                                    sx={{
                                        display: "flex",
                                        alignItems: "center",
                                        gap: 1.5,
                                        mb: 2,
                                        p: 1.5,
                                        borderRadius: "10px",
                                        textDecoration: "none",
                                        background: "rgba(255,255,255,0.3)",
                                        "&:hover": {
                                            background: "rgba(255,255,255,0.5)",
                                        },
                                    }}
                                >
                                    <Box
                                        component="img"
                                        src={imageUrl}
                                        alt={trade.item.name}
                                        sx={{
                                            borderRadius: "8px",
                                            width: 50,
                                            height: 50,
                                            objectFit: "cover",
                                        }}
                                    />
                                    <Typography
                                        sx={{
                                            color: "#3d3d3d",
                                            fontSize: "0.85rem",
                                            fontWeight: "bold",
                                            overflow: "hidden",
                                            textOverflow: "ellipsis",
                                            whiteSpace: "nowrap",
                                        }}
                                    >
                                        {trade.item.name}
                                    </Typography>
                                </Box>
                            );
                        })}
                    </Box>
                </Grid>

                {/* 右側：メイン */}
                <Grid size={{ xs: 12, md: 9 }}>
                    <Box
                        sx={{
                            background: "rgba(255,255,255,0.25)",
                            backdropFilter: "blur(10px)",
                            WebkitBackdropFilter: "blur(10px)",
                            border: "1px solid rgba(255,255,255,0.3)",
                            borderRadius: "20px",
                            p: 3,
                        }}
                    >
                        {/* ヘッダー */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                justifyContent: "space-between",
                                mb: 3,
                                pb: 3,
                                borderBottom: "1px solid rgba(255,255,255,0.3)",
                            }}
                        >
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                }}
                            >
                                <Avatar sx={{ width: 50, height: 50 }} />
                                <Typography
                                    sx={{
                                        color: "#3d3d3d",
                                        fontWeight: "bold",
                                    }}
                                >
                                    「{partner?.name}」さんとの取引画面
                                </Typography>
                            </Box>

                            <Button
                                variant="outlined"
                                onClick={handleCompleteTrade}
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
                                取引を完了する
                            </Button>
                        </Box>

                        {/* 商品情報 */}
                        <Box
                            sx={{
                                display: "flex",
                                alignItems: "center",
                                gap: 2,
                                mb: 3,
                                pb: 3,
                                borderBottom: "1px solid rgba(255,255,255,0.3)",
                            }}
                        >
                            <Box
                                component="img"
                                src={imageUrl}
                                alt={purchase.item.name}
                                sx={{
                                    borderRadius: "10px",
                                    width: 80,
                                    height: 80,
                                    objectFit: "cover",
                                }}
                            />
                            <Box>
                                <Typography
                                    sx={{
                                        color: "#3d3d3d",
                                        fontWeight: "bold",
                                    }}
                                >
                                    {purchase.item.name}
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#5a5a5a",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    ¥{purchase.item.price.toLocaleString()}
                                </Typography>
                            </Box>
                        </Box>

                        {/* メッセージ一覧 */}
                        <Box sx={{ mb: 3 }}>
                            {purchase.messages.map((message) => {
                                const isMine =
                                    message.user_id === currentUserId;
                                return (
                                    <Box
                                        key={message.id}
                                        sx={{
                                            display: "flex",
                                            gap: 2,
                                            mb: 2,
                                            justifyContent: isMine
                                                ? "flex-end"
                                                : "flex-start",
                                        }}
                                    >
                                        {!isMine && (
                                            <Avatar
                                                sx={{ width: 40, height: 40 }}
                                            />
                                        )}
                                        <Box>
                                            <Typography
                                                sx={{
                                                    color: "#5a5a5a",
                                                    fontSize: "0.8rem",
                                                    mb: 0.5,
                                                    textAlign: isMine
                                                        ? "right"
                                                        : "left",
                                                }}
                                            >
                                                {isMine
                                                    ? "自分"
                                                    : message.user.name}
                                            </Typography>
                                            <Box
                                                sx={{
                                                    background: isMine
                                                        ? "rgba(255,255,255,0.7)"
                                                        : "rgba(255,255,255,0.5)",
                                                    borderRadius: "10px",
                                                    p: 2,
                                                    maxWidth: "400px",
                                                }}
                                            >
                                                <Typography
                                                    sx={{ color: "#3d3d3d" }}
                                                >
                                                    {message.body}
                                                </Typography>
                                            </Box>
                                        </Box>
                                        {isMine && (
                                            <Avatar
                                                sx={{ width: 40, height: 40 }}
                                            />
                                        )}
                                    </Box>
                                );
                            })}

                            {/* メッセージ入力フォーム */}
                            <Box
                                sx={{
                                    display: "flex",
                                    alignItems: "center",
                                    gap: 2,
                                    pt: 3,
                                    borderTop:
                                        "1px solid rgba(255,255,255,0.3)",
                                }}
                            >
                                <TextField
                                    fullWidth
                                    placeholder="取引メッセージを記入してください"
                                    multiline
                                    rows={2}
                                    value={newMessage}
                                    onChange={(e) =>
                                        setNewMessage(e.target.value)
                                    }
                                    error={!!messageErrors.body}
                                    helperText={messageErrors.body?.[0]}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor:
                                                    "rgba(255,255,255,0.5)",
                                            },
                                        },
                                    }}
                                />
                                <Button
                                    variant="contained"
                                    onClick={handleSendMessage}
                                    sx={{
                                        borderRadius: "50%",
                                        minWidth: "50px",
                                        height: "50px",
                                        background:
                                            "linear-gradient(45deg, #fdb8c4, #b3c6fd)",
                                        boxShadow: "none",
                                        "&:hover": {
                                            background:
                                                "linear-gradient(45deg, #f9a0b0, #9db5f9)",
                                        },
                                    }}
                                >
                                    <SendIcon />
                                </Button>
                            </Box>

                            {/* 評価モーダル */}
                            <Modal
                                open={modalOpen}
                                onClose={() => setModalOpen(false)}
                            >
                                <Box
                                    sx={{
                                        position: "absolute",
                                        top: "50%",
                                        left: "50%",
                                        transform: "translate(-50%, -50%)",
                                        background: "rgba(255,255,255,0.9)",
                                        backdropFilter: "blur(10px)",
                                        borderRadius: "20px",
                                        p: 4,
                                        width: 400,
                                        textAlign: "center",
                                    }}
                                >
                                    <Typography
                                        variant="h6"
                                        sx={{
                                            color: "#3d3d3d",
                                            fontWeight: "bold",
                                            mb: 2,
                                        }}
                                    >
                                        取引が完了しました。
                                    </Typography>
                                    <Typography
                                        sx={{ color: "#5a5a5a", mb: 3 }}
                                    >
                                        今回の取引相手はどうでしたか？
                                    </Typography>
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            gap: 1,
                                            mb: 1,
                                        }}
                                    >
                                        {[1, 2, 3, 4, 5].map((star) => (
                                            <Typography
                                                key={star}
                                                onClick={() => setScore(star)}
                                                sx={{
                                                    fontSize: "2rem",
                                                    cursor: "pointer",
                                                    color:
                                                        score >= star
                                                            ? "#fdb8c4"
                                                            : "#ccc",
                                                }}
                                            >
                                                ★
                                            </Typography>
                                        ))}
                                    </Box>
                                    {evaluationErrors.score && (
                                        <Typography
                                            sx={{
                                                color: "error.main",
                                                fontSize: "0.85rem",
                                                mb: 2,
                                            }}
                                        >
                                            {evaluationErrors.score[0]}
                                        </Typography>
                                    )}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 2,
                                            justifyContent: "center",
                                            mt: evaluationErrors.score ? 0 : 2,
                                        }}
                                    >
                                        <Button
                                            variant="outlined"
                                            onClick={() => setModalOpen(false)}
                                            sx={{
                                                borderRadius: "20px",
                                                color: "#5a5a5a",
                                                borderColor: "#5a5a5a",
                                            }}
                                        >
                                            閉じる
                                        </Button>
                                        <Button
                                            variant="contained"
                                            onClick={handleSubmitEvaluation}
                                            sx={{
                                                borderRadius: "20px",
                                                background:
                                                    "linear-gradient(45deg, #fdb8c4, #b3c6fd)",
                                                boxShadow: "none",
                                                "&:hover": {
                                                    background:
                                                        "linear-gradient(45deg, #f9a0b0, #9db5f9)",
                                                },
                                            }}
                                        >
                                            送信する
                                        </Button>
                                    </Box>
                                </Box>
                            </Modal>
                        </Box>
                    </Box>
                </Grid>
            </Grid>
        </Container>
    );
};

export default Trade;
