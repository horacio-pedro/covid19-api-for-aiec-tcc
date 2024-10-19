# COVID-19 API for AIEC TCC

Faculdade AIEC.

## Routes

- /: contains opengraph image for sharing

- /api: global summary

- /api/og: generate a summary open graph image

- /api/confirmed: global cases per region sorted by confirmed cases

- /api/recovered: global cases per region sorted by recovered cases

- /api/deaths: global cases per region sorted by death toll

- /api/daily: global cases per day

- /api/daily/[date]: detail of updates in a [date] (e.g. /api/daily/2-14-2020)

- /api/countries: all countries and their ISO codes

- /api/countries/[country]: a [country] summary (e.g. /api/countries/Indonesia or /api/countries/USA or /api/countries/CN)

- /api/countries/[country]/confirmed: a [country] cases per region sorted by confirmed cases

- /api/countries/[country]/recovered: a [country] cases per region sorted by recovered cases

- /api/countries/[country]/deaths: a [country] cases per region sorted by death toll

- /api/countries/[country]/og: generate a summary open graph image for a [country]

## Usage

1. Clone

   ```bash
   git clone --depth=1 https://github.com/horacio-pedro/covid19-api-for-aiec-tcc
   ```

2. Install deps (`yarn`, `npm install`)

3. Install and register to [ZEIT Now](https://zeit.co/now) if you haven't. This project is exclusively made for the platform.

4. `now dev` to run a local dev deployment, `now` to publish.
