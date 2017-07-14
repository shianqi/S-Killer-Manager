module.exports = {
    "env": {
        "browser": true,
        "commonjs": true,
        "es6": true,
        "node": true
    },
    "extends": "eslint:recommended",
    "parserOptions": {
        "sourceType": "module"
    },
    "rules": {
        "linebreak-style": [
            "error",
            "unix"
        ],
        "quotes": [
            "error",
            "single"
        ],
        'arrow-parens': 0,
        "no-alert": 0,                              //禁止使用alert confirm prompt
        'indent': ["error", 4, {"SwitchCase": 1}],  //缩进风格
        'no-unused-vars': 1,
        "no-multi-spaces": 1,                       //不允许多个空格
        "no-extra-semi": 2,                         //多余的分号
        "no-unexpected-multiline": 2,               //行尾缺少分号可能导致一些意外情况
        "no-multiple-empty-lines": [1, {"max": 1}], //空行最多不能超过2行
        "no-constant-condition": 1,
        "default-case": 2,                          //switch语句最后必须有default
        "semi": [2, "never"],                       //语句强制分号结尾
        'generator-star-spacing': 0,
        'no-debugger': process.env.NODE_ENV === 'production' ? 2 : 0,
        'no-console': process.env.NODE_ENV === 'production' ? 0 : 0,
    }
};
