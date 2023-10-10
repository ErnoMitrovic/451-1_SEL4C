import axios from 'axios';
import { getToken } from '../../models/token'
import * as XLSX from "xlsx";

// Menu props for the multiselect filters
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
    PaperProps: {
        style: {
            maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
            width: 250
        }
    },
    anchorOrigin: {
        vertical: "bottom",
        horizontal: "center"
    },
    transformOrigin: {
        vertical: "top",
        horizontal: "center"
    },
    variant: "menu"
};

// Options for the filters
const sexs = [
    'Masculino',
    'Femenino',
    'No binarie',
    'Prefiero no decir'
];

const academic_degrees = [
    'Pregrado',
    'Posgrado',
    'Educación Continua'
];

const institutions = [
    'Tecnológico de Monterrey',
    'Otros'
];

const disciplines = [
    'Arquitectura, Arte y Diseño',
    'Ciencias Sociales',
    'Ciencias de la Salud',
    'Humanidades y Educación',
    'Ingeniería y Ciencias',
    'Negocios',
];

const countries = [
    'México', 'Afganistán', 'Albania', 'Alemania', 'Algeria', 'Andorra', 'Angola', 'Anguilla', 'Antigua y Barbuda', 'Antillas Holandesas', 'Antártida', 'Arabia Saudita', 'Argentina', 'Armenia', 'Aruba', 'Australia', 'Austria', 'Azerbaiyán', 'Bahamas', 'Bahrein', 'Bangladesh', 'Barbados', 'Belice', 'Benín', 'Bermuda', 'Bielorrusia', 'Bolivia', 'Bosnia-Herzegovina', 'Botswana', 'Brasil', 'Brunei', 'Bulgaria', 'Burkina Faso', 'Burundi', 'Bután', 'Bélgica', 'Cabo Verde', 'Camboya', 'Camerún', 'Canadá', 'Chad', 'Chile', 'China', 'Chipre', 'Colombia', 'Comores', 'Corea del Norte', 'Corea del Sur', 'Costa Rica', 'Costa de Marfíl', 'Croacia', 'Cuba', 'Dinamarca', 'Djibouti', 'Dominica', 'Ecuador', 'Egipto', 'El Salvador', 'Emiratos Árabes Unidos', 'Eritrea', 'Eslovaquía', 'Eslovenia', 'España', 'Estados Federados de Micronesia', 'Estados Unidos', 'Estonia', 'Etiopía', 'Fiji', 'Filipinas', 'Finlandia', 'Francia', 'Gabón', 'Gambia', 'Georgia', 'Ghana', 'Gibraltar', 'Granada', 'Grecia', 'Groenlandia', 'Guadalupe', 'Guam', 'Guatemala', 'Guinea', 'Guinea Ecuatorial', 'Guinea-Bissau', 'Guyana', 'Guyana Francesa', 'Haití', 'Holanda', 'Honduras', 'Hong Kong', 'Hungría', 'India', 'Indonesia', 'Iraq', 'Irlanda', 'Irán', 'Isla de Navidad', 'Islandia', 'Islas Caimán', 'Islas Cocos', 'Islas Cook', 'Islas Feroe', 'Islas Malvinas', 'Islas Marianas del Norte', 'Islas Marshall', 'Islas Norfolk', 'Islas Salomón', 'Islas Turcas y Caicos', 'Islas Vírgenes Americanas', 'Islas Vírgenes Británicas', 'Israel', 'Italia', 'Jamaica', 'Japón', 'Jordania', 'Kazajstán', 'Kenia', 'Kirguistán', 'Kiribati', 'Kuwait', 'Laos', 'Lesotho', 'Letonia', 'Liberia', 'Libia', 'Liechtenstein', 'Lituania', 'Luxemburgo', 'Líbano', 'Macao', 'Macedonia', 'Madagascar', 'Malasia', 'Malawi', 'Maldivas', 'Mali', 'Malta', 'Marruecos', 'Martinica', 'Mauricio', 'Mauritania', 'Mayotte', 'Moldavia', 'Mongolia', 'Montserrat', 'Mozambique', 'Myanmar', 'Mónaco', 'Namibia', 'Nauru', 'Nepal', 'Nicaragua', 'Niger', 'Nigeria', 'Niue', 'Noruega', 'Nueva Caledonia', 'Nueva Zelanda', 'Omán', 'Pakistán', 'Palau', 'Palestina', 'Panamá', 'Papua Nueva Guinea', 'Paraguay', 'Perú', 'Pitcairn', 'Polinesia Francesa', 'Polonia', 'Portugal', 'Puerto Rico', 'Qatar', 'Reino Unido', 'República Centroafricana', 'República Checa', 'República Democrática del Congo', 'República Dominicana', 'República del Congo', 'Reunión', 'Ruanda', 'Rumanía', 'Rusia', 'Samoa', 'Samoa Americana', 'San Kitts y Nevis', 'San Marino', 'San Vicente y Granadinas', 'Santa Helena', 'Santa Lucía', 'Santo Tomé y Príncipe', 'Senegal', 'Serbia', 'Seychelles', 'Sierra Leona', 'Singapur', 'Siria', 'Somalia', 'Sri Lanka', 'Sudáfrica', 'Sudán', 'Suecia', 'Suiza', 'Surinam', 'Swazilandia', 'Sáhara Occidental', 'Tadjikistan', 'Tailandia', 'Taiwán', 'Tanzania', 'Tierras Australes y Antárticas Francesas', 'Timor Oriental', 'Togo', 'Tokelau', 'Tonga', 'Trinidad y Tobago', 'Turkmenistan', 'Turquía', 'Tuvalu', 'Túnez', 'Ucrania', 'Uganda', 'Uruguay', 'Uzbekistán', 'Vanuatu', 'Vaticano', 'Venezuela', 'Vietnam', 'Wallis y Futuna', 'Yemen', 'Zambia', 'Zimbabwe'
];

// Colors used for rendering the bar chart.
const softColors = [
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 99, 132, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(205, 92, 92, 0.2)',
    'rgba(124, 252, 0, 0.2)'
];

const colors = [
    'rgba(54, 162, 235)',
    'rgba(255, 99, 132)',
    'rgba(255, 206, 86)',
    'rgba(75, 192, 192)',
    'rgba(153, 102, 255)',
    'rgba(255, 159, 64)',
    'rgba(205, 92, 92)',
    'rgba(124, 252, 0)'
];

// Initial blank data for the radar and bar charts so when rendering the charts, the data is not undefined.
const initialBlankRadarData = {
    labels: [
        'Innovación social y sostenibilidad financiera',
        'Conciencia y valor social',
        'Liderazgo',
        'Autocontrol',
        'Pensamiento sistémico',
        'Pensamiento científico',
        'Pensamiento crítico',
        'Pensamiento innovador',
    ],
    datasets: [{
        label: 'Masculino',
        data: [],
        fill: true,
        backgroundColor: 'rgba(54, 162, 235, 0.2)',
        borderColor: 'rgb(54, 162, 235)',
        pointBackgroundColor: 'rgb(54, 162, 235)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(54, 162, 235)'
    }, {
        label: 'Femenino',
        data: [],
        fill: true,
        backgroundColor: 'rgba(255, 99, 132, 0.2)',
        borderColor: 'rgb(255, 99, 132)',
        pointBackgroundColor: 'rgb(255, 99, 132)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 99, 132)'
    }, {
        label: 'No binarie',
        data: [],
        fill: true,
        backgroundColor: 'rgba(0, 194, 0, 0.2)',
        borderColor: 'rgb(0, 194, 0)',
        pointBackgroundColor: 'rgb(0, 194, 0)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(0, 194, 0)'
    }, {
        label: 'Prefiero no decir',
        data: [],
        fill: true,
        backgroundColor: 'rgba(255, 255, 0, 0.2)',
        borderColor: 'rgb(255, 255, 0)',
        pointBackgroundColor: 'rgb(255, 255, 0)',
        pointBorderColor: '#fff',
        pointHoverBackgroundColor: '#fff',
        pointHoverBorderColor: 'rgb(255, 255, 0)'
    }]
};

const initialBlankBarData = {
    labels: [
        ['Innovación', 'social y', 'sostenibilidad', 'financiera'],
        ['Conciencia', 'y valor', 'social'],
        'Liderazgo',
        'Autocontrol',
        ['Pensamiento', 'sistémico'],
        ['Pensamiento', 'científico'],
        ['Pensamiento', 'crítico'],
        ['Pensamiento', 'innovador'],
    ],
    datasets: [{
        label: 'Formulario Inicial',
        data: [],
        backgroundColor: softColors,
    }, {
        label: 'Formulario Final',
        data: [],
        backgroundColor: colors,
    }]
};

// fetch raw charts data.
async function fetchData() {
    const token = getToken();

    if (!token) {
        throw new Error('No token found');
    }

    try {
        const response = await axios.get(`${process.env.REACT_APP_API_BASE_URL}sel4c/user/info/all`, {
            headers: {
                'Content-Type': 'application/json',
                'Authorization': `Token ${token}`
            }
        });
        return response.data;
    } catch (error) {
        throw Error('Internal error');
    }
}

/*  Calculate the averages of all properties for the initial or final scores from filtered data.  */
// filter data by filters.
function filterData(filters, data) {
    // Check if data is null or empty array
    if (!data || data.length === 0) {
        return [];
    }

    return data.filter(dat => {
        // Check if the user meets the criteria for each filter
        return (
            // Filter by age
            filters.age[0] <= dat.age && dat.age <= filters.age[1] &&
            // Filter by gender
            filters.sex.includes(dat.gender) &&
            // Filter by academic degree
            filters.academic_degrees.includes(dat.academic_degree) &&
            // Filter by institution
            filters.institutions.includes(dat.institution) &&
            // Filter by discipline
            filters.disciplines.includes(dat.discipline) &&
            // Filter by country
            filters.countries.includes(dat.country)
        );
    });
}

// calculate average of an array
function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
}

// calculate the average of the initial or final scores for all properties
function calculateAverage(data, initialOrFinal) {
    // Check if the data is empty.
    if (!data || data.length === 0) {
        return [];
    } else {
        const propertiesToAverage = [
            "social_innovation_and_financial_sustainability_score",
            "consciousness_and_social_value_score",
            "leadership_score",
            "self_control_score",
            "systemic_thinking_score",
            "scientific_thinking_score",
            "critical_thinking_score",
            "innovative_thinking_score"
        ];

        // Filter unanswered forms
        data = data.filter(user => user[initialOrFinal] !== 0);
        // Re-check if the data is empty.
        if (data.length === 0) {
            return [];
        } else {
            const averageScores = propertiesToAverage.map(property => {
                const filteredValues = data
                    .map(user => user[initialOrFinal][property])    // Get the value of the property
                    .filter(value => value !== 0);                  // Filter out 0 values
                return average(filteredValues);
            });

            return averageScores;
        }
    }
}

/*  Download JSON data to .xlsx file  */
// Flatten the initial_score and final_score objects from a single object
function transformItem(item) {
    // Flatten the 'initial' and 'final' objects
    const transformedItem = {
        user: item.user,
        discipline: item.discipline,
        academic_degree: item.academic_degree,
        institution: item.institution,
        gender: item.gender,
        age: item.age,
        country: item.country,
    };

    // Append `initial_` to the keys of the initial object
    for (const key in item.initial_score) {
        if (item.initial_score.hasOwnProperty(key) && key !== 'id' && key !== 'user') {
            transformedItem[`initial_score_${key}`] = item.initial_score[key];
        }
    }

    // Check if final_score is not 0 and append `final_` to the keys of the final object
    if (item.final_score !== 0) {
        for (const key in item.final_score) {
            if (item.final_score.hasOwnProperty(key) && key !== 'id' && key !== 'user') {
                transformedItem[`final_score_${key}`] = item.final_score[key];
            }
        }
    }

    return transformedItem;
}

// Helper function to flatten all the items in the data array
function transformData(data) {
    // Use .map to transform each item in the data array
    return data.map(transformItem);
}

// Create and download .xlsx file
function downloadExcel(data) {
    const transformedData = transformData(data);
    const worksheet = XLSX.utils.json_to_sheet(transformedData);
    const workbook = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
    //let buffer = XLSX.write(workbook, { bookType: "xlsx", type: "buffer" });
    //XLSX.write(workbook, { bookType: "xlsx", type: "binary" });
    XLSX.writeFile(workbook, "DataSheet.xlsx");
};

export {
    MenuProps, sexs, academic_degrees, institutions, disciplines, countries, initialBlankRadarData,
    initialBlankBarData, softColors, colors,
    fetchData, filterData, average, calculateAverage, downloadExcel
};
