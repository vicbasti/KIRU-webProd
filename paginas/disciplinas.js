/* ==================================================
BUSCADOR - MÚSICA
================================================== */

const musicSearch =
    document.getElementById('musicSearch');

const musicSearchResults =
    document.getElementById('musicSearchResults');


const musicCourses = [

    {
        name:'Violín',
        category:'Cuerdas',
        aliases:[
            'violin',
            'violn',
            'violi',
            'cuerdas'
        ],
        url:'cursos/violin.html'
    },

    {
        name:'Piano',
        category:'Teclas',
        aliases:[
            'piano',
            'pian',
            'teclado',
            'teclas'
        ],
        url:'cursos/piano.html'
    },

    {
        name:'Guitarra',
        category:'Cuerdas',
        aliases:[
            'guitarra',
            'guitar',
            'guita'
        ],
        url:'cursos/guitarra.html'
    },

    {
        name:'Batería',
        category:'Ritmo',
        aliases:[
            'bateria',
            'bateri',
            'percusion'
        ],
        url:'cursos/bateria.html'
    },

    {
        name:'Técnica vocal',
        category:'Voz',
        aliases:[
            'tecnica vocal',
            'vocal',
            'canto',
            'voz'
        ],
        url:'cursos/tecnica-vocal.html'
    },

    {
        name:'Iniciación musical',
        category:'Primeros pasos',
        aliases:[
            'iniciacion',
            'iniciacion musical',
            'musica infantil'
        ],
        url:'cursos/iniciacion-musical.html'
    }

];


function normalizeMusicText(text){

    return text
        .toLowerCase()
        .normalize('NFD')
        .replace(/[\u0300-\u036f]/g,'')
        .trim();

}


if(musicSearch && musicSearchResults){

    musicSearch.addEventListener(
        'input',
        () => {

            const query =
                normalizeMusicText(
                    musicSearch.value
                );

            musicSearchResults.innerHTML = '';


            if(query.length < 2){
                return;
            }


            const results =
                musicCourses.filter(course => {

                    const terms = [
                        course.name,
                        course.category,
                        ...course.aliases
                    ];

                    return terms.some(term =>
                        normalizeMusicText(term)
                            .includes(query)
                    );

                });


            results.forEach(course => {

                const link =
                    document.createElement('a');

                link.href =
                    course.url;

                link.className =
                    'music-search-result';

                link.innerHTML = `

                    <div>

                        <strong>
                            ${course.name}
                        </strong>

                        <span>
                            ${course.category}
                        </span>

                    </div>

                    <i class="bi bi-arrow-up-right"></i>

                `;

                musicSearchResults
                    .appendChild(link);

            });

        }
    );
}

/* ==================================================
BUSCADOR - DANZA
================================================== */

const danceSearch =
    document.getElementById('danceSearch');

const danceSearchResults =
    document.getElementById('danceSearchResults');


const danceCourses = [

    {
        name:'Ballet',
        category:'Técnica',
        aliases:[
            'ballet',
            'balet',
            'clasico',
            'danza clasica'
        ],
        url:'cursos/ballet.html'
    },

    {
        name:'Danza urbana',
        category:'Energía',
        aliases:[
            'danza urbana',
            'urbana',
            'urbano',
            'street',
            'street dance'
        ],
        url:'cursos/danza-urbana.html'
    },

    {
        name:'Danza contemporánea',
        category:'Expresión',
        aliases:[
            'danza contemporanea',
            'contemporanea',
            'contempo'
        ],
        url:'cursos/danza-contemporanea.html'
    },

    {
        name:'Danza latina',
        category:'Ritmo',
        aliases:[
            'danza latina',
            'latina',
            'latino'
        ],
        url:'cursos/danza-latina.html'
    },

    {
        name:'K-Pop',
        category:'Performance',
        aliases:[
            'kpop',
            'k-pop',
            'k pop',
            'coreografia'
        ],
        url:'cursos/kpop.html'
    }

];


if(danceSearch && danceSearchResults){

    danceSearch.addEventListener(
        'input',
        () => {

            const query =
                normalizeMusicText(
                    danceSearch.value
                );

            danceSearchResults.innerHTML = '';


            if(query.length < 2){
                return;
            }


            const results =
                danceCourses.filter(course => {

                    const terms = [
                        course.name,
                        course.category,
                        ...course.aliases
                    ];

                    return terms.some(term =>
                        normalizeMusicText(term)
                            .includes(query)
                    );

                });


            results.forEach(course => {

                const link =
                    document.createElement('a');

                link.href =
                    course.url;

                link.className =
                    'music-search-result';

                link.innerHTML = `

                    <div>

                        <strong>
                            ${course.name}
                        </strong>

                        <span>
                            ${course.category}
                        </span>

                    </div>

                    <i class="bi bi-arrow-up-right"></i>

                `;

                danceSearchResults
                    .appendChild(link);

            });

        }
    );

}

/* ==================================================
BUSCADOR - TEATRO
================================================== */

const theaterSearch =
    document.getElementById('theaterSearch');

const theaterSearchResults =
    document.getElementById('theaterSearchResults');


const theaterCourses = [

    {
        name:'Teatro',

        category:'Artes escénicas',

        aliases:[
            'teatro',
            'teatr',
            'actuacion',
            'actuar',
            'interpretacion',
            'escena',
            'artes escenicas'
        ],

        url:'cursos/teatro.html'
    },

    {
    name:'Artes escénicas',

    category:'Creación escénica',

    aliases:[
        'artes escenicas',
        'escenicas',
        'creacion escenica',
        'expresion escenica'
    ],

    url:'cursos/artes-escenicas.html'
}
];


if(theaterSearch && theaterSearchResults){

    theaterSearch.addEventListener(
        'input',
        () => {

            const query =
                normalizeMusicText(
                    theaterSearch.value
                );

            theaterSearchResults.innerHTML = '';


            if(query.length < 2){
                return;
            }


            const results =
                theaterCourses.filter(course => {

                    const terms = [
                        course.name,
                        course.category,
                        ...course.aliases
                    ];

                    return terms.some(term =>
                        normalizeMusicText(term)
                            .includes(query)
                    );

                });


            results.forEach(course => {

                const link =
                    document.createElement('a');

                link.href =
                    course.url;

                link.className =
                    'music-search-result';

                link.innerHTML = `

                    <div>

                        <strong>
                            ${course.name}
                        </strong>

                        <span>
                            ${course.category}
                        </span>

                    </div>

                    <i class="bi bi-arrow-up-right"></i>

                `;

                theaterSearchResults
                    .appendChild(link);

            });

        }
    );

}

/* ==================================================
BUSCADOR - ARTES VISUALES
================================================== */

const canvasSearch =
    document.getElementById('canvasSearch');

const canvasSearchResults =
    document.getElementById('canvasSearchResults');


const canvasCourses = [

    {
        name:'Dibujo',
        category:'Trazo',
        aliases:[
            'dibujo',
            'dibujar',
            'boceto',
            'trazo',
            'lapiz'
        ],
        url:'cursos/dibujo.html'
    },

    {
        name:'Pintura',
        category:'Color',
        aliases:[
            'pintura',
            'pintar',
            'color',
            'pincel'
        ],
        url:'cursos/pintura.html'
    },

    {
        name:'Artes plásticas',
        category:'Creación',
        aliases:[
            'artes plasticas',
            'plasticas',
            'creacion',
            'materiales',
            'manualidades',
            'escultura'
        ],
        url:'cursos/artes-plasticas.html'
    }

];


if(canvasSearch && canvasSearchResults){

    canvasSearch.addEventListener(
        'input',
        () => {

            const query =
                normalizeMusicText(
                    canvasSearch.value
                );

            canvasSearchResults.innerHTML = '';


            if(query.length < 2){
                return;
            }


            const results =
                canvasCourses.filter(course => {

                    const terms = [
                        course.name,
                        course.category,
                        ...course.aliases
                    ];

                    return terms.some(term =>
                        normalizeMusicText(term)
                            .includes(query)
                    );

                });


            results.forEach(course => {

                const link =
                    document.createElement('a');

                link.href =
                    course.url;

                link.className =
                    'music-search-result';

                link.innerHTML = `

                    <div>

                        <strong>
                            ${course.name}
                        </strong>

                        <span>
                            ${course.category}
                        </span>

                    </div>

                    <i class="bi bi-arrow-up-right"></i>

                `;

                canvasSearchResults
                    .appendChild(link);

            });

        }
    );

}
