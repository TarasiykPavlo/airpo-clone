export async function postResponseToLink(data, link) {
	//console.log(JSON.stringify(data));
	const response = await fetch(link, {
		method: "POST",
		mode: "cors",
		headers: {
			Accept: "application/json",
			"Content-Type": "application/json",
		},
		body: JSON.stringify(data),
	}).catch((error) => console.log(error));
	const datafromresponse = await response.json()
	//console.log("Data received:", data);
	return datafromresponse;
		
}
