module.exports = {
    './*.(js|json)': ['prettier --write'],
    'src/**/*.(js|jsx)': ['eslint --fix', 'prettier --write'],
};
