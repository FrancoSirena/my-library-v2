module.exports = {
  presets: [
    // There's a known bug with babel wherein Promise#finally isn't properly polyfilled when the
    // environment is set to Node 8.10 (which react-app does for us during tests) As such we need to
    // force the polyfill for Promise#finally to be inserted at the entry point.  In this case it's
    // config/setupTests.js
    [
      '@babel/env',
      {
        useBuiltIns: 'entry',
        corejs: '2',
      },
    ],
    [
      '@babel/preset-react',
      {
        throwIfNamespace: false, // defaults to true
      },
    ],
  ].filter(Boolean),
  plugins: [
    '@babel/plugin-proposal-object-rest-spread',
    '@babel/plugin-transform-spread',
    '@babel/plugin-syntax-dynamic-import',
    '@babel/plugin-transform-parameters',
  ],
};
