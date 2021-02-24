const { generateQuery, asyncQuery } = require('../helper/query_help')

module.exports = {
    representaiives: async (req, res) => {
        try {
            const qsales = `select s.id, s.name, s.address, s.hp, h1.jabatan, s.name as atasan from sales_representative s 
                            join hirarki h1 on s.id_jabatan = h1.id left join hirarki h2 on h1.atasan_id = h2.id`
            const result = await asyncQuery(qsales)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    credit: async (req, res) => {
        try {
            const qshow = `select s.id, s.name, s.hp, count(c.name) as total_client, sum(c.credit) as total_credit from sales_representative s 
                            join client c on s.id = c.id_sales group by s.id order by total_credit desc`
            const result = await asyncQuery(qshow)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
}