const User = require("../modals/user")

const router = require("express").Router()

const bcrypt = require("bcrypt")

router.post("/register", async (req, res) => {
    
    try {
        const Salt = await bcrypt.genSalt(10);
        const hashpassword=await bcrypt.hash(req.body.password,Salt)

        const newUser = new User({
            name: req.body.name,
            emailId: req.body.emailId,
            mobile: req.body.mobile,
            password: hashpassword,

        })

        await newUser.save()
        res.status(200).json(newUser)
    } catch (error) {
        res.status(500).json(error)
    }
})

router.post("/login",async (req,res)=>{
    try {
        const user = await User.findOne({emailId:req.body.emailId})
        if(!user){
            res.status(200).json(false)
        }
        else{
            const validPassword = await bcrypt.compare(req.body.password,user.password)  //dcrypt
            
            if(validPassword){
            const ch=true;
            res.status(200).json(ch)
        }
        else{
            res.status(200).json(false)
        }
        }
    } catch (error) {
        res.status(500).json(error)
    }
})

router.put("/update/:id", async (req, res) => {
    try {

        if (req.body.password) {
            const salt = await bcrypt.genSalt(10)
            req.body.password = await bcrypt.hash(req.body.password, salt)
        }
        const update = await User.findOneAndUpdate({ _id: req.params.id }, { $set: req.body })

        if (update) {
            res.status(200).json({ status: true, message: "User data Update", json: update })
        }

    } catch (error) {
        res.status(500).json({ status: false, message: "User Not Update", json: error })
    }
})



router.delete("/delete/:id", async (req, res) => {

    try {
        const user = await User.findById({ _id: req.params.id });

        if (user) {
            User.findByIdAndDelete({ _id: req.params.id }).then(() => {
                res.status(200).json({ status: true, message: "User Delelted Found" })
            })
        } else {
            res.status(200).json({ status: false, message: "User Not Found" })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "error", errormessage: error })
    }
})


// GET ALL USER 

router.get("/get", (req, res) => {
    User.find().then(users => {
        res.status(200).json({ status: true, message: "User Fetch Sucesfullly", data: users })
    }).catch(error => {
        res.status(500).json({ status: false, message: "no Data", errormessage: error })
    })
})

// GET ONE USER

router.get("/get/:id", async (req, res) => {
    try {
        const user = await User.findById({ _id: req.params.id })
        if (user) {
            res.status(200).json({ status: true, message: "User Found Succesfully", data: user })
        }
        else {
            res.status(200).json({ status: false, message: "User Not Found" })
        }
    } catch (error) {
        res.status(500).json({ status: false, message: "error", errormessage: error })
    }
})




module.exports = router