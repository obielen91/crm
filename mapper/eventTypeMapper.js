const typeList = {
    phone: 'telefon',
    email: 'email',
    meeting: 'spotkanie'
};

module.exports = {
    toView: function (type) {
        if (!typeList[type]) {
            throw new Error('Nie ma takiego typu wydarzenia');
        }

        return typeList[type];
    },
    toBase: function (type) {
        const revers = Object.fromEntries(Object.entries(typeList).map(a => a.reverse()));
        if (!revers[type]) {
            throw new Error('Nie ma takiego typu wydarzenia');
        }

        return revers[type];
    },
};