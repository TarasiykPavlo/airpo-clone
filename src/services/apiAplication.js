import { useNavigate } from "react-router-dom";

export async function postResponseToLink(data) {
  const link = "http://46.175.151.65:8000/api/send_telegram_code";

  try {
    const response = await fetch(link, {
      method: "POST",
      mode: "no-cors",
      body: JSON.stringify(data),
    }).then((response) => {
      const responseData = response.json(); // Преобразование ответа в JSON
      console.log(response)
      console.log("Data received:", responseData);
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

export async function postCompany(isPhoneValid) {
  if (!isPhoneValid) return;
  const navigate = useNavigate();

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
