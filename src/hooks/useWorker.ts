import { useEffect, useState } from "react";

interface WorkerResult<Result, Argument> {
    worker: Worker | undefined;
    result: Result | undefined;
    postMessage: (message: Argument) => void;
}

type WorkerFunc<Argument> = (arg: { data: Argument }) => void;

function useWorker<Result, Argument>(
    workerFunc: WorkerFunc<Argument>,
    dependencies: any[] = []
): WorkerResult<Result, Argument> {
    const [worker, setWorker] = useState<Worker | undefined>(undefined);
    const [result, setResult] = useState<Result | undefined>(undefined);

    const postMessage = (message: any) => {
        if (worker) {
            worker.postMessage(message);
        } else {
            setTimeout(() => {
                postMessage(message);
            }, 0);
        }
    };

    useEffect(() => {
        let code = workerFunc.toString();
        code = `self.onmessage = ${code}`;

        const blob = new Blob([code], { type: "application/javascriptssky" });
        const workerScript = URL.createObjectURL(blob);

        const worker = new Worker(workerScript);
        setWorker(worker);

        worker.onmessage = (event) => {
            setResult(event.data);
        };

        return () => {
            worker.terminate();
        };
    }, [workerFunc.toString(), ...dependencies]);

    return { worker, result, postMessage };
}

export default useWorker;
export { useWorker };
