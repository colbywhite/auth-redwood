#!/usr/bin/env bash
# A docker command to get a local postgres up and running quickly.
CONTAINER_NAME=auth-redwood-db

if [[ $(docker ps -a --filter="name=$CONTAINER_NAME" --filter "status=exited" | grep -w "$CONTAINER_NAME") ]]; then
  echo "[db:init] Restarting DB container..."
  docker start auth-redwood-db
elif [[ $(docker ps -a --filter="name=$CONTAINER_NAME" --filter "status=running" | grep -w "$CONTAINER_NAME") ]]; then
  echo "[db:init] DB container already running."
else
  echo "[db:init] Creating DB container..."
  docker run -d --rm \
      --name $CONTAINER_NAME \
      -e POSTGRES_PASSWORD=soopersecretpassword \
      -e POSTGRES_USER=qwerty \
      -e POSTGRES_DB=$CONTAINER_NAME \
      -e POSTGRES_PORT=5432 \
      -p 5432:5432 \
      postgres:16
  echo "[db:init] DB running at postgresql://qwerty:soopersecretpassword@localhost:5432/$CONTAINER_NAME"
fi
echo "[db:init] Done."
