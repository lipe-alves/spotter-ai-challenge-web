import { toDate, toNumber } from "@utils";

type CreditScore = "A" | "B" | "C" | "D" | "I";
type RecordStatus = "active" | "inactive";
type OperatingStatus = "ACTIVE" | "NOT AUTHORIZED" | "OUT-OF-SERVICE";
type EntityType =
    | "CARRIER"
    | "BROKER"
    | "IEP"
    | "CARGO TANK"
    | "FREIGHT FORWARDER"
    | "SHIPPER";

class Record {
    public id: string;
    public createdDt: Date;
    public dataSourceModifiedDt: Date;
    public entityType: EntityType[];
    public operatingStatus: OperatingStatus | null;
    public legalName: string;
    public dbaName: string;
    public physicalAddress: string;
    public pStreet: string;
    public pCity: string;
    public pState: string;
    public pZipCode: string;
    public phone: string;
    public mailingAddress: string;
    public mStreet: string;
    public mCity: string;
    public mState: string;
    public mZipCode: string;
    public usdotNumber: string;
    public mcMxFfNumber: string;
    public powerUnits: number;
    public mcs150FormDate: Date;
    public outOfServiceDate: Date;
    public stateCarrierIdNumber: string;
    public dunsNumber: string;
    public drivers: number;
    public mcs150MileageYear: string;
    public creditScore: CreditScore | null;
    public recordStatus: RecordStatus | null;

    private constructor(data: Partial<Record> = {}) {
        const {
            id = "",
            createdDt = new Date(),
            dataSourceModifiedDt = new Date(),
            entityType = [],
            operatingStatus = null,
            legalName = "",
            dbaName = "",
            physicalAddress = "",
            pStreet = "",
            pCity = "",
            pState = "",
            pZipCode = "",
            phone = "",
            mailingAddress = "",
            mStreet = "",
            mCity = "",
            mState = "",
            mZipCode = "",
            usdotNumber = "",
            mcMxFfNumber = "",
            powerUnits = 1,
            mcs150FormDate = new Date(),
            outOfServiceDate = new Date(),
            stateCarrierIdNumber = "",
            dunsNumber = "",
            drivers = 1,
            mcs150MileageYear = "",
            creditScore = null,
            recordStatus = null,
        } = data;

        this.id = id;
        this.entityType = entityType;
        this.operatingStatus = operatingStatus;
        this.legalName = legalName;
        this.dbaName = dbaName;
        this.physicalAddress = physicalAddress;
        this.pStreet = pStreet;
        this.pCity = pCity;
        this.pState = pState;
        this.pZipCode = pZipCode;
        this.phone = phone;
        this.mailingAddress = mailingAddress;
        this.mStreet = mStreet;
        this.mCity = mCity;
        this.mState = mState;
        this.mZipCode = mZipCode;
        this.usdotNumber = usdotNumber;
        this.mcMxFfNumber = mcMxFfNumber;
        this.powerUnits = toNumber(powerUnits);
        this.mcs150FormDate = toDate(mcs150FormDate);
        this.outOfServiceDate = toDate(outOfServiceDate);
        this.stateCarrierIdNumber = stateCarrierIdNumber;
        this.dunsNumber = dunsNumber;
        this.drivers = toNumber(drivers);
        this.mcs150MileageYear = mcs150MileageYear;
        this.creditScore = creditScore;
        this.recordStatus = recordStatus;
        this.createdDt = toDate(createdDt);
        this.dataSourceModifiedDt = toDate(dataSourceModifiedDt);
    }

    public static create(data?: Partial<Record>): Record {
        return new Record(data);
    }
}

export default Record;
export { Record };
export type { CreditScore, RecordStatus, OperatingStatus, EntityType };
