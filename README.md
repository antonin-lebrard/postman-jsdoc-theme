# Fork of [postman-jsdoc-theme](https://github.com/postmanlabs/postman-jsdoc-theme)

This fork is only useful while using this jsdoc plugin: https://github.com/antonin-lebrard/jsdoc-nav-utils

This theme does nothing more than the original if not used with the plugin, and the plugin does nothing without using this theme

This is very barebone, and it was mostly to try to hack the jsdoc generation to provide 'categories' containing all classic jsdoc tag definitions (like 'Classes', 'Namespaces', etc..)

Using this theme with some tags defined by this [plugin](https://github.com/antonin-lebrard/jsdoc-nav-utils), the navigation bar at the left will have very basic expanding 'directories' or 'categories' which might be helpful to organize the code in packages of classes, namespaces, etc..

This is not at all tested on a diverse set of documentations, but this work well enough for my use case

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
