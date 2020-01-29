const jwt = require('jsonwebtoken');

exports.loginToken = (vId ,vPwd ,vNickname) => {
    let token =jwt.sign(
            {
                id : vId,
                nickName : vNickname
            },
            'jeon',
            {
                expiresIn : '7d',
                issuer : 'jjh',
                subject : 'userInfo'
            })
    return token
}