
export class debug {
    constructor(level) {
        this.level = level;
    }

    log(msg) {
        if (this.level == 1) {
            console.log(msg);
        }
    }
};
