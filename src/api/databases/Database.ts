import firebase from "firebase/compat/app";

import { Model } from "@models";
import { Condition, Direction, Operator, Order } from "@types";

import { firestore } from "../config/firebase";

type Modeler<M extends Model> = (data?: Partial<M>) => M;

interface QueryState<M extends Model> {
    index: number;
    id: string | undefined;
    where: Array<Condition<M>[]>;
    startAfter: string[];
    limit: number;
    orders: Order<M>[];
}

const INITIAL_STATE = {
    index: 0,
    id: undefined,
    where: [],
    startAfter: [],
    limit: 10,
    orders: [],
};

class Database<M extends Model> {
    public readonly set: string;
    protected createModel: Modeler<M>;
    protected state: QueryState<M>;

    protected constructor(createModel: Modeler<M>, set: string) {
        this.set = set;
        this.createModel = createModel;
        this.state = JSON.parse(JSON.stringify({ ...INITIAL_STATE }));
    }

    protected resetState(): void {
        this.state = JSON.parse(JSON.stringify({ ...INITIAL_STATE }));
    }

    public id(id: string): this {
        this.state.id = id;
        return this;
    }

    public where(field: keyof M, operator: Operator, value: M[keyof M]): this {
        const where = this.state.where;
        const index = this.state.index;

        if (!where[index]) {
            this.state.where[index] = [];
        }

        this.state.where[index].push([field, operator, value]);

        return this;
    }

    public and(field: keyof M, operator: Operator, value: M[keyof M]): this {
        return this.where(field, operator, value);
    }

    public or(field: keyof M, operator: Operator, value: M[keyof M]): this {
        this.state.index++;
        return this.where(field, operator, value);
    }

    public startAfter(id: string): this {
        this.state.startAfter.push(id);
        return this;
    }

    public limit(limit: number): this {
        this.state.limit = limit;
        return this;
    }

    public orderBy(field: keyof M, direction: Direction): this {
        this.state.orders.push([field, direction]);
        return this;
    }

    public async update(updates: Partial<M>): Promise<void> {
        const id = this.state.id;

        if (!id) {
            throw new Error("Database.id required");
        }

        for (const key in updates) {
            if (updates[key] === undefined) {
                delete updates[key];
            }
        }

        const updatedAt = new Date();

        const dataToUpdate = JSON.parse(
            JSON.stringify({ ...updates, id, updatedAt })
        );

        await firestore.collection(this.set).doc(id).update(dataToUpdate);

        this.resetState();
    }

    public async updateWithCallback(
        callback: (prev: M) => M | Promise<M>
    ): Promise<void> {
        const id = this.state.id;

        if (!id) {
            throw new Error("Database.id required");
        }

        await firestore.runTransaction(async (transaction) => {
            const docRef = firestore.collection(this.set).doc(id);
            const doc = await transaction.get(docRef);
            const data = doc.data();

            if (!doc.exists || !data) {
                throw new Error(`Instance of id ${id} not found!`);
            }

            const prevInstance = this.createModel(data as Partial<M>);
            const newInstance = await callback(prevInstance);
            const updates = { ...newInstance };

            transaction.update(docRef, updates);

            this.resetState();
        });
    }

    public async delete(): Promise<void> {
        const id = this.state.id;

        if (!id) {
            throw new Error("Database.id required");
        }

        await firestore.collection(this.set).doc(id).delete();
        this.resetState();
    }

    public async create(data: M): Promise<void> {
        const id = this.state.id;

        if (!id) {
            throw new Error("Database.id required");
        }

        for (const key in data) {
            if (data[key] === undefined) {
                delete data[key];
            }
        }

        const jsonData = { ...data };

        const dataToSave = JSON.parse(
            JSON.stringify({
                ...jsonData,
                id,
            })
        );

        await firestore
            .collection(this.set)
            .doc(id)
            .set({ ...dataToSave });

        this.resetState();
    }

    public async list(): Promise<M[]> {
        const id = this.state.id;
        const whereList = this.state.where;
        const startAfterList = this.state.startAfter;
        const limit = this.state.limit;
        const orders = this.state.orders;

        const collection = firestore.collection(this.set);

        if (id) {
            const doc = await collection.doc(id).get();
            const data = doc.data();

            this.resetState();

            if (!doc.exists || !data) {
                return [] as M[];
            }

            const result = this.createModel(data as Partial<M>);

            return [result];
        }

        const docs: firebase.firestore.QueryDocumentSnapshot<firebase.firestore.DocumentData>[] =
            [];

        for (let i = 0; i < whereList.length; i++) {
            const whereSet = whereList[i];
            const startAfter = startAfterList[i];

            let lastDoc = undefined;

            if (startAfter) {
                lastDoc = await collection.doc(startAfter).get();
            }

            do {
                let query: firebase.firestore.Query<firebase.firestore.DocumentData> =
                    collection;

                for (const where of whereSet) {
                    const [field, operator, value] = where;
                    query = query.where(String(field), operator, value);
                }

                for (const order of orders) {
                    const [field, direction] = order;
                    query = query.orderBy(String(field), direction);
                }

                if (lastDoc) {
                    query = query.startAfter(lastDoc);
                    lastDoc = undefined;
                }

                query = query.limit(1000);

                const snapshot = await query.get();

                for (const doc of snapshot.docs) {
                    if (limit !== undefined && docs.length >= limit) {
                        lastDoc = undefined;
                        break;
                    }

                    docs.push(doc);

                    lastDoc = doc;
                }
            } while (lastDoc);
        }

        this.resetState();

        const results = docs
            .map((doc) => doc.data())
            .filter(Boolean)
            .map((data) => this.createModel(data as Partial<M>));

        return results;
    }

    public async findOne(): Promise<M | undefined> {
        const list = await this.list();
        return list[0];
    }

    public static access(
        createModel: Modeler<any>,
        set: string
    ): Database<any> {
        return new Database(createModel, set);
    }
}

export default Database;
export { Database };
