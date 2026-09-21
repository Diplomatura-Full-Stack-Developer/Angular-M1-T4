import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { NgClass } from '@angular/common';
import { Users } from '../../services/users.service';
import { Router } from '@angular/router';
import {
  USER_FORM_SCHEMA, UserField, fieldErrorMessage
    as fieldErrorMessageUser
} from '../../validators/user-form.validator';
import { RouterLink } from '@angular/router';


@Component({
  selector: 'app-login',
  imports: [ReactiveFormsModule, MatDialogModule, NgClass, RouterLink],
  templateUrl: './login.html',
})
export class Login {

  title: string = 'Iniciar sesión';

  private formBuilder = inject(FormBuilder);
  private dialog = inject(MatDialog); // TODO: Implementar el dialog de confirmación
  private usersService = inject(Users);
  private router = inject(Router);

  error = this.usersService.error;

  userForm = this.formBuilder.group({
    name: ['', USER_FORM_SCHEMA.name.validators],
    email: ['', USER_FORM_SCHEMA.email.validators],
    password: ['', USER_FORM_SCHEMA.password.validators],
  });

  isInvalid(field: UserField): boolean {
    const control = this.userForm.controls[field];
    return control.touched && control.invalid;
  }

  errorMessage(field: UserField): string | null {
    return fieldErrorMessageUser(field, this.userForm.controls[field]);
  }

  ngOnInit() {
    this.usersService.seedUsers()
  }


  onSubmit() {
    if (this.userForm.invalid) {
      console.log('Formulario inválido');
      this.userForm.markAllAsTouched();
      return;
    }



    this.usersService.loginUser(this.userForm.value.email as string, this.userForm.value.password as string);
    this.router.navigate(['/users']);
  }
}

export default Login;
