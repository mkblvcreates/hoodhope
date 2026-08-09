# SOLEA v00 / ORBITL — Agentic Voice AI for SYNERG

> Voice-first, soul-coded agentic avatar for the WEL + COHESION Synergy Hubs.
> Realtime voice. Open-cloud LLM. RAG-grounded. Zero OpenAI.

## Stack

| Layer | Service |
|---|---|
| Realtime audio room | **LiveKit Cloud** |
| STT / TTS | **LiveKit Cloud Inference** (Deepgram + Cartesia) |
| LLM | **Cloudflare Workers AI** — `@cf/meta/llama-3.1-8b-instruct` |
| Embeddings | **Cloudflare Workers AI** — `@cf/baai/bge-base-en-v1.5` (768-dim) |
| Vector DB | **Qdrant Cloud** — collection `mkblv_knowledge` |
| Session log + directives | **Supabase** (Postgres) |
| Frontend | **Next.js 14 + Tailwind** — `/orbitl/solea` |

Service keys for LiveKit, Cloudflare, Qdrant, and Supabase are **server-side only**.
The browser only ever sees a short-lived LiveKit participant JWT.

## Repo layout

```
solea-v00/
├── agent/                  # Python LiveKit Agent (solea-orbitl-v00)
├── cloudflare-worker/      # Workers AI + Qdrant RAG edge service
├── web/                    # Next.js SYNERG webapp + /orbitl/solea
├── supabase/schema.sql     # Postgres schema
└── README.md
```

## Architecture flow

```
Browser ── POST /api/livekit-token ──▶ Next.js
   │           returns JWT + ws url + room
   ▼
LiveKit Cloud room  ◀── dispatches ──  solea-orbitl-v00 agent
   │                                    │
   │  user audio ──▶ STT (Deepgram)     │
   │                                    ▼
   │                          custom llm_node
   │                                    │
   │                                    ▼
   │              Cloudflare Worker  /solea/respond
   │                  │  embed(user_msg) ──▶ Qdrant (mkblv_knowledge)
   │                  │  build system_prompt + context
   │                  └─ Workers AI Llama 3.1 8B ──▶ { spoken, directive }
   │                                    │
   │  spoken ──▶ TTS (Cartesia) ──▶ user
   │                                    │
   │                          if directive: POST  Next.js
   │                                          /api/orbitl/directives
   │                                                │
   │                                                ▼
   │                                            Supabase
```

---

## Setup

### 1) LiveKit Cloud

1. Create a project at https://cloud.livekit.io.
2. Copy `LIVEKIT_URL` (wss://…), `LIVEKIT_API_KEY`, `LIVEKIT_API_SECRET`.
3. Enable **LiveKit Inference** in the project (STT/TTS billed through LiveKit).

### 2) Supabase

1. Create a project at https://supabase.com.
2. Open SQL editor, paste `supabase/schema.sql`, run it.
3. Copy `SUPABASE_URL` and the **service_role** key (Project Settings → API).
   *Never* put the service role key in the browser.

### 3) Qdrant Cloud

1. Create a cluster at https://cloud.qdrant.io.
2. Copy the cluster URL and an API key.
3. Create the collection (768-dim, Cosine — matches BGE-base):

   ```bash
   curl -X PUT "$QDRANT_URL/collections/mkblv_knowledge" \
     -H "api-key: $QDRANT_API_KEY" \
     -H "content-type: application/json" \
     -d '{"vectors":{"size":768,"distance":"Cosine"}}'
   ```

### 4) Cloudflare Worker (LLM + RAG)

```bash
cd cloudflare-worker
npm i
cp .dev.vars.example .dev.vars   # fill in
npx wrangler secret put QDRANT_URL
npx wrangler secret put QDRANT_API_KEY
npx wrangler secret put INDEX_TOKEN          # any random string
npx wrangler secret put SHARED_TOKEN         # optional, for /solea/respond
npx wrangler deploy
```

Note the deployed URL (e.g. `https://solea-worker.you.workers.dev`).

Seed the knowledge base:

```bash
WORKER_URL=https://solea-worker.you.workers.dev \
INDEX_TOKEN=your-index-token \
bash seed_knowledge.sh
```

### 5) LiveKit Agent

```bash
cd agent
python -m venv .venv && source .venv/bin/activate
pip install -r requirements.txt
cp .env.example .env
# Fill in:
#   LIVEKIT_URL / LIVEKIT_API_KEY / LIVEKIT_API_SECRET
#   CF_WORKER_URL  (your deployed worker)
#   CF_WORKER_TOKEN  (only if you set SHARED_TOKEN above)
#   SYNERG_BASE_URL  (your Next.js URL — http://localhost:3000 for dev)
#   SYNERG_DIRECTIVE_TOKEN  (must match the web app's value, if set)

# Dev mode (hot reload, connects to LiveKit Cloud):
python agent.py dev

# Production mode:
python agent.py start
```

Containerize with the included `Dockerfile` and deploy to Fly.io, Railway,
Render, Cloud Run — anywhere that runs a long-lived outbound WebSocket process.

### 6) Next.js webapp

```bash
cd web
npm i
cp .env.example .env.local   # fill in LiveKit + Supabase
npm run dev
```

Open http://localhost:3000/orbitl/solea.

### 7) Test the loop

1. Click **INITIATE SOLEA**. Grant mic access.
2. The terminal connects to the LiveKit room. SOLEA dispatches and greets you.
3. Speak: *"SOLEA, log a directive to schedule the Memphis hub gathering for next Saturday."*
4. SOLEA reflects, asks at most one question, and routes the directive.
5. The directive appears in the **DIRECTIVE LOG** panel (polls every 5s) and in
   the `orbitl_directives` table in Supabase with `status='pending'`,
   `approval_required=true`.

## Success criteria — v00

- [x] Browser joins LiveKit room
- [x] SOLEA greets user
- [x] User voice transcribed (Deepgram via LiveKit Inference)
- [x] Cloudflare Worker returns SOLEA response (RAG-grounded)
- [x] SOLEA speaks response (Cartesia via LiveKit Inference)
- [x] Directives stored in Supabase with `approval_required=true`
- [x] **No OpenAI API key anywhere in the stack**

## Persona — SOLEA

Soultress-coded. Airy yet hearty. Ambient, soulful, feminine-coded. Calm,
magnetic, emotionally intelligent — never a comfort bot, never therapeutic,
never mystical, never generic. Speaks with warmth, spaciousness, precision,
and civic/creator-grade intelligence.

She reflects intent in one grounded line, asks at most one critical question,
and routes an ORBITL directive when there is enough context. Replies are kept
short enough to speak aloud naturally (1–3 sentences).

## Roadmap → v01

- Persist transcripts to `solea_transcripts` via a LiveKit data-channel listener.
- Streaming token output from the Worker (SSE) wired into `llm_node` yields.
- Approval UI inside the terminal — approve/reject directives inline.
- Auth gating on `/orbitl/solea` (Supabase Auth).
- Multi-hub routing (which COHESION node the directive belongs to).
# hoodhope
