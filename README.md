# Edge Demo

1. Download repo
2. Run `npm install`
3. Run `npm run build`
4. Take the contents of the `dist` directory and place on web server

## To change the columns, data displayed on detail page or refresh time

Go to `src/app/helper.ts`

## Configuring web server

Set the web server configs to always return the index.html file when ever an html file is requested regardless of path.

See: https://gist.github.com/ywwwtseng/63c36ccb58a25a09f7096bbb602ac1de
