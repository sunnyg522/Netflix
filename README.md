# Netflix computer creation DB
Netflix cypress test


# Download application
git clone git@github.com:sunnyg522/Netflix.git

# Install dependencies

Make sure you have latest version of node and then run following command
```bash
npm install
```

# run automation
```bash
npx cypress run ./cypress/integration/computerdb/addcomputer.spec.js
```

```bash
.
├── README.md
├── cypress
│   ├── fixtures
│   │   └── example.json
│   ├── integration
│   │   └── computerdb
│   │       └── addcomputer.spec.js
│   ├── plugins
│   │   └── index.js
│   └── support
│       ├── addComputer.js
│       ├── commands.js
│       ├── editpage.js
│       ├── homepage.js
│       └── index.js
├── cypress.json
├── package-lock.json
└── package.json
```
