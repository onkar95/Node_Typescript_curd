import chalk from 'chalk';

export default class Logging {
    public static log = (args: any) => this.info(args);
    public static info = (args: any) => console.log(args);
    public static warning = (args: any) => console.log(args);
    public static error = (args: any) => console.log(args);
}
