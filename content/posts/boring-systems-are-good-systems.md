---
title: "Boring systems are good systems"
description: "Notes on why the most reliable parts of any system are usually the least exciting ones."
date: "2026-07-10"
category: "system"
lang: "en"
tags: ["systems", "engineering"]
---

Every time I dig into an incident postmortem, the root cause is rarely the fancy new component. It's usually the boring, unglamorous part nobody wanted to maintain.

## The excitement tax

New tools are exciting to build. Old tools are exciting to blame. The stuff in between — the retry logic, the timeout configs, the cron job nobody remembers writing — quietly keeps everything running, and quietly gets ignored until it breaks.

A few things I'm trying to internalize:

- **Boring is a compliment.** If a system has been running for two years without anyone thinking about it, that's a success story, not a lack of ambition.
- **Document the boring parts first.** The exciting parts get attention by default; the boring parts don't.
- **Treat "nobody understands this anymore" as an incident, not a joke.**

## The engine room

This category is called *Phòng Máy* — the engine room. It's where the unglamorous, load-bearing decisions live. Not the flashy features, just the parts that make everything else possible.
