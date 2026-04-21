# OUROBOROS System State — Last Updated 2026-04-21

**Read this at session start to understand full fleet state.**

---

## Fleet Overview

| Server | IP | Tailscale | Role | LLM | Status |
|--------|----|-----------|------|-----|--------|
| Omega | 80.241.212.20 | 100.92.44.56 | Fleet Brain + RAG | qwen2.5:7b → RTX 2060 GPU | ✅ Active |
| Alpha | 49.13.199.174 | - | Research pipeline | qwen2.5:7b local Ollama | ✅ Active |
| Beta | 162.55.211.120 | - | Research pipeline | qwen2.5:7b local Ollama | ✅ Active (disk 87%) |
| Gamma | 46.224.192.227 | - | Research + VNC Desktop | Claude API (30d window) | ✅ Active |
| Local GPU | 100.78.232.85 | 100.78.232.85 | RTX 2060 inference | qwen2.5:7b + nomic-embed-text | ✅ Active |

---

## What Was Built (2026-04-21 Full Session)

### GPU Routing (Permanent)
- Tailscale mesh: Omega (100.92.44.56) ↔ Local Windows RTX 2060 (100.78.232.85)
- Omega's runner sends ALL inference to RTX 2060 via OLLAMA_REMOTE_HOST
- Result: 2 min/task vs 10+ min CPU (5x speedup, measured)
- Embedding also GPU-routed (nomic-embed-text on RTX 2060)

### LanceDB Vectors
- research_chunks: **23,779 vectors** (was ~22,000)
- fleet_memories: **1,339 vectors**
- Sources: fleet, tasks, local_research, master_ai_os, beta_research, alpha_research, gamma_research, omega RESEARCH

### Fleet Migration
- Alpha + Beta: migrated from Claude API → local qwen2.5:7b via Docker gateway (172.18.0.1:11434)
- Both stable, processing task queues autonomously
- Gamma: intentionally kept on Claude API for 30-day max plan window

### Gamma Virtual Desktop
- URL: https://userlogin.duckdns.org (port 443)
- SSL: Let's Encrypt trusted cert (expires 2026-07-20)
- Desktop: XFCE + TigerVNC + noVNC, WhiteSur dark macOS theme
- Auto-connects on load, reconnects on drop
- DuckDNS token: e05ccc5b-c966-478a-9e22-d8f1fe953b02

---

## Key Configuration Files

### Omega
- Runner: `/workspace/runtime/runner.sh` — MODEL="qwen2.5:7b"
- Env: `/workspace/.env` — OLLAMA_REMOTE_HOST=http://100.78.232.85:11434
- Systemd: `/etc/systemd/system/ouroboros-omega.service` — EnvironmentFile=/workspace/.env
- Infer: `/workspace/runtime/infer.py` — OLLAMA_REMOTE_HOST env var routing, num_ctx=1024

### Alpha/Beta Containers
- Runner: `/workspace/runtime/runner_ollama.sh`
- OLLAMA_REMOTE_HOST=http://172.18.0.1:11434 (Docker host gateway)
- MODEL=qwen2.5:7b

---

## Task Queue Baseline (as of 2026-04-21 ~09:46 UTC)
- Omega: 51 tasks queued, 17 done
- Alpha: Active (check `docker exec autonomous-devops-agent ls /workspace/tasks/queue/ | wc -l`)
- Beta: Active

---

## What To Do Friday (Priority Order)

1. **Check Omega queue progress**: `ssh -i ~/.ssh/ouroboros_hetzner root@80.241.212.20 "ls /workspace/tasks/done/ | wc -l"` — should be >17 if GPU is working
2. **Verify GPU connection still live**: `ssh ... "ss -tn state established '( dport = :11434 )'"` — should show Tailscale connections
3. **Beta disk**: `df -h | grep sda` — if >90%, clean old logs in /workspace/logs/
4. **Check Gamma VNC**: https://userlogin.duckdns.org — should autoconnect
5. **embed_fleet_memories**: Should have completed — check `ls /workspace/logs/fleet_memories_embed.log`

---

## SSH Keys
- Omega + Hetzner fleet: `C:\Users\jackp\.ssh\ouroboros_hetzner`
- All servers: root access

## Credentials Location
- Bitwarden + Chrome profile on server VNC browsers
- ai.ops.user@protonmail.com (ops account)

---

## V1 Status: ~80% Complete

**Done:**
- ✅ Autonomous research pipeline (4 servers)
- ✅ LanceDB vector store (25K+ vectors)
- ✅ GPU-accelerated inference + embedding
- ✅ Fleet on local LLMs (stable, no API dependency)
- ✅ Virtual desktop (browser-accessible from work)

**Remaining V1:**
- ⬜ Gamma off Claude API (30 days)
- ⬜ Research → actionable business reports (auto-promotion)
- ⬜ Team Mac GPU pooling

**V2 Targets:**
- Cross-server research sync (weekly auto-pull to Omega)
- Graph RAG layer (KuzuDB on top of vector search)
- Competitive intelligence reports on schedule
- Team GPU pool (all Macs contributing to inference)
