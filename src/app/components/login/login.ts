import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: false,
  templateUrl: './login.html',
  styleUrls: ['./login.css']
})
export class Login implements OnInit {
  loginForm!: FormGroup;
  apiBaseUrl = 'http://localhost:4300/users'; // Backend API base

  constructor(private fb: FormBuilder, private http: HttpClient, private router: Router) {}

  ngOnInit(): void {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]]
    });
  }
  
  onSubmit() {
    if (this.loginForm.invalid) {
      this.loginForm.markAllAsTouched();
      return;
    }

    this.http.post<any>(`${this.apiBaseUrl}/login`, this.loginForm.value).subscribe({
      next: (res) => {
        console.log('Login successful:', res);

        
        
       if(res.user.role=="Employee") {
         this.router.navigate(['/employee']);
        localStorage.setItem('user', JSON.stringify(res.user));
        alert('Login successful!');
        }
      else if(res.user.role=="Manager") 
      {
        this.router.navigate(['/manager']);

        alert('Login successful!');
      }
      else if(res.user.role=="Finance") 
      {
        this.router.navigate(['/finance']);

        alert('Login successful!');
      } 
      },
      error: (err) => {
        alert('Login failed: ' + (err.error?.message || err.message));
      }
    });
  }
}
