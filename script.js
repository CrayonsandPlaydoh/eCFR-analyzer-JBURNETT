$(document).ready(function () {
    $(document).ready(function () {
        $.getJSON("data.json?nocache=" + new Date().getTime(), function (data) {
            console.log("✅ Successfully loaded data.json", data); // Debugging Log

            let tableData = Object.keys(data).map(agency => {
                return { "agency": agency, "word_count": data[agency] };
            });

            console.log("📌 Processed Data for Table:", tableData); // Debugging Log

            $('#ecfrTable').DataTable({
                destroy: true,  // Ensures old table is removed before reloading
                data: tableData,
                columns: [
                    { data: "agency", title: "Agency" },
                    { data: "word_count", title: "Word Count" }
                ],
                "order": [[1, "desc"]],
                "paging": true,
                "searching": true
            });
        }).fail(function (jqxhr, textStatus, error) {
            console.error("❌ Failed to load data.json:", textStatus, error); // Debugging Log
        });
    });

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
    