// =============================================
// KIRU ESCUELA DE ARTES
// JavaScript principal
// =============================================


// BOTÓN VOLVER ARRIBA

const backToTop = document.querySelector(".back-to-top");

backToTop.addEventListener("click", () => {

    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });

});

/* ==================================================
BUSCADOR DE CURSOS
================================================== */

const searchToggle = document.querySelector('.kiru-search-toggle');
const searchPanel = document.querySelector('.kiru-search-panel');
const searchClose = document.querySelector('.kiru-search-close');
const searchInput = document.getElementById('kiruSearchInput');
const searchResults = document.getElementById('kiruSearchResults');


/* ==================================================
CURSOS
================================================== */

const kiruCourses = [

    /* MÚSICA */

    {
        name: 'Violín',
        category: 'Música',
        aliases: ['violin', 'cuerdas'],
        url: 'paginas/cursos/violin.html'
    },

    {
        name: 'Piano',
        category: 'Música',
        aliases: ['piano', 'teclado'],
        url: 'paginas/cursos/piano.html'
    },

    {
        name: 'Guitarra',
        category: 'Música',
        aliases: ['guitarra'],
        url: 'paginas/cursos/guitarra.html'
    },

    {
        name: 'Batería',
        category: 'Música',
        aliases: ['bateria', 'percusion'],
        url: 'paginas/cursos/bateria.html'
    },

    {
        name: 'Técnica vocal',
        category: 'Música',
        aliases: ['tecnica vocal', 'canto', 'voz'],
        url: 'paginas/cursos/tecnica-vocal.html'
    },

    {
        name: 'Iniciación musical',
        category: 'Música',
        aliases: ['iniciacion musical', 'musica infantil'],
        url: 'paginas/cursos/iniciacion-musical.html'
    },


    /* DANZA */

    {
        name: 'Ballet',
        category: 'Danza',
        aliases: ['ballet', 'balet'],
        url: 'paginas/cursos/ballet.html'
    },

    {
        name: 'Danza urbana',
        category: 'Danza',
        aliases: ['danza urbana', 'urbano', 'street dance'],
        url: 'paginas/cursos/danza-urbana.html'
    },

    {
        name: 'Danza contemporánea',
        category: 'Danza',
        aliases: ['danza contemporanea', 'contemporanea'],
        url: 'paginas/cursos/danza-contemporanea.html'
    },

    {
        name: 'Danza latina',
        category: 'Danza',
        aliases: ['danza latina', 'latina'],
        url: 'paginas/cursos/danza-latina.html'
    },

    {
        name: 'K-Pop',
        category: 'Danza',
        aliases: ['kpop', 'k-pop', 'korean dance'],
        url: 'paginas/cursos/kpop.html'
    },


    /* TEATRO */

    {
        name: 'Teatro',
        category: 'Teatro',
        aliases: ['teatro', 'actuacion', 'escena'],
        url: 'paginas/cursos/teatro.html'
    },

    {
        name: 'Artes escénicas',
        category: 'Teatro',
        aliases: ['artes escenicas', 'escenicas'],
        url: 'paginas/cursos/artes-escenicas.html'
    },


    /* ARTES */

    {
        name: 'Dibujo',
        category: 'Artes visuales',
        aliases: ['dibujo', 'dibujar'],
        url: 'paginas/cursos/dibujo.html'
    },

    {
        name: 'Pintura',
        category: 'Artes visuales',
        aliases: ['pintura', 'pintar'],
        url: 'paginas/cursos/pintura.html'
    },

    {
        name: 'Artes plásticas',
        category: 'Artes visuales',
        aliases: ['artes plasticas', 'plasticas'],
        url: 'paginas/cursos/artes-plasticas.html'
    }

];


/* ==================================================
NORMALIZAR TEXTO
================================================== */

function normalizeText(text){

    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g, '')
        .trim();

}


/* ==================================================
DISTANCIA LEVENSHTEIN
Permite pequeños errores de escritura
================================================== */

function levenshtein(a, b){

    const matrix = [];

    for(let i = 0; i <= b.length; i++){
        matrix[i] = [i];
    }

    for(let j = 0; j <= a.length; j++){
        matrix[0][j] = j;
    }

    for(let i = 1; i <= b.length; i++){

        for(let j = 1; j <= a.length; j++){

            if(b.charAt(i - 1) === a.charAt(j - 1)){

                matrix[i][j] =
                    matrix[i - 1][j - 1];

            }else{

                matrix[i][j] =
                    Math.min(
                        matrix[i - 1][j - 1] + 1,
                        matrix[i][j - 1] + 1,
                        matrix[i - 1][j] + 1
                    );

            }

        }

    }

    return matrix[b.length][a.length];

}


/* ==================================================
COMPROBAR COINCIDENCIA
================================================== */

function matchesCourse(course, query){

    const normalizedQuery =
        normalizeText(query);

    if(normalizedQuery.length < 2){
        return false;
    }


    const possibleTerms = [
        course.name,
        course.category,
        ...course.aliases
    ].map(normalizeText);


    return possibleTerms.some(term => {

        /* Coincidencia exacta */

        if(term === normalizedQuery){
            return true;
        }


        /* Búsqueda parcial */

        if(
            normalizedQuery.length >= 3 &&
            term.includes(normalizedQuery)
        ){
            return true;
        }


        /* Error pequeño */

        if(normalizedQuery.length >= 4){

            const distance =
                levenshtein(
                    normalizedQuery,
                    term
                );

            const allowedErrors =
                normalizedQuery.length <= 5
                    ? 1
                    : 2;

            if(distance <= allowedErrors){
                return true;
            }

        }


        return false;

    });

}


/* ==================================================
MOSTRAR RESULTADOS
================================================== */

function renderSearchResults(query){

    searchResults.innerHTML = '';

    const cleanQuery =
        normalizeText(query);


    if(cleanQuery.length < 2){
        return;
    }


    const results =
        kiruCourses
            .filter(course =>
                matchesCourse(
                    course,
                    cleanQuery
                )
            )
            .slice(0, 7);


    if(results.length === 0){

        searchResults.innerHTML = `
            <div class="kiru-search-empty">
                No encontramos cursos relacionados con
                "<strong>${query}</strong>".
            </div>
        `;

        return;
    }


    results.forEach(course => {

        const result = document.createElement('a');

        result.href = course.url;

        result.className =
            'kiru-search-result';

        result.innerHTML = `
            <div class="kiru-search-result-info">
                <strong>${course.name}</strong>
                <span>${course.category}</span>
            </div>

            <i class="bi bi-arrow-up-right"></i>
        `;

        searchResults.appendChild(result);

    });

}


/* ==================================================
ABRIR / CERRAR
================================================== */

searchToggle.addEventListener('click', () => {

    searchPanel.classList.add('active');

    setTimeout(() => {
        searchInput.focus();
    }, 200);

});


searchClose.addEventListener('click', () => {

    searchPanel.classList.remove('active');

    searchInput.value = '';

    searchResults.innerHTML = '';

});


/* ==================================================
ESCRIBIR
================================================== */

searchInput.addEventListener('input', () => {

    renderSearchResults(
        searchInput.value
    );

});


/* ==================================================
ESC PARA CERRAR
================================================== */

document.addEventListener('keydown', event => {

    if(event.key === 'Escape'){

        searchPanel.classList.remove('active');

        searchInput.value = '';

        searchResults.innerHTML = '';

    }

});

/* ==================================================
MENÚ MÓVIL
================================================== */

const mobileMenuToggle = document.querySelector('.kiru-menu-toggle');
const mobileMenu = document.querySelector('.kiru-menu');

const setMobileMenuState = (isOpen) => {
    if (!mobileMenuToggle || !mobileMenu) return;

    mobileMenu.classList.toggle('is-open', isOpen);
    mobileMenuToggle.setAttribute('aria-expanded', String(isOpen));
    mobileMenuToggle.setAttribute(
        'aria-label',
        isOpen ? 'Cerrar menú' : 'Abrir menú'
    );

    const icon = mobileMenuToggle.querySelector('i');

    if (icon) {
        icon.className = isOpen
            ? 'bi bi-x-lg'
            : 'bi bi-list';
    }
};

if (mobileMenuToggle && mobileMenu) {

    mobileMenuToggle.addEventListener('click', () => {
        const isOpen = !mobileMenu.classList.contains('is-open');

        setMobileMenuState(isOpen);

        if (isOpen) {
            searchPanel.classList.remove('active');
            searchInput.value = '';
            searchResults.innerHTML = '';
        }
    });

    mobileMenu.querySelectorAll('a').forEach(link => {
        link.addEventListener('click', () => {
            setMobileMenuState(false);
        });
    });

    searchToggle.addEventListener('click', () => {
        setMobileMenuState(false);
    });

    document.addEventListener('click', event => {
        const clickedMenu = mobileMenu.contains(event.target);
        const clickedButton = mobileMenuToggle.contains(event.target);

        if (!clickedMenu && !clickedButton) {
            setMobileMenuState(false);
        }
    });

    window.addEventListener('resize', () => {
        if (window.innerWidth > 980) {
            setMobileMenuState(false);
        }
    });

}