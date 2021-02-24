const { generateQuery, asyncQuery } = require('../helper/query_help')

module.exports = {
    get: async (req, res) => {
        try {
            const queryCate = `SELECT * FROM client where id_sales=${parseInt(req.params.id_sales)}`
            const result = await asyncQuery(queryCate)
            res.status(200).send(result)
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    add: async (req, res) => {
        // const {name, address, hp, zip_code, credit, id_sales} = req.body
        try {
            const qadd = `INSERT INTO client SET${generateQuery(req.body)}`
            const result1 = await asyncQuery(qadd)

            const qupdate = `SELECT * from client where id=${result1.insertId}`
            const result2 = await asyncQuery(qupdate)
            res.status(200).send(result2[0])
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    edit: async (req, res) => {
        const id = parseInt(req.params.id)
        try {
            const cek = `SELECT * FROM client WHERE id=${id}`
            const resCek = await asyncQuery(cek)
            if (resCek.length === 0) return res.status(400).send(`ID ${id} isn't available`)
            
            const qedit = `UPDATE client SET${generateQuery(req.body)} 
                           WHERE id = ${id}`
            await asyncQuery(qedit)
            res.status(200).send({status: 200, message: `client with id ${id} has been updated`})
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    },
    delete: async (req, res) => {
        const id = parseInt(req.params.id)
        try {
            const cek = `SELECT * FROM client WHERE id=${id}`
            const resCek = await asyncQuery(cek)
            if (resCek.length === 0) return res.status(400).send(`ID ${id} isn't available`)

            const qdelete = `DELETE FROM client WHERE id=${id}`
            await asyncQuery(qdelete)
            res.status(200).send({status: 200, message: `client with id ${id} has been deleted`})
        }
        catch (err) {
            console.log(err)
            res.status(400).send(err)
        }
    }
}