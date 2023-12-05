import {
    boldMatchedChars,
    boldUnmatchedChars,
    display,
    filterOnChange,
    sortItems,
} from "$lib/modules.js";
import { expect, describe, test } from "vitest";

describe("sortItems function tests", () => {
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

describe("display function tests", () => {
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

describe("boldUnmatchedChars function tests", () => {
    test("should return the word with unmatched characters bolded", () => {
        const word = "hello";
        const value = "ell";
        const result = boldUnmatchedChars(word, value);
        expect(result).toBe("<b>h</b>ell<b>o</b>");
    });

    test("should return the word as is if all characters match", () => {
        const word = "hello";
        const value = "hello";
        const result = boldUnmatchedChars(word, value);
        expect(result).toBe("hello");
    });

    test("should return the word with all characters bolded if no characters match", () => {
        const word = "hello";
        const value = "world";
        const result = boldUnmatchedChars(word, value);
        expect(result).toBe("<b>h</b><b>e</b><b>l</b><b>l</b><b>o</b>");
    });
});

describe("boldMatchedChars function tests", () => {
    test("all characters match", () => {
        const result = boldMatchedChars("test", "test");
        expect(result).toBe("<b>test</b>");
    });

    test("some characters match", () => {
        const result = boldMatchedChars("testing", "test");
        console.log(result);
        expect(result).toBe("<b>test</b>ing");
    });

    test("no characters match", () => {
        const result = boldMatchedChars("test", "example");
        expect(result).toBe("test");
    });
});

describe("filterOnChange function tests", () => {
    const itemsStringOnly = ["Apple", "Banana", "Orange"];
    const itemsObject = [
        { name: "Apple" },
        { name: "Banana" },
        { name: "Orange" },
    ];

    test("should filter string items based on value", () => {
        const displayField = "";
        const value = "a";
        const filteredResult = filterOnChange(
            displayField,
            itemsStringOnly,
            value
        );
        expect(filteredResult).toEqual(["Apple", "Banana", "Orange"]);
    });

    test("should filter object items based on displayField and value", () => {
        const displayField = "name";
        const value = "a";
        const filteredResult = filterOnChange(displayField, itemsObject, value);
        expect(filteredResult).toEqual([
            { name: "Apple" },
            { name: "Banana" },
            { name: "Orange" },
        ]);
    });

    test("should handle empty input array", () => {
        const displayField = "name";
        const value = "a";
        const filteredResult = filterOnChange(displayField, [], value);
        expect(filteredResult).toEqual([]);
    });

    test("should handle case-insensitive search", () => {
        const displayField = "name";
        const value = "oR";
        const filteredResult = filterOnChange(displayField, itemsObject, value);
        expect(filteredResult).toEqual([{ name: "Orange" }]);
    });

    test("should return orange if given o", () => {
        const displayField = "";
        const value = "o";
        const filteredResult = filterOnChange(
            displayField,
            itemsStringOnly,
            value
        );
        expect(filteredResult).toEqual(["Orange"]);
    });

    test("should return an empty array for non-matching value", () => {
        const displayField = "name";
        const value = "xyz";
        const filteredResult = filterOnChange(displayField, itemsObject, value);
        expect(filteredResult).toEqual([]);
    });
});
