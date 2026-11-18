# Hospital Appointment API

A Prisma 7.10.0 and TypeScript CRUD implementation for a PostgreSQL hospital
database with patients, doctors, and appointments.

## Setup

1. Create the `hospital_api` PostgreSQL database and tables from the assignment
   DDL.
2. Copy the database connection into `.env` as `DATABASE_URL`.
3. Run `npm install`.
4. Run `npx prisma db pull` and `npx prisma generate`.
5. Run `npm run seed`.
6. Run `npm run test`.

The `.env`, generated Prisma client, `node_modules`, and build output are
excluded from Git.

## Verified output

```text
── Patients ──────────────────────────
Created: Test Patient 3
Found: Test Patient
Updated phone: 8888888888
Search results: 1

── Doctors ───────────────────────────
Created: Dr. Test 3
Found doctor: Dr. Test
General Medicine doctors: 1

── Appointments ──────────────────────
Booked: 3 for Test Patient
Full fetch: Test Patient with Dr. Test
Doctor schedule: 1 appointment(s)
Status updated to: cancelled
Cancelled appointments: 1

── Cleanup ───────────────────────────
Test data cleaned up.
```
