# Makefile for Group Same Site Tabs extension

EXTENSION_NAME := group-same-site-tabs
XPI_FILE := $(EXTENSION_NAME).xpi
EXCLUDED_FILES := \
	.git/* \
	.gitignore \
	.DS_Store \
	task.md \
	AGENTS.md \
	PUBLISHING.md \
	implementation_plan.md \
	walkthrough.md \
	Makefile \
	*.xpi

.PHONY: build clean

build: $(XPI_FILE)

$(XPI_FILE):
	zip -r $(XPI_FILE) . -x "$(EXCLUDED_FILES)"
	@echo "Build complete: $(XPI_FILE)"

clean:
	rm -f $(XPI_FILE)
	@echo "Clean complete."
