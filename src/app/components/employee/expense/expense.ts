import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators, FormArray } from '@angular/forms';
import { HttpClient, HttpEventType } from '@angular/common/http';

@Component({
  selector: 'app-expense',
  standalone: false,
  templateUrl: './expense.html',
  styleUrl: './expense.css'
})
export class Expense implements OnInit {
onSubmit() {
throw new Error('Method not implemented.');
}
  expenseForm!: FormGroup;
  categories = [
    "Stationery", "Transport", "Office Equipment", "Travel", "Accommodation",
    "Rentals", "Miscellaneous", "Food", "Internet", "Other"
  ];
  paymentMethods = ["Cash", "UPI", "DebitCard", "CreditCard", "AmexCard"];
  uploadProgress = 0;
  extractedData: any = null;
  submitting = false;
  apiBaseUrl = 'http://localhost:4300/expenses';  // Adjust backend base URL

  constructor(private fb: FormBuilder, private http: HttpClient) {}

  ngOnInit(): void {
    this.expenseForm = this.fb.group({
      employeeId: ['', Validators.required],
      totalAmount: [null, [Validators.required, Validators.min(0)]],
      currency: ['INR'],
      note: ['', [Validators.maxLength(1000)]],
      files: [null],  // For file inputs
      expenseDetails: this.fb.array([this.createExpenseDetail()])
    });
  }

  createExpenseDetail(): FormGroup {
    return this.fb.group({
      category: ['', Validators.required],
      description: [''],
      vendorName: [''],
      location: [''],
      date: [new Date().toISOString().split('T')[0]],
      participants: [[]],
      amount: [null, [Validators.required, Validators.min(1)]],
      paymentMethod: ['', Validators.required],
      note: ['']
    });
  }

  get expenseDetails(): FormArray {
    return this.expenseForm.get('expenseDetails') as FormArray;
  }

  addExpenseDetail() {
    this.expenseDetails.push(this.createExpenseDetail());
  }

  removeExpenseDetail(i: number) {
    this.expenseDetails.removeAt(i);
  }

  onFileSelected(event: any) {
    const files = event.target.files;
    if (files.length > 0) {
      this.expenseForm.patchValue({ files: files });
    } else {
      this.expenseForm.patchValue({ files: null });
    }
  }

  extractDataFromFile(file: File) {
    const formData = new FormData();
    formData.append('file', file);
    this.http.post<any>(`${this.apiBaseUrl}/extract-pdf`, formData).subscribe({
      next: (res) => {
        this.extractedData = res;
        // Optionally fill some fields in the first expense detail with extracted data
        let detail = this.expenseDetails.at(0);
        detail.patchValue({
          vendorName: res.vendorName || '',
          description: res.description || 'Extracted from file',
          amount: res.amount || null,
          date: res.date || new Date().toISOString().split('T')[0],
          location: res.location || ''
        });
      },
      error: (err) => {
        console.error('Extraction error', err);
        this.extractedData = null;
      }
    });
  }

  onFileChangeAndExtract(event: any) {
    const files: FileList = event.target.files;
    if (files.length > 0) {
      this.expenseForm.patchValue({ files: files });
      // Only run extraction on first file (can be optimized as needed)
      this.extractDataFromFile(files[0]);
    }
  }

  submitForm() {
    if (this.expenseForm.invalid) {
      this.expenseForm.markAllAsTouched();
      return;
    }

    this.submitting = true;

    const formData = new FormData();
    formData.append('employeeId', this.expenseForm.get('employeeId')!.value);
    formData.append('totalAmount', this.expenseForm.get('totalAmount')!.value);
    formData.append('currency', this.expenseForm.get('currency')!.value);
    formData.append('note', this.expenseForm.get('note')!.value || '');

    const expenseDetailsValue = this.expenseDetails.value;

    formData.append('expenseDetails', JSON.stringify(expenseDetailsValue));

    // Append files if any
    const files: FileList = this.expenseForm.get('files')!.value;
    if (files && files.length) {
      for (let i = 0; i < files.length; i++) {
        formData.append('files', files[i], files[i].name);
      }
    }

    this.http.post<any>(`${this.apiBaseUrl}/Create-expense`, formData, {
      reportProgress: true,
      observe: 'events'
    }).subscribe({
      next: (event) => {
        if (event.type === HttpEventType.UploadProgress && event.total) {
          this.uploadProgress = Math.round((event.loaded / event.total) * 100);
        } else if (event.type === HttpEventType.Response) {
          alert('Expense created successfully!');
          this.expenseForm.reset();
          while (this.expenseDetails.length > 1) {
            this.expenseDetails.removeAt(0);
          }
          this.submitting = false;
          this.uploadProgress = 0;
        }
      },
      error: (error) => {
        console.error('Error creating expense:', error);
        alert('Failed to create expense: ' + (error.error?.message || error.message));
        this.submitting = false;
        this.uploadProgress = 0;
      }
    });
  }
}