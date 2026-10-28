window.ROADMAP = {
  title: "AI Engineer Roadmap",
  subtitle: "Oct 26, 2026 to Jan 10, 2027 · 4 study nights + a short weekend · interview-ready by Jan 11",
  readyDate: "2027-01-11",

  tracks: {
    dsa:   { label: "DSA in Python", minutes: 30, color: "#8250df" },
    sd:    { label: "System design", minutes: 70, color: "#2f6feb" },
    build: { label: "AI project",    minutes: 75, color: "#1a7f37" },
    talk:  { label: "Say it out loud", minutes: 30, color: "#bc4c00" }
  },

  evening: [
    { time: "5:00 to 5:10",  kind: "ritual", text: "Start: read the first step you wrote at the end of your last night (the Tonight tab shows it). 5 flashcards from the term map." },
    { time: "5:10 to 5:40",  kind: "dsa",    text: "Block 1: one DSA problem, timer on." },
    { time: "5:40 to 5:50",  kind: "break",  text: "Break: walk, water. No phone scrolling." },
    { time: "5:50 to 7:05",  kind: "sd",     text: "Block 2: system design. 35 min, stand up for 5 min, 35 min." },
    { time: "7:05 to 8:00",  kind: "break",  text: "Cook and eat. No screens." },
    { time: "8:00 to 9:15",  kind: "build",  text: "Block 3: AI project. You type every line." },
    { time: "9:15 to 9:20",  kind: "break",  text: "Break." },
    { time: "9:20 to 9:50",  kind: "talk",   text: "Block 4: say it out loud. Record a 1-minute explanation of tonight's design topic, then do the talk task." },
    { time: "9:50 to 10:00", kind: "ritual", text: "Shut down: tick this site. Write 3 lines and tomorrow's first step in the Tonight tab's boxes." },
    { time: "10:00",         kind: "ritual", text: "Hard stop, even in the middle of something. Stopping mid-task makes tomorrow's start easy." }
  ],

  weekShape: [
    { day: "Mon to Thu", text: "Study nights 1 to 4 (about 3 h 45 min each)." },
    { day: "Fri",        text: "Off. Only catch up if you are behind, and only for 1 hour." },
    { day: "Sat",        text: "10:00 to 12:00, while fresh: SQL or a mock interview, then catch-up." },
    { day: "Sun",        text: "45 minutes: weekly review and plan. The rest of Sunday is off." }
  ],

  rules: [
    ["Same time, same shape.", "Start at 5:00 every study night. The routine does the work, not willpower."],
    ["Minimum day: 30 minutes, never zero.", "Too tired? Do Block 1 and the shut-down note only. The chain stays alive."],
    ["Never miss twice.", "Missing one night is life. Missing two is a new habit. Night tasks slide; they are not tied to a date."],
    ["Stop at 10:00 and write the next step.", "You restart faster tomorrow when you know the first move."],
    ["One tweak a week.", "On Sunday, change one thing in the routine. Not five."],
    ["You type every line.", "Ask for \"show me\" only after 10 minutes stuck, then retype it yourself."],
    ["Say it out loud.", "If you can't explain it in 1 minute without notes, you haven't learned it yet."],
    ["No buzzword without four answers.", "What it is, when you use it, what breaks, and the trade-off. Interviewers ask the follow-up."],
    ["Rest is part of the plan.", "Friday and Sunday afternoon are off. Burnout costs more weeks than rest does."],
    ["Phone in another room during blocks.", "Breaks are for walking, not scrolling."]
  ],

  weeks: [
    {
      n: 2, start: "2026-10-26", title: "Concurrency, and ship the API",
      nights: [
        { dsa: "Two Sum, then Contains Duplicate (hash map)",
          sd: "Race conditions and lost updates: draw the double-booked cab on a timeline",
          build: "Run `/analyze` in `/docs`. Read `main.py` top to bottom and list the lines you can't explain",
          talk: "Mock questions 1 and 2 about the work AI feature: answer out loud, then type them" },
        { dsa: "Valid Anagram (count with a dict)",
          sd: "Conditional `UPDATE ... WHERE Status = 'Requested'`, check rows affected, inside a transaction",
          build: "Break it: upload a PNG and a wrong-column `.txt`. Name both exceptions, then return a clear 400",
          talk: "Mock questions 3 to 5" },
        { dsa: "Group Anagrams",
          sd: "Unique filtered index as the last line of defence. Run the two-session LocalDB test",
          build: "First `pytest` test: upload `statement.csv`, assert `loaded == 9` and `skipped == 1`",
          talk: "Write a 2-minute pitch for the AI assessment feature: problem, built, decision, result, better" },
        { dsa: "Re-solve Two Sum from memory in 10 minutes",
          sd: "LLD: library console app in C#, with the lists inside the service (you type it)",
          build: "`git init`, `.gitignore` (`.venv`, `.env`, `__pycache__`), push `statement_api` to GitHub",
          talk: "Record the pitch on your phone, listen once, re-record" }
      ],
      sat: ["SQL ladder Levels 0 and 1 (SQLBolt 1 to 6, SQL 50 \"Select\")", "Catch-up: finish any unticked night task"],
      work: "Read both AI features at work end to end: data loading, prompt, model call, response parsing."
    },
    {
      n: 3, start: "2026-11-02", title: "Locking, and the first Claude call",
      nights: [
        { dsa: "Top K Frequent Elements",
          sd: "Isolation levels: which anomaly each one stops (dirty read, non-repeatable read, phantom)",
          build: "Install the Anthropic SDK. Put the key in `.env` with `python-dotenv`. First hello call",
          talk: "2-minute pitch for the AI transaction categoriser" },
        { dsa: "Product of Array Except Self",
          sd: "Optimistic locking: `rowversion` plus an EF concurrency token, catch `DbUpdateConcurrencyException`",
          build: "Prompt Claude to categorise the 9 transactions and return JSON",
          talk: "Explain optimistic versus pessimistic locking in 1 minute, recorded" },
        { dsa: "Valid Palindrome (two pointers)",
          sd: "Pessimistic locking (`UPDLOCK`) and deadlocks: lock order, short transactions, retry on error 1205",
          build: "Validate Claude's JSON with a Pydantic model. Handle broken JSON without crashing",
          talk: "Draw both work AI features as one architecture diagram" },
        { dsa: "Two Sum II (two pointers on sorted input)",
          sd: "LLD: move the library lists into a repository class. Say why that helps testing",
          build: "`POST /categorise` endpoint, plus a `pytest` test with a fake Claude client",
          talk: "Term quiz: 15 terms, one sentence each (ask the AI to quiz you)" }
      ],
      sat: ["SQL ladder Level 2: aggregation (`GROUP BY`, `HAVING`)", "Catch-up"],
      work: "List every place the AI code can fail, and what happens to the user when it does."
    },
    {
      n: 4, start: "2026-11-09", title: "Idempotency, retries and evals", checkpoint: "Checkpoint 1: the service runs locally and you have an accuracy number.",
      nights: [
        { dsa: "3Sum",
          sd: "Idempotency: what it means, idempotency keys, natural versus generated keys",
          build: "Hand-label 30 to 50 transactions into `labels.csv`",
          talk: "Start your \"what I'd do better\" list for the work AI features" },
        { dsa: "Container With Most Water",
          sd: "Retries: exponential backoff plus jitter. Retry 429, 5xx and 529. Never retry a 400",
          build: "Eval script: accuracy, plus a list of every wrong answer",
          talk: "Add to the list: evals, secrets, prompt injection, cost per run, monitoring" },
        { dsa: "Best Time to Buy and Sell Stock",
          sd: "Delivery guarantees: at-most-once, at-least-once, and why \"exactly once\" means at-least-once plus an idempotent consumer",
          build: "Retries with backoff around the Claude call",
          talk: "Explain idempotency using the background job at work" },
        { dsa: "Longest Substring Without Repeating Characters (sliding window)",
          sd: "LLD: parking lot classes. SOLID with your own examples",
          build: "Async parallel calls: `asyncio.gather` with a semaphore. Time it against one-by-one",
          talk: "Write a one-page improvement proposal for your lead" }
      ],
      sat: ["SQL ladder Level 3: joins", "Checkpoint 1 check, then catch-up"],
      work: "Propose one improvement to your lead: an eval, or moving secrets into Key Vault."
    },
    {
      n: 5, start: "2026-11-16", title: "Caching, and embeddings",
      nights: [
        { dsa: "Valid Parentheses (stack)",
          sd: "Cache-aside, read-through and write-through. TTL",
          build: "Embeddings: what a vector is. Compute cosine similarity by hand on 3 sentences",
          talk: "Learn the STAR format. Outline 3 work stories" },
        { dsa: "Min Stack",
          sd: "Redis basics: strings, hashes, expiry, eviction (LRU), why it's fast",
          build: "Chunk one public loan-policy document: fixed size versus by heading",
          talk: "Story 1: the query that passed in test and failed in production (SQL compatibility level). Draft it" },
        { dsa: "Daily Temperatures (monotonic stack)",
          sd: "Invalidation, cache stampede, hot keys. What happens when Redis goes down",
          build: "Load the chunks into Chroma, with metadata",
          talk: "Tell story 1 out loud in 2 minutes, recorded" },
        { dsa: "Evaluate Reverse Polish Notation",
          sd: "Caching layers: browser, CDN, app memory, Redis, database. Prompt caching as a cache of the prompt prefix",
          build: "Run 10 search queries and read the top 3 chunks for each",
          talk: "Explain cache-aside and its failure mode in 1 minute" }
      ],
      sat: ["SQL ladder Level 4: subqueries, CTEs, basic window functions", "Catch-up"],
      work: "Start the categoriser eval: compare the AI's categories with what assessors kept or changed."
    },
    {
      n: 6, start: "2026-11-23", title: "Queues, and RAG by hand", checkpoint: "Checkpoint 2: RAG answers with citations, and you have a retrieval hit rate.",
      nights: [
        { dsa: "Binary Search",
          sd: "Why queues: decoupling and smoothing spikes. Service Bus, Storage Queue and Kafka, one line each",
          build: "RAG answer: retrieve the top chunks, then answer with citations",
          talk: "Story 2: why code rules override the model in the categoriser. Draft it" },
        { dsa: "Search a 2D Matrix",
          sd: "Outbox pattern: save the database change and the message together",
          build: "Make it say \"I don't know\" when no chunk is relevant",
          talk: "Tell story 2 out loud, recorded" },
        { dsa: "Koko Eating Bananas (binary search on the answer)",
          sd: "Dead-letter queues, poison messages, leases. Compare with the background pump at work",
          build: "Retrieval test: 10 questions with the expected chunk. Measure the hit rate",
          talk: "Explain RAG versus an agent in 1 minute (your old weak spot)" },
        { dsa: "Find Minimum in Rotated Sorted Array",
          sd: "Building blocks: load balancer, stateless services, horizontal versus vertical scaling",
          build: "`POST /ask` endpoint, with tests",
          talk: "Explain the outbox pattern in 1 minute" }
      ],
      sat: ["Mock 1 with the AI (45 min): SQL and concurrency", "Checkpoint 2 check, then catch-up"],
      work: "Categoriser eval continues."
    },
    {
      n: 7, start: "2026-11-30", title: "HLD 1: redo the cab booking, and tool calling",
      nights: [
        { dsa: "Merge Intervals",
          sd: "Read replicas, replication lag, sharding and partition keys",
          build: "Tool calling: define tools for `parse_amount` and `total_by_category`",
          talk: "Story 3: fire-and-forget, so AI failures can't break the endpoint. Draft it" },
        { dsa: "Insert Interval",
          sd: "CAP in plain words. API design: status codes, pagination, versioning",
          build: "Tool loop: the model asks, your code runs the tool, you send the result back",
          talk: "Tell story 3 out loud, recorded" },
        { dsa: "Non-overlapping Intervals",
          sd: "HLD 1, cab booking: requirements, APIs, data model (7-step method)",
          build: "LangChain RAG in one evening. Write down what it hides",
          talk: "Explain tool calling in 1 minute" },
        { dsa: "Kth Largest Element (`heapq`)",
          sd: "HLD 1, cab booking: matching, concurrency, scale, failure cases",
          build: "Compare your plain RAG with the LangChain one: half a page",
          talk: "Rehearse the cab design for Saturday's mock" }
      ],
      sat: ["Mock 2: present the cab booking design out loud (45 min)", "Catch-up"],
      work: "Finish the categoriser eval and get a real accuracy number."
    },
    {
      n: 8, start: "2026-12-07", title: "Rate limiter, notifications, and the agent",
      nights: [
        { dsa: "Reverse Linked List",
          sd: "Rate limiter: token bucket versus sliding window. Where it sits",
          build: "Agent loop: \"Is this applicant affordable?\" with the statement tools and policy search",
          talk: "Behavioural: a failure story (an interview round, and what you changed after it)" },
        { dsa: "Merge Two Sorted Lists",
          sd: "Distributed rate limiting with Redis. Return 429 with `Retry-After`",
          build: "Stop conditions: max steps, timeouts, and a log line for every step",
          talk: "Behavioural: an ownership story (the work AI feature)" },
        { dsa: "Linked List Cycle",
          sd: "Notification system: requirements, channels, templates, fan-out",
          build: "A short LangGraph version of the agent",
          talk: "Behavioural: a disagreement story" },
        { dsa: "LRU Cache (dict plus doubly linked list; links to caching)",
          sd: "Notification system: queues, retries, idempotency, user preferences",
          build: "Agent eval: 5 test applicants with expected verdicts",
          talk: "Explain an agent versus a pipeline in 1 minute" }
      ],
      sat: ["Mock 3: design a rate limiter", "Warm-up applications: apply to 3 roles you would accept"],
      work: "Share the eval number with your team."
    },
    {
      n: 9, start: "2026-12-14", title: "Loan system HLD, RAG design, and MCP",
      nights: [
        { dsa: "Number of Islands (one grid BFS; that's enough graphs)",
          sd: "HLD 3, a loan application system: requirements and flow",
          build: "MCP concepts: host, client, server, tools, resources",
          talk: "Answers for \"Why AI engineering?\" and \"Why are you moving?\"" },
        { dsa: "Maximum Depth of Binary Tree (one tree; that's enough trees)",
          sd: "Loan system: data model, state machine, audit trail, documents",
          build: "A small MCP server that exposes your analysis",
          talk: "Explain MCP in 1 minute" },
        { dsa: "Climbing Stairs (one DP)",
          sd: "LLM design 1, a RAG pipeline: ingestion, chunking, embeddings, store",
          build: "Dockerfile for the API",
          talk: "\"Tell me about yourself\" in 90 seconds" },
        { dsa: "Timed: re-solve 2 old problems in 30 minutes",
          sd: "RAG pipeline: retrieval, reranking, citations, evaluation, guardrails",
          build: "`docker compose` with Chroma, plus a `/health` endpoint",
          talk: "Record \"tell me about yourself\", then re-record once" }
      ],
      sat: ["Mock 4: design a RAG pipeline", "Apply to 3 roles"],
      work: "Own one small improvement to the AI features, if your lead agreed."
    },
    {
      n: 10, start: "2026-12-21", title: "LLM gateway, and the Azure deploy", checkpoint: "Checkpoint 3: a public URL works.",
      nights: [
        { dsa: "Timed: 1 easy and 1 medium in 40 minutes",
          sd: "LLM gateway: one place for keys, rate limits, retries and logging",
          build: "Azure: container registry and a Container Apps environment",
          talk: "Explain prompt caching versus semantic caching" },
        { dsa: "Re-solve your weakest pattern",
          sd: "Gateway: model routing, fallbacks, semantic cache, cost budgets",
          build: "Deploy, with secrets in Container Apps secrets or Key Vault",
          talk: "Explain model routing with your own example from work" },
        { dsa: "Timed: 1 medium in 25 minutes",
          sd: "LLM observability: traces, token cost, p95 latency, evals in production",
          build: "Logging, a health probe, and Application Insights",
          talk: "Salary talk: your number, and how to say it" },
        { dsa: "Re-solve LRU Cache",
          sd: "LLM safety: prompt injection, PII, output validation",
          build: "Smoke-test the public URL",
          talk: "Explain prompt injection with an example from a real data flow" }
      ],
      sat: ["Mock 5: design an LLM gateway", "Apply to 3 roles"],
      work: "Holiday week: keep it light at work."
    },
    {
      n: 11, start: "2026-12-28", title: "Agent design, README and resume",
      nights: [
        { dsa: "Timed set: 2 problems in 45 minutes",
          sd: "LLM design 3: redesign the AI assessment for 100 times the traffic. Find the bottlenecks",
          build: "README: architecture diagram",
          talk: "Walk through your resume line by line" },
        { dsa: "OOP coding: a bank account or rate limiter class, with tests",
          sd: "100 times the traffic: queue-based design, provider rate limits, batching, caching",
          build: "README: eval numbers and trade-offs",
          talk: "Resume bullets with numbers for the work AI features" },
        { dsa: "Timed set: 2 problems in 45 minutes",
          sd: "Agent design: tool permissions, loop limits, timeouts, human approval",
          build: "Resume: project bullets",
          talk: "Project deep dive: let the AI grill you for 20 minutes" },
        { dsa: "Re-solve the 3 problems you got wrong most",
          sd: "Draw your own project's architecture and explain every trade-off",
          build: "LinkedIn post about the project",
          talk: "Record the 2-minute project pitch" }
      ],
      sat: ["Mock 6: 30 min DSA plus 30 min design", "Apply to 3 roles"],
      work: "Write down the numbers you can share: accuracy, cost, time saved."
    },
    {
      n: 12, start: "2027-01-04", title: "Mock week",
      nights: [
        { dsa: "Timed mock: 2 problems in 45 minutes",
          sd: "Mock LLD: parking lot, 45 minutes",
          build: "Mock project deep dive: defend every trade-off",
          talk: "Explain every term on the term map" },
        { dsa: "Timed mock",
          sd: "Mock HLD: notification system or cab booking",
          build: "Extend one feature live while explaining it",
          talk: "Behavioural mock" },
        { dsa: "Timed mock",
          sd: "Mock LLM design: a RAG pipeline",
          build: "Fix anything the mocks exposed",
          talk: "\"Tell me about yourself\" plus \"Why AI engineering?\"" },
        { dsa: "Re-solve your weakest problems",
          sd: "Redo your weakest design topic",
          build: "Final README polish",
          talk: "Final full mock with the AI" }
      ],
      sat: ["Rest. Seriously."],
      work: "Normal week."
    }
  ]
};
