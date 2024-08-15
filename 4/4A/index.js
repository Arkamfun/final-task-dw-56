const express = require("express");
const app = express();
const port = 3000;
const multer = require("multer");
const uploads = require("./middleware/multer");
const db = require("../4A/config/db");




app.set("view engine", "hbs");
app.set("views", "src/views");
app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("/upload"))
app.get("/", renderIndex);
app.post("/", uploads.single('image'),uploadProvinsi);





async function uploadProvinsi(req, res) {
    try {


        
        const foto = req.file.filename
        const query = `INSERT INTO provinsi_tb (nama, diresmikan, photo, pulau) VALUES ('${req.body.provinsi}', '${req.body.diresmikan}', '${req.file.filename}', '${req.body.pulau}')`;
        const result = await db.query(query, { type: db.QueryTypes.INSERT });

        res.redirect('/');
} catch (error) {
    console.log(error);
}

}
async function renderIndex(req, res) {
    try {
        const query = "SELECT * FROM users";
        const provinsi = "SELECT * FROM provinsi_tb";
        
        const users = await db.query(query, { type: db.QueryTypes.SELECT });
        const prov = await db.query(provinsi,{type: db.QueryTypes.SELECT});

            let kab = []
        for (let i = 0; i < prov.length; i++) {
            const kabupaten = `SELECT * FROM kabupaten_tb WHERE provinsi_id = ${prov[i].id}`
            const kabupatenData = await db.query(kabupaten, {type:db.QueryTypes.SELECT});
            kab.push({...prov[i],
                kabupaten:kabupatenData})
            }
            res.render('index', {
                user: users,
                provinsi: kab
        })
    }
    catch (err) {
        console.log(err);
        
    }
}




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
