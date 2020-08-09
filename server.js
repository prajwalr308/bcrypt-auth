const express = require('express');
const app = express();
const bcrypt=require('bcrypt');


app.use(express.json())

const users=[
   
]

app.get('/users',(req,res)=>{
    res.json(users)
})
app.post('/users', async(req,res)=>{
    try {
        const salt =await bcrypt.genSalt();
        const hashedPassword = await bcrypt.hash(req.body.password,10);
        console.log(salt);
        console.log(hashedPassword);
        const user = {username:req.body.username,password:hashedPassword}
        users.push(user);
        res.status(201).send()

    } catch (error) {
        res.status(500);
    }
 

})

app.post('/users/login',async(req,res)=>{
    const user = users.find(user=>user.username=req.body.username)
    if(user ==null){
        return res.status(400).send('couldnt find user');
    }
    try {
       if(await bcrypt.compare(req.body.password,user.password)){
            res.send('successs')
       }else{
           res.send('not allowed')
       }

    } catch (error) {
        res.status(500).send()
    }
})

app.listen(3000);