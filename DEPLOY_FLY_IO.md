# Deploy SocialSaver on Fly.io

## Prerequisites

- [Fly.io account](https://fly.io/signup) (requires credit card for verification — free tier usage)
- [Fly CLI](https://fly.io/docs/hands-on/install-flyctl/) installed locally

## Step 1 — Login

```bash
fly auth login
```

## Step 2 — Launch the app

```bash
# From the project root (/public/smed)
fly launch --no-deploy
```

When prompted:
- **App name**: `socialsaver` (or your choice)
- **Region**: pick one closest to you (e.g. `ams` Amsterdam, `iad` Washington DC)
- **Would you like to set up a Postgresql database?**: `No`
- **Would you like to set up an Upstash Redis database?**: `No`
- **Deploy now?**: `No`

This creates the `fly.toml` (already in repo) — skip if already present.

## Step 3 — Create a persistent volume

Downloads need to survive machine restarts:

```bash
fly volumes create smed_data --region ams --size 1
```

Use the same region you chose in step 2.

## Step 4 — Deploy

```bash
fly deploy
```

First build takes a few minutes (installing Python deps + FFmpeg).

## Step 5 — Open the app

```bash
fly open
```

Your app is live at `https://socialsaver.fly.dev` (or your custom name).

## Updating

After making changes:

```bash
git add .
git commit -m "changes"
fly deploy
```

## Checking logs

```bash
fly logs
```

## Scaling down to zero (save free tier hours)

The app auto-stops when idle (`auto_stop_machines = true`) and wakes on the next request. To stop manually:

```bash
fly scale count 0
```

To restart:

```bash
fly scale count 1
```

## Custom domain (optional)

```bash
fly certs create yourdomain.com
```

Then add the CNAME/A record from `flyctl certs show yourdomain.com` to your DNS provider.

## Troubleshooting

| Problem | Fix |
|---------|-----|
| "No space left" | `fly volumes extend smed_data --size 2` |
| 502 Bad Gateway | `fly logs` — likely FFmpeg crash or OOM |
| Files missing after restart | Check `fly.toml` mount path matches `/app/downloads` |
| Build fails | `fly platform regions` to check region has builders |
