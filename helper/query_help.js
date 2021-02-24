const utill = require('util')
const database = require('../database')
module.exports = {
    generateQuery: (body) => {
            let result = ""
            for (let key in body) {
                result += ` ${key} = ${database.escape(body[key])},`
            }
            return result.slice(0, -1)
    },
    asyncQuery: utill.promisify(database.query).bind(database)
}