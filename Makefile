.PHONY: clean
clean:
	docker-compose down -v

.PHONY: up
up:
	docker-compose up -d

.PHONY: stop
stop:
	docker-compose stop
