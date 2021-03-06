class RequestError extends Error {
    constructor(message:string, errorCode:number, err:Error) {
        super(message);
        // this.code = errorCode;
        // If err is passed, it will be logged on the console
        if (err) {
            console.log("\n")
            const currentDate = new Date();
            const datetime = currentDate.getDate() + "/"
                + (currentDate.getMonth()+1)  + "/"
                + currentDate.getFullYear() + " @ "
                + currentDate.getHours() + ":"
                + currentDate.getMinutes() + ":"
                + currentDate.getSeconds();
            console.log(`The following error occurred on ${datetime}:`);
            console.log(message);
            console.log("\n")
        }
    }
}

export default  RequestError;