import express from "express"
import cookieParser from "cookie-parser"
import fetch from "node-fetch"
import { getUserId, login } from "./api/authController";

const app = express();

app.set('views', process.cwd() + "/src/views")
app.set('view engine', 'pug');

//bodyparser
app.use(express.urlencoded({extended:true}))
app.use(cookieParser())

app.get("/", (req, res) => {
    res.render("home");
})

app.route("/login")
    .get((req, res) => {
        return res.render("login")
    })
    .post(login)

//로그인한 당사자의 글만 볼 수 있도록
app.get("/posts", async(req, res) => {
    const posts = [
        {
            id: "rnrudxo",
            title:"글1"
        },        {
            id: "rnrudxo",
            title:"글2"
        },        {
            id: "json",
            title:"글3"
        },        {
            id: "ruby",
            title:"글4"
        },        {
            id: "rnrudxo",
            title:"글5"
        },        {
            id: "rust",
            title:"글6"
        },        {
            id: "rnrudxo",
            title:"글7"
        }
    ]

    const header = {
        method:'POST',
        headers: {
            method: 'GET',
            Authorization:`Bearer ${req.cookies.accessToken}`
        }
    }
    const fullURL = req.protocol + '://' + req.get('host');
    const user = await (await fetch(`${fullURL}/getUser`, header)).json();
    console.log(user);
    console.log(posts.map(item => item.id === user.id));
    return res.render("posts", {posts:posts.filter(item => item.id === user.id)})
})

app.post("/getUser",getUserId)
export default app;