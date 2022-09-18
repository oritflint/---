import axios from "axios"



export default async function Api(searchString){
	const options = {
		method: 'GET',
		url: 'https://simple-youtube-search.p.rapidapi.com/search',
		params: {query: searchString, safesearch: 'false'},
		headers: {
		  'X-RapidAPI-Key': '64c9b9615bmshdafc7e7b3fcb275p10bcabjsn446729047920',
		  'X-RapidAPI-Host': 'simple-youtube-search.p.rapidapi.com'
		}
	  };
	  
	  const result = await axios.request(options).then(function (response) {
		  console.log("okkkk!!!!",response.data);
		  return response.data
	  }).catch(function (error) {
		  console.error("error!!!!",error);
	  });

return result

}