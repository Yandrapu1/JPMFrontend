import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  standalone: false,
  templateUrl: './dashboard.html',
  styleUrl: './dashboard.css'
})
export class Dashboard {
   // Mock data (later we can fetch from backend)
  totalSpends = 18500;
  claimsSummary = {
    submitted: 3,
    underReview: 2,
    approved: 5,
    paid: 4
  };

  recentExpenses = [
    { type: 'Food', amount: 450, status: 'Paid', date: '2025-08-01' },
    { type: 'Transport', amount: 800, status: 'Approved', date: '2025-08-02' },
    { type: 'Internet', amount: 1200, status: 'Under Review', date: '2025-08-05' },
    { type: 'Food', amount: 600, status: 'Submitted', date: '2025-08-08' },
    { type: 'Transport', amount: 300, status: 'Paid', date: '2025-08-10' }
  ];
}

