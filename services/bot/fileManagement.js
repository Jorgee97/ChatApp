/**
 * I will handle the csv file reading here as well as the network request.
 */
const csv = require('csv-parse');
const fs = require('fs');
/**
 * Validate the command by looking for the prefix /stock
 * and also the = sign that most be included
 *  */ 
const validateCommand = (command, prefix) => {    
    return (command.toString().startsWith(prefix)) || false;    
};

/**
 * Returns the stock_code after the /prefix=
 */
const getStockCode = (command, prefix) => {
    return command.toString().slice(prefix.length, command.length);
};

const requestStock = (stockCode, io) => {    
    let stooqURL = `https://stooq.com/q/l/?s=${stockCode}&f=sd2t2ohlcv&h&e=csv`;
    let https = require('https');
    let data = '';
    let message = '';
    https.get(stooqURL, (res) => {
        res.on('data', (chunk) => {
            data += chunk;
        });        
        res.on('end', () => {
            let stockInformation = data.split('\n')[1];
            let nameOfStock = stockInformation.split(',')[0];
            let share = stockInformation.split(',')[6];
            message = `${nameOfStock} quote is $${share} per share`;    
            if (share == 'N/D') {
                message = `Oops! It seams like ${nameOfStock} doesn't exist`;
            }
            
            io.emit('new message', { username: 'Bot', message: message });
        });
    })
    .on('error', () => {
        console.error("There was an error trying to fetch from Stooq.");
    });    
};

module.exports = {
    validateCommand,
    getStockCode,
    requestStock
}