import { LightningElement,track } from 'lwc';
import checkHoliday from '@salesforce/apex/IDHolidayChecker.checkHoliday';

export default class CloudSmithAssessment extends LightningElement {
        @track idNumber = '';
    @track result;
    @track errorMessage = '';

      get isButtonDisabled() {
        return this.idNumber.length !== 13;
    }

    handleChange(event) {
        this.idNumber = event.target.value;

        if (this.idNumber.length < 13) {
            this.errorMessage = 'ID number is too short. It must be 13 digits.';
        } else if (this.idNumber.length > 13) {
            this.errorMessage = 'ID number is too long. It must be 13 digits.';
        } else {
            this.errorMessage = '';
        }
    }

        handleCheck() {
             if (this.idNumber.length === 13) {
                checkHoliday({ saIdNumber: this.idNumber })
                .then(response => {
                    console.log('Apex returned:', response);
                    this.result = response;
                })
                .catch(error => {
                    console.error('Apex call error:', error);
                    this.result = 'Error: ' + error.body.message;
                });
             }
    }
}