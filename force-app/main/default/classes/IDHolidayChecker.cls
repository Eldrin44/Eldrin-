public with sharing class IDHolidayChecker {
    @AuraEnabled(cacheable=false)
    public static String checkHoliday(String saIdNumber) {
        if (String.isBlank(saIdNumber) || saIdNumber.length() < 6) {
            return 'Invalid ID Number';
        }

        try {
            String dobString = saIdNumber.substring(0, 6);

            Date dob = Date.valueOf(
                (dobString.substring(0,2) <= String.valueOf(Date.today().year()).substring(2,4) ? '20' : '19') +
                dobString.substring(0,2) + '-' +
                dobString.substring(2,4) + '-' +
                dobString.substring(4,6)
            );

            Integer year = Date.today().year();
            String endpoint = 'https://date.nager.at/api/v3/PublicHolidays/' + year + '/ZA';

            Http http = new Http();
            HttpRequest request = new HttpRequest();
            request.setEndpoint(endpoint);
            request.setMethod('GET');
            request.setTimeout(2000);

            HttpResponse response = http.send(request);

            if (response.getStatusCode() != 200) {
                return 'Failed to fetch holidays: ' + response.getStatus();
            }

            List<Object> holidays = (List<Object>) JSON.deserializeUntyped(response.getBody());

            for (Object o : holidays) {
                Map<String, Object> holiday = (Map<String, Object>) o;
                String holidayDate = (String) holiday.get('date'); 
                Date hDate = Date.valueOf(holidayDate);

                if (dob.month() == hDate.month() && dob.day() == hDate.day()) {
                    return 'Your birthday falls on ' + holiday.get('localName');
                }
            }

            return 'No public holiday on your birthday.';

        } catch (Exception e) {
            return 'Error: ' + e.getMessage();
        }
    }
    
}
