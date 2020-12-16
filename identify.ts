
const IDENTIFIER = Symbol("object identifier");

function classname(obj: any) {
    switch (typeof obj) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "symbol":
        case "undefined":
            return undefined;
        case "function":
            return obj.name;
        case "object":
            if (obj === null) {
                return undefined;
            }
            if ("constructor" in obj) {
                if (obj.constructor === Object) {
                    return undefined;
                }
                return obj.constructor.name;
            }
            if ("__proto__" in obj) {
                return classname(obj.__proto__);
            }
            return "Object";
    }
}

function label(obj: any) {
    const identity = identify(obj);
    if (identity) {
        return (classname(obj) ?? "") + identity;
    }
    switch (typeof obj) {
        case "bigint":
        case "boolean":
        case "number":
        case "string":
        case "symbol":
        case "undefined":
            return undefined;
        case "function":
            return obj.name;
        case "object":
            if (obj === null) {
                return undefined;
            }
            if ("__proto__" in obj) {
                return classname(obj.__proto__);
            }
            return "Object";
    }
}

let nextId = 0;

function identify(o: any) {
    if ((o ?? undefined) === undefined) {
        return undefined;
    }
    if (typeof o !== "object") {
        return undefined;
    }
    if (!(IDENTIFIER in o)) {
        const identity = `$$${nextId++}`;
        Object.defineProperty(o, IDENTIFIER, {
            value: identity,
            enumerable: false,
            writable: false,
        });
        globalThis[identity] = o;
    }
    return o[IDENTIFIER];
}

globalThis[identify.name] = identify;

function idir(obj: any, depth = 2, pad = ""): string {
    if (typeof obj !== "object") {
        return `${obj}`;
    }
    return Object.entries(obj).map(([k, v]) =>
        `${pad}${k}: ${identify(v) ? `[${label(v)}] ${depth > 0 ? `{
${pad}${idir(v, depth - 1, pad + "  ")}
${pad}}` : ""}` : `${v}`}`).join("\n");
}
globalThis[idir.name] = idir;

identify.classname = classname;
identify.label = label;

export default identify;
