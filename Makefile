include .env

.PHONY: up

up:
	docker-compose up -d

.PHONY: down

down:
	docker-compose down

.PHONY: logs

logs:
	docker-compose logs

.PHONY: dev

dev:
	docker-compose -f docker-compose-dev.yml up -d

.PHONY: reset

reset:
	docker system prune -a