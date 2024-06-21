const accessKey = "y_kSV2Y3fTB9B_9sCRFRTrHCFkMSHjJjuJHEAd0VfJw";
const searchForm  =  document.querySelector('.searchForm');
const imageContainer  =  document.querySelector('.images-container');
const searchInput = document.getElementById('searchInput');
const loadMoreButton =  document.querySelector('.loadMorebtn');
const copyrightYear = document.getElementById('copyrightYear');
let page = 1;

// fetch the data through javascript 
const d = new Date();
const year = d.getFullYear();
copyrightYear.innerHTML = year;

// function to fetch images using unsplash API 
 const fetchImages = async (query, pageNo) => {
    try{

    if(pageNo === 1){
        imageContainer.innerHTML = "";
    }
    const url = `https://api.unsplash.com/search/photos/?query=${query}&page=${pageNo}&client_id=${accessKey}&per_page=28`;
    const response = await fetch(url);
    const data = await response.json();
    console.log(data);
    
    if(data.results.length > 0){
        data.results.forEach(photo => {

            //creating image div
            const imageElement = document.createElement('div');
            imageElement.classList.add('imageDiv')
            imageElement.innerHTML = `<img src="${photo.urls.full}"/>`;
    
            //creating overlay effect 
            const overlayElement = document.createElement('div');
            overlayElement.classList.add('overlay');
            imageElement.appendChild(overlayElement);
    
    
            //creating overlay text
            const overlayText = document.createElement('h3');
            overlayText.innerText = `${photo.alt_description}`;
            overlayElement.appendChild(overlayText);
    
    
            imageContainer.appendChild(imageElement);
        });
    
        if(data.results.total_pages === pageNo){
            loadMoreButton.style.display = "none";
        }
        else{
            loadMoreButton.style.display = "block";
        }
    }else{
        imageContainer.innerHTML = `<div class="alert alert-primary" role="alert">No image found!</div>`;
    }
    
}
catch(error){
    imageContainer.innerHTML = `<div class="alert alert-danger" role="alert">Failed to fatch images! please try again later</div>`;
    if(loadMoreButton.style.display = "block"){
        loadMoreButton.style.display = "none";
    }
}

}

// add event listner to the search form 
searchForm.addEventListener('submit', (e)=>{
    e.preventDefault();
    const inputText = searchInput.value.trim();
    if(inputText != ""){
        page = 1;
        fetchImages(inputText, page);
    }
    else{
        imageContainer.innerHTML = `<div class="alert alert-warning" role="alert">Please enter a search query!</div>`;
    }
});


// adding event lister to the load more btn 
loadMoreButton.addEventListener('click', () =>{
    fetchImages(searchInput.value.trim(), ++page);
});