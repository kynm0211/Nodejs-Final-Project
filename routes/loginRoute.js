module.exports = (app) =>{
    app.get('/api/login', (req, res)=>{
        // Show does not suppot GET method
        res.send({message: 'Show does not suppot GET method'});
    });
}