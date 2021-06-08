import jwt from "jsonwebtoken"

export const login = (req, res) => {
    const { id, password } = req.body;
    const user = { id };
    console.log(id, password);
    
    //무조건 로그인이 된다는 조건.
    const accessToken = jwt.sign(user, process.env.JWT_SECRET);
    res.cookie("accessToken", accessToken, { maxAge: 300000, signed:true });
    console.log(accessToken);

    return res.redirect('/');
}

export const getUserId = async (req, res) => {
    const authHeader = req.headers['authorization'];
    console.log("헤더 : ",req.headers);
    console.log(authHeader);
    const token = authHeader.split(' ')[1];
    console.log(req.header);

    await jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err)
            return res.end();
        return res.json(user);
    })
}

//참고 https://junspapa-itdev.tistory.com/12