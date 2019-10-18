import { FormControl, Validators } from '@angular/forms';

export class CustomValidators extends Validators {
  static minCharacters(control: FormControl) {
    const validCharacters = /^[a-zA-Z]+$/;
    if (control.value && (control.value.length < 3 || control.value.length > 10)) {
      const matches = control.value.match(validCharacters);
      return matches && matches.length ? { minCharacters: matches } : null;
    } else {
      return null;
    }
  }

  static validFleetNumber(control: FormControl) {
    const input = control.value;
    if (isNaN(input)) {
      return { validNumber: true };
    } else {
      if (input && (input.length < 3 || input.length > 4)) {
        return { validFleetNumber: true };
      } else {
        return null;
      }
    }
  }

  static validPlateNumber(control: FormControl) {
    const input = control.value;
    if (input && (input.length < 3 || input.length > 7)) {
      return { validPlateNumber: true };
    } else {
      return null;
    }
  }

  static validManufacturingYear(control: FormControl) {
    const input = control.value;
    if (isNaN(input)) {
      return { validNumber: true };
    } else {
      if (input && (input.length < 4 || input.length > 4)) {
        return { validManufacturingYear: true };
      } else {
        const currentDate = new Date();
        const currentYear = currentDate.getFullYear();
        const year = parseInt(input, 10);
        if (year >= 2000 && year <= currentYear) {
          return null;
        } else {
          return { manufacturingYearRange: true };
        }
      }
    }
  }

  static validOdoMeter(control: FormControl) {
    const input = control.value;
    if (isNaN(input)) {
      return { validNumber: true };
    } else {
      if (input && (input.length < 3 || input.length > 6)) {
        return { validOdoMeter: true };
      } else {
        return null;
      }
    }
  }

  static validEmail(control: FormControl) {
    const regex = /[A-Z0-9._%+-]+@[A-Z0-9.-]+.[A-Z]{2,4}/gim;
    if (control.value && control.value.length > 0) {
      const matches = control.value.match(regex);
      return matches ? null : { validEmail: matches };
    } else {
      return null;
    }
  }

  static validPassword(control: FormControl) {
    const validCharacters = '';
    if (control.value && control.value.length < 6) {
      const matches = control.value.match(validCharacters);
      return matches && matches.length ? { minlength: matches } : null;
    } else {
      return null;
    }
  }

  static validSelect(control: FormControl) {
    if (!control.value) {
      return { validSelect: true };
    } else {
      return null;
    }
  }
}
