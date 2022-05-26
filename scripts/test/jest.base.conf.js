const path = require('path');

// To have consistent date time parsing both in local and CI environments we set
// the timezone of the Node process.
process.env.TZ = 'Asia/Shanghai';

module.exports = {
  verbose: true,
  rootDir: path.resolve(__dirname, '../../'),
  testURL: 'http://localhost/',
  moduleFileExtensions: ['js', 'jsx', 'ts', 'tsx', 'vue', 'json'],
  moduleNameMapper: {
    '^@/(.*)$': '<rootDir>/src/$1',
    '^tdesign-mobile-vue(.*)': '<rootDir>/src/$1',
    '^vue$': '<rootDir>/node_modules/vue/index.js',
  },
  modulePathIgnorePatterns: ['<rootDir>/test/unit/coverage/'],
  transform: {
    '.*\\.(vue)$': 'vue3-jest',
    '^.+\\.tsx?$': 'ts-jest',
    "^.+\\.jsx?$": "babel-jest",
    '.+\\.(css|styl|less|sass|scss|svg|png|jpg|ttf|woff|woff2)$': 'jest-transform-stub',
  },
  testRegex: '.*\\.test\\.js$',
  testPathIgnorePatterns: ['/node_modules/', '.history', "/src/_common/"],
  setupFiles: ['<rootDir>/scripts/test/setup.js'],
  globals: {
    'ts-jest': {
      tsconfig: '<rootDir>/tsconfig.json',
      babelConfig: true,
    },
  },
  reporters: [
    'default',
    [
      './node_modules/jest-html-reporter',
      {
        pageTitle: 'TDesign Test Report',
      },
    ],
  ],
  snapshotSerializers: ['jest-serializer-vue'],
  watchPlugins: ['jest-watch-typeahead/filename', 'jest-watch-typeahead/testname'],
};
