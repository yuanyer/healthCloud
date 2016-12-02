module.exports = {
    root: true,
    parser: 'babel-eslint',
    parserOptions: {
        sourceType: 'module'
    },
    extends: 'standard',
    plugins: [
        'html'
    ],
    "globals": {
        "$": true
    },
    'rules': {
        'arrow-parens': 0,
        'generator-star-spacing': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'eol-last': 0,
        'indent': ["error", 4, {
            "SwitchCase": 1
        }]
    }
}
