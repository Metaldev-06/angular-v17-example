import {
  ChangeDetectionStrategy,
  Component,
  DestroyRef,
  EventEmitter,
  Output,
  inject,
} from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';

@Component({
  selector: 'app-searcher',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './searcher.component.html',
  styleUrls: ['./searcher.component.scss'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SearcherComponent {
  @Output() public query = new EventEmitter<string>();

  public inputSearchForm!: FormGroup;

  private readonly formBuilder = inject(FormBuilder);

  ngOnInit(): void {
    this.inputSearchForm = this.initForm();
  }

  initForm() {
    return this.formBuilder.group({
      inputSearch: ['', Validators.required],
    });
  }

  submitQuery() {
    if (this.inputSearchForm.invalid) return;

    this.query.emit(
      this.inputSearchForm.value.inputSearch.toLowerCase().trim()
    );
    this.inputSearchForm.reset();
  }
}
