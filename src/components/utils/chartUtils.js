import axios from 'axios';
import { getToken } from '../../models/token'

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

function average(array) {
    return array.reduce((a, b) => a + b) / array.length;
}

function calculateAverage(data, initialOrFinal) {
    // Check if the data is empty.
    if (!data || data.length === 0) {
        return [];
    }

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
    if (data[initialOrFinal] === 0) {
        data = data.filter(user => user[initialOrFinal] !== 0);
    }

    const averageScores = propertiesToAverage.map(property => {
        const filteredValues = data
            .map(user => user[initialOrFinal][property])    // Get the value of the property
            .filter(value => value !== 0);                  // Filter out 0 values
        return average(filteredValues);
    });    

    return averageScores;
}

export { MenuProps, sexs, academic_degrees, institutions, disciplines, countries,
    fetchData, filterData, average, calculateAverage };
