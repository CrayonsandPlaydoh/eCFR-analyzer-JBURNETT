$(document).ready(function () {
    // Fetch latest data.json with cache-busting query
    $.getJSON("data.json?v=" + new Date().getTime(), function (data) {
        console.log("✅ Successfully Loaded Data:", data);

        let tableData = Object.keys(data).map(agency => ({
            agency: agency,
            word_count: data[agency]
        }));

        console.log("📌 Processed Data for Table:", tableData);

        // Initialize DataTable with sorting & searching
        $('#ecfrTable').DataTable({
            destroy: true,  // Ensures old table data is removed before reloading
            data: tableData,
            columns: [
                { data: "agency", title: "Agency" },
                { data: "word_count", title: "Word Count" }
            ],
            order: [[1, "desc"]],
            paging: true,
            searching: true
        });
    }).fail(function (jqxhr, textStatus, error) {
        console.error("❌ Failed to load data.json:", textStatus, error);
    });
});
