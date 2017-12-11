'use strict'

const categoryTag = {
  mustHaveValue: true,
  onTagged: function (doclet, tag) {
    doclet.category = tag.value
  }
}

const insideTag = {
  mustHaveValue: true,
  onTagged: function (doclet, tag) {
    doclet.inside = tag.value
  }
}

module.exports.defineTags = function(dictionary) {
  dictionary.defineTag('category', categoryTag)
  dictionary.defineTag('inside', insideTag)
}