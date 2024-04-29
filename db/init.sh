#!/bin/bash
set -e

createdb -U postgres dvdrental
pg_restore -U postgres -d dvdrental /dvdrental.tar