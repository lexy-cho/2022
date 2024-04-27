//글자 열 제한
function limitLines(item, event) {
    let countLines = (item.value.match(/\n/g) || []).length + 1;
    let maxRows = item.rows;
    if (event.which === 13 && countLines === maxRows) {
        return false;
    }
}

//글자 수 제한
function limitCount(text) {
    if (text.value.length > 75) {
        text.value = text.value.substring(0, 75);
    }
}
function limitCount_title(text) {
    if (text.value.length > 6) {
        text.value = text.value.substring(0, 6);
    }
}

