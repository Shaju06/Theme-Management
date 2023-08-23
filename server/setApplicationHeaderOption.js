/**
 * @param app An instance of the express Applicaton.
 */
const setApplicationHeaderOptions = (app) => {
    app.use((req, res, next) => {
        res.setHeader("Access-Control-Allow-Origin", "*");
        res.setHeader("Access-Control-Allow-Credentials", "true");
        res.setHeader("Access-Control-Allow-Methods", "GET,HEAD,OPTIONS,POST,PUT, PATCH");
        res.setHeader(
            "Access-Control-Allow-Headers",
            "Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type, Access-Control-Request-Method, Access-Control-Request-Headers, authorization"
        );
        next();
    });
};

export default setApplicationHeaderOptions;