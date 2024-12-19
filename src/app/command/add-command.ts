import { Command } from './command';

export class AddCommand implements Command {
  execute(a: number, b: number): number {
    return a + b;
  }
}
