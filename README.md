# OmniPlay

A Next.js web application consuming data from [RAWG.IO API](https://rawg.io) with features and requirements described [here](https://gist.github.com/hcaiano/d9a16564a735676b6897f1bae4fd0744) 


## Local setup

### 1. Clone the repo
```bash
git clone https://github.com/aadelgrossi/omniplay.git
```


### 2. Update env file

```bash
mv .env.example .env
```

then add your API key value for `NEXT_PUBLIC_RAWG_API_KEY` (obtain one at https://rawg.io/apidocs)

### 4. Install dependencies and generate styled system

```bash
pnpm install
yarn install
```

### 5. Run a local build

```bash
pnpm run start
yarn start
```

The application should be available at `http://localhost:3000`