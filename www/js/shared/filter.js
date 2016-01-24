//Filter epochToDate :
//Use for convert epoch date format to default date format.
//Example :
//<p>{{item.createdAt |epochToDate | date:"short"}}</p>
appControllers.filter('epochToDate', function ($filter) {
    return function (input) {
        return new Date(Date(input));
    };
});// End Filter epochToDate.

//Filter numberSuffix :
//Use for convert number to have suffix 1,000 to 1K.
//Example :
//{{item.likes.summary.total_count | numberSuffix}}
//
appControllers.filter('numberSuffix', function () {
    return function (input) {
        var exp;
        var suffixes = ['k', 'M', 'G', 'T', 'P', 'E'];

        if (window.isNaN(input)) {
            return 0;
        }

        if (input < 1000) {
            return input;
        }

        exp = Math.floor(Math.log(input) / Math.log(1000));

        return (input / Math.pow(1000, exp)).toFixed(1) + suffixes[exp - 1];
    }
});// End Filter numberSuffix.
//filter to convert html to plain text
appControllers.filter('htmlToPlaintextTruncate', function() {
    return function(text, length, end) {
        var htmlToPlaintext;
        if (isNaN(length))
            length = 10;

        if (end === undefined)
            end = "...";

     /*   if (text.length <= length || text.length - end.length <= length) {
            return String(text).replace(/<[^>]+>/gm, '');
        }
        else {*/
            htmlToPlaintext = String(text).replace(/<[^>]+>/gm, '');
            return String(htmlToPlaintext).substring(0, length-end.length) + end;
       /* }*/

    }
});