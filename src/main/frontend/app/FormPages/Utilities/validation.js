const isEmpty = value => value === undefined || value === null || value === '' || value == value.match(/[^\s]/g);

export function fieldIsEmpty(value) {
    if (isEmpty(value)) {
        return true;
    }
    return false;
}

export function email(str) {
    if (str) {
        return str.replace(/[^a-zA-ZæøåÆØÅ0-9.@_-]+/g, '');
    }
}

export function checkEmail(value) {
    // Let's not start a debate on email regex. This is just for an example app!
    if ((!isEmpty(value) && !/^[ÆØÅæøåA-Z0-9._%+-]+@[ÆØÅæøåA-Z0-9.-]+\.[A-Z]{2,4}$/i.test(value)) || isEmpty(value)) {
        return false;
    }
    return true;
}

export function checkPNR(str) {
    if (str) {
        return str.replace(/[^0-9]+/g, '').substring(0, 11);
    }
}

export function checkPersonalnumberNo(pno) {

    if (!pno) {
        return false;
    }
    // Check length
    if (pno.length != 11)
        return false;

    // Split
    var day = pno.substr(0, 2);
    var month = pno.substr(2, 2);
    var year = pno.substr(4, 2);
    var ind = pno.substr(6, 3);
    var c1 = pno.substr(9, 1);
    var c2 = pno.substr(10, 1);
    var yearno = parseInt(year);

    if (ind > 0 && ind < 500) {
        yearno += 1900;
    } else if (ind > 499 && ind < 750 && year > 55 && year < 100) {
        yearno += 1800;
    } else if (ind > 499 && ind < 999 && year >= 0 && year < 40) {
        yearno += 2000;
    } else if (ind > 899 && ind < 999 && year > 39 && year < 100) {
        yearno += 1900;
    } else {
        return false;
    }

    var d1 = parseInt(day.substr(0, 1));
    var d2 = parseInt(day.substr(1, 1));
    var m1 = parseInt(month.substr(0, 1));
    var m2 = parseInt(month.substr(1, 1));
    var a1 = parseInt(year.substr(0, 1));
    var a2 = parseInt(year.substr(1, 1));
    var i1 = parseInt(ind.substr(0, 1));
    var i2 = parseInt(ind.substr(1, 1));
    var i3 = parseInt(ind.substr(2, 1));

    // Calculate control check c1
    var c1calc = 11 - (((3 * d1) + (7 * d2) + (6 * m1) + m2 + (8 * a1) + (9 * a2) + (4 * i1) + (5 * i2) + (2 * i3)) % 11);
    if (c1calc == 11)
        c1calc = 0;
    if (c1calc == 10)
        return false;
    if (c1 != c1calc)
        return false;

    // Calculate control check c2
    var c2calc = 11 - (((5 * d1) + (4 * d2) + (3 * m1) + (2 * m2) + (7 * a1) + (6 * a2) + (5 * i1) + (4 * i2) + (3 * i3) + (2 * c1calc)) % 11);
    if (c2calc == 11)
        c2calc = 0;
    if (c2calc == 10)
        return false;
    if (c2 != c2calc)
        return false;

    return true;
}

export function checkPhoneNumber(phoneNo) {
    if (!phoneNo) {
        return false;
    }
    var checkPhone = /^[\d ]{10}$/;
    return phoneNo.match(checkPhone);
}

export function formatPhone(value) {
    if (!value) {
        return value
    }
    const onlyNums = value.replace(/[^\d]/g, '')

    if (value) {
        if (onlyNums.length === 3) {
            return onlyNums
        }
        if (onlyNums.length === 5) {
            return onlyNums.slice(0, 3) + ' ' + onlyNums.slice(3)
        }
    }
    if (onlyNums.length <= 3) {
        return onlyNums
    }
    if (onlyNums.length <= 5) {
        return onlyNums.slice(0, 3) + ' ' + onlyNums.slice(3)
    }
    return onlyNums.slice(0, 3) + ' ' + onlyNums.slice(3, 5) + ' ' + onlyNums.slice(5, 8)
}

export function validPostCode(postCode) {
    if (!postCode) {
        return false;
    }
    var checkPostCode = /^[\d ]{4}$/;
    return postCode.match(checkPostCode);
}

export function checkPostCode(str) {
    if (str) {
        return str.replace(/[^0-9]+/g, '').substring(0, 4)
    }
}

export function onlyLettersInString(str) {
    if (str) {
        str = str.toString();
        return str.replace(/[^a-zA-ZæøåÆØÅ \-\\s]+/g, '');
    }
}

export function onlyDigitsInString(str) {
    if (str) {
        return str.replace(/[^0-9\s]+/g, '');
    }
}

export function alphaNumericInString(str) {
    if (str) {
        return str.replace(/[^a-zA-ZæøåÆØÅ0-9.\s!?]+/g, '');
    }
}
