const {Pool} = require('pg');


const pool = new Pool ({
    host:'localhost',
    user: 'postgres',
    password: '1234',
    database: 'citas',
    port:'5432'
})

module.exports = pool;

// const getUsers = async(req, res)=>{
//     const response = await pool.query('SELECT * FROM cliente');
//     console.log(response.rows);
//     //res.json(response.rows);
//     res.send(response.rows)
// }

// module.exports = {
//     getUsers,
//     createUser,
//     getUserById
// };