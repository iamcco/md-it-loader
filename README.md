# md-it loader

> markdown-it loader for webpack

## Installation

```bash
yarn add -D md-it-loader
```

## Usage

`webpack.config.js` file:

```javascript
const pluginOne = require('markdown-it-plugin-name-one')
const pluginTwo = require('markdown-it-plugin-name-two')
const hljs = require('highlight.js')

module.exports = {
  module: {
    loaders: [{
      test:   /\.md$/,
      loader: 'md-it-loader',
      options: {
        // Enable HTML tags in source
        html: true,
        // Use '/' to close single tags (<br />).
        xhtmlOut: true,
        // This is only for full CommonMark compatibility.
        // Convert '\n' in paragraphs into <br>
        breaks: false,
        // CSS language prefix for fenced blocks. Can be
        // useful for external highlighters.
        langPrefix: 'language-',
        // Autoconvert URL-like text to links
        linkify: true,
        // Enable some language-neutral replacement + quotes beautification
        typographer: true,
        // Double + single quotes replacement pairs, when typographer enabled,
        // and smartquotes on. Could be either a String or an Array.
        //
        // For example, you can use '«»„“' for Russian, '„“‚‘' for German,
        // and ['«\xA0', '\xA0»', '‹\xA0', '\xA0›'] for French (including nbsp).
        quotes: '“”‘’',
        // Highlighter function. Should return escaped HTML,
        // or '' if the source string is not changed and should be escaped externally.
        // If result starts with <pre... internal wrapper is skipped.
        highlight: function (str, lang) {
          if (lang && hljs.getLanguage(lang)) {
            try {
              return hljs.highlight(lang, str).value
            } catch (err) { }
          }

          try {
            return hljs.highlightAuto(str).value
          } catch (err) { }

          return ''
        },
        plugins: [pluginOne, [pluginTwo, options]]
      }
    }]
  }
}
```
