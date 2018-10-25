import * as express from "express";


export class ServerActivator {

    public static start(): void {
        let application = express();

        application.get("/", (request, response) => {
            response.send('Hello from Express!')
        });

        application.listen(3000, (err) => {
            if (err) {
                return console.log('something bad happened', err)
            }
            console.log(`server is listening on ${3000}`)
        });

    }
}
