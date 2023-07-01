import chalk from 'chalk';

export default class Logging {
    // tslint:disable-next-line:no-console
    public static log = (args: any) => this.info(args);
    public static info = (args: any) => {
        // tslint:disable-next-line:no-console
        console.log(args)
    };
    public static warning = (args: any) => {
        // tslint:disable-next-line:no-console
        console.log(args)
    };
    public static error = (args: any) => {
        // tslint:disable-next-line:no-console
        console.log(args)
    };
}
