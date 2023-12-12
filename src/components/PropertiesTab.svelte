<script lang="ts">
    import { DataHandler, Datatable, Th, ThFilter } from "@vincjo/datatables";
    import { componentProperties } from "./Properties.js";

    const handler = new DataHandler(componentProperties, { rowsPerPage: 50 });
    const rows = handler.getRows();
</script>

<Datatable {handler}>
    <table>
        <thead>
            <tr>
                <Th {handler} orderBy="property_name">Property Name</Th>
                <Th {handler} orderBy="type">Type</Th>
                <Th {handler} orderBy="description">Description</Th>
                <Th {handler} orderBy="default_value">Default Value</Th>
            </tr>
            <tr>
                <ThFilter {handler} filterBy="property_name" />
                <ThFilter {handler} filterBy="type" />
                <ThFilter {handler} filterBy="description" />
                <ThFilter {handler} filterBy="default_value" />
            </tr>
        </thead>
        <tbody>
            {#each $rows as row}
                <tr>
                    <td>{row.property_name}</td>
                    <td>{row.type}</td>
                    <td>{row.description}</td>
                    <td>{row.default_value}</td>
                </tr>
            {/each}
        </tbody>
    </table>
</Datatable>

<style>
    table {
        overflow-x: scroll;
        max-width: 10px;
    }
    thead {
        background: #fff;
    }
    tbody td {
        border: 1px solid #f5f5f5;
        padding: 4px 20px;
    }
    tbody tr {
        transition: all, 0.2s;
    }
    tbody tr:hover {
        background: #f5f5f5;
    }
</style>
