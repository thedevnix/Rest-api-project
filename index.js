const express = require("express");
let users = require("./MOCK_DATA.json");
const app = express();
const PORT = 3000;
app.use(express.json());

app.get("/api/users",(req,res)=>{
    return res.json(users);
})

app.get("/users",(req,res)=>{
    const html = 
    `<ul>
        ${users.map(user => `<li>${user.first_name}</li>`).join("")}
    </ul> `
    return res.send(html);
})


app.post("/api/users",(req,res)=>{
    const body = req.body;
    const newUser = {
        
        id:users.length+1,
        first_name:body.first_name,
        last_name : body.last_name
    }
    users.push(newUser);
    return res.status(201).json(newUser);
})

app.put("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const  user = users.find(user => user.id===id);
    if(!user){
        return res.status(404).json({
            message: "User not found"
        });
    }

    user.first_name= req.body.first_name;
    user.last_name = req.body.last_name;

    return res.json(user);
})


app.patch("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    const user = users.find(user => user.id === id);

    if(!user){
        return res.status(404).json({
            message: "user not found"
        });
    }

    if(req.body.first_name){
        user.first_name = req.body.first_name;
    }

    if(req.body.last_name){
        user.last_name = req.body.last_name;
    }

    if(req.body.email){
        user.email = req.body.email;
    }

    return res.json(user);
});

app.delete("/api/users/:id",(req,res)=>{
    const id = Number(req.params.id);
    users = users.filter(user=>user.id!==id);

    return res.json({
        status:"success",
        message:"user deleted Succesfully"
    })
});

app.listen(PORT,()=>console.log("Server Started at Port no:3000"));

