async function postResponseToLink(data) {
  const link = "http://46.175.151.65:8000/api/send_telegram_code";
  try {
    const response = await fetch(link, {
      method: "POST",
      body: JSON.stringify(data),
    });
    if (response.ok) {
      console.log("OK");
      const responseData = await response.json(); // Преобразование ответа в JSON
      console.log("Data received:", responseData);
    }
  } catch (error) {
    console.log(error);
  } 
}

export async function postCompany() {
  if (!isPhoneValid) return;

  const companyData = {
    name: companyName,
    region,
    category,
    phone,
    userId,
  };

  console.log(companyData);
  await postResponseToLink(companyData);
  localStorage.setItem("newCompany", JSON.stringify(companyData));
  navigate("/applications/new/phone-validation");
}
