import { generateId } from "@utils";

class Model {
    public id: string;

    protected constructor(data: Partial<Model> = {}) {
        const { id = generateId(5) } = data;
        this.id = id;
    }

    public static create(data?: Partial<Model>): Model {
        return new Model(data);
    }

    public static keys(): string[] {
        return Object.keys(new Model());
    }

    public toJSON() {
        return JSON.parse(JSON.stringify({ ...this }));
    }
}

export default Model;
export { Model };
