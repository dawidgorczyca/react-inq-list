module.exports = {
  type: 'react-component',
  npm: {
    esModules: true,
    umd: {
      global: 'ReactInqList',
      externals: {
        react: 'React'
      }
    }
  }
}
