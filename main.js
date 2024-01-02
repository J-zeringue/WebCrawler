const { crawlPage } = require('./crawl.js')

function main(){
    if (process.argv.length < 3) {
        console.log("No website entered")
        process.exit(1)
    }
    if (process.argv.length > 3) {
        console.log("Too many commad line arguments")
        process.exit(1)
    }
    const baseURL = process.argv[2]

    console.log(`Starting to crawl ${baseURL}`)
    crawlPage(baseURL)
}

main()