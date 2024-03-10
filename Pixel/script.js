
const API_URL = 'https://api.themoviedb.org/3/discover/movie?sort_by=popularity.desc&api_key=3fd2be6f0c70a2a598f084ddfb75487c&page=1'
const IMG_PATH = 'https://image.tmdb.org/t/p/w1280'
const SEARCH_API = 'https://api.themoviedb.org/3/search/movie?api_key=3fd2be6f0c70a2a598f084ddfb75487c&query="'

const main=document.getElementById('main')
const sform=document.getElementById('sform')
const search=document.getElementById('search')


const src=document.querySelector('.src')
const btn=document.querySelector('.btn')

btn.addEventListener('click',()=>{
    src.classList.toggle('active')
    search.focus()
})


getMovies(API_URL)

async function getMovies(url){
    const res=await fetch(url)
    const data= await res.json()

    showMovies(data.results)
}

function showMovies(movies){
    main.innerHTML=''

    movies.forEach((movie) => {
        const{title,poster_path,vote_average,overview}=movie

        const movieEl=document.createElement('div')
        movieEl.classList.add('movie')

        movieEl.innerHTML=`  
     
            <img src="${IMG_PATH+poster_path}" alt="${title}">
            <div class="movie-info">
                <h3>${title}</h3> 
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <div class="overview">
                <h3>Ürün Bilgileri</h3>
                    ${overview}
                </div>
    
        `

        main.appendChild(movieEl)
    })
}


sform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const searchTerm =search.value

    if(searchTerm && searchTerm!==''){
        getMovies(SEARCH_API + searchTerm)

        search.value=''
    }
    else{
        window.location.reload()
    }
})