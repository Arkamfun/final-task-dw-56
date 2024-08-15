const express = require("express");
const app = express();
const port = 3000;
const multer = require("multer");
const uploads = require("./middleware/multer");
const db = require("../4A/config/db");
const session = require("express-session");
const flash = require('connect-flash');
const bodyParser = require('body-parser');
app.set('trustProxy', 1)
app.use(session({
    secret: 'dumbways',
    resave: false,
    saveUninitialized: true,
    cookie: { maxAge: 360000000 }
}));
app.use(flash());

flash.setMessage = (req, res, message) => {
    res.locals.message = message
}



app.set("view engine", "hbs");
app.set("views", "src/views");
app.use(express.static('src'));
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static("/upload"))
app.get("/", renderIndex);
app.post("/addProvinsi", uploads.single('image'),uploadProvinsi);
app.get("/detail/:id", renderDetail);
app.get("/login", renderLogin);
app.get("/register", renderRegister);
app.post("/register", addRegsister);
app.get("/addProvinsi", renderAddProvinsi);
app.get("/addKabupaten", renderAddKabupaten);
app.post('/addKabupaten',uploads.single('image') ,uploadKabupaten);
app.post("/login", isLogin);
app.get("/updateProv/:id", renderUpdateProvinsi);
app.post("/updateProv/:id",uploads.single('photo'),updateProvinsi);
app.get("/updateKab/:id", renderUpdateKabupaten);
app.post("/updateKab/:id", uploads.single('photo'), updateKabupaten);
app.get("/deleteProv/:id", deleteProvinsi);
app.get("/deleteKab/:id", deleteKabupaten);

async function deleteKabupaten(req,res) {
    try{
        const id = req.params.id
        const kabupaten = `DELETE FROM kabupaten_tb WHERE id = ${id}`
        const result = await db.query(kabupaten,{type:db.QueryTypes.DELETE})
        req.flash('deleteKab', 'menghapus kabupaten berhasil')
        res.redirect('/');
    }catch(error){}
}

async function deleteProvinsi (req, res) {
    try{
        const id = req.params.id
        const provinsi = `DELETE FROM provinsi_tb WHERE id = ${id}`
        const result = await db.query(provinsi,{type:db.QueryTypes.DELETE})
        req.flash('deleteProv', 'delete provinsi berhasil')
        res.redirect('/');
    }catch (error) {
        console.log(error);
        
    }
}

async function updateKabupaten (req, res) {
    try{
        const id = req.params.id
        const newKab = {
            id: id,
            provinsi_id: req.body.provinsi,
            nama: req.body.nama,
            diresmikan: req.body.diresmikan,
            photo: req.file.filename
        }
        const kabupaten = `UPDATE kabupaten_tb SET provinsi_id = '${newKab.provinsi_id}', nama = '${newKab.nama}', diresmikan = '${newKab.diresmikan}', photo = '${newKab.photo}' WHERE id = ${id}`
        const result = await db.query(kabupaten,{type:db.QueryTypes.UPDATE})
        req.flash('updateKab', 'update kabupaten berhasil')
        res.redirect('/');
    }catch (error) {
        console.log(error);
        
    }
}

async function renderUpdateKabupaten(req,res) {
    try {const queryProv = "SELECT * FROM provinsi_tb"
        const provinsi = await db.query(queryProv, { type: db.QueryTypes.SELECT });
        const query = `SELECT * FROM kabupaten_tb WHERE id = ${req.params.id}`;
        const result = await db.query(query, { type: db.QueryTypes.SELECT });
        const kabupaten = {
            id: result[0].id,
            provinsi_id: result[0].provinsi_id,
            nama: result[0].nama,
            diresmikan: result[0].diresmikan,
            photo: result[0].photo
        }
        res.render('updateKabupaten', { kabupaten: kabupaten
            , provinsi: provinsi
         });
    } catch (error) {
        console.log(error);
    }
}

async function updateProvinsi(req, res) {
    try {
        const id = req.params.id
        const newProv = {
            id: id,
            nama: req.body.nama,
            diresmikan: req.body.diresmikan,
            photo: req.file.filename,
            pulau: req.body.pulau
        }
        const query = `UPDATE provinsi_tb SET nama = '${newProv.nama}', diresmikan = '${newProv.diresmikan}', photo = '${newProv.photo}', pulau = '${newProv.pulau}' WHERE id = ${newProv.id}`;
        const result = await db.query(query, { type: db.QueryTypes.UPDATE });
        if (result) {
            req.flash('uploadProv', 'update provinsi berhasil')
            res.redirect('/')
    }
} catch (error) {
    console.log(error);
}
}
async function renderUpdateProvinsi(req,res) {
    try {
        const query = `SELECT * FROM provinsi_tb WHERE id = ${req.params.id}`;
        const result = await db.query(query, { type: db.QueryTypes.SELECT });
        const provinsi = {
            id: result[0].id,
            nama: result[0].nama,
            diresmikan: result[0].diresmikan,
            photo: result[0].photo,
            pulau : result[0].pulau
        }
        res.render("updateProvinsi", {
            data: provinsi
        });
    } catch (error) {
        console.log(error);
    }
}  

async function renderDetail (req, res) {
    try {
        // kabupaten
        // 
        const query = `SELECT * FROM provinsi_tb WHERE id = ${req.params.id}`;
        const result = await db.query(query, { type: db.QueryTypes.SELECT });
        const provinsi = {
            id: result[0].id,
            nama: result[0].nama,
            diresmikan: result[0].diresmikan,
            photo: result[0].photo
        }
        // for(let i = 0; i < result.length; i++) {
            const kabupaten = `SELECT * FROM kabupaten_tb WHERE provinsi_id = ${provinsi.id}`
            const kabupatenResult = await db.query(kabupaten, {type:db.QueryTypes.SELECT});
        //     kabupatenData.push(kabupatenResult)
        // }
        console.log(kabupatenResult)
        ;
        res.render("detail", {
            data: provinsi,
            kabupaten: kabupatenResult
        });
    } catch (error) {
        console.log(error);
    }
}

async function uploadKabupaten(req, res) {
    try {
        const newKabupaten = {
            provinsi_id: req.body.provinsi,
            nama: req.body.nama,
            diresmikan: req.body.diresmikan,
            photo: req.file.filename
        }
        const query = `INSERT INTO kabupaten_tb (provinsi_id, nama, diresmikan, photo) VALUES ('${newKabupaten.provinsi_id}', '${newKabupaten.nama}', '${newKabupaten.diresmikan}', '${newKabupaten.photo}')`;
        const result = await db.query(query, { type: db.QueryTypes.INSERT });
        res.redirect("/");
} catch (error) {
    console.log(error);
}
}

async function renderAddKabupaten(req, res) {
    try {

        const query = "SELECT * FROM provinsi_tb"
        const provinsi = await db.query(query, { type: db.QueryTypes.SELECT });
        res.render("addKabupaten", {
            provinsi: provinsi
        });
    } catch (error) {
        console.log(error);
    }
}


async function renderAddProvinsi(req, res) {
    try {
        console.log(req.session.user)
        res.render("addProvinsi");
    } catch (error) {
        console.log(error);
    }
}

async function renderLogin(req,res) {
try {
   
    
    res.render("login",{message: req.flash('error'),
        success: req.flash('isRegister')
    });
} catch (error) {
    console.log(error);
}
}

;


async function isLogin(req, res) {
    try {
        const query = `SELECT * FROM users WHERE email = '${req.body.email}' AND password = '${req.body.password}'`;
        
        const result = await db.query(query, { type: db.QueryTypes.SELECT });
        if (result.length > 0) {
            req.session.isLogin= true;
            req.session.user = result[0].id;
            req.flash('success', 'login success')
            console.log(req.session.user);
            res.redirect('/');
            // res.redirect('/');
        } else {
            req.flash('error', 'login failed')
            
            res.redirect('/login');
} } catch (error) {
    console.log(error);
}

}

async function addRegsister(req, res) {
    try {
        const query = `INSERT INTO users (email, username, password) VALUES ('${req.body.email}', '${req.body.username}', '${req.body.password}')`;
        const result = await db.query(query, { type: db.QueryTypes.INSERT });
        req.flash('isRegister', 'register success')
        req.flash('failRegister', 'register failed')
        res.redirect('/login');
    } catch (error) {
        console.log(error);
    }
}
async function renderRegister(req,res) {
    try {
        console.log(req.session.user)
        res.render("register",{
            failResgister: req.flash('failRegister')
        });
    } catch (error) {
        console.log(error);
    }
}

async function uploadProvinsi(req, res) {
    try {

        const query = `INSERT INTO provinsi_tb (nama, diresmikan, photo, pulau) VALUES ('${req.body.provinsi}', '${req.body.diresmikan}', '${req.file.filename}', '${req.body.pulau}')`;
        const result = await db.query(query, { type: db.QueryTypes.INSERT });
        
        req.flash('uploadProv', 'Tambah Provinsi Berhasil')
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
            console.log(req.session.user);
            
            res.render('index', {
                uploadProv: req.flash('uploadProv'),
                deleteKab: req.flash('deleteKab'),
                deleteProv: req.flash('deleteProv'),
                updateKab: req.flash('updateKab'),
                updateProv : req.flash('updateProv'),
                message: req.flash('success'),
                user: users,
                provinsi: kab,
                login: req.session.isLogin
        })
    }
    catch (err) {
        console.log(err);
        
    }
}




app.listen(port, () => {
    console.log(`Example app listening on port ${port}`)
})
