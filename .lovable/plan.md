## Security event logging + immediate alerts

### What gets logged
A new `security_events` table records every event with type, user id, email, IP, user-agent, metadata, timestamp. Admin-only read via `user_roles` + `has_role()` (locked by RLS).

### Events tracked
1. **Failed login** — 5+ within 10 min for the same email triggers alert.
2. **New device/IP sign-in** — compared against `known_devices` table (user_id + ip + ua hash); unknown → alert, then remember.
3. **Password / email change** — always alert.
4. **Admin role granted** — trigger on `user_roles` insert where role='admin' → alert.

### How events reach the log
- Client calls edge function `log-security-event` after Supabase auth calls (sign-in success/failure, updateUser for password/email).
- Server-side DB trigger for admin role grants (can't be bypassed by client).
- Edge function evaluates threshold rules and, on match, dispatches alerts.

### Alerts
- **Email** — via existing `send-transactional-email` to `mdamberalikhandoker@outlook.com`. New template `security-alert.tsx` (event type, when, IP, UA, "wasn't you?" guidance).
- **WhatsApp** — via Twilio connector to +8801716861353 using WhatsApp sandbox/Business number. **Requires connecting Twilio** — I'll prompt for it during build. If you skip Twilio, email-only still works.

### Admin dashboard
New protected route `/admin/security` (visible only to users with `admin` role): recent events table with filters (event type, date range), plus a live "alerts fired" list. Non-admins are redirected.

### Tables / infra
```
security_events(id, event_type, user_id, email, ip, user_agent, metadata, created_at)
known_devices(id, user_id, ip, ua_hash, first_seen, last_seen)
user_roles(id, user_id, role app_role) + has_role() SECURITY DEFINER
```
All RLS-locked; only `service_role` writes; only admins read.

### Files
- migration: tables, enum, `has_role`, trigger for role-grant alerts
- `supabase/functions/log-security-event/index.ts`
- `supabase/functions/_shared/transactional-email-templates/security-alert.tsx` + registry entry
- `src/pages/AdminSecurity.tsx` + route in `App.tsx`
- Auth call sites wrapped to emit events (sign-in, sign-up, updateUser)

### Not included
- Supabase-platform audit logs (not accessible from Lovable Cloud).
- Hourly digests — you chose immediate.

Confirm and I'll build it. Say "skip WhatsApp" if you'd rather ship email-only now and add Twilio later.