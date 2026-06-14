# PostgreSQL Init Scripts

Files in this folder run ONCE when the PostgreSQL
container is first created (before Flyway runs).

Use for:
- Creating additional databases
- Creating additional users
- Setting up extensions

DO NOT put table creation here.
All schema changes go in /migrations via Flyway.