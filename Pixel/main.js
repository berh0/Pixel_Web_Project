
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


getProducts(API_URL)

async function getProducts(url){
    const res=await fetch(url)
    const data= await res.json()

    showProducts(data.results)
}

function showProducts(Products){
    main.innerHTML=''

    Products.forEach((product) => {
        const{title,poster_path,vote_average,overview}=product

        const productEl=document.createElement('div')
        productEl.classList.add('product')

        productEl.innerHTML=`  
     
            <a href='product.html'><img src="${IMG_PATH+poster_path}" alt="${title}"></a>
            <div class="product-info">
                <h3>${title}</h3> 
                <span class="${getClassByRate(vote_average)}">${vote_average}</span>
            </div>
            <a class='sepet' href='#'><i class="fa-solid fa-cart-shopping"></i>Sepete Ekle</a>
           
    
        `

        main.appendChild(productEl)
    })
}

function getClassByRate(vote){
   
}

sform.addEventListener('submit',(e)=>{
    e.preventDefault()

    const searchTerm =search.value

    if(searchTerm && searchTerm!==''){
        getProducts(SEARCH_API + searchTerm)

        search.value=''
    }
    else{
        window.location.reload()
    }
})