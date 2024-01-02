const { JSDOM } = require('jsdom')

async function crawlPage(currentURL){
    console.log(`Crawling ${currentURL}`)
    try {
        const response = await fetch(currentURL)
        if (response.status > 399) {
            console.log(`Error fetching status code: ${response.status} on ${currentURL}`)
            return
        }
        const contentType = response.headers.get('content-type')
        if (!contentType.includes('text/html')) {
            console.log(`Non html response, content type: ${contentType} on ${currentURL}`)
            return
        }
        console.log(await response.text())
    } catch (error) {
        console.log(`Error fetching: ${error.message} on ${currentURL}`)
    }
    const response = await fetch(currentURL)
    console.log(await response.text())
}

function normalizeURL(url){
    const urlObj = new URL(url)
    let fullPath = `${urlObj.host}${urlObj.pathname}`
    if (fullPath.length > 0 && fullPath.slice(-1) === '/'){
      fullPath = fullPath.slice(0, -1)
    }
    return fullPath
  }
  
  function getURLsFromHTML(htmlBody, baseURL){
    const urlsFound = []
    const dom = new JSDOM(htmlBody)
    const linkElements = dom.window.document.querySelectorAll('a')
    for (const linkElement of linkElements){
        if (linkElement.href.slice(0, 1) === '/') {
            try {
                const urlObj = new URL(`${baseURL}${linkElement.href}`)
                urlsFound.push(urlObj.href)
            } catch (error) {
                console.log(`Error with relative url: ${error.message}`)
            }
        } else {
            try {
                const urlObj = new URL(linkElement.href)
                urlsFound.push(urlObj.href)
            } catch (error) {
                console.log(`Error with relative url: ${error.message}`)
            }
        }
        
    }
    return urlsFound
  }


module.exports = {
    normalizeURL,
    getURLsFromHTML, 
    crawlPage
  }