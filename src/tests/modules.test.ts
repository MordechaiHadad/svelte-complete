import { display, sortItems } from "$lib/modules.js";
import { expect, describe, test } from "vitest";

describe("sortItems function", () => {
    test("should sort string array in ascending order", () => {
        const input = ["b", "a", "c"];
        const expected = ["a", "b", "c"];
        const result = sortItems(input, "ascend");
        expect(result).toEqual(expected);
    });

    test("should sort string array in descending order", () => {
        const input = ["b", "a", "c"];
        const expected = ["c", "b", "a"];
        const result = sortItems(input, "descend");
        expect(result).toEqual(expected);
    });

    test("should sort object array with custom sort function", () => {
        const input = [{ value: 2 }, { value: 1 }, { value: 3 }];
        const expected = [{ value: 1 }, { value: 2 }, { value: 3 }];
        const result = sortItems(input, (a, b) => a.value - b.value);
        expect(result).toEqual(expected);
    });

    test("should return empty array when input is empty", () => {
        const input: string[] = [];
        const expected: string[] = [];
        const result = sortItems(input, "ascend");
        expect(result).toEqual(expected);
    });
});

describe("display function", () => {
    test("should return the specified field value", () => {
        const input = { name: "Bob", age: "69" };
        const expected = "Bob";
        const result = display("name", input);
        expect(result).toEqual(expected);
    });

    test("should return the item itself if it is not an object", () => {
        const input = "John";
        const expected = "John";
        const result = display("name", input);
        expect(result).toEqual(expected);
    });
});
