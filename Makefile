.PHONY: init
init:
	pnpm i
	pnpm --filter api db:push
	pnpm --filter api db:seed
	pnpm --filter api build

.PHONY: start
start:
	pnpm --filter api start
