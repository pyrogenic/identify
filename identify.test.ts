import identify from "./identify";

describe("identify", () => {
    describe(identify.classname.name, () => {
        // test("bigint", () => {
        //     const val: bigint = 0n;
        //     expect(identify.classname(val)).toBeUndefined();
        // });
        test("boolean", () => {
            const val: boolean = true;
            expect(identify.classname(val)).toBeUndefined();
        });
        test("number", () => {
            const val: number = 100;
            expect(identify.classname(val)).toBeUndefined();
        });
        test("string", () => {
            const val: string = "example";
            expect(identify.classname(val)).toBeUndefined();
        });
        test("symbol", () => {
            const val: symbol = Symbol("example");
            expect(identify.classname(val)).toBeUndefined();
        });
        test("undefined", () => {
            const val: undefined = undefined;
            expect(identify.classname(val)).toBeUndefined();
        });
        test("function", () => {
            expect(identify.classname(val)).toEqual("val");
            function val() {
            }
        });
        describe("object", () => {
            test("anonymous", () => {
                const val: object = {};
                expect(identify.classname(val)).toBeUndefined();
            });
            test("Date", () => {
                const val: Date = new Date();
                expect(identify.classname(val)).toEqual("Date");
            });
            test("named class", () => {
                class Val { }
                const val: Val = new Val();
                expect(identify.classname(Val)).toEqual("Val");
                expect(identify.classname(val)).toEqual("Val");
            });
        })
    });
    describe(identify.label.name, () => {

    });
    describe(identify.name, () => {

    });
});
