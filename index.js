const EbayScrapper = require('./main')

let data = [
    {
        url: 'https://offer.ebay.com/ws/eBayISAPI.dll?ViewBidsLogin&item=154224221222&rt=nc&_trksid=p2047675.l2564',
        product:'PS5 series'
    },
    {
        url: 'https://offer.ebay.com/ws/eBayISAPI.dll?ViewBidsLogin&item=353274931645&rt=nc&_trksid=p2047675.l2564',
        product:'XBOX X series'
    }
]

const fetchResults = () => {
    
    
    data.map( d => {
        //Initialize the scrapper instance
        let Ebay = new EbayScrapper( d.url, d.product );
        
        Ebay.getInfoFromUrl()
    })
}

fetchResults()


