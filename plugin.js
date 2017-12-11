'use strict'

const directoryTag = {
  mustHaveValue: true,
  onTagged: function (doclet, tag) {
    doclet.directory = tag.value
  }
}

const insideTag = {
  mustHaveValue: true,
  onTagged: function (doclet, tag) {
    doclet.inside = tag.value
  }
}

module.exports.defineTags = function(dictionary) {
  dictionary.defineTag('directory', directoryTag)
  dictionary.defineTag('inside', insideTag)
}