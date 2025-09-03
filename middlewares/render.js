/**
 * Render ejs
 * @param {*} objRepo 
 * @param view
 * @returns 
 */

module.exports = function (objRepo, view){
    return (req, res, next) => {
        return res.render(view, res.locals);
    }
}