$(document).ready(function() {
    $.getJSON("data.json", function(data) {
        let tableData = Object.keys(data).map(agency => {
            return { "agency": agency, "word_count": data[agency] };
        });

        $('#ecfrTable').DataTable({
            data: tableData,
            columns: [
                { data: "agency" },
                { data: "word_count" }
            ],
            "order": [[1, "desc"]],
            "paging": true,
            "searching": true
        });
    });
});
