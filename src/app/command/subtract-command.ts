import { Command } from './command';

export class SubtractCommand implements Command {
  execute(a: number, b: number): number {
    return a - b;
  }
}
