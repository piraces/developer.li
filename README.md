![Image of developer.li](https://github.com/piraces/developer.li/raw/main/logo.png)

![Publish to GitHub Pages](https://github.com/piraces/developer.li/workflows/Publish%20to%20GitHub%20Pages/badge.svg?branch=main)
![CI Build](https://github.com/piraces/developer.li/workflows/CI/badge.svg)

Repo for the developer.li website.

developer.li offers free subdomains for developers, powered by [FreeDNS](https://freedns.afraid.org/).

The main site is made using the [NES-style CSS Framework](https://github.com/nostalgic-css/NES.css) and Angular.
It offers a simple check tool for available subdomains and a short tutorial about how to get started.

# Nostr public relay

As part of the developer.li project, a Nostr public relay is available in `wss://nostr.developer.li`.
Feel free to add it to your relay list and use it.

# NIP-05 ID registration service

Feel free to submit a PR modifying the file [.well-known/nostr.json](https://github.com/piraces/developer.li/blob/main/src/.well-known/nostr.json) with your desired name and public key to register yourself and verify for `developer.li`.

Also feel free to add the relay for `developer.li`: `wss://nostr.developer.li`.

# Contributing

Please feel free to contribute to this project in any way you want: open an issue, submit your own PR or propose a functionality.

# License 

MIT
