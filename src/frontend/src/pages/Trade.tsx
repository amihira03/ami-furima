import Box from "@mui/material/Box";
import Container from "@mui/material/Container";
import Typography from "@mui/material/Typography";
import Grid from "@mui/material/Grid";
import Avatar from "@mui/material/Avatar";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import SendIcon from "@mui/icons-material/Send";
import { useState } from "react";
import Modal from "@mui/material/Modal";

const Trade = () => {
    // モーダルの開閉状態
    const [modalOpen, setModalOpen] = useState(false);
    // 星の評価状態
    const [score, setScore] = useState(0);
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
                        {/* その他の取引一覧（ダミーデータ） */}
                        {["腕時計", "HDD", "革靴"].map((name) => (
                            <Box
                                key={name}
                                sx={{
                                    py: 1.5,
                                    borderBottom:
                                        "1px solid rgba(255,255,255,0.3)",
                                    cursor: "pointer",
                                    "&:hover": {
                                        opacity: 0.7,
                                    },
                                }}
                            >
                                <Typography
                                    sx={{
                                        color: "#3d3d3d",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    {name}
                                </Typography>
                            </Box>
                        ))}
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
                        {/* ヘッダー：相手のアイコン・名前・取引完了ボタン */}
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
                            {/* 相手のアイコン・名前 */}
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
                                    「出品者A」さんとの取引画面
                                </Typography>
                            </Box>

                            {/* 取引を完了するボタン */}
                            <Button
                                variant="outlined"
                                onClick={() => setModalOpen(true)}
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
                                src="https://placehold.co/80x80"
                                alt="商品画像"
                                sx={{
                                    borderRadius: "10px",
                                    width: 80,
                                    height: 80,
                                }}
                            />
                            <Box>
                                <Typography
                                    sx={{
                                        color: "#3d3d3d",
                                        fontWeight: "bold",
                                    }}
                                >
                                    ショルダーバッグ
                                </Typography>
                                <Typography
                                    sx={{
                                        color: "#5a5a5a",
                                        fontSize: "0.9rem",
                                    }}
                                >
                                    ¥3,500
                                </Typography>
                            </Box>
                        </Box>
                        {/* メッセージ一覧 */}
                        <Box sx={{ mb: 3 }}>
                            {/* 相手のメッセージ */}
                            <Box sx={{ display: "flex", gap: 2, mb: 2 }}>
                                <Avatar sx={{ width: 40, height: 40 }} />
                                <Box>
                                    <Typography
                                        sx={{
                                            color: "#5a5a5a",
                                            fontSize: "0.8rem",
                                            mb: 0.5,
                                        }}
                                    >
                                        出品者A
                                    </Typography>
                                    <Box
                                        sx={{
                                            background: "rgba(255,255,255,0.5)",
                                            borderRadius: "10px",
                                            p: 2,
                                            maxWidth: "400px",
                                        }}
                                    >
                                        <Typography sx={{ color: "#3d3d3d" }}>
                                            よろしくお願いします！
                                        </Typography>
                                    </Box>
                                </Box>
                            </Box>

                            {/* 自分のメッセージ */}
                            <Box
                                sx={{
                                    display: "flex",
                                    gap: 2,
                                    mb: 2,
                                    justifyContent: "flex-end",
                                }}
                            >
                                <Box>
                                    <Typography
                                        sx={{
                                            color: "#5a5a5a",
                                            fontSize: "0.8rem",
                                            mb: 0.5,
                                            textAlign: "right",
                                        }}
                                    >
                                        自分
                                    </Typography>
                                    <Box
                                        sx={{
                                            background: "rgba(255,255,255,0.7)",
                                            borderRadius: "10px",
                                            p: 2,
                                            maxWidth: "400px",
                                        }}
                                    >
                                        <Typography sx={{ color: "#3d3d3d" }}>
                                            こちらこそよろしくお願いします！
                                        </Typography>
                                    </Box>
                                </Box>
                                <Avatar sx={{ width: 40, height: 40 }} />
                            </Box>
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
                                {/* テキスト入力 */}
                                <TextField
                                    fullWidth
                                    placeholder="取引メッセージを記入してください"
                                    multiline
                                    rows={2}
                                    sx={{
                                        "& .MuiOutlinedInput-root": {
                                            "&.Mui-focused fieldset": {
                                                borderColor:
                                                    "rgba(255,255,255,0.5)",
                                            },
                                        },
                                    }}
                                />

                                {/* 送信ボタン */}
                                <Button
                                    variant="contained"
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

                                    {/* 星評価 */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            justifyContent: "center",
                                            gap: 1,
                                            mb: 3,
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

                                    {/* ボタン */}
                                    <Box
                                        sx={{
                                            display: "flex",
                                            gap: 2,
                                            justifyContent: "center",
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
};;;

export default Trade;
