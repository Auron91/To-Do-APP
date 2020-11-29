
//multer settings
const upload = multer({
    //dest: './images/avatars',
    limits: {
        fileSize: 1000000
    },
    fileFilter(req, file, cb) {
        if (!file.originalname.match(/\.(jpg|jpeg|png)$/)) {
            return cb(new Error('File must be a picture'), undefined)
        }
        cb(undefined, true)
    }

})

router.post('/users/me/avatar', auth, upload.single('avatar'), async (req, res) => {
    //req.user.avatar = req.file.buffer
    const buffer = await sharp(req.file.buffer)
    .png()
    .resize({
        width: 250,
        height: 250
    })
    .toBuffer()

    req.user.avatar = buffer
    await req.user.save()
    res.status(200).send()
}, (error, req, res, next) => {
    res.status(400).send({ error: error.message })
})

router.delete('/users/me/avatar', auth, async (req, res) => {
    req.user.avatar = undefined
    await req.user.save()
    res.send()
})

router.get('/users/:id/avatar', async (req, res) => {
    try {
        const user = await User.findById(req.params.id)

        if(!user || !user.avatar) {
            throw new Errror({error: "No user or pic"})
        }
        res.set('Content-Type', 'image/jpg').send(user.avatar)

    } catch(e) {
        res.status(404).send()
    }
})