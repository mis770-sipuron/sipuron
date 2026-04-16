# Sipuron Bot v2 — Design Spec
**Date:** 2026-04-16
**Status:** Approved

## Context
The WhatsApp bot works technically but responds with irrelevant/shallow answers. It doesn't know Sipuron's data, can't query subscribers, can't trigger automations, and lacks memory across conversations.

## Goal
Transform into Yosef's professional management assistant — smart, contextual, with access to all Sipuron data sources.

## Approach: System Prompt + MCP Tools (Approach A)
No code changes to bot.js. All intelligence through:
1. Comprehensive system prompt with Supabase/Green API/Make.com instructions
2. MCP config giving Claude access to Make.com
3. Claude's existing tools (Read, Bash, Glob, Grep, WebFetch) for Supabase queries and file operations

## Changes

### 1. system-prompt.txt — Full Rewrite
Add sections:
- **Supabase access** — credentials + example queries for subscriber data, revenue, stories
- **Green API** — how to send WhatsApp messages via curl
- **Make.com** — MCP tools available, when to use them
- **Context patterns** — "status" = dashboard, "send" = execute, "check" = lookup
- **Memory** — read previous decisions, reference conversation history
- **Agent routing** — which of 128 agents handles what, with file paths

### 2. askClaude() — Add --mcp-config
One line change: add `--mcp-config` pointing to sipuron's `.mcp.json` so Claude can call Make.com tools.

### 3. config.json — Fix TTS
- Set `ttsMode: "off"` until valid OpenAI key provided
- Remove invalid `openaiApiKey` (Groq key in wrong field)

## Data Sources Available to Bot

| Source | Access Method | Data |
|--------|-------------|------|
| Supabase | Bash: curl REST API with service key | Subscribers, stories, payments, KPIs |
| Make.com | MCP tools via --mcp-config | Trigger automations, dunning, broadcasts |
| Green API | Bash: curl | Send WhatsApp messages to groups/users |
| Project files | Read/Glob/Grep | Code, agents, configs, memory |
| Memory | Read files in ~/.claude/projects/ | Business context, decisions, pain points |

## Verification
1. Send "היי" → warm greeting, no caveman
2. Send "סטטוס מנויים" → queries Supabase, returns real numbers
3. Send "מי מטפל בביטולים?" → routes to /operations/cancellation-flow
4. Send voice message → transcription + relevant response
5. Send "שלח הודעה לקבוצה X" → uses Green API
