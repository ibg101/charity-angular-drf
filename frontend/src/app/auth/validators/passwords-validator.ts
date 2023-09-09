import { 
  AbstractControl, 
  ValidationErrors, 
  ValidatorFn, 
} from "@angular/forms";

export function passwordsMatch(): ValidatorFn {
  return (form: AbstractControl): ValidationErrors | null => {
    // hardcoded since there's no need to use it somewhere else yet.
    // can be simply added desired args and renamed the func to become FactoryFunc
    const field1 = form.get('password');
    const field2 = form.get('confirmPassword');
    if (field1?.value === field2?.value) {
      return null;
    }
    else {
      const error: ValidationErrors = { noMatch: true };
      field2?.setErrors({ noMatch: true });
      return error;
    }
  }
}