import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { CalculatorService } from './calculator.service';
import { AddCommand } from './command/add-command';
import { SubtractCommand } from './command/subtract-command';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [FormsModule, CommonModule],
  template: `
    <div class="calculator">
      <!-- Écran d'affichage -->
      <div class="screen">{{ display }}</div>

      <!-- Boutons de la calculatrice -->
      <div class="buttons">
        <button *ngFor="let num of numbers" (click)="addToDisplay(num)">{{ num }}</button>
        <button *ngFor="let op of dynamicOperations" (click)="addToDisplay(op.name)">
          {{ op.name }}
        </button>
        <button (click)="execute()" class="equal">=</button>
        <button (click)="clear()" class="clear">AC</button>
      </div>

      <!-- Section pour ajouter des opérations -->
      <div class="add-operation">
        <h3>Ajouter une opération</h3>
        <input [(ngModel)]="operationName" placeholder="Nom de l'opération (ex: +)" />
        <select [(ngModel)]="selectedOperation">
          <option value="add">Addition</option>
          <option value="subtract">Soustraction</option>
        </select>
        <button (click)="addOperation()">Ajouter</button>
      </div>
    </div>
  `,
  styles: [`
    .calculator {
      width: 300px;
      margin: 0 auto;
      border: 2px solid #ccc;
      border-radius: 10px;
      padding: 10px;
      background-color: #f9f9f9;
    }
    .screen {
      background-color: #333;
      color: white;
      font-size: 24px;
      text-align: right;
      padding: 10px;
      border-radius: 5px;
      margin-bottom: 10px;
      height: 40px;
    }
    .buttons {
      display: grid;
      grid-template-columns: repeat(4, 1fr);
      gap: 10px;
    }
    button {
      padding: 10px;
      font-size: 18px;
      border: none;
      border-radius: 5px;
      cursor: pointer;
      box-shadow: 0 2px 2px rgba(0, 0, 0, 0.2);
    }
    button:hover {
      background-color: #e0e0e0;
    }
    .equal {
      background-color: #4CAF50;
      color: white;
      grid-column: span 2;
    }
    .clear {
      background-color: #f44336;
      color: white;
    }
    .add-operation {
      margin-top: 20px;
    }
  `]
})
export class AppComponent {
  numbers: number[] = [7, 8, 9, 4, 5, 6, 1, 2, 3, 0];
  display: string = '';
  operationName: string = '';
  selectedOperation: string = '';
  dynamicOperations: { name: string }[] = [];
  title: any;

  constructor(private calculatorService: CalculatorService) {}

  addToDisplay(value: string | number) {
    // Ajouter un espace avant et après les opérations
    if (isNaN(Number(value))) {
      this.display += ` ${value} `;
    } else {
      this.display += value.toString();
    }
  }
  

  execute() {
    try {
      const parts = this.display.trim().split(' ');
      const commandName = parts[1]; // L'opération est toujours au milieu
      const args = [Number(parts[0]), Number(parts[2])]; // Extraire les arguments
  
      // Exécuter la commande
      const result = this.calculatorService.executeCommand(commandName, args);
      this.display = result.toString();
    } catch (error) {
      this.display = 'Erreur';
    }
  }
  

  clear() {
    this.display = '';
  }

  addOperation() {
    if (this.operationName && this.selectedOperation) {
      switch (this.selectedOperation) {
        case 'add':
          this.calculatorService.addCommand(this.operationName, new AddCommand());
          break;
        case 'subtract':
          this.calculatorService.addCommand(this.operationName, new SubtractCommand());
          break;
      }
      this.dynamicOperations.push({ name: this.operationName });
      this.operationName = '';
      this.selectedOperation = '';
    }
  }
}
