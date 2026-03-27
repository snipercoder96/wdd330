function fetchMovies(data){
    if(!data.ok){
        throw new Error("Could not retrieve the response. Please try again");
    }else{
        const response = data.json();
        return response;
    }
}

