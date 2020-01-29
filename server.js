const fs = require('fs');
const crypto = require('crypto');
const cookieParser = require('cookie-parser');
const express = require('express');
const bodyParser = require('body-parser');
const mysql = require('mysql');
const jsonwebtoken = require('jsonwebtoken');
const app = express();
const port = process.env.PORT || 5000;
const data = fs.readFileSync('./database.json');
const conf = JSON.parse(data);
const auth = require( "./auth/auth");
const helmet = require('helmet')
app.use(helmet())
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

const connection = mysql.createConnection({
    host : conf.host,
    user : conf.user,
    password : conf.password,
    database : conf.database
});

connection.connect((err)=>{
    if(err){
        throw err;
    }
    console.log("mysql connected");
});

app.get('/api/users', (req, res) => {
    connection.query(
      "select * from user_table",
      (err,rows,fields) => {
          res.send(rows);
      }  
    );
});

app.post('/api/singup',(req,res) => {
    let sql = 'INSERT INTO user_table VALUES (?,?,?,?,?)'
    let id = req.body.vId;
    let pwd = "";
    let nickName = req.body.vNickname;
    let email = req.body.vEmail
    let salt = "";
    crypto.randomBytes(64, (err, buf) => {
        crypto.pbkdf2(req.body.vPwd, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => {
            pwd = key.toString('base64');
            salt = buf.toString('base64');
            let params = [id,pwd,nickName,email,salt];
            connection.query(sql, params)
        });
    });  
});


app.post('/api/singin',(req,res) => {
    let id = req.body.vId;
    let pwd = req.body.vPwd;
    let sql = `select * from user_table where vId = "${id}"`
    connection.query(
        `select * from user_table where vId="${id}"`,
        (err,rows,fields) => {
            if(rows.length) {
                crypto.pbkdf2(pwd, rows[0].vSalt, 100000, 64, 'sha512', (err, key) => {
                    if(key.toString('base64')===rows[0].vPwd) {
                        const token = auth.loginToken(id,key.toString('base64'),req.body.vNickname);
                        //maxage 604800000
                        res.cookie('MNID_TK',token,{
                            maxAge : 604800000
                        });
                        return res.json({
                            success: true
                        })
                    } else {
                        return res.status(401).json({
                            error: "로그인 오류",
                            code: 1
                        })
                    }
                })
            } else {
                return res.status(401).json({
                    error: "로그인 오류",
                    code: 2
                })
            }
        }  
    );
    
})

app.post('/api/profile',(req,res) => {
    let vId = req.body.vId;
    connection.query(`select * from user_table where vId = "${vId}"` , (err,rows,fields) => {
        let user = rows[0];
        return res.json({
            vNickname : user.vNickname,
            vEmail : user.vEmail
        })
    })
})

app.post('/api/profile/pwdChange',(req,res) => {
    let vId = req.body.vId;
    let OLD_vPwd = req.body.OLD_vPwd;
    let NEW_vPwd = req.body.NEW_vPwd;
    connection.query(`select * from user_table where vId = "${vId}"` , (err,rows,fields) => {
        let user = rows[0];
        
        crypto.pbkdf2(OLD_vPwd, user.vSalt, 100000, 64, 'sha512', (err, key) => {
            
            if(key.toString('base64') === user.vPwd) {
                crypto.randomBytes(64, (err, buf) => {
                    crypto.pbkdf2(NEW_vPwd, buf.toString('base64'), 100000, 64, 'sha512', (err, key) => { 
                        let pwd = key.toString('base64');
                        let salt = buf.toString('base64');
                        connection.query(`update user_table set vPwd = "${pwd}", vSalt = "${salt}" where vId = "${vId}"`)
                        return res.json({
                            success: true
                        })
                    });
                });                
            } else {
                return res.status(401).json({
                    error: "비밀번호 변경오류"
                })
            }
        });
    })
})

app.post('/api/profile/acctChange',(req,res) => {
    let vId = req.body.vId;
    let vNickname = req.body.vNickname;
    let vEmail = req.body.vEmail;
    let sql = ''
    if(vNickname === '') {
        sql = `update user_table set vEmail = "${vEmail}" where vId = "${vId}"`;
        connection.query(sql)
        return res.json({
            success: true
        })
    } else if(vEmail === '') {
        sql = `update user_table set vNickname = "${vNickname}" where vId = "${vId}"`;
        connection.query(sql)
        return res.json({
            success: true
        })
    } else {
        sql = `update user_table set vNickname = "${vNickname}", vEmail = "${vEmail}" where vId = "${vId}"`;
        connection.query(sql)
        return res.json({
            success: true
        })
    }
})

app.post('/api/profile/acctDel' ,(req,res) => {
    let vId = req.body.vId;
    let vPwd = req.body.vPwd;
    connection.query(`select * from user_table where vId = "${vId}"` , (err,rows,fields) => {
        let user = rows[0];
        crypto.pbkdf2(vPwd, user.vSalt, 100000, 64, 'sha512', (err, key) => {
            if(key.toString('base64') === user.vPwd) {
                connection.query(`delete from user_table where vId = "${vId}"`);
                return res.json({
                    success : true
                })
            } else {
                return res.status(401).json({
                    error : "비밀번호 오류"
                })
            }
        })
        
    })
})

app.post('/api/comments/register',(req,res) => {
    let sql = 'insert into comment(vId,vComment,vMovieNo) values(?,?,?);'
    let id = req.body.vId;
    let comment = req.body.comment;
    let movieNo = req.body.vMovieNo;
    let params = [id,comment,movieNo];
    connection.query(sql, params)
    return res.json({
        success : true
    })
});

app.post('/api/comments/del',(req,res) => {
    let iNo = req.body.iNo;
    let sql = `delete from comment where iNo = ${iNo}`;
    connection.query(sql);
    return res.json({
        success : true
    })
});

app.post('/api/comments/update',(req,res) => {
    let iNo = req.body.iNo;
    let comment = req.body.comment;
    let sql = `update comment set vComment = '${comment}' where iNo = ${iNo}`;
    connection.query(sql);
    return res.json({
        success : true
    })
});

app.get('/api/comments',(req,res) => {
    let movieNo = req.query.movieNo;
    let sql = `select c.iNo,c.vId,c.vComment,c.dReg,c.vMovieNo,u.vNickname 
            from comment c,user_table u 
            where c.vId=u.vId and c.vMovieNo = '${movieNo}' 
            order by dReg desc;`;
    connection.query(sql,(err,rows,fields) => {
        res.send(rows);
    } )
});




app.listen(port, () => console.log(`Listening on port ${port}`));