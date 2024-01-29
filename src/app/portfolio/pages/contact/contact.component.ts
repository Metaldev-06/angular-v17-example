import { UpperCasePipe } from '@angular/common';
import { HttpClient } from '@angular/common/http';
import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { TranslocoPipe } from '@ngneat/transloco';

@Component({
  selector: 'app-contact',
  standalone: true,
  imports: [ReactiveFormsModule, TranslocoPipe, UpperCasePipe],
  templateUrl: './contact.component.html',
  styleUrl: './contact.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContactComponent {
  public datos: FormGroup;

  public isLoading = signal<boolean>(false);
  public message = signal<string>('');

  constructor(private http: HttpClient) {
    this.datos = new FormGroup({
      email: new FormControl('', [Validators.required, Validators.email]),
      asunto: new FormControl('', Validators.required),
      mensaje: new FormControl('', Validators.required),
    });
  }

  envioCorreo() {
    // Loading.standard('Enviando correo...');
    this.isLoading.set(true);
    let params = {
      email: this.datos.value.email,
      asunto: this.datos.value.asunto,
      mensaje: this.datos.value.mensaje,
    };

    if (this.datos.invalid) {
      this.isLoading.set(false);
      this.message.set('layout-portfolio.error-message');

      setTimeout(() => {
        this.message.set('');
      }, 2500);

      return;
    } else {
      this.http
        .post('https://back-mail-project.vercel.app/envio', params)
        .subscribe((resp: any) => {
          // Loading.remove();
          // Notify.init({ position: 'right-bottom' });

          if (this.datos.valid) {
            this.isLoading.set(false);
            this.message.set('layout-portfolio.success-message');

            setTimeout(() => {
              this.message.set('');
            }, 2500);
          }

          this.datos.reset();
        });
    }
  }
}
