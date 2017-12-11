# Fork of [postman-jsdoc-theme](https://github.com/postmanlabs/postman-jsdoc-theme)

This fork is only useful while using the jsdoc plugin defined inside it, see <b>Usage</b> 

This theme does nothing more than the original if not used with the plugin, and the plugin does nothing without using this theme

This is very barebone, and it was mostly to try to hack the jsdoc generation to provide 'categories' containing all classic jsdoc tag definitions (like 'Classes', 'Namespaces', etc..)

Using this theme with some tags defined by here: [plugin.js](https://github.com/antonin-lebrard/postman-jsdoc-theme/blob/master/plugin.js), the navigation bar at the left will have very basic expanding 'directories' or 'categories' which might be helpful to organize the code in packages of classes, namespaces, etc..

This is not at all tested on a diverse set of documentations, but this work well enough for my use case

## Usage

Use the theme and plugin in your `jsdoc.conf`: 
```json
{
  "tags": {
    "allowUnknownTags": true,
    "dictionaries": [ "jsdoc" ]
  },
  "source": {
    "include": [ "whatever/*", "README.md" ]
  },
  "plugins": [ "plugins/markdown", "postman-jsdoc-theme/plugin" ],
  "opts": {
    "template": "node_modules/postman-jsdoc-theme",
    "recurse": true,
    "encoding": "utf8",
    "destination": "./docs/"
  }
}
```

And in your source files, put these tags:

Define a category. It does nothing without the use of the @inside tag, and vice-versa.
```javascript
/**
 * @category the_name_of_the_category`
 */
```

Use the tag `@inside` to put the symbol you're documenting inside the category you have defined
```javascript
/**
 * @inside the_name_of_the_category
 */ 
class ObjExample {
  // this will be automaticaly inside the symbol `ObjExample` which is inside `the_name_of_the_category`
  constructor() {}
  // same with every definition inside the class, but this only happens because jsdoc itself
  // manage the automatic inclusion inside the class symbol
  exampleFunction() {}
}
```
Again I have not thouroughly tested it, but it seems to works well with class definitions

## Original README.md from here

# Postman JSDoc3 Theme

A clean, responsive documentation template theme for JSDoc 3, based on [LatoDoc](https://github.com/smeijer/latodoc)

## Install

```bash
$ npm install --save-dev postman-jsdoc-theme
```

## Usage

Clone repository to your designated `jsdoc` template directory, then:

```bash
$ jsdoc entry-file.js -t path/to/postman-jsdoc-theme
```

Optionally, provide a package version on the command line, which will be rendered into the final documentation
```bash
$ jsdoc entry-file.js -t path/to/postman-jsdoc-theme --query 'pkgVersion=2.3.0'
```

### Node.js Dependency

In your projects `package.json` file add a generate script:

```json
"script": {
  "generate-docs": "node_modules/.bin/jsdoc --configure .jsdoc.json --verbose"
}
```

In your `.jsdoc.json` file, add a template option.

```json
"opts": {
  "template": "node_modules/postman-jsdoc-theme"
}
```

### Example JSDoc Config

```json
{
    "tags": {
        "allowUnknownTags": true,
        "dictionaries": ["jsdoc"]
    },
    "source": {
        "include": ["lib", "package.json", "README.md"],
        "includePattern": ".js$",
        "excludePattern": "(node_modules/|docs)"
    },
    "plugins": [
        "plugins/markdown"
    ],
    "templates": {
        "cleverLinks": true,
        "monospaceLinks": true
    },
    "opts": {
        "destination": "./docs/",
        "encoding": "utf8",
        "private": true,
        "recurse": true,
        "template": "./node_modules/postman-jsdoc-theme"
    }
}
```

## License

Licensed under the MIT license.
