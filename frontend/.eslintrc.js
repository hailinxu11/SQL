const { strictEslint } = require('@umijs/fabric');

 const eslintRule = Object.assign(strictEslint,
  {rules:{...strictEslint.rules,
    'indent': ['error', 2, {
      'SwitchCase': 1,
      'ObjectExpression': 1,
      'VariableDeclarator': 2,
      'FunctionDeclaration': {'parameters': 'first'},
      'FunctionExpression': {'parameters': 'first'},
      'ArrayExpression': 'first',
      'MemberExpression': 2
    }],
     //块之前的间距一致性
     'space-before-blocks': ['error'],
     //在函数括号之前强制执行一致的间距
     'space-before-function-paren': ['error', {
       'anonymous': 'always',//用于匿名函数表达式
       'named': 'never',//用于命名函数
       'asyncArrow': 'always'//用于箭头函数
     }],
    //表达式符号之间间隔 符号前后必须有空格
    'space-infix-ops': 'error',
     //不允许在行尾添加尾随空白
    'no-trailing-spaces': 'error',
    //对象的属性位于同一行上，则该规则不允许围绕点或在开头括号之前留出空白。当对象和属性位于不同的行上时，此规则允许使用空格
    'no-whitespace-before-property': 'error',
    //不允许大括号内的空格
    'object-curly-spacing': ["error", "never"],
    //在关键字后禁止使用空格
    'keyword-spacing': ['error', {
      'overrides': {
        'if': {'after': false},
        'for': {'after': false},
        'while': {'after': false}
      }
    }],
    //禁止所有功能括号内的换行符
    'function-paren-newline': ["error", "never"],
    'linebreak-style': ['error', 'unix'],
    //此规则强制使用分号 在语句结尾需要分号
    'semi': ['error', 'always'],
    //强制在对象和数组文字中一致地不使用尾随逗号 
    'comma-dangle': ['error', 'never'],
    //代码空行控制最大为2
    'no-multiple-empty-lines': ['error', {'max': 2, 'maxEOF': 1}],
  }
});
module.exports = {
  ...eslintRule,
  globals: {
    ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION: true,
    page: true,
  },
};
