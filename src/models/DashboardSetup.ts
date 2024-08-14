import { TableState, TimeGroup } from "@types";
import { generateId, toDate } from "@utils";
import Model from "./Model";
import RecordRow from "./RecordRow";
import { RecordFilters } from "./Record";

type MainTableState = TableState & {
    rows: {
        [id: string]: RecordRow;
    };
};

type PivotTableState = TableState & {
    groupBy: TimeGroup;
    month: number;
    year: number;
};

class DashboardSetup extends Model {
    public override id: string;
    public name: string;
    public datasetFilters: RecordFilters;
    public mainTableState: MainTableState;
    public pivotTableState: PivotTableState;
    public createdBy: string;
    public createdAt: Date;
    public saved: boolean;
    public savedAt?: Date;

    protected constructor(data: Partial<DashboardSetup> = {}) {
        const {
            id = generateId(5),
            name = "Untitled",
            datasetFilters = {},
            mainTableState = {
                pagination: {
                    paginationModel: {
                        pageSize: 5,
                    },
                },
                rows: {},
            },
            pivotTableState = {
                pagination: {
                    paginationModel: {
                        pageSize: 6,
                    },
                },
                groupBy: "month",
                month: 1,
                year: 2023,
            },
            createdBy = "",
            createdAt = new Date(),
            saved = false,
            savedAt = new Date()
        } = data;

        super(data);

        for (const [id, data] of Object.entries(mainTableState.rows)) {
            mainTableState.rows[id] = RecordRow.create(data);
        }

        this.id = id;
        this.name = name;
        this.datasetFilters = datasetFilters;
        this.mainTableState = mainTableState;
        this.pivotTableState = pivotTableState;
        this.createdBy = createdBy;
        this.createdAt = toDate(createdAt);
        this.saved = !!saved;
        this.savedAt = toDate(savedAt);
    }

    public static override create(
        data?: Partial<DashboardSetup>
    ): DashboardSetup {
        return new DashboardSetup(data);
    }

    public static override keys(): (keyof DashboardSetup)[] {
        return Object.keys(new DashboardSetup()) as (keyof DashboardSetup)[];
    }
}

export default DashboardSetup;
export { DashboardSetup };
export type { MainTableState, PivotTableState };
