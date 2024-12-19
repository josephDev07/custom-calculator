import { Injectable } from '@angular/core';
import { Command } from './command/command';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {
  private commands: { [key: string]: Command } = {};

  addCommand(name: string, command: Command): void {
    this.commands[name] = command;
  }

  executeCommand(name: string, args: number[]): number {
    if (!this.commands[name]) {
      throw new Error(`Commande "${name}" introuvable.`);
    }
    return this.commands[name].execute(...args);
  }
}
