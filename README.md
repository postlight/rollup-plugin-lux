# Rollup Plugin Lux

[![Greenkeeper badge](https://badges.greenkeeper.io/postlight/rollup-plugin-lux.svg)](https://greenkeeper.io/)

[![CircleCI branch](https://img.shields.io/circleci/project/github/postlight/rollup-plugin-lux/master.svg?style=flat-square)](https://circleci.com/gh/postlight/rollup-plugin-lux/tree/master) [![AppVeyor](https://img.shields.io/appveyor/ci/zacharygolba/rollup-plugin-lux/master.svg?style=flat-square)](https://ci.appveyor.com/project/zacharygolba/rollup-plugin-lux/branch/master) [![Codecov branch](https://img.shields.io/codecov/c/github/postlight/rollup-plugin-lux/master.svg?style=flat-square)](https://codecov.io/gh/postlight/rollup-plugin-lux) [![David](https://img.shields.io/david/postlight/rollup-plugin-lux.svg?style=flat-square)](https://david-dm.org/postlight/rollup-plugin-lux) [![npm](https://img.shields.io/npm/v/rollup-plugin-lux.svg?style=flat-square)](https://www.npmjs.com/package/rollup-plugin-lux)

[Lux](https://github.com/postlight/lux) uses [Babel](https://github.com/babel/babel)
and [Rollup](https://github.com/rollup/rollup) to bundle applications into a
single file to make module loading and resolution a bit easier. However, this
method does not guarantee that the value of `constructor.name` will be the same
in the bundled output. This plugin allow's [Lux](https://github.com/postlight/lux)
to continue to use this method to resolve dependencies of an application by
appending an `Object.defineProperty` call below each constructor that sub classes
a member of the public [Lux](https://github.com/postlight/lux) API.

*Note:*

> This is a module that [Lux](https://github.com/postlight/lux) uses internally.
> It is not required for users of [Lux](https://github.com/postlight/lux) to add
> this plugin to their `package.json` file.

**Example**

*Before*

```javascript
import { Model } from 'lux-framework';

class User extends Model {

}

export default User;
```

*After*

```javascript
import { Model } from 'lux-framework';

class User extends Model {

}

export default User;

Object.defineProperty(User, 'name', { name: 'User' });
```

## Installation

```bash
git clone https://github.com/postlight/rollup-plugin-lux.git
cd rollup-plugin-lux
npm install
```

## Testing

```bash
npm test
```

## Building

```bash
npm run build
```
