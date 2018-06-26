import EasyFit from 'easy-fit';
import fs from 'fs';
import _ from 'lodash';


fs.readFile('./test-data/2018-06-25-08-56-16.fit', function(err, content) {

    // Create a EasyFit instance (options argument is optional)
    var easyFit = new EasyFit({
        force: true,
        speedUnit: 'mph',
        lengthUnit: 'mi',
        temperatureUnit: 'kelvin',
        elapsedRecordField: true,
        mode: 'cascade',
    });
    
    // Parse your file
    easyFit.parse(content, function (error, data) {
    
        // Handle result of parse method
        if (error) {
          console.log(error);
        } else {
          console.log(_.slice(data.activity.sessions[0].laps[0].records, 0, 3));
        }
        
    });
});