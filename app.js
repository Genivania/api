const charsContainer = document.querySelector(".chars-container");
const searchInput = document.querySelector('#search')
const speciesFilter = document.querySelector('#species')
const genderFilter = document.querySelector('#gender')
const statusFilter = document.querySelector('#status')
const loadMoreButton = document.querySelector('#load-more')

const api = 'https://rickandmortyapi.com/api'
//Filtros padrao
const defaultFilters = {
    name: '',
    species: '',
    gender: '',
    status: '',
    page: 1
}

async function getCharacters({ name, species, gender, status, page = 1 }) {
    const response = await fetch(`${api}/character?name=${name}&species=${species}&gender${gender}&status${status}&page${page}`)

    //converter string em json
    const characters = await response.json()
    return characters.results
}

async function render({ characters }) {
    characters.forEach((character) => {

        return charsContainer.innerHTML += `
        <div class="char">
            <img src="${character.image}" alt="" />
            <div class="char-info">
                <h3>${character.name}</h3>
                <span>${character.species}</span>
            </div>
      </div>
        `
    })
}

function handleFilterCharge(type, event) {
    return async () => {
        defaultFilters[type] = event.target.value
        charsContainer.innerHTML = ''
        const characters = await getCharacters(defaultFilters)
        render({ characters })
    }

}

async function handleLoadMore() {
    defaultFilters.page += 1
    const characters = await getCharacters(defaultFilters)
    render({ characters })
}

function addListeners() {
    //Filtro de especies
    speciesFilter.addEventListener('change', async function (event) {
        handleFilterCharge('species', event)()
    })

    //Filtro por genero
    genderFilter.addEventListener('change', async (event) => {
        handleFilterCharge('gender', event)()
    })

    //Filtro por status
    speciesFilter.addEventListener('change', async function (event) {
        handleFilterCharge('status', event)()
    })

    //Filtro por nome
    searchInput.addEventListener('keyup', async (event) => {
        handleFilterCharge('name', event)()
        //console.log(event.target.value)F
    })

    loadMoreButton.addEventListener('click', handleLoadMore)
}

async function main() {
    const characters = await getCharacters(defaultFilters)
    addListeners()
    render({ characters })
}

main()

