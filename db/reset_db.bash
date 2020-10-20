$(> db/persons.sqlite)
cat db/migrate.sql | sqlite3 db/persons.sqlite
cat db/data.sql | sqlite3 db/persons.sqlite
