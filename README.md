# 青野 Verda · AI 竞品情报工作台

> 让每个结论都有出处，让每次调研都活着。

一个会自己组队、能溯源、看得见思考过程的「AI 竞品情报工作台」。技术栈 React 18 + TypeScript + Vite + TailwindCSS（前端），FastAPI + LangGraph（后端），LLM 使用豆包 Doubao（火山方舟）。

## 目录结构

```
├── frontend/          # React + Vite 前端
│   ├── src/
│   │   ├── components/  # 通用组件
│   │   ├── layout/      # AppLayout / VSidebar 全局框架
│   │   ├── pages/       # 8 个页面
│   │   ├── store/       # Zustand 状态管理
│   │   └── lib/         # api.ts 等工具
│   └── tailwind.config.js  # 设计 token 主题映射
│
├── backend/           # FastAPI + LangGraph 后端
│   ├── app/
│   │   ├── core/        # config / llm / search / orchestrator / db 等
│   │   └── main.py      # FastAPI 入口
│   ├── requirements.txt
│   └── .env.example     # 环境变量模板（密钥走环境变量，不硬编码）
│
└── api/               # Vercel Serverless 部署入口（同 backend 代码）
    └── index.py
```

## 环境要求

- Node.js ≥ 22.12
- Python ≥ 3.9

## 启动方式

### 前端

```bash
cd frontend
npm install
npm run dev          # http://localhost:5173
```

### 后端

```bash
cd backend
python3 -m venv .venv
.venv/bin/python -m pip install -r requirements.txt
cp .env.example .env   # 填入 ARK_API_KEY 等密钥
.venv/bin/python -m uvicorn app.main:app --reload --port 8000   # http://localhost:8000
```

## 配置密钥

复制 `backend/.env.example` 为 `backend/.env`，填写：

| 变量 | 说明 | 必填 |
|---|---|---|
| `ARK_API_KEY` | 火山方舟 API Key（豆包 LLM 调用） | 是（LLM 真实调用） |
| `DOUBAO_ENDPOINT_ID` | 推理接入点 ID（火山方舟控制台创建后获得） | 是 |
| `SERPAPI_KEY` / `BING_SEARCH_KEY` | 搜索 API（采集 Agent） | 采集真实联网时需要 |
| `DOUYIN_COOKIE` / `BILIBILI_COOKIE` / `XHS_COOKIE` | 各平台采集 cookie | 平台采集时需要 |

验证 LLM 是否打通：`curl http://localhost:8000/api/llm/ping`

## 安全说明

- 所有密钥通过环境变量读取，**绝不硬编码在代码中**。
- `.env` 文件已在 `.gitignore` 中屏蔽，不会被提交。
- 提交代码前请确认：**没有任何真实的 API Key、Token、Cookie 被提交**。
