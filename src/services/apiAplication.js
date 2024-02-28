export async function postResponseToLink(data, link) {
  console.log(JSON.stringify(data));
  await fetch(link, {
    method: "POST",
    mode: "cors",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  })
    .then((response) => {
      console.log(response);
      response.json().then((data) => console.log("Data received:", data));
    })
    .catch((error) => console.log(error));
}