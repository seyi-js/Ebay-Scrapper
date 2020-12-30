const puppeteer = require( 'puppeteer' );

class EbayScrapper{
    constructor(url,product) {
        this.product = product;
        this.url = url;
    };
  
    async getInfoFromUrl() {
        const browser = await puppeteer.launch();
        const page = await browser.newPage();
        await page.goto( this.url, { waitUntil: 'networkidle2' } );
        
        this.processDocument(page,browser)
        
    }

        async processDocument (page,browser) {
           
            let data = await page.evaluate( () => {
                let table = document.getElementsByClassName( 'BHbidSecBorderGrey' )[ 0 ].children[ 1 ].children[ 4 ].children[ 0 ]
       
       
                let allData = [];
                let i = 0;
                while ( i < 40 ) {
                    i++;
                    
                    if ( table.children[ i ] ) {
                        //Sort data into date and quatity
                        let data = {
                            date: table.children[ i ].children[ 4 ].innerText.substring( 0, 9 ),
                            quantity: table.children[ i ].children[ 3 ].innerText
                        }
                        allData.push( data )
                    } else {
                        break;
                    }
                };

                //Filter same dates into groups
                let filtered =[]
                for ( let i = 0; i < allData.length; i++ ){
                    //To verify if an iterated date is not in the filtered group before to avoid duplication
                    let tDate = filtered.filter( t => t.date === allData[ i ].date );

                    if ( tDate.length === 0 ) {
                        let data = 
                        {
                            date: allData[ i ].date,
                            group:allData.filter((f)=> f.date === allData[ i ].date)
                        }
                    filtered.push( data )
                    }
  
    
                };

                //Sort date with quatities sold
                let finalResult =[]
                for ( let i = 0; i < filtered.length; i++ ){
                    let quantity = 0;
                    let arr = filtered[ i ];

                    //Map the groups and add up the quatities
                    arr.group.map( t => {
                        quantity += parseInt( t.quantity )
                      
                    } );
                
                    let d = {
                        date: arr.date,
                        quantity_sold:quantity
                    }
                     finalResult.push(d)
                }

                
                return finalResult;  
                
            } );

            let returnedResult = {
                product:this.product,
                results:data
            }
            console.log(returnedResult)
            await browser.close();
        
}

    
}



module.exports = EbayScrapper
