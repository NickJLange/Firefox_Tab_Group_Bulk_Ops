# Makefile for Group Same Site Tabs extension

EXTENSION_NAME := group-same-site-tabs
XPI_FILE := $(EXTENSION_NAME).xpi
INCLUDED_FILES := \
	manifest.json \
	background.js \
	README.md

.PHONY: build clean

build: $(XPI_FILE)

$(XPI_FILE):
	zip $(XPI_FILE) $(INCLUDED_FILES)
	@echo "Build complete: $(XPI_FILE)"

clean:
	rm -f $(XPI_FILE)
	@echo "Clean complete."
