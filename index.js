const MarkdownIt = require('markdown-it')
const loaderUtils = require('loader-utils')

module.exports = function (source) {
  this.cacheable()
  const options = loaderUtils.getOptions(this)
  const plugins = options.plugins || []
  delete options.plugins

  const parser = new MarkdownIt(options)
  plugins.forEach(plugin => {
    parser.use(...[].concat(plugin))
  })

  return `module.exports=\`${parser.render(source)}\``
}
