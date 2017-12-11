'use strict';

/**
 * Very ugly code
 */

// yeah a global var, again very ugly code
var currentState = undefined

function keepStateIntoHrefs() {
  var allAEls = document.getElementsByTagName('a')
  allAEls = Array.prototype.slice.call(allAEls)
  allAEls.forEach(aEl => {
    var indexInterrogation = aEl.href.indexOf('?')
    var indexHash = aEl.href.indexOf('#')
    if (indexInterrogation !== -1) {
      if (indexHash === -1) {
        aEl.href = aEl.href.substr(0, indexInterrogation)
          + currentState
      }
      else {
        aEl.href = aEl.href.substr(0, indexInterrogation)
          + currentState
          + aEl.href.substr(indexHash)
      }
    } else {
      if (indexHash === -1) {
        aEl.href = aEl.href
          + currentState
      } else {
        aEl.href = aEl.href.substr(0, indexHash)
          + currentState
          + aEl.href.substr(indexHash)
      }
    }
  })
}

function getQueryStorage () {
  if (currentState === undefined) {
    currentState = window.location.search
    keepStateIntoHrefs()
  }
  var query = currentState
  if (query === '' || query === '?') return {}
  query = query.substr(1)
  query = query.split('&')
  var storageObj = {}
  query.forEach(queryPart => {
    if (queryPart === '' || queryPart.indexOf('=') === -1 || queryPart[queryPart.length - 1] === '=')
      return
    queryPart = queryPart.split('=')
    storageObj[queryPart[0]] = JSON.parse(queryPart[1])
  })
  return storageObj
}

function setQueryStorage(obj) {
  var query = '?'
  var queryParts = []
  var keys = Object.keys(obj)
  for (var key of keys) {
    var content = obj[key]
    content = JSON.stringify(content)
    queryParts.push(key + '=' + content)
  }
  query += queryParts.join('&')
  if (query.length === 1)
    query = ''
  currentState = query
  keepStateIntoHrefs()
}

function getPrecedentState(key, defaultState) {
  var states = getQueryStorage()
  if (states[key] === undefined) {
    states[key] = defaultState
    setQueryStorage(states)
  }
  return states[key]
}

function setState(key, state) {
  var states = getQueryStorage()
  states[key] = state
  setQueryStorage(states)
  return state
}

function setDisplay(contentEl, arrowEl, isHidden) {
  if (isHidden) {
    arrowEl.innerHTML = '▼'
    contentEl.style.display = 'inherit'
  }
  else {
    arrowEl.innerHTML = '►'
    contentEl.style.display = 'none'
  }
}

(function() {
  /**
   * Structure of html :
   *  - category:
   *    |_ categoryNameContainer
   *    |   |_ categoryArrow
   *    |   |_ categoryName
   *    |_ categoryContent
   */
  /// get all categoryNameContainer
  var dirNameEls = document.getElementsByClassName('categoryNameContainer')
  if (!dirNameEls) return
  dirNameEls = Array.prototype.slice.call(dirNameEls)
  if (dirNameEls.length < 1) return
  /// iterate through each categoryNameContainer
  dirNameEls.forEach(dirNameContainerEl => {
    if (!dirNameContainerEl.parentElement) return
    /// get the categoryContent alongside it
    var els = dirNameContainerEl.parentElement.getElementsByClassName('categoryContent')
    if (!els || els.length < 1) return
    var contentEl = els[0]
    /// get the categoryArrow inside it
    var dirNameArrowEl = dirNameContainerEl.getElementsByClassName('categoryArrow')
    if (!dirNameArrowEl || dirNameArrowEl.length < 1) return
    dirNameArrowEl = dirNameArrowEl[0]
    /// get the categoryName inside it
    var dirNameEl = dirNameContainerEl.getElementsByClassName('categoryName')
    if (!dirNameEl || dirNameEl.length < 1) return
    dirNameEl = dirNameEl[0]
    var sessionKey = dirNameEl.innerHTML
    /// get the precedent state of the category
    var isHidden = getPrecedentState(sessionKey, true)
    setDisplay(contentEl, dirNameArrowEl, isHidden)
    dirNameContainerEl.addEventListener('click', () => {
      isHidden = setState(sessionKey, !isHidden)
      setDisplay(contentEl, dirNameArrowEl, isHidden)
    })
  })
})()