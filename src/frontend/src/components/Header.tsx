import AppBar from "@mui/material/AppBar";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import Button from "@mui/material/Button";
import InputBase from "@mui/material/InputBase";
import Box from "@mui/material/Box";
import SearchIcon from "@mui/icons-material/Search";

const Header = () => {
    return (
        // AppBar = 画面上部に固定されるヘッダーバー
        <AppBar
            position="sticky" // スクロールしても上部に張り付く（fixedだと他の要素に被る）
            elevation={0} // 影をなくす（すっきりした見た目に）
            sx={{
                background: "rgba(255, 255, 255, 0.2)", // 白の半透明（すりガラス）
                backdropFilter: "blur(10px)", // 背景をぼかす
                WebkitBackdropFilter: "blur(10px)", // Safari用
                borderBottom: "1px solid rgba(255, 255, 255, 0.3)", // 下ボーダー
            }}
        >
            {/* Toolbar = ヘッダーの中身を横並びにするコンテナ */}
            <Toolbar sx={{ gap: 2 }}>
                {" "}
                {/* gap = 子要素間の隙間（2 = 16px） */}
                {/* ロゴ */}
                <Typography
                    variant="h6"
                    sx={{
                        fontWeight: "bold",
                        color: "white",
                        letterSpacing: "0.05em",
                        flexShrink: 0, // 画面が狭くなっても縮まないようにする
                    }}
                >
                    FURIMA
                </Typography>
                {/* 検索バー（中央・横幅いっぱいに広がる） */}
                <Box
                    sx={{
                        flexGrow: 1, // 残りのスペースを全部使う
                        display: "flex",
                        alignItems: "center",
                        background: "rgba(255, 255, 255, 0.3)", // 白の半透明
                        borderRadius: "20px", // 角丸
                        px: 2, // 左右padding
                        py: 0.5, // 上下padding
                    }}
                >
                    {/* 検索アイコン */}
                    <SearchIcon sx={{ color: "white", mr: 1 }} />

                    {/* テキスト入力 */}
                    <InputBase
                        placeholder="なにをお探しですか？"
                        sx={{
                            color: "white", // 入力文字の色
                            width: "100%",
                            "& ::placeholder": {
                                color: "rgba(255,255,255,0.7)", // プレースホルダーの色
                            },
                        }}
                    />
                </Box>
                {/* 右側のボタン群 */}
                <Box sx={{ display: "flex", gap: 1, flexShrink: 0 }}>
                    {/* ログインボタン */}
                    <Button
                        variant="text" // 背景なしのテキストボタン
                        sx={{ color: "white" }}
                    >
                        ログイン
                    </Button>

                    {/* マイページボタン */}
                    <Button variant="text" sx={{ color: "white" }}>
                        マイページ
                    </Button>

                    {/* 出品ボタン（目立つようにアウトライン） */}
                    <Button
                        variant="outlined" // 枠線あり
                        sx={{
                            color: "white",
                            borderColor: "white",
                            borderRadius: "20px", // 角丸
                            "&:hover": {
                                background: "rgba(255,255,255,0.2)", // ホバーで薄く白くなる
                                borderColor: "white",
                            },
                        }}
                    >
                        出品
                    </Button>
                </Box>
            </Toolbar>
        </AppBar>
    );
};

export default Header;
