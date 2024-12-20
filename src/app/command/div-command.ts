import { Command } from './command';

export class DivCommand implements Command{
    execute(a: number, b: number): number {
        if (b === 0) throw new Error("Division by zero is not allowed");
        return a / b;
    }
}

