export function sortItems(
    x: any[],
    sort: "ascend" | "descend" | ((a: any, b: any) => number)
) {
    if (typeof sort === "function" && x.every((i) => typeof i === "object")) {
        x.sort(sort);
    } else if (x.every((i) => typeof i === "string")) {
        sort === "ascend"
            ? x.sort()
            : x.sort((a: string, b: string) => b.localeCompare(a));
    }
}

export function display(displayField: string, item: any): string {
    if (typeof item === "object") {
        return item[displayField];
    }

    return item;
}

export function boldUnmatchedChars(word: string, value: string) {
    let result = "";
    let i = 0;

    let lowerWord = word.toLowerCase();
    let lowerValue = value.toLowerCase();
    while (i < lowerWord.length) {
        let slice = lowerWord.slice(i, i + lowerValue.length);
        if (slice === lowerValue) {
            result += word.slice(i, i + value.length);
            i += value.length;
        } else {
            result += `<b>${word[i]}</b>`;
            i++;
        }
    }
    return result;
}

export function boldMatchedChars(word: string, value: string) {
    let result = "";
    let i = 0;

    let lowerWord = word.toLowerCase();
    let lowerValue = value.toLowerCase();
    while (i < lowerWord.length) {
        let slice = lowerWord.slice(i, i + lowerValue.length);
        if (slice === lowerValue) {
            result += `<b>${word.slice(i, i + value.length)}</b>`;
            i += value.length;
        } else {
            result += word[i];
            i++;
        }
    }
    return result;
}

export function filterOnChange(
    displayField: string,
    items: any[],
    value: string
): any[] {
    if (items.every((x) => typeof x === "string")) {
        return items.filter((item: string) =>
            item.toLocaleLowerCase().includes(value.toLocaleLowerCase())
        );
    }

    return items.filter((item: any) =>
        item[displayField]
            .toLocaleLowerCase()
            .includes(value.toLocaleLowerCase())
    );
}

export function returnNewValue(item: any, displayField: string): string {
    if (typeof item === "object") {
        return item[displayField];
    }

    return item;
}
