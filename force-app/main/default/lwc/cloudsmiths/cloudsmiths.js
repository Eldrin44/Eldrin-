import { LightningElement ,track} from 'lwc';
//import checkHoliday from '@salesforce/apex/IDHolidayChecker.checkHoliday';
import helloTest from '@salesforce/apex/IDHolidayChecker.helloTest';
export default class Cloudsmiths extends LightningElement {
    @track idNumber = '';
    @track result;

    handleChange(event) {
        this.idNumber = event.target.value;
    }

 handleCheck() {
      helloTest()
    .then(res => console.log('Test Apex worked:', res))
    .catch(err => console.error(err));
 }
  

    // handleCheck() {
    //      console.log('Calling Apex with ID:', this.idNumber);
    //     checkHoliday({ saIdNumber: this.idNumber })
    //         .then(response => {
    //             console.log('Apex returned:', response);
    //             this.result = response;
    //         })
    //         .catch(error => {
    //             console.error('Apex call error:', error);
    //             this.result = 'Error: ' + error.body.message;
    //         });
    // }

}