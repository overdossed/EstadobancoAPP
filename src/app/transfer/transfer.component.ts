import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-transfer',
  standalone: true,
  templateUrl: './transfer.component.html',
  styleUrls: ['./transfer.component.css'],
  imports: [CommonModule],
})
export class TransferComponent implements OnInit {
  currentBalance: number = 190000000000; // Saldo inicial
  transfers: any[] = []; // Historial de movimientos
  accountNumberError: boolean = false;
  amountError: boolean = false;

  constructor(private cdr: ChangeDetectorRef) {}

  ngOnInit() {
    if (this.isBrowser() && this.isLocalStorageAvailable()) {
      const storedTransfers = localStorage.getItem('transfers');
      if (storedTransfers) {
        this.transfers = JSON.parse(storedTransfers);
      }

      const storedBalance = localStorage.getItem('currentBalance');
      if (storedBalance) {
        this.currentBalance = parseFloat(storedBalance);
      }
    }
  }

  onSubmit(event: Event) {
    event.preventDefault();

    const accountNumber = (document.getElementById('accountNumber') as HTMLInputElement).value;
    const amount = (document.getElementById('amount') as HTMLInputElement).value;
    const description = (document.getElementById('description') as HTMLInputElement).value;

    this.accountNumberError = !accountNumber;
    this.amountError = !amount || parseFloat(amount) <= 0;

    if (this.accountNumberError || this.amountError) {
      return;
    }

    const newTransfer = {
      accountNumber: accountNumber,
      amount: parseFloat(amount),
      description: description || 'Sin descripción',
      date: new Date().toLocaleString(),
    };

    this.currentBalance -= newTransfer.amount;
    this.transfers.push(newTransfer);

    if (this.isBrowser() && this.isLocalStorageAvailable()) {
      localStorage.setItem('transfers', JSON.stringify(this.transfers));
      localStorage.setItem('currentBalance', this.currentBalance.toString());
    }

    this.cdr.detectChanges(); // Forzar detección de cambios

    (document.getElementById('accountNumber') as HTMLInputElement).value = '';
    (document.getElementById('amount') as HTMLInputElement).value = '';
    (document.getElementById('description') as HTMLInputElement).value = '';
  }

  isLocalStorageAvailable(): boolean {
    try {
      const test = '__test__';
      localStorage.setItem(test, test);
      localStorage.removeItem(test);
      return true;
    } catch {
      return false;
    }
  }

  isBrowser(): boolean {
    return typeof window !== 'undefined' && typeof window.localStorage !== 'undefined';
  }
}
