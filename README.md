# Object Detection Frontend

## Project Setup

install [nodejs](https://nodejs.org/ko)

```bash
git clone https://github.com/Thinline20/od-frontend
cd od-frontend
npm install # or use yarn or pnpm (bun might not work properly)
npm run build
```

Generated files are located under `./dist/` folder

Under `./dist/` folder, html files will be generated. Put those files in django `templates` folder.
Also, Astro generate `static` folder. Copy files to `static` folder in django project.

Django project folder structure should look like this

```
django-project/
└── chat/
    ├── views.py
    ├── urls.py
    ├── ...
    └── templates/
        └── chat/
            ├── index.html
            ├── room.html
            ├── cctv.html
            └── favicon.svg
    └── static/
        ├── cctv.123456.css
        ├── hoisted.asdfgjk.js
        ├── main-cctv.asadfklj.jpg
        └── ...
```

## 🧞 Commands

All commands are run from the root of the project, from a terminal:

| Command                   | Action                                           |
| :------------------------ | :----------------------------------------------- |
| `npm install`             | Installs dependencies                            |
| `npm run dev`             | Starts local dev server at `localhost:4321`      |
| `npm run build`           | Build your production site to `./dist/`          |
| `npm run preview`         | Preview your build locally, before deploying     |
| `npm run astro ...`       | Run CLI commands like `astro add`, `astro check` |
| `npm run astro -- --help` | Get help using the Astro CLI                     |

## 👀 Want to learn more?

Feel free to check [our documentation](https://docs.astro.build) or jump into our [Discord server](https://astro.build/chat).
