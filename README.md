# OpenZone Taurians

> A cross-platform desktop AI assistant that brings AI models directly to your desktop to help you get work done.

OpenZone Taurians integrates AI models with your desktop environment, letting you delegate tasks, automate workflows, and get intelligent assistance without leaving your machine. Built with [Tauri](https://tauri.app/) for a fast, secure, and lightweight native experience.

## ✨ Features

- 🖥️ **Native desktop integration** — deep access to the OS for real productivity, not just a browser tab.
- 🤖 **AI model integration** — connect to AI models to answer questions, draft content, and complete tasks.
- ⚡ **Fast & lightweight** — Rust-powered backend via Tauri keeps the footprint small.
- 🔒 **Privacy-first** — runs locally; you control what data leaves your machine.
- 🧩 **Extensible** — designed to grow with plugins and new model providers.

## 🚀 Tech Stack

- **[Tauri 2](https://tauri.app/)** — desktop shell (Rust)
- **TypeScript + Vite** — frontend
- **[Tailwind CSS v4](https://tailwindcss.com/)** — styling (via `@tailwindcss/vite`)
- **Rust** — native backend / system integration

## 📦 Prerequisites

- [Node.js](https://nodejs.org/) (or [Bun](https://bun.sh/))
- [Rust](https://www.rust-lang.org/tools/install) toolchain
- Tauri system dependencies — see the [Tauri prerequisites guide](https://tauri.app/start/prerequisites/)

## 🛠️ Getting Started

```bash
# Install dependencies
bun install        # or: npm install

# Run in development
bun run tauri dev  # or: npm run tauri dev

# Build a production bundle
bun run tauri build
```

## 📁 Project Structure

```
openzone-taurians/
├── src/                    # Frontend
│   ├── assets/             # Static assets (svg, images)
│   └── core/               # App core (entry + logic + styles)
│       ├── index.html      # App entry (Vite root is src/)
│       ├── main.ts         # TypeScript entry
│       └── styles.css      # Tailwind CSS entry
├── src-tauri/              # Rust backend & Tauri config
│   └── src/core/           # Rust core (lib.rs + main.rs)
├── vite.config.ts          # Vite config (root=src, dev/build path plugins)
└── package.json
```

> The frontend is grouped under `src/core/` and the Rust backend under
> `src-tauri/src/core/`. Vite uses `src/` as its root; small plugins in
> `vite.config.ts` serve `src/core/index.html` at `/` in dev and flatten
> it to `dist/index.html` on build so Tauri's `frontendDist` resolves it.

## 🗺️ Roadmap

- [ ] Core AI chat interface
- [ ] Multiple model provider support (local & remote)
- [ ] Desktop task automation
- [ ] Plugin system
- [ ] Cross-platform builds (Windows, macOS, Linux)

## 🤝 Contributing

Contributions are welcome! Please open an issue to discuss what you'd like to change. See [CONTRIBUTING.md](CONTRIBUTING.md) for guidelines.

## 📄 License

Licensed under the [MIT License](LICENSE).
