const axios = require('axios');
const cheerio = require('cheerio');

const page_url = 'https://en.wikipedia.org/wiki/List_of_chemical_elements';

async function getElements() {
    const { data } = await axios.get(page_url);
    const $ = cheerio.load(data);
    const table = $('table.wikitable');
    const elements = [];

    table.find('tbody tr').slice(4).each((i, elem) => {
        const $row = $(elem);
        const element = {};
        const labels = [
            'atomic_number',
            'symbol',
            'element',
            'etymology',
            'group',
            'period',
            'atomic_weight',
            'density',
            'melt_point',
            'boil_point',
            'specific_heat',
            'electronegativity',
            'abundance',
        ];

        element.name = $row.find('td a').first().text().trim();

        $('sup').remove()

        $row.find('td').each((i, elem) => {
            const $col = $(elem);
            const label = labels[i];

            let value = $col.text().trim();
            const numVal = Number(value.replace(/,/g, ''));

            if (!isNaN(numVal)) {
                value = numVal;
            }

            element[label] = value;
        });

        elements.push(element);
    });

    elements.pop();
    
    return elements;
}

module.exports = getElements;